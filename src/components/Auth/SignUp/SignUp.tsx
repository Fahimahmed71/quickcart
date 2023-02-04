// @ts-nocheck
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { useForm, SubmitHandler } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import auth from "../../../firebase.init";
import useToken from "../../../hooks/UseToken";
import GoogleSignIn from "../GoogleSignIn/GoogleSignIn";

interface inputs {
  email: string;
  password: string;
  retypePassword: string;
}

const SignUp = () => {
  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);

  const [token] = useToken(user);

  const navigation = useNavigate();

  if (token) {
    navigation("/login");
  }

  const { register, handleSubmit } = useForm<inputs>();
  const onSubmit: SubmitHandler<inputs> = async (data) => {
    const email = data.email;
    const password = data.password;
    const retypePassword = data.retypePassword;

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

    if (password !== retypePassword) {
      toast.error("Password didn't match", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return;
    } else {
      await createUserWithEmailAndPassword(email, password);

      return;
    }
  };
  return (
    <section className="container mx-auto px-5 sm:px-0">
      <form
        className="mx-auto mt-8 mb-0 max-w-md"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* email */}
        <div className="form-control w-full sm:max-w-xs ">
          <label className="label">
            <span className="label-text">
              Email <span className="text-red-400">*</span>
            </span>
          </label>
          <input
            {...register("email", { required: true })}
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

          {/* confirm password */}
          <label className="label">
            <span className="label-text mt-3">
              Confirm Password <span className="text-red-400">*</span>
            </span>
          </label>
          <input
            {...register("retypePassword")}
            required
            type="password"
            placeholder="Retype Password"
            className="input input-bordered w-full sm:max-w-xs"
          />
        </div>

        <small className="text-neutral ">
          Already have an account?{" "}
          <Link to="/login" className="link hover:text-primary">
            Sign In
          </Link>
          .
        </small>

        <input
          className="btn mt-3 w-full sm:max-w-xs"
          type="submit"
          value={"Register"}
        />
      </form>
      <GoogleSignIn />
    </section>
  );
};

export default SignUp;
