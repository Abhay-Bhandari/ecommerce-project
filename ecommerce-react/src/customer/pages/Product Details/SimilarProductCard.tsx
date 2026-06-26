import React from "react";

function SimilarProductCard() {
  return (
    <div>
      <div className="group px-4 relative">
        <div className="card">
          <img
            className="card-media object-top"
            src="https://rukminim2.flixcart.com/fk-p-flap/760/1020/image/ab5af977827d4c14.png?q=60"
            alt=""
          />
        </div>

        <div className="details pt-3 space-x-1 group-hover-effect rounded-md">
          <div className="name">
            <h1>Nike</h1>
            <p>Blue Shirt</p>
          </div>
          <div className="price flex items-center gap-3">
            <span className="font-sans text-gray-800">₹400</span>
            <span className="thin-line-through text-gray-400">₹1000</span>
            <span className="text-primary-color font-semibold">60% off</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SimilarProductCard;
