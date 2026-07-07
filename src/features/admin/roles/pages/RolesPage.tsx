import { Fragment, useEffect, useState } from "react";
import AdminDataTable from "../../../shared/ui/table/AdminDataTable";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../../app/api/store";
import {
  handleGetRoles,
  handleCreateRole,
  handleUpdateRole,
  handleSetPermission,
  handleDeleteRole,
} from "../roleSlice";
import { handleGetPermissions } from "../../permissions/permissionSlice";
import type { Role } from "../roleTypes";
import type { Permission } from "../../permissions/permissionType";
import { toast } from "react-toastify";

const RolesPage = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { roles, isLoading, error } = useSelector(
    (state: RootState) => state.role,
  );

  const { permissions } = useSelector((state: RootState) => state.permission);

  const [showCreateCard, setShowCreateCard] = useState(false);
  const [showEditCard, setShowEditCard] = useState(false);
  const [showPermissionCard, setShowPermissionCard] = useState(false);
  const [detailRoleId, setDetailRoleId] = useState<number | null>(null);

  const [createForm, setCreateForm] = useState({
    name: "",
    description: "",
    permissions: [] as string[],
  });

  const [editForm, setEditForm] = useState({
    id: 0,
    name: "",
    description: "",
  });

  const [permissionForm, setPermissionForm] = useState({
    id: 0,
    name: "",
    permissions: [] as string[],
  });

  // Sayfa açıldığında role ve permission listelerini backend'den çeker.
  useEffect(() => {
    dispatch(handleGetRoles());
    dispatch(handleGetPermissions());
  }, [dispatch]);

  // Create kartını açıp kapatır ve diğer kartları kapatır.
  const handleCreate = () => {
    setShowCreateCard((prev) => !prev);
    setShowEditCard(false);
    setShowPermissionCard(false);
  };

  // Role create formundaki text input değişimlerini local state'e işler.
  const handleCreateInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setCreateForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Create sırasında permission seçimini ekler veya kaldırır.
  const handleCreatePermissionChange = (permissionName: string) => {
    setCreateForm((prev) => {
      const hasPermission = prev.permissions.includes(permissionName);

      return {
        ...prev,
        permissions: hasPermission
          ? prev.permissions.filter((item) => item !== permissionName)
          : [...prev.permissions, permissionName],
      };
    });
  };

  // Yeni role oluşturur. Permission seçilmezse permissions boş array olarak gider.
  const handleCreateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const resultAction = await dispatch(handleCreateRole(createForm));

    if (handleCreateRole.fulfilled.match(resultAction)) {
      toast.success(`${createForm.name} has been created`);

      setCreateForm({
        name: "",
        description: "",
        permissions: [],
      });

      setShowCreateCard(false);
    }

    if (handleCreateRole.rejected.match(resultAction)) {
      toast.error("Failed to create role");
    }
  };

  // Create kartını kapatır ve formu temizler.
  const handleCancelCreate = () => {
    setCreateForm({
      name: "",
      description: "",
      permissions: [],
    });

    setShowCreateCard(false);
  };

  // Edit kartını açar ve seçilen role bilgisini forma doldurur.
  const handleEdit = (role: Role) => {
    setEditForm({
      id: role.id,
      name: role.name,
      description: role.description,
    });

    setShowEditCard(true);
    setShowCreateCard(false);
    setShowPermissionCard(false);
  };

  // Edit formundaki description değişimini local state'e işler.
  const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setEditForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Role description bilgisini backend'de günceller.
  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const resultAction = await dispatch(
      handleUpdateRole({
        id: editForm.id,
        description: editForm.description,
      }),
    );

    if (handleUpdateRole.fulfilled.match(resultAction)) {
      toast.success(`${editForm.name} has been updated`);
      setShowEditCard(false);
    }

    if (handleUpdateRole.rejected.match(resultAction)) {
      toast.error(`Failed to update ${editForm.name}`);
    }
  };

  // Edit kartını kapatır.
  const handleCancelEdit = () => {
    setShowEditCard(false);
  };

  // Set permissions kartını açar ve mevcut permission listesini forma doldurur.
  const handleOpenPermissionCard = (role: Role) => {
    setPermissionForm({
      id: role.id,
      name: role.name,
      permissions: role.permissions,
    });

    setShowPermissionCard(true);
    setShowCreateCard(false);
    setShowEditCard(false);
  };

  // Role permission checkbox seçimini ekler veya kaldırır.
  const handlePermissionChange = (permissionName: string) => {
    setPermissionForm((prev) => {
      const hasPermission = prev.permissions.includes(permissionName);

      return {
        ...prev,
        permissions: hasPermission
          ? prev.permissions.filter((item) => item !== permissionName)
          : [...prev.permissions, permissionName],
      };
    });
  };

  // Seçilen role için permission listesini backend'de günceller.
  const handlePermissionSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const resultAction = await dispatch(
      handleSetPermission({
        id: permissionForm.id,
        permissions: permissionForm.permissions,
      }),
    );

    if (handleSetPermission.fulfilled.match(resultAction)) {
      toast.success(`${permissionForm.name}'s permissions have been updated`);
      setShowPermissionCard(false);
    }

    if (handleSetPermission.rejected.match(resultAction)) {
      toast.error(`Failed to update ${permissionForm.name}'s permissions`);
    }
    console.log("set permission payload:", {
      id: permissionForm.id,
      permissions: permissionForm.permissions,
    });
  };

  // Permission kartını kapatır ve formu temizler.
  const handleCancelPermission = () => {
    setShowPermissionCard(false);

    setPermissionForm({
      id: 0,
      name: "",
      permissions: [],
    });
  };

  // Role details satırını açar veya kapatır.
  const handleToggleDetails = (roleId: number) => {
    setDetailRoleId((prev) => (prev === roleId ? null : roleId));
  };

  // Role silmeden önce toast içinde küçük onay alanı gösterir.
  const handleDelete = (role: Role) => {
    toast(
      ({ closeToast }) => (
        <div>
          <div className="mb-2">
            Are you sure you want to delete <strong>{role.name}</strong>?
          </div>

          <div className="d-flex gap-2">
            <button
              className="btn btn-sm btn-danger"
              onClick={async () => {
                const resultAction = await dispatch(handleDeleteRole(role.id));

                if (handleDeleteRole.fulfilled.match(resultAction)) {
                  toast.success(`${role.name} has been deleted`);
                }

                if (handleDeleteRole.rejected.match(resultAction)) {
                  toast.error(`Failed to delete ${role.name}`);
                }

                closeToast?.();
              }}
            >
              Delete
            </button>

            <button className="btn btn-sm btn-secondary" onClick={closeToast}>
              Cancel
            </button>
          </div>
        </div>
      ),
      {
        autoClose: false,
        closeOnClick: false,
      },
    );
  };

  // ROLE_ADMIN gibi role isimlerini Admin gibi okunabilir hale getirir.
  const formatRole = (role: string) => {
    return role
      .replace("ROLE_", "")
      .toLowerCase()
      .replace(/^\w/, (c) => c.toUpperCase());
  };

  if (isLoading && roles.length === 0) {
    return <p>Loading roles...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <>
      {showCreateCard && (
        <div className="card border-0 shadow-sm mb-4">
          <div className="card-body p-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <div>
                <h4 className="mb-1">Create New Role</h4>
                <p className="text-muted mb-0">
                  Permissions are optional while creating a role.
                </p>
              </div>

              <button
                type="button"
                className="btn btn-sm btn-outline-secondary"
                onClick={handleCancelCreate}
              >
                Close
              </button>
            </div>

            <form onSubmit={handleCreateSubmit}>
              <div className="row g-3">
                <div className="col-md-6">
                  <label htmlFor="name" className="form-label">
                    Role Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    className="form-control"
                    value={createForm.name}
                    onChange={handleCreateInputChange}
                    placeholder="ROLE_MANAGER"
                    required
                  />
                </div>

                <div className="col-md-6">
                  <label htmlFor="description" className="form-label">
                    Description
                  </label>
                  <input
                    id="description"
                    type="text"
                    name="description"
                    className="form-control"
                    value={createForm.description}
                    onChange={handleCreateInputChange}
                    placeholder="Role description"
                    required
                  />
                </div>

                <div className="col-12">
                  <label className="form-label d-block">
                    Permissions Optional
                  </label>

                  <div className="border rounded p-3 bg-light">
                    {permissions.length === 0 ? (
                      <p className="text-muted mb-0">No permissions found.</p>
                    ) : (
                      <div className="row g-2">
                        {permissions.map((permission: Permission) => (
                          <div className="col-md-4" key={permission.id}>
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                id={`create-permission-${permission.id}`}
                                checked={createForm.permissions.includes(
                                  permission.name,
                                )}
                                onChange={() =>
                                  handleCreatePermissionChange(permission.name)
                                }
                              />
                              <label
                                className="form-check-label"
                                htmlFor={`create-permission-${permission.id}`}
                              >
                                {permission.name}
                              </label>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="d-flex justify-content-end gap-2 mt-4">
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={handleCancelCreate}
                >
                  Cancel
                </button>

                <button type="submit" className="btn btn-primary">
                  Create Role
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showEditCard && (
        <div className="card border-0 shadow-sm mb-4">
          <div className="card-body p-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <div>
                <h4 className="mb-1">Edit Role</h4>
                <p className="text-muted mb-0">
                  Only description can be updated here.
                </p>
              </div>

              <button
                type="button"
                className="btn btn-sm btn-outline-secondary"
                onClick={handleCancelEdit}
              >
                Close
              </button>
            </div>

            <form onSubmit={handleEditSubmit}>
              <div className="row g-3">
                <div className="col-md-6">
                  <label htmlFor="edit-name" className="form-label">
                    Role Name
                  </label>
                  <input
                    id="edit-name"
                    type="text"
                    className="form-control"
                    value={editForm.name}
                    disabled
                  />
                </div>

                <div className="col-md-6">
                  <label htmlFor="edit-description" className="form-label">
                    Description
                  </label>
                  <input
                    id="edit-description"
                    type="text"
                    name="description"
                    className="form-control"
                    value={editForm.description}
                    onChange={handleEditInputChange}
                    required
                  />
                </div>
              </div>

              <div className="d-flex justify-content-end gap-2 mt-4">
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={handleCancelEdit}
                >
                  Cancel
                </button>

                <button type="submit" className="btn btn-primary">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showPermissionCard && (
        <div className="card border-0 shadow-sm mb-4">
          <div className="card-body p-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <div>
                <h4 className="mb-1">Set Permissions</h4>
                <p className="text-muted mb-0">
                  Update permissions for {permissionForm.name}.
                </p>
              </div>

              <button
                type="button"
                className="btn btn-sm btn-outline-secondary"
                onClick={handleCancelPermission}
              >
                Close
              </button>
            </div>

            <form onSubmit={handlePermissionSubmit}>
              <div className="border rounded p-3 bg-light">
                {permissions.length === 0 ? (
                  <p className="text-muted mb-0">No permissions found.</p>
                ) : (
                  <div className="row g-2">
                    {permissions.map((permission: Permission) => (
                      <div className="col-md-4" key={permission.id}>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id={`set-permission-${permission.id}`}
                            checked={permissionForm.permissions.includes(
                              permission.name,
                            )}
                            onChange={() =>
                              handlePermissionChange(permission.name)
                            }
                          />
                          <label
                            className="form-check-label"
                            htmlFor={`set-permission-${permission.id}`}
                          >
                            {permission.name}
                          </label>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="d-flex justify-content-end gap-2 mt-4">
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={handleCancelPermission}
                >
                  Cancel
                </button>

                <button type="submit" className="btn btn-primary">
                  Save Permissions
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <AdminDataTable
        title="Roles"
        createButtonLabel={showCreateCard ? "Hide Create Form" : "Create Role"}
        headers={["Name", "Description", "Permissions", "Actions"]}
        onCreate={handleCreate}
      >
        {roles.map((role: Role) => (
          <Fragment key={role.id}>
            <tr>
              <td>
                <span className="fw-semibold">{formatRole(role.name)}</span>
              </td>

              <td>{role.description}</td>

              <td>
                <button
                  type="button"
                  className="btn btn-sm btn-outline-secondary"
                  onClick={() => handleToggleDetails(role.id)}
                >
                  {role.permissions.length} permissions · Details
                </button>
              </td>

              <td>
                <div className="d-flex gap-2 flex-wrap">
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-primary"
                    onClick={() => handleEdit(role)}
                  >
                    Edit
                  </button>

                  <button
                    type="button"
                    className="btn btn-sm btn-outline-warning"
                    onClick={() => handleOpenPermissionCard(role)}
                  >
                    Set Permissions
                  </button>

                  <button
                    type="button"
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => handleDelete(role)}
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>

            {detailRoleId === role.id && (
              <tr>
                <td colSpan={4}>
                  <div className="card border-0 bg-light">
                    <div className="card-body">
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <strong>{role.name} Permissions</strong>

                        <button
                          type="button"
                          className="btn btn-sm btn-outline-secondary"
                          onClick={() => setDetailRoleId(null)}
                        >
                          Hide
                        </button>
                      </div>

                      {role.permissions.length === 0 ? (
                        <p className="text-muted mb-0">
                          This role has no permissions.
                        </p>
                      ) : (
                        <div className="d-flex flex-wrap gap-2">
                          {role.permissions.map((permission) => (
                            <span
                              key={permission}
                              className="badge bg-secondary"
                            >
                              {permission}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </td>
              </tr>
            )}
          </Fragment>
        ))}
      </AdminDataTable>
    </>
  );
};

export default RolesPage;
