import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { getImageUrl } from "../../../utils/imageHelper";

type ProductImage = {
  id?: number;
  imageUrl: string;
  sortOrder: number;
};

type ProductGalleryProps = {
  mainImageUrl: string;
  images: ProductImage[];
};

function ProductGallery({ mainImageUrl, images }: ProductGalleryProps) {
  const { t } = useTranslation("product");

  const [selectedImage, setSelectedImage] = useState(mainImageUrl);

  useEffect(() => {
    setSelectedImage(mainImageUrl);
  }, [mainImageUrl]);

  const galleryImages = [
    {
      imageUrl: mainImageUrl,
      sortOrder: -1,
    },
    ...images,
  ];

  return (
    <div className="product-gallery">
      <div className="product-main-image-card">
        <img
          src={getImageUrl(selectedImage)}
          alt={t("detail.productImageAlt")}
          className="product-main-image"
        />
      </div>

      <div className="product-thumbnails">
        {galleryImages.map((image, index) => (
          <button
            key={`${image.imageUrl}-${index}`}
            type="button"
            className={`product-thumbnail ${
              selectedImage === image.imageUrl ? "active" : ""
            }`}
            onClick={() => setSelectedImage(image.imageUrl)}
          >
            <img
              src={getImageUrl(image.imageUrl)}
              alt={t("detail.thumbnailAlt")}
            />
          </button>
        ))}
      </div>
    </div>
  );
}

export default ProductGallery;
