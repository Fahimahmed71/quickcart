// @ts-nocheck
import axios from "axios";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import auth from "../../firebase.init";
import useProducts from "../../hooks/UseProduct";
import Review from "../Review/Review";

const ProductsDetails = () => {
  const { id } = useParams();
  const [user, loading, error] = useAuthState(auth);

  const [product] = useProducts(id);
  const [count, setCount] = useState(1);

  const handlePlus = () => {
    setCount(count + 1);
    if (count === 10) {
      setCount(count - 1);
    }
  };

  const handleMinus = () => {
    setCount(count - 1);

    if (count === 1) {
      setCount(count);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(
        "https://quickcart-server-j0uqodjgg-fahimahmed.vercel.app/cart",
        {
          // @ts-ignore
          id: product._id,
          products: product,
          quantity: count,
          email: user?.email,
        },
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        if (res.data.success === true) {
          toast.success("Cart added", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        } else {
          toast.error("Product already exist", {
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
      })
      .catch((err) => console.log(err));
  };

  return (
    <section>
      <section>
        <div className="relative mx-auto max-w-screen-xl px-4 py-8">
          <div>
            <h1 className="text-2xl font-bold lg:text-3xl">{product.title}</h1>

            <p className="mt-1 text-sm text-gray-500">SKU: #{product._id}</p>
          </div>

          <div className="grid gap-8 lg:grid-cols-4 justify-center lg:items-start">
            <div className="lg:col-span-1"></div>
            <div className="lg:col-span-1">
              <div className="relative mt-4">
                <img
                  alt=""
                  src={product.image}
                  className="h-72 w-full rounded-xl object-cover lg:h-60"
                />
              </div>
            </div>

            <div className="lg:sticky lg:top-1/2">
              <form onSubmit={handleSubmit} className="space-y-4 lg:pt-8">
                <div>
                  <p className="text-xl font-bold">৳ {product.price}</p>
                </div>

                <div className="flex justify-between">
                  <h1>Quantity</h1>

                  <div className="flex items-center gap-2">
                    <AiOutlinePlusCircle
                      onClick={handlePlus}
                      className="cursor-pointer hover:text-green-600"
                    />

                    <h1>{count}</h1>
                    <AiOutlineMinusCircle
                      onClick={handleMinus}
                      className="cursor-pointer  hover:text-green-600"
                    />
                  </div>
                </div>

                {user ? (
                  <button
                    type="submit"
                    className="w-full rounded text-center bg-yellow-400 px-6 py-3 text-sm font-bold uppercase tracking-wide text-white"
                  >
                    Add to cart
                  </button>
                ) : (
                  <Link
                    to="/login"
                    className="btn-success btn text-white w-full"
                  >
                    Login
                  </Link>
                )}
              </form>
            </div>
          </div>
          {/* comment section */}
          <section className="mt-20">
            <h1 className="text-black/50 font-semibold text-5xl">Review</h1>
          </section>

          {user ? (
            <Review id={id} />
          ) : (
            <h1 className="text-center text-3xl mt-10 text-black/40">
              Please{" "}
              <span>
                <Link
                  to="/login"
                  className="bg-success text-white px-4 py-1 rounded-lg"
                >
                  Login
                </Link>
              </span>
            </h1>
          )}
        </div>
      </section>
    </section>
  );
};

export default ProductsDetails;
