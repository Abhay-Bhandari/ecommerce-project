import { Divider, dividerClasses } from "@mui/material";
import React from "react";
import ReviewCard from "./ReviewCard";

function Review() {
  return (
    <div className="p-5 lg:px-20 flex flex-col lg:flex-row gap-20">
      <section className="w-full md:w-1/2 lg:w-[30%] space-y-2">
        <img
          src="https://rukminim2.flixcart.com/fk-p-flap/760/1020/image/ab5af977827d4c14.png?q=60"
          alt=""
        />

        <div>
          <div>
            <p className="font-bold text-xl">ShipSite</p>
            <p className="text-lg text-gray-600">Men's White Shirt</p>
          </div>
        </div>
        <div>
          <div className="price flex items-center gap-3 mt-5 text-2xl">
            <span className="font-sans text-gray-800">₹400</span>
            <span className="line-through text-gray-400">₹699</span>
            <span className="text-primary-color font-semibold">42% off</span>
          </div>
          <p className="text-sm">Inclusive of all taxes</p>
        </div>
      </section>

      <section className="w-full space-y-5">
        {[1, 1, 1, 1, 1, 1, 1].map((item) => (
          <div className="space-y-3 ">
            <ReviewCard />
            <Divider />
          </div>
        ))}
      </section>
    </div>
  );
}

export default Review;
