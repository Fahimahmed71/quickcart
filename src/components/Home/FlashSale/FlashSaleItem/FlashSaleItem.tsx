// @ts-nocheck
import { Link, useNavigate } from "react-router-dom";
import useItems from "../../../../hooks/UseItems";

const FlashSaleItem = () => {
  const [flashItems] = useItems();

  const navigation = useNavigate();

  const handleBtnId = (e) => {
    navigation(`/product/${e}`);
  };

  return (
    <section className="mt-10 grid sm:grid-cols-6 gap-5 grid-cols-2 px-5 ">
      {flashItems.slice(14, 20).map((flashItem) => (
        <div
          className="relative block overflow-hidden group"
          key={flashItem._id}
        >
          <img
            src={flashItem.image}
            alt=""
            className="object-contain w-full transition duration-500 group-hover:scale-105 "
          />

          <div className="relative p-6 bg-white border border-gray-100">
            <h3 className="mt-4 text-lg font-medium truncate text-gray-900">
              {flashItem.title}
            </h3>

            <p className="mt-1.5 text-sm text-gray-700">৳ {flashItem.price}</p>
            <h1 className="mt-1.5 text-sm text-gray-700">
              Review: {flashItem?.review?.length}
            </h1>

            <div className="mt-4" onClick={() => handleBtnId(flashItem._id)}>
              <button className="block w-full p-4 text-sm font-medium transition bg-yellow-400 rounded hover:scale-105">
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default FlashSaleItem;
