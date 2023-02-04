import axios from "axios";
import { useEffect, useState } from "react";

const useAdmin = (user: object) => {
  const [admin, setAdmin] = useState(false);
  const [adminLoading, setAdminLoading] = useState(true);
  
  // @ts-ignore
  const email = user?.email;

  useEffect(() => {
    if (email) {
      axios
        .get(
          `https://quickcart-server-j0uqodjgg-fahimahmed.vercel.app/user/admin/${email}`,
          {
            headers: {
              authorization: `Bearer ${localStorage.getItem("accessToken")}`,
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          setAdminLoading(false);
          setAdmin(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setAdmin(false);
    }
  }, [user, admin, adminLoading, email]);

  return [admin, adminLoading];
};

export default useAdmin;
