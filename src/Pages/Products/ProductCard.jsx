import { Link } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { addToCart } from "../../Redux/features/cart/cartSlice";
import { toast } from "react-toastify";
import HeartIcon from "./HeartIcon";

const ProductCard = ({ p }) => {
  const base_url = "data:image/jpeg;base64,";

  const dispatch = useDispatch();

  const addToCartHandler = (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
    toast.success("Item added successfully");
  };

  return (
    <div className="max-w-sm border border-gray-400 relative rounded-lg shaodw">
      <section className="relative">
        <Link to={`/product/${p._id}`}>
          <span className="absolute bottom-3 right-3 bg-lime-100 text-lime-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-lime-900 dark:text-lime-100">{p?.brand}</span>
          <img className="rounded-t-lg cursor-pointer w-full" src={base_url+p.image} alt={p.name} style={{ height: "290px", objectFit: "container" }} />
        </Link>
        <HeartIcon product={p} />
      </section>

      <div className="p-5">
        <div className="flex justify-between">
          <h5 className="mb-2 text-xl">{p?.name}</h5>

          <p className="font-semibold">{p?.price?.toLocaleString("en-US", { style: "currency", currency: "USD", })}</p>
        </div>

        <p className="mb-3 font-normal text-[gray]">{p?.description?.substring(0, 60)} ...</p>

        <section className="flex justify-between items-center">
          <Link to={`/product/${p._id}`} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-sky-700 rounded-lg hover:bg-sky-800 focus:ring-4 focus:outline-none focus:ring-sky-300 dark:bg-sky-600 dark:hover:bg-sky-700 dark:focus:ring-sky-800">
            Read More
            <svg className="w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 5h12m0 0L9 1m4 4L9 9" />
            </svg>
          </Link>

          <button className="p-2 rounded-full" onClick={() => addToCartHandler(p, 1)}>
            <AiOutlineShoppingCart size={25} />
          </button>
        </section>
      </div>
    </div>
  );
};

export default ProductCard;
