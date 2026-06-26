import React from "react";

function CategoryGrid() {
  return (
    <div className="grid gap-4 grid-rows-12 grid-cols-12 lg:h-[600px] px-5 lg:px-20 mt-12">
      <div className="row-span-12 col-span-3 text-white">
        <img
          className="w-full h-full object-cover object-top rounded-md"
          src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&q=80"
          alt=""
        />
      </div>

      <div className="row-span-6 col-span-2 text-white">
        <img
          className="w-full h-full object-cover object-top rounded-md"
          src="https://rukminim2.flixcart.com/image/612/612/xif0q/ethnic-set/h/j/q/5xl-k10003-mirchi-fashion-original-imah2axwfah86xym.jpeg?q=70"
          alt=""
        />
      </div>

      <div className="row-span-6 col-span-4 text-white">
        <img
          className="w-full h-full object-cover object-top rounded-md"
          src="https://rukminim2.flixcart.com/image/612/612/xif0q/ethnic-set/h/j/q/5xl-k10003-mirchi-fashion-original-imah2axwfah86xym.jpeg?q=70"
          alt=""
        />
      </div>

      <div className="row-span-12 col-span-3 text-white">
        <img
          className="w-full h-full object-cover object-top rounded-md"
          src="https://media.istockphoto.com/id/527441255/photo/beautiful-girl-dancer-of-indian-classical-dance-bharatanatyam.jpg?s=612x612&w=0&k=20&c=JpeJQ22M6x7dGyiEiUdYoXKUI0yXFxrsgB_Cf4uvqug="
          alt=""
        />
      </div>

      <div className="row-span-6 col-span-4 text-white">
        <img
          className="w-full h-full object-cover object-top rounded-md"
          src="https://rukminim2.flixcart.com/image/612/612/xif0q/ethnic-set/h/j/q/5xl-k10003-mirchi-fashion-original-imah2axwfah86xym.jpeg?q=70"
          alt=""
        />
      </div>

      <div className="row-span-6 col-span-2 text-white">
        <img
          className="w-full h-full object-cover object-top rounded-md"
          src="https://rukminim2.flixcart.com/image/612/612/xif0q/ethnic-set/h/j/q/5xl-k10003-mirchi-fashion-original-imah2axwfah86xym.jpeg?q=70"
          alt=""
        />
      </div>
    </div>
  );
}

export default CategoryGrid;
