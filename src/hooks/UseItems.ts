import axios from "axios";
import { useEffect, useState } from "react";

const useItems = () => {
  const [flashItems, setFlashItem] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    axios("https://quickcart-server-j0uqodjgg-fahimahmed.vercel.app/products")
      .then((res) => {
        setLoading(false);
        setFlashItem(res.data);
      })
      .catch(console.error);
  }, [flashItems]);

  return [flashItems, isLoading];
};
export default useItems;
