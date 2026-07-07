import { useEffect, useState } from "react";
import AdminDataTable from "../../../shared/ui/table/AdminDataTable";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../../app/api/store";
import {
  handleGetCategories,
  handleCreateCategory,
  handleUpdateCategory,
  handleDeleteCategory,
} from "../categorySlice";
import type { Category } from "../categoryTypes";
import { toast } from "react-toastify";

const CategoriesPage = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { categories, isLoading, error } = useSelector(
    (state: RootState) => state.category,
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

  // Sayfa açıldığında category listesini backend'den çeker.
  useEffect(() => {
    dispatch(handleGetCategories());
  }, [dispatch]);

  // Create category kartını açıp kapatır ve edit kartını kapatır.
  const handleCreate = () => {
    setShowCreateCard((prev) => !prev);
    setShowEditCard(false);
  };

  // Seçilen category bilgisini edit formuna doldurur ve edit kartını açar.
  const handleEdit = (category: Category) => {
    setEditForm({
      id: category.id,
      name: category.name,
      description: category.description,
    });

    setShowEditCard(true);
    setShowCreateCard(false);
  };

  // Delete butonuna basıldığında toast içinde küçük bir onay alanı gösterir.
  const handleDelete = (category: Category) => {
    toast(
      ({ closeToast }) => (
        <div>
          <div className="mb-2">
            Are you sure you want to delete <strong>{category.name}</strong>?
          </div>

          <div className="d-flex gap-2">
            <button
              className="btn btn-sm btn-danger"
              onClick={async () => {
                const resultAction = await dispatch(
                  handleDeleteCategory(category.id),
                );

                if (handleDeleteCategory.fulfilled.match(resultAction)) {
                  toast.success(`${category.name} has been deleted`);
                }

                if (handleDeleteCategory.rejected.match(resultAction)) {
                  toast.error(`Failed to delete ${category.name}`);
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

  // Create formundaki input değişimlerini local state'e işler.
  const handleCreateInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setCreateForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Create form submit edildiğinde yeni category oluşturur.
  const handleCreateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const resultAction = await dispatch(handleCreateCategory(createForm));

    if (handleCreateCategory.fulfilled.match(resultAction)) {
      toast.success(`${createForm.name} has been created`);

      setCreateForm({
        name: "",
        description: "",
      });

      setShowCreateCard(false);
    }

    if (handleCreateCategory.rejected.match(resultAction)) {
      toast.error("Failed to create category");
    }
  };

  // Create formunu sıfırlar ve create kartını kapatır.
  const handleCancelCreate = () => {
    setCreateForm({
      name: "",
      description: "",
    });

    setShowCreateCard(false);
  };

  // Edit formundaki input değişimlerini local state'e işler.
  const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setEditForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Edit form submit edildiğinde category bilgisini backend'de günceller.
  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const resultAction = await dispatch(
      handleUpdateCategory({
        id: editForm.id,
        name: editForm.name,
        description: editForm.description,
      }),
    );

    if (handleUpdateCategory.fulfilled.match(resultAction)) {
      toast.success(`${editForm.name} has been updated`);
      setShowEditCard(false);
    }

    if (handleUpdateCategory.rejected.match(resultAction)) {
      toast.error(`Failed to update ${editForm.name}`);
    }
  };

  // Edit kartını kapatır.
  const handleCancelEdit = () => {
    setShowEditCard(false);
  };

  if (isLoading && categories.length === 0) {
    return <p>Loading categories...</p>;
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
                <h4 className="mb-1">Create New Category</h4>
                <p className="text-muted mb-0">
                  Fill in the fields below to create a new category.
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
                    Category Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    className="form-control"
                    value={createForm.name}
                    onChange={handleCreateInputChange}
                    placeholder="Enter category name"
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
                    placeholder="Enter description"
                    required
                  />
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
                  Create Category
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
                <h4 className="mb-1">Edit Category</h4>
                <p className="text-muted mb-0">
                  Update category name or description.
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
                    Category Name
                  </label>
                  <input
                    id="edit-name"
                    type="text"
                    name="name"
                    className="form-control"
                    value={editForm.name}
                    onChange={handleEditInputChange}
                    required
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

      <AdminDataTable
        title="Categories"
        createButtonLabel={
          showCreateCard ? "Hide Create Form" : "Create Category"
        }
        headers={["Name", "Description", "Actions"]}
        onCreate={handleCreate}
      >
        {categories.map((category: Category) => (
          <tr key={category.id}>
            <td>{category.name}</td>
            <td>{category.description}</td>
            <td>
              <div className="d-flex gap-2">
                <button
                  type="button"
                  className="btn btn-sm btn-outline-primary"
                  onClick={() => handleEdit(category)}
                >
                  Edit
                </button>

                <button
                  type="button"
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => handleDelete(category)}
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

export default CategoriesPage;
