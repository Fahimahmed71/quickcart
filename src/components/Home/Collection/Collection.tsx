// @ts-nocheck
import { useNavigate } from "react-router-dom";
import useItems from "../../../hooks/UseItems";

const Collection = () => {
  const [flashItems] = useItems();

  const filteredData = flashItems.filter(
    (item, index) =>
      flashItems.map((i) => i.title).indexOf(item.title) === index
  );

  const navigation = useNavigate();

  const handleBtnId = (id) => {
    navigation(`/product/${id}`);
  };

  return (
    <section className="mt-5 px-5">
      <h1 className="text-4xl mb-3 text-center sm:text-start text-black/30">
        New Arrivals
      </h1>
      <dl className=" flex justify-between flex-col sm:flex-row ">
        {flashItems.slice(flashItems.length - 5).map((product) => (
          <div
            className="relative block overflow-hidden group "
            key={product?._id}
          >
            <img
              src={product?.image}
              alt="image"
              className="object-cover w-full h-64 transition duration-500 group-hover:scale-105 sm:h-72"
            />

            <div className="relative p-6 bg-white border border-gray-100">
              <span className="whitespace-nowrap bg-yellow-400 px-3 py-1.5 text-xs font-medium">
                New
              </span>

              <h3 className="mt-4 text-lg font-medium text-gray-900 truncate w-40">
                {product.title}
              </h3>

              <p className="mt-1.5 text-sm text-gray-700">৳ {product.price}</p>
              <h1 className="mt-1.5 text-sm text-gray-700">
                Review: {product?.review?.length}
              </h1>

              <button
                onClick={() => handleBtnId(product._id)}
                className="block w-full p-4 text-sm font-medium transition bg-yellow-400 rounded hover:scale-105 mt-4"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </dl>
    </section>
  );
};

export default Collection;
