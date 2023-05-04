import React from "react";
import Slider from "../components/Buy/carousel";
import Properties from "../components/Buy/Property";
import Discover from "../components/Buy/Discover";
import HomeGallery from "../components/home/HomeGallery";

const buy = () => {
  return (
    <div>
      <Slider />
      {/* <Properties /> */}
      <HomeGallery />
      <div className="mt-2 p-6 ">
        <Discover />
      </div>
    </div>
  );
};

export default buy;
