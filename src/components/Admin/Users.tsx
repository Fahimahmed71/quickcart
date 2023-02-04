// @ts-nocheck
import axios from "axios";
import { useQuery } from "react-query";
import { useState } from "react";
import Loading from "../Shared/Loading/Loading";
import { RiDeleteBinLine } from "react-icons/ri";
import { toast } from "react-toastify";

const Users = () => {
  const [users, setUsers] = useState([]);

  const { isLoading, refetch } = useQuery(["user", users], () =>
    axios("https://quickcart-server-j0uqodjgg-fahimahmed.vercel.app/user", {
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
  );

  const handleAdmin = (e: string) => {
    axios
      .put(
        `https://quickcart-server-j0uqodjgg-fahimahmed.vercel.app/user/admin/${e}`
      )
      .then((res) => {
        if (res.data) {
          toast.info(`${e} is admin`, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        }
        refetch();
      })
      .catch((err) => {
        if (err?.request.status) {
          toast.error("Failed to make an admin", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        }
      });
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <section className="container px-5 sm:mx-auto">
      <h1 className="text-black/40 text-5xl uppercase font-semibold">
        Users: <span className="text-red-400">{users.length}</span>
      </h1>

      <div className="overflow-x-auto mt-5">
        <table className="table w-full">
          {/* <!-- head --> */}
          <thead>
            <tr>
              <th></th>
              <th>Email</th>
              <th>Admin</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {/* <!-- row --> */}
            {users.map((user, index) => (
              <tr key={user._id}>
                <th>{index + 1}</th>
                <td>{user?.email}</td>
                <td>
                  {user?.role !== "admin" && (
                    <button
                      onClick={() => handleAdmin(user?.email)}
                      className="btn btn-sm btn-success text-white"
                    >
                      Admin
                    </button>
                  )}
                </td>
                <td>
                  <RiDeleteBinLine className="text-2xl hover:text-red-600 cursor-pointer" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default Users;
