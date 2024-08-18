import { Link } from "react-router-dom";
import HeartIcon from "./HeartIcon";

const SmallProduct = ({ product }) => {
  const base_url = "data:image/jpeg;base64,";
  return (
    <div className="w-[16rem] m-[1rem] p-3 border rounded-lg">
      <div className="relative">
        <div>
          <img
            src={base_url + product.image}
            alt={product.name}
            className="h-[180px] w-full rounded"
          />
        </div>
        <HeartIcon product={product} />
      </div>

      <div className="p-4">
        <Link to={`/product/${product._id}`}>
          <h2 className="flex justify-between items-center">
            <div>{product.name}</div>
            <span className="bg-orange-100 text-orange-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-orange-900 dark:text-orange-300">
              ${product.price}
            </span>
          </h2>
        </Link>
      </div>
    </div>
  );
};

export default SmallProduct;
