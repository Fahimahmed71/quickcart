// @ts-nocheck
import axios from "axios";
import { useRef, useState } from "react";
import ReactPaginate from "react-paginate";
import { useQuery } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../../Shared/Loading/Loading";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [pageNum, setPageNum] = useState(0);

  const filteredData = products.filter(
    (item, index) => products.map((i) => i.title).indexOf(item.title) === index
  );

  const searchRef: any = useRef("");

  const handleSearch = (e: any) => {
    e.preventDefault();

    const search = searchRef.current.value;
    const lowerCase = search.toLowerCase();

    setSearchText(lowerCase);
  };

  const { isLoading, refetch } = useQuery(["allproduct", searchText], () =>
    axios("https://quickcart-server-j0uqodjgg-fahimahmed.vercel.app/products")
      .then((res) => {
        const resData = res.data;

        const filterSearch = resData.filter((searchData: any) =>
          searchData.title.toLowerCase().includes(searchText)
        );

        setProducts(filterSearch);
        {
          refetch;
        }
      })
      .catch(console.error)
  );

  const productPerPage = 24;
  const page = pageNum * productPerPage;

  const pageCount = Math.ceil(filteredData.length / productPerPage);

  const changePage = ({ selected }) => {
    setPageNum(selected);
  };

  const navigation = useNavigate();

  const handleBtnId = (e) => {
    navigation(`/product/${e}`);
  };

  if (isLoading) {
    return <Loading />;
  }

  const displayProduct = filteredData
    .slice(page, page + productPerPage)
    .map((product) => {
      return (
        <div className="relative block overflow-hidden group" key={product._id}>
          <img
            src={product.image}
            alt=""
            className="object-cover w-full transition duration-500 group-hover:scale-105 "
          />

          <div className="relative  bg-white border border-gray-100">
            <h3 className="mt-4 text-lg font-medium text-gray-900 truncate">
              {product.title}
            </h3>

            <p className="mt-1.5 text-sm text-gray-700">৳ {product.price}</p>
            <h1 className="mt-1.5 text-sm text-gray-700">
              Review: {product?.review.length}
            </h1>

            <button
              onClick={() => handleBtnId(product._id)}
              className="block w-full p-4 text-sm font-medium transition bg-yellow-400 rounded hover:scale-105 mt-3"
            >
              Add to Cart
            </button>
          </div>
        </div>
      );
    });

  return (
    <section className="px-5 mt-10">
      <h1 className="text-4xl mb-3 text-center sm:text-start text-black/30">
        Products
      </h1>
      <dl>
        <form
          onSubmit={handleSearch}
          className="flex justify-center items-center gap-1"
        >
          <input
            ref={searchRef}
            type="search"
            placeholder="Search product"
            className="input border-none focus:outline-0 focus:ring-1 ring-primary input-primary w-full max-w-xs"
          />
          <button className="btn btn-primary text-white">Search</button>
        </form>

        <dt className="grid sm:grid-cols-6 grid-cols-2 gap-5 mt-10">
          {displayProduct}
        </dt>
      </dl>
      <ReactPaginate
        pageCount={pageCount}
        previousLabel={<AiOutlineArrowLeft />}
        nextLabel={<AiOutlineArrowRight />}
        onPageChange={changePage}
        activeLinkClassName="text-yellow-300 p-2 rounded-full"
        className="flex lg:gap-5 gap-2 items-center justify-center mt-10 bg-primary rounded py-3 text-white"
      />
    </section>
  );
};

export default AllProducts;
