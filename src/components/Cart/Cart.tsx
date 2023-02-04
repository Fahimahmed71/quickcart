// @ts-nocheck
import useCart from "../../hooks/UseCart";
import { MdRemoveShoppingCart } from "react-icons/md";
import axios from "axios";
import auth from "../../firebase.init";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRef } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

const Cart = () => {
  const [user, loading, error] = useAuthState(auth);
  const [cartItem] = useCart(user);

  const handleDelete = (id) => {
    const confirm = window.confirm("Are you sure?");

    const url = `https://quickcart-server-j0uqodjgg-fahimahmed.vercel.app/cart/${id}`;

    if (confirm) {
      axios
        .delete(url, {
          headers: {
            authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            "Content-Type": "application/json",
          },
        })
        .then((res) => res.data);
    }
  };

  let totalCost = 0;

  for (const loop of cartItem) {
    const price = loop.products.price;
    const quantity = loop.quantity;

    const total = parseInt(price) * parseInt(quantity);

    totalCost += total;
  }

  const totalAmount = totalCost;

  type nameRef = String;
  type phoneRef = Number;
  type addressRef = String;
  type emailRef = String;
  type cityRef = String;

  const nameRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const addressRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const cityRef = useRef<HTMLInputElement>(null);

  const navigation = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const name = nameRef.current.value;
    const phone = phoneRef.current.value;
    const address = addressRef.current.value;
    const email = emailRef.current.value;
    const city = cityRef.current.value;

    axios
      .post(
        "https://quickcart-server-j0uqodjgg-fahimahmed.vercel.app/order",
        {
          name: name,
          phone: phone,
          address: address,
          email: email,
          city: city,
          cart: cartItem,
        },
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then(async (res) => {
        if (res.data) {
          await axios
            .delete(
              "https://quickcart-server-j0uqodjgg-fahimahmed.vercel.app/cart",
              {
                headers: {
                  authorization: `Bearer ${localStorage.getItem(
                    "accessToken"
                  )}`,
                  "Content-Type": "application/json",
                },
              }
            )
            .then((res) => res.data);

          await toast.info(`${name} orders will be arrived on ${city}`, {
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

          navigation("/");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <section className="container mx-auto">
      <div className="overflow-x-auto w-full h-[80vh]">
        <table className="table w-full">
          {/* <!-- head --> */}
          <thead>
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Price</th>
              <th>Quantity</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {/* <!-- row --> */}
            {cartItem.map((product) => (
              <tr key={product._id}>
                <td>
                  <div className="avatar">
                    <div className="mask mask-square w-12 h-12">
                      <img
                        src={product?.products?.image}
                        alt="Avatar Tailwind CSS Component"
                      />
                    </div>
                  </div>
                </td>
                <td>
                  <h1 className="truncate w-40">{product?.products?.title}</h1>
                </td>
                <td>
                  <h1>৳ {product?.products?.price}</h1>
                </td>
                <td>
                  <h1>{product?.quantity}</h1>
                </td>
                <th>
                  <button
                    onClick={() => {
                      handleDelete(product._id);
                    }}
                    className="btn btn-ghost hover:btn-error btn-xs"
                  >
                    <MdRemoveShoppingCart className="text-2xl text-red-500" />
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-black/40">
          Total: ৳{totalAmount}
        </h1>

        {/* The button to open modal */}
        {cartItem.length === 0 ? (
          <h1>Cart is empty</h1>
        ) : (
          <label htmlFor="checkout" className="btn btn-primary text-white">
            Checkout
          </label>
        )}

        {/* Put this part before </body> tag */}
        <input type="checkbox" id="checkout" className="modal-toggle" />
        <div className="modal">
          <div className="modal-box relative">
            <label
              htmlFor="checkout"
              className="btn btn-sm btn-error text-white btn-circle absolute right-2 top-2"
            >
              ✕
            </label>

            {/* checkout form */}
            <form onSubmit={handleSubmit}>
              <h1 className="text-black/30 font-bold text-2xl uppercase">
                Checkout
              </h1>

              {/* name */}
              <div className="form-control w-full ">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  ref={nameRef}
                  required
                  type="text"
                  placeholder="Type name"
                  className="input input-bordered w-full"
                />
              </div>

              <dl className="flex gap-3">
                {/* phone */}
                <div className="form-control w-full max-w-xs">
                  <label className="label">
                    <span className="label-text">Phone</span>
                  </label>
                  <input
                    ref={phoneRef}
                    pattern="[0-9]{11}"
                    required
                    type="tel"
                    placeholder="11 digit number"
                    className="input input-bordered w-full max-w-xs"
                  />
                </div>

                {/* email */}
                <div className="form-control w-full max-w-xs">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    required
                    ref={emailRef}
                    value={user?.email}
                    disabled
                    type="email"
                    placeholder="Email"
                    className="input input-bordered w-full max-w-xs"
                  />
                </div>
              </dl>

              <dl className="flex gap-3">
                {/* address */}
                <div className="form-control w-full max-w-xs">
                  <label className="label">
                    <span className="label-text">Address</span>
                  </label>
                  <input
                    required
                    ref={addressRef}
                    type="text"
                    placeholder="Address"
                    className="input input-bordered w-full max-w-xs"
                  />
                </div>

                {/* city */}
                <div className="form-control w-full max-w-xs">
                  <label className="label">
                    <span className="label-text">City</span>
                  </label>
                  <input
                    required
                    ref={cityRef}
                    type="text"
                    placeholder="City"
                    className="input input-bordered w-full max-w-xs"
                  />
                </div>
              </dl>

              <input
                required
                type="submit"
                value={"Buy Now"}
                className="input input-bordered w-full mt-3 bg-primary text-white border-none"
              />
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cart;
