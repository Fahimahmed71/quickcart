// @ts-nocheck
import { useForm, SubmitHandler } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import auth from "../../../firebase.init";
import GoogleSignIn from "../GoogleSignIn/GoogleSignIn";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { toast } from "react-toastify";
import useToken from "../../../hooks/UseToken";
import { useEffect } from "react";

interface inputs {
  email: string;
  password: string;
}

const Login = () => {
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);

  const [token] = useToken(user);

  const navigation = useNavigate();
  const location = useLocation();
  let from = location.state?.from?.pathname || "/";

  useEffect(() => {
    if (token) {
      navigation(from, { replace: true });
      return;
    }
  }, [token, from, navigation]);

  const { register, handleSubmit, reset } = useForm<inputs>();
  const onSubmit: SubmitHandler<inputs> = async (data) => {
    const email = data?.email;
    const password = data?.password;

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

    await signInWithEmailAndPassword(email, password);

    reset();
  };

  const handleAdmin = async () => {
    const email = "admin@mail.com";
    const password = "123456";

    await signInWithEmailAndPassword(email, password);
  };

  return (
    <section className="container mx-auto px-5 sm:px-0">
      <form
        className="mx-auto  mt-8 mb-0 max-w-md "
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* email */}
        <div className="form-control w-full sm:max-w-xs">
          <label className="label">
            <span className="label-text">
              Email <span className="text-red-400">*</span>
            </span>
          </label>
          <input
            {...register("email")}
            required
            type="email"
            placeholder="Example@mail.com"
            className="input input-bordered w-full sm:max-w-xs"
          />
          {/* password */}
          <label className="label">
            <span className="label-text mt-3">
              Password <span className="text-red-400">*</span>
            </span>
          </label>
          <input
            {...register("password")}
            required
            type="password"
            placeholder="Password"
            className="input input-bordered w-full sm:max-w-xs"
          />
        </div>

        <small className="text-neutral">
          Don't have an account?{" "}
          <Link to="/signup" className="link hover:text-primary">
            Sign Up
          </Link>
          .
        </small>

        <input
          className="btn mt-3 w-full sm:max-w-xs"
          type="submit"
          value={"Login"}
        />
      </form>
      <GoogleSignIn />

      <dl className="max-w-md mx-auto mt-2">
        <button
          onClick={handleAdmin}
          className="sm:max-w-xs w-full text-white px-5 py-3 rounded btn btn-error"
        >
          Admin Login
        </button>
      </dl>
    </section>
  );
};

export default Login;

// NOTE regex password
// {
//     pattern:
//       /^(?=.[A-Z])(?=.[a-z])(?=.\d)(?=.[@$!%#?&])[A-Za-z\d@$!%#?&]{8,}$/i,
//   }
