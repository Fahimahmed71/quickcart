// @ts-nocheck
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import auth from "../../../firebase.init";
import useToken from "../../../hooks/UseToken";

const GoogleSignIn = () => {
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);

  const [token] = useToken(user);

  const navigation = useNavigate();

  if (token) {
    navigation("/");
    return;
  }

  const handleClick = async () => {
    if (error) {
      return toast.error(error.message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }

    if (loading) {
      return;
    }

    await signInWithGoogle();
  };

  return (
    <section className="max-w-md mx-auto ">
      <button
        onClick={() => handleClick()}
        className="flex items-center justify-center mt-2 sm:max-w-xs w-full gap-2 bg-sky-400 text-white px-5 py-3 rounded"
      >
        <FcGoogle className="text-2xl" />{" "}
        <span className="text-xl">Google</span>
      </button>
    </section>
  );
};

export default GoogleSignIn;
