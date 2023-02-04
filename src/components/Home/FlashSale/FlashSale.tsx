// @ts-nocheck
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import FlashSaleItem from "./FlashSaleItem/FlashSaleItem";

const FlashSale = () => {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (hours === 0 && minutes === 0 && seconds === 0) {
        clearInterval(intervalId);
      }
      if (seconds === 0) {
        if (minutes === 0) {
          setHours(20 - 1);
          setMinutes(59);
        } else {
          setMinutes(minutes - 1);
        }
        setSeconds(59);
      } else {
        setSeconds(seconds - 1);
      }
    }, 1000);
    return () => clearInterval(intervalId);
  }, [hours, minutes, seconds]);

  return (
    <section className=" mt-5 ">
      <h1 className="text-4xl mb-3 text-center sm:text-start text-black/30 px-5">
        Flash Sale
      </h1>
      <dl className="flex items-center justify-between flex-col gap-5 sm:flex-row sm:gap-0 px-5">
        <dt className="flex sm:justify-start justify-center gap-5">
          <div>
            <span className="countdown font-mono text-4xl">
              <span style={{ "--value": `${hours}` }}></span>
            </span>
            hours
          </div>
          <div>
            <span className="countdown font-mono text-4xl">
              <span style={{ "--value": `${minutes}` }}></span>
            </span>
            min
          </div>
          <div>
            <span className="countdown font-mono text-4xl">
              <span style={{ "--value": `${seconds}` }}></span>
            </span>
            sec
          </div>
        </dt>
        <Link to="/flashsale">
          <button className="btn btn-primary text-white">Show More</button>
        </Link>
      </dl>
      <FlashSaleItem />
    </section>
  );
};

export default FlashSale;
