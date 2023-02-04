// @ts-nocheck
import axios from "axios";
import { useEffect, useState } from "react";

const useToken = (user) => {
  const [token, setToken] = useState("");

  useEffect(() => {
    const email = user?.user?.email;

    const currentUser = { email: email };

    if (email) {
      axios
        .put(
          `https://quickcart-server-j0uqodjgg-fahimahmed.vercel.app/user/${email}`,
          {
            email: currentUser,
          }
        )
        .then((res) => {
          const token = res.data.token;

          localStorage.setItem("accessToken", token);

          setToken(token);
        });
    }
  }, [user]);
  return [token];
};

export default useToken;
