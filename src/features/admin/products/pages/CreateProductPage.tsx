import { Link } from "react-router-dom";
import CreateProductForm from "../components/CreateProductForm";

function CreateProductPage() {
  return (
    <div className="card shadow-sm">
      <div className="card-header bg-white d-flex justify-content-between align-items-center">
        <h4 className="mb-0">Create Product</h4>

        <Link to="/admin/products" className="btn btn-outline-secondary btn-sm">
          Back to Products
        </Link>
      </div>

      <div className="card-body">
        <CreateProductForm />
      </div>
    </div>
  );
}

export default CreateProductPage;
