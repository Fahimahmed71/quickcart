import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import AllProducts from "./AllProducts/AllProducts";
import Collection from "./Collection/Collection";
import FlashSale from "./FlashSale/FlashSale";

const Home = () => {
  const img = [
    {
      image:
        "https://images.pexels.com/photos/298863/pexels-photo-298863.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      title: "EXCLUSIVE COLLECTION",
      details: "Enjoy 20% offer",
      shopName: "Aarong",
    },
    {
      image:
        "https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      title: "TRENDING",
      details: "0% EMI | Brand warranty | Free shipping",
      shopName: "Apple",
    },
    {
      image:
        "https://images.pexels.com/photos/7363082/pexels-photo-7363082.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      title: "FREE DELIVERY FESTIVAL",
      details: "Minimum 1000 Taka Purchase",
      shopName: "Quick Cart",
    },
  ];

  return (
    <dl>
      <Splide
        aria-label="slider"
        options={{
          rewind: true,
          pagination: false,
          type: "loop",
          autoplay: true,
          arrows: false,
        }}
      >
        {img.map((slider, index) => (
          <SplideSlide key={index}>
            <section
              style={{
                backgroundImage: `url(${slider.image})`,
              }}
              className="overflow-hidden  min-h-screen bg-cover bg-center bg-no-repeat"
            >
              <div className="bg-black/50 p-8 md:p-12 lg:px-16 lg:py-24  min-h-screen">
                <div className="max-w-lg text-center sm:text-left relative transform translate-y-1/2 sm:translate-y-0">
                  <h1 className="text-3xl font-semibold text-primary">
                    {slider.shopName}
                  </h1>
                  <h2 className="text-2xl font-bold text-white sm:text-3xl md:text-5xl">
                    {slider.title}
                  </h2>

                  <p className=" max-w-md text-white/90 md:mt-4 md:block md:text-lg md:leading-relaxed">
                    {slider.details}
                  </p>

                  <p className="hidden max-w-md text-white/90 md:mt-4 md:block md:text-lg md:leading-relaxed font-light">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Dolorum et ut dolorem praesentium distinctio quidem quo,
                    pariatur libero soluta consequatur.
                  </p>

                  <div className="mt-4 sm:mt-8">
                    <a
                      href="#"
                      className="inline-flex items-center rounded-full bg-primary px-8 py-3 text-white shadow-lg transition hover:bg-primary/60 focus:outline-none focus:ring"
                    >
                      <span className="text-sm font-medium"> Shop Now </span>

                      <svg
                        className="ml-3 h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </section>
          </SplideSlide>
        ))}
      </Splide>
      <Collection />
      <FlashSale />
      <AllProducts />
    </dl>
  );
};

export default Home;
