import { useEffect, useState } from "react";
import AdminDataTable from "../../../shared/ui/table/AdminDataTable";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../../app/api/store";
import {
  handleGetPermissions,
  handleCreatePermission,
  handleUpdatePermission,
  handleDeletePermission,
} from "../permissionSlice";
import type { Permission } from "../permissionType";
import { toast } from "react-toastify";

const PermissionsPage = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { permissions, isLoading, error } = useSelector(
    (state: RootState) => state.permission,
  );

  const [showCreateCard, setShowCreateCard] = useState(false);
  const [showEditCard, setShowEditCard] = useState(false);

  const [createForm, setCreateForm] = useState({
    name: "",
    description: "",
  });

  const [editForm, setEditForm] = useState({
    id: 0,
    name: "",
    description: "",
  });

  // Sayfa açıldığında permission listesi çekilir
  useEffect(() => {
    dispatch(handleGetPermissions());
  }, [dispatch]);

  // Create kart aç/kapat
  const handleCreate = () => {
    setShowCreateCard((prev) => !prev);
    setShowEditCard(false);
  };

  // Edit kart aç
  const handleEdit = (permission: Permission) => {
    setEditForm({
      id: permission.id,
      name: permission.name,
      description: permission.description,
    });

    setShowEditCard(true);
    setShowCreateCard(false);
  };

  // Delete işlemi (toast confirm)
  const handleDelete = (permission: Permission) => {
    toast(
      ({ closeToast }) => (
        <div>
          <div className="mb-2">
            Delete <strong>{permission.name}</strong>?
          </div>

          <div className="d-flex gap-2">
            <button
              className="btn btn-sm btn-danger"
              onClick={async () => {
                const result = await dispatch(
                  handleDeletePermission(permission.id),
                );

                if (handleDeletePermission.fulfilled.match(result)) {
                  toast.success("Permission deleted");
                } else {
                  toast.error("Delete failed");
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
      { autoClose: false },
    );
  };

  // Create input change
  const handleCreateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setCreateForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Create submit
  const handleCreateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = await dispatch(handleCreatePermission(createForm));

    if (handleCreatePermission.fulfilled.match(result)) {
      toast.success("Permission created");

      setCreateForm({ name: "", description: "" });
      setShowCreateCard(false);
    } else {
      toast.error("Create failed");
    }
  };

  // Edit input change
  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setEditForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Edit submit (SADECE description update edilir)
  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = await dispatch(
      handleUpdatePermission({
        id: editForm.id,
        description: editForm.description,
      }),
    );

    if (handleUpdatePermission.fulfilled.match(result)) {
      toast.success("Permission updated");
      setShowEditCard(false);
    } else {
      toast.error("Update failed");
    }
  };

  if (isLoading && permissions.length === 0) {
    return <p>Loading permissions...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <>
      {/* CREATE CARD */}
      {showCreateCard && (
        <div className="card shadow-sm mb-4">
          <div className="card-body">
            <h5>Create Permission</h5>

            <form onSubmit={handleCreateSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Name"
                className="form-control mb-2"
                value={createForm.name}
                onChange={handleCreateChange}
                required
              />

              <input
                type="text"
                name="description"
                placeholder="Description"
                className="form-control mb-2"
                value={createForm.description}
                onChange={handleCreateChange}
                required
              />

              <button className="btn btn-primary">Create</button>
            </form>
          </div>
        </div>
      )}

      {/* EDIT CARD */}
      {showEditCard && (
        <div className="card shadow-sm mb-4">
          <div className="card-body">
            <h5>Edit Permission</h5>

            <form onSubmit={handleEditSubmit}>
              <input
                type="text"
                className="form-control mb-2"
                value={editForm.name}
                disabled
              />

              <input
                type="text"
                name="description"
                className="form-control mb-2"
                value={editForm.description}
                onChange={handleEditChange}
              />

              <button className="btn btn-primary">Save</button>
            </form>
          </div>
        </div>
      )}

      {/* TABLE */}
      <AdminDataTable
        title="Permissions"
        createButtonLabel={
          showCreateCard ? "Hide Create Form" : "Create Permission"
        }
        headers={["Name", "Description", "Actions"]}
        onCreate={handleCreate}
      >
        {permissions.map((permission: Permission) => (
          <tr key={permission.id}>
            <td>{permission.name}</td>
            <td>{permission.description}</td>

            <td>
              <div className="d-flex gap-2">
                <button
                  className="btn btn-sm btn-outline-primary"
                  onClick={() => handleEdit(permission)}
                >
                  Edit
                </button>

                <button
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => handleDelete(permission)}
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
};

export default PermissionsPage;
