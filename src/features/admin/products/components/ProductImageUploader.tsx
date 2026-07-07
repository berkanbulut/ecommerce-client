const API_BASE_URL = "http://localhost:8080";

function getImageUrl(url: string) {
  if (!url) return "";

  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }

  if (url.startsWith("/")) {
    return `${API_BASE_URL}${url}`;
  }

  return `${API_BASE_URL}/${url}`;
}

type ProductImageUploaderProps = {
  mainImage: File | null;
  setMainImage: React.Dispatch<React.SetStateAction<File | null>>;

  galleryImages: File[];
  setGalleryImages: React.Dispatch<React.SetStateAction<File[]>>;

  existingMainImageUrl?: string;
  setExistingMainImageUrl?: React.Dispatch<React.SetStateAction<string>>;

  existingGalleryUrls?: string[];
  setExistingGalleryUrls?: React.Dispatch<React.SetStateAction<string[]>>;
};

function ProductImageUploader({
  mainImage,
  setMainImage,
  galleryImages,
  setGalleryImages,
  existingMainImageUrl = "",
  setExistingMainImageUrl,
  existingGalleryUrls = [],
  setExistingGalleryUrls,
}: ProductImageUploaderProps) {
  const handleMainImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setMainImage(file);
  };

  const handleGalleryImagesChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const selectedFiles = Array.from(e.target.files || []);

    if (selectedFiles.length === 0) return;

    setGalleryImages((prev) => [...prev, ...selectedFiles]);
  };

  const handleRemoveGalleryImage = (index: number) => {
    setGalleryImages((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div>
      {/* MAIN IMAGE */}
      <div className="mb-4">
        <label className="form-label fw-semibold">Main Image</label>

        <input
          type="file"
          className="form-control"
          accept="image/*"
          onChange={handleMainImageChange}
        />

        <small className="text-muted">
          This image will be shown as the primary product image.
        </small>

        {/* EXISTING MAIN IMAGE */}
        {existingMainImageUrl && !mainImage && (
          <div
            className="border rounded p-3 mt-3 bg-light"
            style={{ maxWidth: "420px" }}
          >
            <div className="d-flex justify-content-between align-items-center mb-2">
              <span className="badge bg-primary">Current Main Image</span>

              <button
                type="button"
                className="btn btn-outline-danger btn-sm"
                onClick={() => setExistingMainImageUrl?.("")}
              >
                Remove
              </button>
            </div>

            <img
              src={getImageUrl(existingMainImageUrl)}
              alt="Current main"
              className="img-fluid rounded w-100"
              style={{
                height: "220px",
                objectFit: "cover",
              }}
            />
          </div>
        )}

        {/* NEW MAIN IMAGE */}
        {mainImage && (
          <div
            className="border rounded p-3 mt-3 bg-light"
            style={{ maxWidth: "420px" }}
          >
            <div className="d-flex justify-content-between align-items-center mb-2">
              <span className="badge bg-success">New Main Image</span>

              <button
                type="button"
                className="btn btn-outline-danger btn-sm"
                onClick={() => setMainImage(null)}
              >
                Remove
              </button>
            </div>

            <img
              src={URL.createObjectURL(mainImage)}
              alt={mainImage.name}
              className="img-fluid rounded w-100"
              style={{
                height: "220px",
                objectFit: "cover",
              }}
            />
          </div>
        )}
      </div>

      {/* GALLERY */}
      <div>
        <label className="form-label fw-semibold">Gallery Images</label>

        <input
          type="file"
          className="form-control"
          multiple
          accept="image/*"
          onChange={handleGalleryImagesChange}
        />

        <small className="text-muted">
          These images will be shown in product detail gallery.
        </small>

        {/* EXISTING GALLERY */}
        {existingGalleryUrls.length > 0 && (
          <>
            <h6 className="fw-bold mt-3">Current Gallery</h6>

            <div className="row g-3 mt-1">
              {existingGalleryUrls.map((url, index) => (
                <div className="col-md-3" key={url}>
                  <div className="border rounded p-2 h-100">
                    <img
                      src={getImageUrl(url)}
                      alt="Existing gallery"
                      className="img-fluid rounded mb-2"
                      style={{
                        height: "120px",
                        width: "100%",
                        objectFit: "cover",
                      }}
                    />

                    <button
                      type="button"
                      className="btn btn-outline-danger btn-sm w-100"
                      onClick={() =>
                        setExistingGalleryUrls?.((prev) =>
                          prev.filter((_, i) => i !== index),
                        )
                      }
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* NEW GALLERY */}
        {galleryImages.length > 0 && (
          <>
            <h6 className="fw-bold mt-3">New Gallery</h6>

            <div className="row g-3 mt-1">
              {galleryImages.map((image, index) => (
                <div className="col-md-3" key={`${image.name}-${index}`}>
                  <div className="border rounded p-2 h-100">
                    <img
                      src={URL.createObjectURL(image)}
                      alt={image.name}
                      className="img-fluid rounded mb-2"
                      style={{
                        height: "120px",
                        width: "100%",
                        objectFit: "cover",
                      }}
                    />

                    <button
                      type="button"
                      className="btn btn-outline-danger btn-sm w-100"
                      onClick={() => handleRemoveGalleryImage(index)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default ProductImageUploader;
