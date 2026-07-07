import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import type { AppDispatch, RootState } from "../../../../app/api/store";
import {
  createNewProduct,
  updateExistingProduct,
  uploadSingleImage,
} from "../productSlice";
import { handleGetCategories } from "../../categories/categorySlice";
import { handleGetBrands } from "../../brands/brandSlice";
import ProductImageUploader from "./ProductImageUploader";

type ProductImage = {
  imageUrl: string;
  sortOrder: number;
};

type CreateProductFormProps = {
  initialData?: {
    id?: number;
    name: string;
    slug: string;
    shortDescription: string;
    description: string;
    price: number;
    salePrice: number;
    currency: string;
    stockQuantity: number;
    categoryId: number;
    brandId: number;
    active: boolean;
    featured: boolean;
    mainImageUrl?: string;
    images?: ProductImage[];
  };
};

function generateSlug(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/ğ/g, "g")
    .replace(/ü/g, "u")
    .replace(/ş/g, "s")
    .replace(/ı/g, "i")
    .replace(/ö/g, "o")
    .replace(/ç/g, "c")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function CreateProductForm({ initialData }: CreateProductFormProps) {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { categories } = useSelector((state: RootState) => state.category);
  const { brands } = useSelector((state: RootState) => state.brand);

  const isEditMode = !!initialData;

  const [name, setName] = useState(initialData?.name || "");

  const [customSlug, setCustomSlug] = useState(
    initialData?.slug || generateSlug(initialData?.name || ""),
  );

  const [isSlugEditable, setIsSlugEditable] = useState(false);

  const generatedSlug = generateSlug(name);
  const finalSlug = isSlugEditable ? customSlug : generatedSlug;

  const [shortDescription, setShortDescription] = useState(
    initialData?.shortDescription || "",
  );

  const [description, setDescription] = useState(
    initialData?.description || "",
  );

  const [price, setPrice] = useState(initialData?.price?.toString() || "");

  const [salePrice, setSalePrice] = useState(
    initialData?.salePrice?.toString() || "",
  );

  const [currency, setCurrency] = useState(initialData?.currency || "USD");

  const [stockQuantity, setStockQuantity] = useState(
    initialData?.stockQuantity?.toString() || "",
  );

  const [categoryId, setCategoryId] = useState(
    initialData?.categoryId?.toString() || "",
  );

  const [brandId, setBrandId] = useState(
    initialData?.brandId?.toString() || "",
  );

  const [mainImage, setMainImage] = useState<File | null>(null);
  const [galleryImages, setGalleryImages] = useState<File[]>([]);

  const [existingMainImageUrl, setExistingMainImageUrl] = useState(
    initialData?.mainImageUrl || "",
  );

  const [existingGalleryUrls, setExistingGalleryUrls] = useState(
    initialData?.images
      ?.slice()
      .sort((a, b) => a.sortOrder - b.sortOrder)
      .map((image) => image.imageUrl) || [],
  );

  const [active, setActive] = useState(initialData?.active ?? true);
  const [featured, setFeatured] = useState(initialData?.featured ?? false);

  useEffect(() => {
    dispatch(handleGetCategories());
    dispatch(handleGetBrands());
  }, [dispatch]);

  const handleToggleSlugEdit = () => {
    if (!isSlugEditable) {
      setCustomSlug(finalSlug);
    }

    setIsSlugEditable((prev) => !prev);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error("Product name is required");
      return;
    }

    if (!categoryId) {
      toast.error("Please select category");
      return;
    }

    if (!brandId) {
      toast.error("Please select brand");
      return;
    }

    if (!isEditMode && !mainImage) {
      toast.error("Main image is required");
      return;
    }

    if (isEditMode && !mainImage && !existingMainImageUrl) {
      toast.error("Main image is required");
      return;
    }

    try {
      const mainImageUrl = mainImage
        ? await dispatch(uploadSingleImage(mainImage)).unwrap()
        : existingMainImageUrl;

      const newGalleryUrls = await Promise.all(
        galleryImages.map((image) =>
          dispatch(uploadSingleImage(image)).unwrap(),
        ),
      );

      const allGalleryUrls = [...existingGalleryUrls, ...newGalleryUrls];

      const productPayload = {
        name,
        slug: finalSlug,
        shortDescription,
        description,
        price: Number(price),
        salePrice: salePrice ? Number(salePrice) : Number(price),
        currency,
        stockQuantity: Number(stockQuantity),
        active,
        featured,
        mainImageUrl,
        images: allGalleryUrls.map((url, index) => ({
          imageUrl: url,
          sortOrder: index,
        })),
        categoryId: Number(categoryId),
        brandId: Number(brandId),
      };

      if (isEditMode && initialData?.id) {
        await dispatch(
          updateExistingProduct({
            id: initialData.id,
            product: productPayload,
          }),
        ).unwrap();

        toast.success("Product updated successfully");
      } else {
        await dispatch(createNewProduct(productPayload)).unwrap();

        toast.success("Product created successfully");
      }

      navigate("/admin/products");
    } catch {
      toast.error(
        isEditMode ? "Product update failed" : "Product create failed",
      );
    }
  };

  return (
    <div className="card shadow-sm border-0">
      <div className="card-header bg-white">
        <h5 className="mb-0">
          {isEditMode ? "Edit Product" : "Create Product"}
        </h5>
      </div>

      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Name</label>
              <input
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="iPhone 15 Pro Max"
              />
            </div>

            <div className="col-md-6">
              <label className="form-label d-flex justify-content-between">
                <span>Slug</span>

                <button
                  type="button"
                  className="btn btn-sm btn-outline-secondary"
                  onClick={handleToggleSlugEdit}
                >
                  {isSlugEditable ? "Auto" : "Edit"}
                </button>
              </label>

              <input
                className="form-control"
                value={finalSlug}
                disabled={!isSlugEditable}
                onChange={(e) => setCustomSlug(generateSlug(e.target.value))}
              />
            </div>

            <div className="col-12">
              <h6 className="fw-bold mt-3">Description</h6>
            </div>

            <div className="col-12">
              <label className="form-label">Short Description</label>
              <input
                className="form-control"
                value={shortDescription}
                onChange={(e) => setShortDescription(e.target.value)}
              />
            </div>

            <div className="col-12">
              <label className="form-label">Full Description</label>
              <textarea
                className="form-control"
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="col-12">
              <h6 className="fw-bold mt-3">Pricing</h6>
            </div>

            <div className="col-md-4">
              <label className="form-label">Price</label>
              <input
                type="number"
                className="form-control"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>

            <div className="col-md-4">
              <label className="form-label">Sale Price</label>
              <input
                type="number"
                className="form-control"
                value={salePrice}
                onChange={(e) => setSalePrice(e.target.value)}
              />
            </div>

            <div className="col-md-4">
              <label className="form-label">Currency</label>
              <select
                className="form-select"
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
              >
                <option value="USD">Dollar</option>
                <option value="EUR">Euro</option>
                <option value="TRY">TRY</option>
              </select>
            </div>

            <div className="col-12">
              <h6 className="fw-bold mt-3">Inventory</h6>
            </div>

            <div className="col-md-4">
              <label className="form-label">Stock Quantity</label>
              <input
                type="number"
                className="form-control"
                value={stockQuantity}
                onChange={(e) => setStockQuantity(e.target.value)}
              />
            </div>

            <div className="col-12">
              <h6 className="fw-bold mt-3">Organization</h6>
            </div>

            <div className="col-md-6">
              <label className="form-label">Category</label>
              <select
                className="form-select"
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
              >
                <option value="">Select category</option>

                {categories.map((category) => (
                  <option value={category.id} key={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-md-6">
              <label className="form-label">Brand</label>
              <select
                className="form-select"
                value={brandId}
                onChange={(e) => setBrandId(e.target.value)}
              >
                <option value="">Select brand</option>

                {brands.map((brand) => (
                  <option value={brand.id} key={brand.id}>
                    {brand.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-12">
              <h6 className="fw-bold mt-3">Images</h6>

              <ProductImageUploader
                mainImage={mainImage}
                setMainImage={setMainImage}
                galleryImages={galleryImages}
                setGalleryImages={setGalleryImages}
                existingMainImageUrl={existingMainImageUrl}
                setExistingMainImageUrl={setExistingMainImageUrl}
                existingGalleryUrls={existingGalleryUrls}
                setExistingGalleryUrls={setExistingGalleryUrls}
              />
            </div>

            <div className="col-12">
              <h6 className="fw-bold mt-3">Status</h6>
            </div>

            <div className="col-md-3">
              <div className="form-check">
                <input
                  id="active"
                  type="checkbox"
                  className="form-check-input"
                  checked={active}
                  onChange={(e) => setActive(e.target.checked)}
                />
                <label htmlFor="active" className="form-check-label">
                  Active
                </label>
              </div>
            </div>

            <div className="col-md-3">
              <div className="form-check">
                <input
                  id="featured"
                  type="checkbox"
                  className="form-check-input"
                  checked={featured}
                  onChange={(e) => setFeatured(e.target.checked)}
                />
                <label htmlFor="featured" className="form-check-label">
                  Featured
                </label>
              </div>
            </div>
          </div>

          <div className="d-flex justify-content-end gap-2 mt-4">
            <button type="submit" className="btn btn-primary">
              {isEditMode ? "Update Product" : "Save Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateProductForm;
