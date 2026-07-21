import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import type { AppDispatch, RootState } from "../../../app/api/store";
import { handleAddItemToCart } from "../shared/cart/cartSlice";
import { useTranslation } from "react-i18next";
type ProductCardProps = {
  id: number;
  slug: string;
  title: string;
  price: number;

  image: string;
};

function ProductCard({
  id,
  title,
  slug,
  price,

  image,
}: ProductCardProps) {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { t } = useTranslation("product");
  const { accessToken } = useSelector((state: RootState) => state.auth);
  const { addingProductId } = useSelector(
    (state: RootState) => state.cartSliceReducer,
  );

  const isAdding = addingProductId === id;

  const handleAddToCart = async () => {
    if (!accessToken) {
      navigate("/login");
      return;
    }

    try {
      await dispatch(
        handleAddItemToCart({
          productId: id,
          quantity: 1,
        }),
      ).unwrap();

      toast.success(`${title} added to cart`);
    } catch (error) {
      toast.error(String(error));
    }
  };

  return (
    <div className="card glass-card product-card h-100 border-0 shadow-sm overflow-hidden">
      <Link to={`/products/${slug}`}>
        <img
          src={image}
          alt={title}
          className="card-img-top product-card-img"
        />
      </Link>

      <div className="card-body d-flex flex-column">
        <Link to={`/products/${slug}`} className="text-decoration-none">
          <h5 className="card-title product-card-title fw-bold">{title}</h5>
        </Link>

        <p className="text-muted mb-4">${price}</p>

        <div className="d-flex gap-2 mt-auto">
          <button
            className="btn btn-dark w-100"
            onClick={handleAddToCart}
            disabled={isAdding}
          >
            {isAdding ? t("card.adding") : t("card.addToCart")}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
