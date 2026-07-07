import { useEffect, useState } from "react";
import AdminDataTable from "../../../shared/ui/table/AdminDataTable";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../../app/api/store";
import {
  handleGetUsers,
  handleCreateUser,
  handleUpdateUser,
  handleDeleteUser,
  handleUpdateUserPassword,
  handleUpdateUserRoles,
} from "../userSlice";
import type { User } from "../userTypes";
import { toast } from "react-toastify";

function UsersPage() {
  const dispatch = useDispatch<AppDispatch>();

  const { users, isLoading, error } = useSelector(
    (state: RootState) => state.user,
  );

  const [showCreateCard, setShowCreateCard] = useState(false);
  const [showEditCard, setShowEditCard] = useState(false);
  const [showPasswordCard, setShowPasswordCard] = useState(false);
  const [showRolesCard, setShowRolesCard] = useState(false);

  const [createForm, setCreateForm] = useState({
    username: "",
    email: "",
    password: "",
    roles: ["ROLE_USER"],
  });

  const [editForm, setEditForm] = useState({
    id: 0,
    username: "",
    email: "",
    enabled: true,
    accountLocked: false,
  });

  const [passwordForm, setPasswordForm] = useState({
    id: 0,
    username: "",
    newPassword: "",
  });

  const [rolesForm, setRolesForm] = useState({
    id: 0,
    username: "",
    roles: [] as string[],
  });

  // Sayfa açıldığında users listesini backend'den çeker.
  useEffect(() => {
    dispatch(handleGetUsers());
  }, [dispatch]);

  // Create kartını açıp kapatır ve açık diğer kartları kapatır.
  const handleCreate = () => {
    setShowCreateCard((prev) => !prev);
    setShowEditCard(false);
    setShowPasswordCard(false);
    setShowRolesCard(false);
  };

  // Seçilen user'ın düzenlenebilir alanlarını edit formuna doldurur ve edit kartını açar.
  const handleEdit = (user: User) => {
    setEditForm({
      id: user.id,
      username: user.username,
      email: user.email,
      enabled: user.enabled,
      accountLocked: user.accountLocked,
    });

    setShowEditCard(true);
    setShowCreateCard(false);
    setShowPasswordCard(false);
    setShowRolesCard(false);
  };

  // Seçilen user için password kartını açar ve ilgili user bilgisini forma doldurur.
  const handleOpenPasswordCard = (user: User) => {
    setPasswordForm({
      id: user.id,
      username: user.username,
      newPassword: "",
    });

    setShowPasswordCard(true);
    setShowCreateCard(false);
    setShowEditCard(false);
    setShowRolesCard(false);
  };

  // Seçilen user için roles kartını açar ve mevcut role bilgisini forma doldurur.
  const handleOpenRolesCard = (user: User) => {
    setRolesForm({
      id: user.id,
      username: user.username,
      roles: user.roles,
    });

    setShowRolesCard(true);
    setShowCreateCard(false);
    setShowEditCard(false);
    setShowPasswordCard(false);
  };

  // Delete butonuna basıldığında toast içinde küçük bir onay alanı gösterir.
  const handleDelete = (user: User) => {
    toast(
      ({ closeToast }) => (
        <div>
          <div className="mb-2">
            Are you sure you want to delete <strong>{user.username}</strong>?
          </div>

          <div className="d-flex gap-2">
            <button
              className="btn btn-sm btn-danger"
              onClick={async () => {
                const resultAction = await dispatch(handleDeleteUser(user.id));

                if (handleDeleteUser.fulfilled.match(resultAction)) {
                  toast.success(`${user.username} has been deleted`);
                }

                if (handleDeleteUser.rejected.match(resultAction)) {
                  toast.error(`Failed to delete ${user.username}`);
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

  // Enabled switch değiştiğinde user enabled bilgisini backend'de günceller.
  const handleToggleEnabled = async (user: User) => {
    const newValue = !user.enabled;

    const resultAction = await dispatch(
      handleUpdateUser({
        id: user.id,
        email: user.email,
        enabled: newValue,
        accountLocked: user.accountLocked,
      }),
    );

    if (handleUpdateUser.fulfilled.match(resultAction)) {
      toast.success(
        newValue
          ? `${user.username}'s account has been enabled`
          : `${user.username}'s account has been disabled`,
      );
    }

    if (handleUpdateUser.rejected.match(resultAction)) {
      toast.error("Failed to update account status");
    }
  };

  // Locked switch değiştiğinde user accountLocked bilgisini backend'de günceller.
  const handleToggleLocked = async (user: User) => {
    const newValue = !user.accountLocked;

    const resultAction = await dispatch(
      handleUpdateUser({
        id: user.id,
        email: user.email,
        enabled: user.enabled,
        accountLocked: newValue,
      }),
    );

    if (handleUpdateUser.fulfilled.match(resultAction)) {
      toast.success(
        newValue
          ? `${user.username}'s account has been locked`
          : `${user.username}'s account has been unlocked`,
      );
    }

    if (handleUpdateUser.rejected.match(resultAction)) {
      toast.error("Failed to update account status");
    }
  };

  // Create formundaki text input değişimlerini local state'e işler.
  const handleCreateInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setCreateForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Create formu submit edildiğinde yeni user oluşturur, başarılıysa formu temizleyip kapatır.
  const handleCreateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      username: createForm.username,
      email: createForm.email,
      password: createForm.password,
      roles: createForm.roles,
    };

    const resultAction = await dispatch(handleCreateUser(payload));

    if (handleCreateUser.fulfilled.match(resultAction)) {
      toast.success(`${createForm.username} has been created`);

      setCreateForm({
        username: "",
        email: "",
        password: "",
        roles: ["ROLE_USER"],
      });

      setShowCreateCard(false);
    }

    if (handleCreateUser.rejected.match(resultAction)) {
      toast.error("Failed to create user");
    }
  };

  // Create formunda role checkbox seçimini ekler veya kaldırır.
  const handleRoleChange = (role: string) => {
    setCreateForm((prev) => {
      const hasRole = prev.roles.includes(role);

      return {
        ...prev,
        roles: hasRole
          ? prev.roles.filter((item) => item !== role)
          : [...prev.roles, role],
      };
    });
  };

  // Create formunu sıfırlar ve create kartını kapatır.
  const handleCancelCreate = () => {
    setCreateForm({
      username: "",
      email: "",
      password: "",
      roles: ["ROLE_USER"],
    });

    setShowCreateCard(false);
  };

  // Edit formundaki email alanındaki değişikliği local state'e işler.
  const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setEditForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Edit formundaki enabled ve accountLocked checkbox değişimlerini local state'e işler.
  const handleEditCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;

    setEditForm((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  // Edit formu submit edildiğinde admin tarafından izin verilen alanları backend'de günceller.
  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const resultAction = await dispatch(
      handleUpdateUser({
        id: editForm.id,
        email: editForm.email,
        enabled: editForm.enabled,
        accountLocked: editForm.accountLocked,
      }),
    );

    if (handleUpdateUser.fulfilled.match(resultAction)) {
      toast.success(`${editForm.username} has been updated`);
      setShowEditCard(false);
    }

    if (handleUpdateUser.rejected.match(resultAction)) {
      toast.error(`Failed to update ${editForm.username}`);
    }
  };

  // Edit kartını kapatır.
  const handleCancelEdit = () => {
    setShowEditCard(false);
  };

  // Password input alanındaki değişikliği local state'e işler.
  const handlePasswordInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, value } = e.target;

    setPasswordForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Password formu submit edildiğinde seçilen user'ın şifresini backend'de günceller.
  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const resultAction = await dispatch(
      handleUpdateUserPassword({
        id: passwordForm.id,
        newPassword: passwordForm.newPassword,
      }),
    );

    if (handleUpdateUserPassword.fulfilled.match(resultAction)) {
      toast.success(`${passwordForm.username}'s password has been updated`);
      setShowPasswordCard(false);
      setPasswordForm({
        id: 0,
        username: "",
        newPassword: "",
      });
    }

    if (handleUpdateUserPassword.rejected.match(resultAction)) {
      toast.error(`Failed to update ${passwordForm.username}'s password`);
    }
  };

  // Password kartını kapatır ve formu temizler.
  const handleCancelPassword = () => {
    setShowPasswordCard(false);
    setPasswordForm({
      id: 0,
      username: "",
      newPassword: "",
    });
  };

  // Roles kartında seçilen role değerini ekler veya kaldırır.
  const handleRolesChange = (role: string) => {
    setRolesForm((prev) => {
      const hasRole = prev.roles.includes(role);

      return {
        ...prev,
        roles: hasRole
          ? prev.roles.filter((item) => item !== role)
          : [...prev.roles, role],
      };
    });
  };

  // Roles formu submit edildiğinde seçilen user'ın role bilgisini backend'de günceller.
  const handleRolesSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const resultAction = await dispatch(
      handleUpdateUserRoles({
        id: rolesForm.id,
        roles: rolesForm.roles,
      }),
    );

    if (handleUpdateUserRoles.fulfilled.match(resultAction)) {
      toast.success(`${rolesForm.username}'s roles have been updated`);
      setShowRolesCard(false);
      setRolesForm({
        id: 0,
        username: "",
        roles: [],
      });
    }

    if (handleUpdateUserRoles.rejected.match(resultAction)) {
      toast.error(`Failed to update ${rolesForm.username}'s roles`);
    }
  };

  // Roles kartını kapatır ve formu temizler.
  const handleCancelRoles = () => {
    setShowRolesCard(false);
    setRolesForm({
      id: 0,
      username: "",
      roles: [],
    });
  };

  // Role string değerini ekranda daha okunabilir bir formata çevirir.
  const formatRole = (role: string) => {
    return role
      .replace("ROLE_", "")
      .toLowerCase()
      .replace(/^\w/, (c) => c.toUpperCase());
  };

  // Role değerine göre badge rengi döndürür.
  const getRoleBadgeClass = (role: string) => {
    if (role === "ROLE_ADMIN") return "bg-primary";
    if (role === "ROLE_EDITOR") return "bg-warning text-dark";
    if (role === "ROLE_USER") return "bg-secondary";
    return "bg-dark";
  };

  if (isLoading && users.length === 0) {
    return <p>Loading users...</p>;
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
                <h4 className="mb-1">Create New User</h4>
                <p className="text-muted mb-0">
                  Fill in the fields below to create a new user.
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
                  <label htmlFor="username" className="form-label">
                    Username
                  </label>
                  <input
                    id="username"
                    type="text"
                    name="username"
                    className="form-control"
                    value={createForm.username}
                    onChange={handleCreateInputChange}
                    required
                  />
                </div>

                <div className="col-md-6">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    className="form-control"
                    value={createForm.email}
                    onChange={handleCreateInputChange}
                    required
                  />
                </div>

                <div className="col-md-6">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    name="password"
                    className="form-control"
                    value={createForm.password}
                    onChange={handleCreateInputChange}
                    required
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label d-block">Roles</label>

                  <div className="d-flex flex-column gap-2">
                    {["ROLE_USER", "ROLE_EDITOR", "ROLE_ADMIN"].map((role) => (
                      <div className="form-check" key={role}>
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id={`create-${role}`}
                          checked={createForm.roles.includes(role)}
                          onChange={() => handleRoleChange(role)}
                        />
                        <label
                          className="form-check-label"
                          htmlFor={`create-${role}`}
                        >
                          {formatRole(role)}
                        </label>
                      </div>
                    ))}
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
                  Create User
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
                <h4 className="mb-1">Edit User</h4>
                <p className="text-muted mb-0">
                  Only email and account status can be updated here.
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
                  <label htmlFor="edit-username" className="form-label">
                    Username
                  </label>
                  <input
                    id="edit-username"
                    type="text"
                    className="form-control"
                    value={editForm.username}
                    disabled
                  />
                </div>

                <div className="col-md-6">
                  <label htmlFor="edit-email" className="form-label">
                    Email
                  </label>
                  <input
                    id="edit-email"
                    type="email"
                    name="email"
                    className="form-control"
                    value={editForm.email}
                    onChange={handleEditInputChange}
                    required
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label d-block">Enabled</label>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="edit-enabled"
                      name="enabled"
                      checked={editForm.enabled}
                      onChange={handleEditCheckboxChange}
                    />
                    <label className="form-check-label" htmlFor="edit-enabled">
                      Account Enabled
                    </label>
                  </div>
                </div>

                <div className="col-md-6">
                  <label className="form-label d-block">Locked</label>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="edit-accountLocked"
                      name="accountLocked"
                      checked={editForm.accountLocked}
                      onChange={handleEditCheckboxChange}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="edit-accountLocked"
                    >
                      Account Locked
                    </label>
                  </div>
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

      {showPasswordCard && (
        <div className="card border-0 shadow-sm mb-4">
          <div className="card-body p-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <div>
                <h4 className="mb-1">Set Password</h4>
                <p className="text-muted mb-0">
                  Set a new password for {passwordForm.username}.
                </p>
              </div>

              <button
                type="button"
                className="btn btn-sm btn-outline-secondary"
                onClick={handleCancelPassword}
              >
                Close
              </button>
            </div>

            <form onSubmit={handlePasswordSubmit}>
              <div className="row g-3">
                <div className="col-md-6">
                  <label htmlFor="password-username" className="form-label">
                    Username
                  </label>
                  <input
                    id="password-username"
                    type="text"
                    className="form-control"
                    value={passwordForm.username}
                    disabled
                  />
                </div>

                <div className="col-md-6">
                  <label htmlFor="newPassword" className="form-label">
                    New Password
                  </label>
                  <input
                    id="newPassword"
                    type="password"
                    name="newPassword"
                    className="form-control"
                    value={passwordForm.newPassword}
                    onChange={handlePasswordInputChange}
                    required
                  />
                </div>
              </div>

              <div className="d-flex justify-content-end gap-2 mt-4">
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={handleCancelPassword}
                >
                  Cancel
                </button>

                <button type="submit" className="btn btn-primary">
                  Save Password
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showRolesCard && (
        <div className="card border-0 shadow-sm mb-4">
          <div className="card-body p-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <div>
                <h4 className="mb-1">Set Roles</h4>
                <p className="text-muted mb-0">
                  Update roles for {rolesForm.username}.
                </p>
              </div>

              <button
                type="button"
                className="btn btn-sm btn-outline-secondary"
                onClick={handleCancelRoles}
              >
                Close
              </button>
            </div>

            <form onSubmit={handleRolesSubmit}>
              <div className="row g-3">
                <div className="col-md-6">
                  <label htmlFor="roles-username" className="form-label">
                    Username
                  </label>
                  <input
                    id="roles-username"
                    type="text"
                    className="form-control"
                    value={rolesForm.username}
                    disabled
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label d-block">Roles</label>

                  <div className="d-flex flex-column gap-2">
                    {["ROLE_USER", "ROLE_EDITOR", "ROLE_ADMIN"].map((role) => (
                      <div className="form-check" key={role}>
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id={`roles-${role}`}
                          checked={rolesForm.roles.includes(role)}
                          onChange={() => handleRolesChange(role)}
                        />
                        <label
                          className="form-check-label"
                          htmlFor={`roles-${role}`}
                        >
                          {formatRole(role)}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="d-flex justify-content-end gap-2 mt-4">
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={handleCancelRoles}
                >
                  Cancel
                </button>

                <button type="submit" className="btn btn-primary">
                  Save Roles
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <AdminDataTable
        title="Users"
        createButtonLabel={
          showCreateCard ? "Hide Create Form" : "Create New User"
        }
        headers={["Username", "Email", "Role", "Enabled", "Locked", "Actions"]}
        onCreate={handleCreate}
      >
        {users.map((user: User) => (
          <tr key={user.id}>
            <td>{user.username}</td>
            <td>{user.email}</td>
            <td>
              <div className="d-flex flex-wrap gap-1">
                {user.roles.map((role) => (
                  <span
                    key={role}
                    className={`badge ${getRoleBadgeClass(role)}`}
                  >
                    {formatRole(role)}
                  </span>
                ))}
              </div>
            </td>

            <td>
              <div className="form-check form-switch m-0">
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={user.enabled}
                  onChange={() => handleToggleEnabled(user)}
                />
              </div>
            </td>

            <td>
              <div className="form-check form-switch m-0">
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={user.accountLocked}
                  onChange={() => handleToggleLocked(user)}
                />
              </div>
            </td>

            <td>
              <div className="d-flex gap-2 flex-wrap">
                <button
                  className="btn btn-sm btn-outline-primary"
                  onClick={() => handleEdit(user)}
                >
                  Edit
                </button>

                <button
                  className="btn btn-sm btn-outline-warning"
                  onClick={() => handleOpenRolesCard(user)}
                >
                  Set Roles
                </button>

                <button
                  className="btn btn-sm btn-outline-secondary"
                  onClick={() => handleOpenPasswordCard(user)}
                >
                  Set Password
                </button>

                <button
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => handleDelete(user)}
                >
                  Delete
                </button>
              </div>
            </td>
          </tr>
        ))}
      </AdminDataTable>
    </>
  );
}

export default UsersPage;
