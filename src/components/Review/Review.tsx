import axios from "axios";
import { useRef } from "react";
import { toast } from "react-toastify";
import useProducts from "../../hooks/UseProduct";

const Review = ({ id }: any) => {
  const [product] = useProducts(id);

  type refReview = String;
  const refReview = useRef<HTMLInputElement>(null);

  // @ts-ignore
  const handleSubmit = (e) => {
    e.preventDefault();

    // @ts-ignore
    const review = refReview.current.value;

    axios
      .post(
        `https://quickcart-server-j0uqodjgg-fahimahmed.vercel.app/products/${id}`,
        {
          review: review,
        }
      )
      .then((res) => {
        if (res.data) {
          toast.success("⭐ Thanks for your review", {
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
      });
  };

  // @ts-ignore
  const reviews = product?.review;

  if (reviews === undefined) {
    return;
  }

  return (
    <section className="mt-5">
      <form onSubmit={handleSubmit}>
        <textarea
          required
          spellCheck
          // @ts-ignore
          ref={refReview}
          className="textarea w-full"
          placeholder="Write a review"
        />
        <button className="w-full btn btn-success text-white text-xl">
          Submit
        </button>
      </form>

      {reviews.map((review: any, index: any) => (
        <div key={index} className="card w-full bg-base-100 shadow-xl mt-5">
          <div className="card-body">
            <p>{review}</p>
          </div>
        </div>
      ))}
    </section>
  );
};

export default Review;
