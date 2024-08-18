import Message from "../../Components/Message";
import Loader from "../../Components/Loader";
import { Link } from "react-router-dom";
import { useGetMyOrdersQuery } from "../../Redux/api/orderApiSlice";

const UserOrder = () => {
    const { data: orders, isLoading, error } = useGetMyOrdersQuery();
    const base_url = "data:image/jpeg;base64,";

    return (
        <div className="container pl-[5rem]">
            <h2 className="text-2xl font-semibold mb-4">My Orders </h2>

            {isLoading ? (
                <Loader />
            ) : error ? (
                <Message variant="danger">{error?.data?.error || error.error}</Message>
            ) : (
                <table className="w-[90%] border border-[gray]">
                    <thead>
                        <tr>
                            <td className="py-2 border border-[gray] text-center bg-indigo-900 text-white">IMAGE</td>
                            <td className="py-2 border border-[gray] text-center bg-indigo-900 text-white">ID</td>
                            <td className="py-2 border border-[gray] text-center bg-indigo-900 text-white">DATE</td>
                            <td className="py-2 border border-[gray] text-center bg-indigo-900 text-white">TOTAL</td>
                            <td className="py-2 border border-[gray] text-center bg-indigo-900 text-white">PAID</td>
                            <td className="py-2 border border-[gray] text-center bg-indigo-900 text-white">DELIVERED</td>
                            <td className="py-2 border border-[gray] text-center bg-indigo-900 text-white">VIEW</td>
                        </tr>
                    </thead>

                    <tbody className="bg-indigo-50">
                        {orders.map((order) => (
                            <tr key={order._id} >
                                <td className="py-2 text-center border border-[gray] flex justify-center">
                                    <img src={base_url+order.orderItems[0].image} alt={order.user} className="w-[6rem]" />
                                </td>

                                <td className="py-2 text-center border border-[gray]">{order._id}</td>
                                <td className="py-2 text-center border border-[gray]">{order.createdAt.substring(0, 10)}</td>
                                <td className="py-2 text-center border border-[gray]">$ {order.totalPrice}</td>

                                <td className="py-2 border border-[gray]">
                                    <div className="flex justify-center">
                                    {order.isPaid ? (
                                        <p className="p-1 text-center bg-green-400 w-[6rem] rounded-full">
                                            Completed
                                        </p>
                                    ) : (
                                        <p className="p-1 text-center bg-red-400 w-[6rem] rounded-full">
                                            Pending
                                        </p>
                                    )}
                                    </div>
                                </td>

                                <td className="py-2 border border-[gray]">
                                    <div className="flex justify-center">
                                    {order.isDelivered ? (
                                        <p className="p-1 text-center bg-green-400 w-[6rem] rounded-full">
                                            Completed
                                        </p>
                                    ) : (
                                        <p className="p-1 text-center bg-red-400 w-[6rem] rounded-full">
                                            Pending
                                        </p>
                                    )}
                                    </div>
                                </td>

                                <td className="py-2 border border-[gray]">
                                    <Link to={`/order/${order._id}`}  className="flex justify-center">
                                        <button className="bg-pink-400 text-back py-2 px-3 rounded">
                                            View Details
                                        </button>
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default UserOrder;
