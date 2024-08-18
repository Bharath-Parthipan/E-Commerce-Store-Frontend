import Message from "../../Components/Message";
import Loader from "../../Components/Loader";
import { Link } from "react-router-dom";
import { useGetOrdersQuery } from "../../Redux/api/orderApiSlice";
import AdminMenu from "./AdminMenu";

const OrderList = () => {
    const { data: orders, isLoading, error } = useGetOrdersQuery();
    const base_url = "data:image/jpeg;base64,";

    return (
      <>
        <div className="pl-[5rem]">
          {isLoading ? (
            <Loader />
          ) : error ? (
            <Message variant="danger">
              {error?.data?.message || error.error}
            </Message>
          ) : (
            <table className=" w-[85%] border border-[gray]">
              <AdminMenu />
              <thead className="bg-indigo-900">
                <tr className="mb-[5rem]">
                  <th className="text-center text-white border border-[gray]">ITEMS</th>
                  <th className="text-center text-white border border-[gray]">ID</th>
                  <th className="text-center text-white border border-[gray]">USER</th>
                  <th className="text-center text-white border border-[gray]">DATA</th>
                  <th className="text-center text-white border border-[gray]">TOTAL</th>
                  <th className="text-center text-white border border-[gray]">PAID</th>
                  <th className="text-center text-white border border-[gray]">
                    DELIVERED
                  </th>
                  <th className="text-center border border-[gray]">MORE</th>
                </tr>
              </thead>

              <tbody className="bg-indigo-100">
                {orders.map((order) => (
                  <tr key={order._id}>
                    <td className="border border-[gray] flex justify-center">
                      <img
                        src={base_url+order.orderItems[0].image}
                        alt={order._id}
                        className="w-[5rem] pt-4"
                      />
                    </td>
                    <td className="border border-[gray] text-center">
                      {order._id}
                    </td>

                    <td className="border border-[gray] text-center">
                      {order.user ? order.user.username : "N/A"}
                    </td>

                    <td className="border border-[gray] text-center">
                      {order.createdAt
                        ? order.createdAt.substring(0, 10)
                        : "N/A"}
                    </td>

                    <td className="border border-[gray] text-center">
                      $ {order.totalPrice}
                    </td>

                    <td className="border border-[gray]">
                      <div className="flex justify-center">
                        {order.isPaid ? (
                          <p className="p-1 text-center bg-green-400 w-[6rem] rounded-full text-white border">
                            Completed
                          </p>
                        ) : (
                          <p className="p-1 text-center bg-red-400 w-[6rem] rounded-full text-white border">
                            Pending
                          </p>
                        )}
                      </div>
                    </td>

                    <td className="border border-[gray]">
                      <div className="flex justify-center">
                        {order.isDelivered ? (
                          <p className="p-1 text-center bg-green-400 w-[6rem] rounded-full text-white border">
                            Completed
                          </p>
                        ) : (
                          <p className="p-1 text-center bg-red-400 w-[6rem] rounded-full text-white border">
                            Pending
                          </p>
                        )}
                      </div>
                    </td>

                    <td className="border border-[gray]">
                      <Link
                        to={`/order/${order._id}`}
                        className="flex justify-center"
                      >
                        <button className="py-1 px-5 border rounded-full bg-lime-400 text-white">
                          More
                        </button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </>
    );
};

export default OrderList;
