// @ts-nocheck
import axios from "axios";
import { useQuery } from "react-query";
import { useState } from "react";
import Loading from "../Shared/Loading/Loading";
import { toast } from "react-toastify";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  const { isLoading, refetch } = useQuery(["order", orders], () =>
    axios
      .get("https://quickcart-server-j0uqodjgg-fahimahmed.vercel.app/order", {
        headers: {
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setOrders(res.data);
      })
      .catch((err) => console.log(err))
  );

  const handleDeleteOne = (e) => {
    axios
      .delete(
        `https://quickcart-server-j0uqodjgg-fahimahmed.vercel.app/order/${e?._id}`,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        if (res.data) {
          toast.info(`${e?.name} order confirm`, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
          refetch();
        }
      });
  };

  const handleDelete = () => {
    axios
      .delete(
        `https://quickcart-server-j0uqodjgg-fahimahmed.vercel.app/order`,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        if (res.data) {
          toast.info(`All order confirmed`, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
          refetch();
        }
      });
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <section className="">
      <h1 className="text-black/40 text-5xl uppercase font-semibold container px-5 sm:mx-auto">
        Order: <span className="text-red-400">{orders.length}</span>
      </h1>

      <div className="overflow-x-auto mt-3 w-full h-[75vh] container px-5 sm:mx-auto">
        <table className="table table-compact w-full">
          <thead>
            <tr>
              <th></th>
              <th>User Name</th>
              <th>Phone</th>
              <th>Email</th>
              <th>location</th>
              <th>City</th>
              <th>Item</th>
              <th>Confirm order</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={order?._id}>
                <th>{index + 1}</th>
                <td>{order?.name}</td>
                <td>{order?.phone}</td>
                <td>{order?.email}</td>
                <td>{order?.address}</td>
                <td>{order?.city}</td>
                <td>
                  <div className="flex items-center space-x-3">
                    <div>
                      <div className="font-bold">
                        {order?.cart.length} Order
                      </div>
                      {order?.cart?.map((cartItem) => (
                        <h1
                          key={cartItem._id}
                          className="text-sm opacity-50 truncate w-60"
                        >
                          {cartItem?.products?.title}
                        </h1>
                      ))}
                    </div>
                  </div>
                </td>
                <td>
                  <button
                    onClick={() => handleDeleteOne(order)}
                    className="btn btn-success text-white"
                  >
                    Confirm
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button
        disabled={orders.length === 0}
        onClick={handleDelete}
        className="w-full btn-success text-white py-3 text-2xl btn"
      >
        Confirm All
      </button>
    </section>
  );
};

export default Orders;
