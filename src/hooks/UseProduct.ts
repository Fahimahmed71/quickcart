import axios from "axios";
import { useEffect, useState } from "react";

const useProducts = (id: any) => {
  const [product, setProduct] = useState([]);

  useEffect(() => {
    axios(
      `https://quickcart-server-j0uqodjgg-fahimahmed.vercel.app/products/${id}`
    )
      .then((res) => {
        setProduct(res.data);
      })
      .catch(console.error);
  }, [product]);
  return [product];
};

export default useProducts;
