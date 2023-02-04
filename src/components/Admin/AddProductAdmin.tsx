import axios from "axios";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

type FormData = {
  productName: string;
  price: string;
  image: string;
};

const AddRemoveProductAdmin = () => {
  const imageApi = import.meta.env.VITE_IMAGEBB;

  const {
    register,
    reset,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const onSubmit = handleSubmit((data) => {
    const image = data.image[0];
    const productName = data.productName;
    const price = data.price;

    const formData = new FormData();
    formData.append("image", image);

    axios
      .post(`https://api.imgbb.com/1/upload?&key=${imageApi}`, formData)
      .then((res) => {
        const imageData = res.data?.data?.image?.url;

        axios
          .post(
            "https://quickcart-server-j0uqodjgg-fahimahmed.vercel.app/products",
            {
              title: productName,
              price: price,
              image: imageData,
            }
          )
          .then((res) => {
            if (res.data) {
              toast.success(`${productName} added`, {
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
          })
          .catch((err) => console.log(err));
      });
    reset();
  });

  return (
    <section className="container mx-auto">
      <h1 className="text-4xl font-semibold text-black/30 uppercase text-center">
        Add Product
      </h1>

      {/* form start */}
      <form className="mt-10" onSubmit={onSubmit}>
        <dl className="flex gap-5 justify-center">
          {/* product name */}
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text text-black/30 font-medium">
                Product name
              </span>
            </label>
            <input
              {...register("productName", { required: true })}
              type="text"
              placeholder="Product name"
              className="input input-bordered w-full max-w-xs"
            />
          </div>

          {/* price */}
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text text-black/30 font-medium">
                Product Price
              </span>
            </label>
            <input
              {...register("price", { required: true, pattern: /[1-999]/i })}
              type="text"
              placeholder="Product price"
              className="input input-bordered w-full max-w-xs"
            />
          </div>
        </dl>
        <input
          {...register("image", { required: true })}
          type="file"
          className="file-input mt-5 w-full max-w-xs block mx-auto file-input-info "
        />

        <button className="btn btn-success text-white w-full mt-10">
          Submit
        </button>
      </form>
    </section>
  );
};

export default AddRemoveProductAdmin;
