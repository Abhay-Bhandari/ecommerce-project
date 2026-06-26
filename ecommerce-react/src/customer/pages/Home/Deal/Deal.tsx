import React from "react";
import DealCard from "./DealCard";
import { useApppSelector } from "../../../../State/store";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import Slider from "react-slick";

function Deal() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
  };

  const { customer } = useApppSelector((store) => store);

  return (
    <div className="py-5 lg:px-20">
      <div className="flex items-center justify-between">
        {customer.homePageData?.deals.slice(0, 6).map((item: any) => (
          <DealCard item={item} />
        ))}
      </div>
    </div>
  );
}

export default Deal;
