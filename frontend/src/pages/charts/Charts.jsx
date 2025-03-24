import React from "react";
import MovieChart from "./MovieChart";
import HotelChart from "./HotelChart";
import PlaceChart from "./PlaceChart";

const Chart = ({ type = "" }) => {
  if (!type) {
    return <p className="text-center text-gray-600">Please select a valid chart type.</p>;
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
    return <p className="text-center text-red-600">Invalid chart type provided.</p>;
  }

  return (
    <div className="w-full bg-white rounded-lg shadow-md p-4">
      <div className="flex justify-center">
        <ComponentToRender />
      </div>
    </div>
  );
};

export default Chart;