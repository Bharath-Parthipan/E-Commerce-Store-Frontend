import { Link } from "react-router-dom";
import HeartIcon from "./HeartIcon";

const Product = ({ product }) => {
  const base_url = "data:image/jpeg;base64,";

  return (
    <div className="w-[25rem] m-[1rem] p-3 relative border rounded-xl">
      <div className="relative">
        <div className="flex justify-center">
          <img
            src={base_url + product.image}
            alt={product.name}
            className="w-full h-[280px] object-fill rounded"
          />
        </div>
        <HeartIcon product={product} />
      </div>

      <div className="p-4">
        <Link to={`/product/${product._id}`}>
          <h2 className="flex justify-between items-center">
            <div className="text-lg">{product.name}</div>
            <span className="bg-lime-100 text-lime-400 text-sm font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-lime-500 dark:text-white">
              $ {product.price}
            </span>
          </h2>
        </Link>
      </div>
    </div>
  );
};

export default Product;
