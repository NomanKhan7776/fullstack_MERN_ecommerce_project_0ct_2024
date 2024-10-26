import { useState } from "react";
import axios from "axios";
import { backendUrl, currency } from "../config/config";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";
const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);

  const loadOrders = async () => {
    try {
      if (!token) return null;
      const response = await axios.post(
        `${backendUrl}/api/order/list`,
        {},
        { headers: { token } }
      );
      if (response.data.success) {
        setOrders(response.data.orders.reverse());
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  const handleStatus = async (e, orderId) => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/order/status`,
        {
          orderId,
          status: e.target.value,
        },
        { headers: { token } }
      );
      if (response.data.success) {
        await loadOrders();
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  useEffect(() => {
    loadOrders();
  }, [token]);

  return (
    <div>
      <h3>Order Page</h3>
      <div className="">
        {orders.map((order) => (
          <div
            className="grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border-2 border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700"
            key={order._id}
          >
            <img className="w-12" src={assets.parcel_icon} alt="" />
            <div>
              <div>
                {order.items.map((item, index) => {
                  if (index === order.items.length - 1) {
                    return (
                      <p className="py-0.5" key={item._id}>
                        {" "}
                        {item.name} x {item.quantity} <span>{item.size}</span>
                      </p>
                    );
                  } else {
                    return (
                      <p className="py-0.5" key={item._id}>
                        {" "}
                        {item.name} x {item.quantity} <span>{item.size}</span> ,
                      </p>
                    );
                  }
                })}
              </div>
              <p className="mt-3 mb-2 font-medium">
                {order.address.firstname} {order.address.lastname}
              </p>
              <div>
                <p>{order.address.street + ","}</p>
                <p>
                  {order.address.city +
                    ", " +
                    order.address.state +
                    ", " +
                    order.address.country +
                    ", " +
                    order.address.zipcode}
                </p>
              </div>
              <p>{order.address.phone}</p>
            </div>
            <div>
              <p className="text-sm sm:text-[15px]">
                Items: {order.items.length}
              </p>
              <p className="mt-3">Method: {order.paymentMethod}</p>
              <p>Payment: {order.payment ? "Done" : "Pending"}</p>
              <p>Date: {new Date(order.date).toLocaleDateString()}</p>
            </div>
            <p className="text-sm sm:text-[15px]">
              {currency}
              {order.amount}
            </p>
            <select
              onChange={(e) => handleStatus(e, order._id)}
              value={order.status}
              className="p-2 font-semibold"
            >
              <option value="Order Placed">Order Placed</option>
              <option value="Packing">Packing</option>
              <option value="Shipped">Shipped</option>
              <option value="Out for delivery">Out for delivery</option>
              <option value="Delivered">Delivered</option>
              <option value="Order Rejected">Order Rejected</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
