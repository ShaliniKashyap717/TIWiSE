import React from "react";
import MovieChart from "./MovieChart";
import HotelChart from "./HotelChart";
import PlaceChart from "./PlaceChart";

const Chart = ({ type = "" }) => {
  if (!type) {
    return <p>Please select a valid chart type.</p>;
  }

  let ComponentToRender;

  const typeLower = type.toLowerCase();

if (typeLower.includes("movie")) {
  ComponentToRender = MovieChart;
} else if (typeLower.includes("hotel")) {
  ComponentToRender = HotelChart;
} else if (typeLower.includes("place")) {
  ComponentToRender = PlaceChart;
} else {
  return <p>Invalid chart type provided.</p>;
}


  return (
    <div class=" flex justify-items-start">
      
      <ComponentToRender />
    </div>
  );
};

export default Chart;
