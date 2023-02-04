import axios from "axios";
import { signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router";
import auth from "../firebase.init";

const useCart = () => {
  const [cartItem, setCartItem] = useState([]);
  const [user, loading, error] = useAuthState(auth);

  const navigate = useNavigate();

  useEffect(() => {
    const email = user?.email;

    if (email === undefined) {
      return;
    } else {
      axios(
        `https://quickcart-server-j0uqodjgg-fahimahmed.vercel.app/cart?email=${email}`,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            "Content-Type": "application/json",
          },
        }
      )
        .then((res) => {
          setCartItem(res.data);
        })
        .catch((err) => {
          if (err.response.status === 403 || err.response.status === 401) {
            signOut(auth);
            localStorage.removeItem("accessToken");
            navigate("/");
          }
        });
    }
  }, [cartItem, loading]);

  return [cartItem];
};

export default useCart;
