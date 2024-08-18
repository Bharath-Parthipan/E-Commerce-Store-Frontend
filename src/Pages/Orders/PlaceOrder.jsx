import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../Components/Message";
import ProgressSteps from "../../Components/ProgressSteps";
import Loader from "../../Components/Loader";
import { useCreateOrderMutation } from "../../Redux/api/orderApiSlice";
import { clearCartItems } from "../../Redux/features/cart/cartSlice";

const PlaceOrder = () => {
  const base_url = "data:image/jpeg;base64,";
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart);

  const [createOrder, { isLoading, error }] = useCreateOrderMutation();

  useEffect(() => {
    if (!cart.shippingAddress.address) {
      navigate("/shipping");
    }
  }, [cart.paymentMethod, cart.shippingAddress.address, navigate]);

  const dispatch = useDispatch();

  const placeOrderHandler = async () => {
    try {
      const res = await createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      }).unwrap();
      dispatch(clearCartItems());
      navigate(`/order/${res._id}`);
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <>
      <ProgressSteps step1 step2 step3 />

      <div className="container mx-auto mt-8 px-20">
        {cart.cartItems.length === 0 ? (
          <Message>Your cart is empty</Message>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border border-gray-400">
              <thead className="bg-indigo-900 text-white">
                <tr>
                  <th className="border text-center border-gray-400 px-1 py-2 align-top">
                    Image
                  </th>
                  <th className="border text-center border-gray-400 px-1 py-2">
                    Product
                  </th>
                  <th className="border text-center border-gray-400 px-1 py-2">
                    Quantity
                  </th>
                  <th className="border text-center border-gray-400 px-1 py-2">
                    Price
                  </th>
                  <th className="border text-center border-gray-400 px-1 py-2">
                    Total
                  </th>
                </tr>
              </thead>

              <tbody className="bg-indigo-50">
                {cart.cartItems.map((item, index) => (
                  <tr key={index}>
                    <td className="p-2 border border-gray-400 flex justify-center">
                      <img
                        src={base_url + item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover"
                      />
                    </td>
                    <td className="p-2 border border-gray-400">
                      <Link to={`/product/${item.product}`}>{item.name}</Link>
                    </td>
                    <td className="p-2 border border-gray-400">{item.qty}</td>
                    <td className="p-2 border border-gray-400">
                      {item.price.toFixed(2)}
                    </td>
                    <td className="p-2 border border-gray-400">
                      $ {(item.qty * item.price).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-5">Order Summary</h2>
          <div className="flex justify-between flex-wrap p-8 bg-lime-100">
            <ul className="text-lg">
              <li>
                <span className="font-semibold mb-4">Items:</span> ${" "}
                {cart.itemsPrice}
              </li>
              <li>
                <span className="font-semibold mb-4">Shipping:</span> ${" "}
                {cart.shippingPrice}
              </li>
              <li>
                <span className="font-semibold mb-4">Tax:</span> ${" "}
                {cart.taxPrice}
              </li>
              <li>
                <span className="font-semibold mb-4">Total:</span> ${" "}
                {cart.totalPrice}
              </li>
            </ul>

            {error && <Message variant="danger">{error.data.message}</Message>}

            <div>
              <h2 className="text-2xl font-semibold mb-4">Shipping</h2>
              <p>
                <strong>Address:</strong> {cart.shippingAddress.address},{" "}
                {cart.shippingAddress.city} {cart.shippingAddress.postalCode},{" "}
                {cart.shippingAddress.country}
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4">Payment Method</h2>
              <strong>Method:</strong> {cart.paymentMethod}
            </div>
          </div>

          <button
            type="button"
            className="bg-[lime] text-white py-2 px-4 rounded-full text-lg w-full mt-4"
            disabled={cart.cartItems === 0}
            onClick={placeOrderHandler}
          >
            Place Order
          </button>
          {isLoading && <Loader />}
        </div>
      </div>
    </>
  );
};

export default PlaceOrder;
