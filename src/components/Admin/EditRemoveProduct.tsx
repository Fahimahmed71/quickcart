// @ts-nocheck
import axios from "axios";
import { useRef, useState } from "react";
import { FiEdit } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";
import { toast } from "react-toastify";
import useItems from "../../hooks/UseItems";
import Loading from "../Shared/Loading/Loading";

const EditRemoveProduct = () => {
  const [flashItems, isLoading] = useItems();
  const [edit, setEdit] = useState([]);

  const filteredData = flashItems.filter(
    (item, index) =>
      flashItems.map((i) => i?.title).indexOf(item?.title) === index
  );

  const handleDelete = (id) => {
    const deleteProduct = window.confirm();

    if (deleteProduct) {
      axios
        .delete(
          `https://quickcart-server-j0uqodjgg-fahimahmed.vercel.app/products/${id}`
        )
        .then((res) => {
          if (res.data) {
            toast.error("Deleted 🚮", {
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
    }
  };

  type nameRef = string;
  type priceRef = string;

  const nameRef = useRef<HTMLInputElement>(null);
  const priceRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    const title = nameRef.current.value;
    const price = priceRef.current.value;

    axios
      .patch(
        `https://quickcart-server-j0uqodjgg-fahimahmed.vercel.app/products/${edit?._id}`,
        {
          title: title,
          price: price,
        }
      )
      .then((res) => {
        if (res.data) {
          toast.success("Data updated", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
          e.target.reset();
        }
      })
      .catch((err) => console.log(err));
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <section className="container mx-auto">
      <h1 className="text-4xl font-semibold text-black/30 uppercase text-center">
        Edit <span className="text-red-500">{filteredData.length} </span>{" "}
        Products
      </h1>

      <dl className="mt-10">
        <div className="overflow-x-auto">
          <table className="table table-compact w-full">
            <thead>
              <tr>
                <th></th>
                <th>Image</th>
                <th>Product Name</th>
                <th>Price</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((items, index) => (
                <tr key={items?._id}>
                  <th>{index + 1}</th>
                  <div className="avatar">
                    <div className="mask mask-squircle w-12 h-12">
                      <img src={items.image} alt="img" />
                    </div>
                  </div>
                  <td>
                    <p className=" w-24 truncate"> {items.title}</p>
                  </td>
                  <td>৳ {items.price}</td>
                  <td>
                    {/* The button to open modal */}
                    <label onClick={() => setEdit(items)} htmlFor="edit">
                      <FiEdit className="text-xl hover:cursor-pointer hover:text-green-600" />
                    </label>
                  </td>
                  <td>
                    <MdDeleteOutline
                      onClick={() => handleDelete(items._id)}
                      className="text-xl hover:cursor-pointer hover:text-red-600"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </dl>

      {/* Put this part before </body> tag */}
      <input type="checkbox" id="edit" className="modal-toggle" />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box relative">
          <label
            htmlFor="edit"
            className="btn btn-sm btn-error btn-circle absolute right-2 top-2 text-white"
          >
            ✕
          </label>
          <h1 className="text-2xl font-semibold text-black/40">Edit</h1>

          <h1 className="text-2xl font-semibold truncate text-black/70">
            {edit.title}
          </h1>

          {/* form */}
          <form onSubmit={handleSubmit}>
            {/* product name */}
            <div className="form-control w-full ">
              <label className="label">
                <span className="label-text">Product Name</span>
              </label>
              <input
                ref={nameRef}
                required
                type="text"
                placeholder="Product Name"
                className="input input-bordered w-full"
              />
            </div>

            {/* price */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Product Price</span>
              </label>
              <input
                ref={priceRef}
                required
                type="text"
                placeholder="Product Price"
                className="input input-bordered w-full"
              />
            </div>

            <button className="mt-3 w-full bg-success py-3 text-white text-xl rounded-lg">
              Submit
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default EditRemoveProduct;
