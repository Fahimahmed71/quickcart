// @ts-nocheck
import { useNavigate } from "react-router";
import flashImage from "../../../../assets/flashSale image.png";
import useItems from "../../../../hooks/UseItems";

const FlashItemShowMore = () => {
  const [flashItems] = useItems();

  const navigation = useNavigate();

  const handleBtnId = (e) => {
    navigation(`/product/${e}`);
  };

  return (
    <section>
      <img className="h-60 object-cover min-w-full" src={flashImage} alt="" />

      <dl className="mt-10 grid sm:grid-cols-6 grid-cols-2 px-5 gap-5">
        {flashItems.slice(14, 30).map((flashItem) => (
          <div className="card bg-base-100 shadow-xl" key={flashItem._id}>
            <figure>
              <img
                className="object-cover w-full transition duration-500 hover:scale-105 "
                src={flashItem.image}
                alt=""
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title truncate">{flashItem.title}</h2>
              <h1>৳ {flashItem.price}</h1>
              <h1>Review: {flashItem?.review.length}</h1>
              <div
                className="card-actions justify-center"
                onClick={() => handleBtnId(flashItem._id)}
              >
                <button className="btn btn-primary text-white">
                  Add to cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </dl>
    </section>
  );
};

export default FlashItemShowMore;
