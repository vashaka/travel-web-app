/* eslint-disable react/jsx-no-comment-textnodes */
import { useState, useEffect, useMemo, useContext } from "react";
import ImageSlider from "./../components/ImageSlider";
import { SliderData } from "../data/SliderData";
import GeoMap from "./../components/GeoMap";
import PlanContainer from "./../components/Plans/PlanContainer";
import HotelContainer from "../components/Hotels/HotelContainer";
import Link from "next/link";
import LandmarkContainer from "../components/Landmarks/LandmarkContainer";
import { UserContext } from "../context/UserContext";

const HomePage = () => {
  const { user }: any = useContext(UserContext);
  // const hotelsInfo = useSelector((state: any) => state.hotels);
  const [landmarksInfo, setLandmarksInfo] = useState<any>([]);
  const [hotelsInfo, setHotelsInfo] = useState<any>([]);

  useMemo(() => {
    fetch("http://localhost:3001/landmarks")
      .then((response) => response.json())
      .then((data) => {
        const firstFourLandmarks = data.slice(0, 4);
        setLandmarksInfo(firstFourLandmarks);
      })
      .catch((err) => {
        alert("SERVER ERROR");
        console.log(err);
      });
    fetch("http://localhost:3001/hotels")
      .then((response) => response.json())
      .then((data) => {
        const firstFourHotels = data.slice(0, 4);
        setHotelsInfo(firstFourHotels);
      })
      .catch((err) => {
        alert("SERVER ERROR");
        console.log(err);
      });
  }, []);

  return (
    <div>
      <div className="grid md:grid-cols-2">
        {/* <h1 className="text-center">
          We'll travel you Everywhere in this stunning country
        </h1>
        <ImageSlider slides={SliderData} /> */}
        <GeoMap />
        <PlanContainer />
      </div>
      <hr />
      <div className="max-w-[1440px] m-auto py-16 px-4 relative">
        <div
          style={{
            whiteSpace: "nowrap",
          }}
          className="flex justify-center mb-1"
        >
          <h1 className="text-white bg-[#f51767] px-2 py-1 rounded-sm h-full">
            step 2 -
          </h1>
          <h1 className="text-white text-xs">h</h1>
          <h1 className="text-xl text-[#f51767] mt-1">Choose Your Landmarks</h1>
        </div>

        <p className="text-md mb-1 text-center">
          // Tap on your favourite and check it on the map
        </p>
        <div className="grid grid-cols-1 smd:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[30px] mx-auto max-w-max">
          {landmarksInfo.length > 0 &&
            landmarksInfo.map((landmark: any) => {
              return (
                <Link key={landmark._id} href={`/landmarks/${landmark._id}`}>
                  <LandmarkContainer landmark={landmark} />
                </Link>
              );
            })}
        </div>
        {landmarksInfo.length > 0 && (
          <Link href="/landmarks" className="flex justify-center mt-8">
            <button className="btn">Load More...</button>
          </Link>
        )}
      </div>
      <hr />
      <div className="max-w-[1440px] m-auto py-16 px-4 relative">
        <div
          style={{
            whiteSpace: "nowrap",
          }}
          className="flex justify-center mb-1"
        >
          <h1 className="h-full text-white bg-[#f51767] px-2 py-1 rounded-sm">
            step 3 -
          </h1>
          <h1 className="text-white text-xs">h</h1>
          <h1 className="text-xl text-[#f51767] mt-1">Choose Your Hotels</h1>
        </div>

        <p className="text-md mb-1 text-center">
          // Tap on your favourite hotel and check the recommended landmarks
        </p>
        <div className="grid grid-cols-1 smd:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[30px] mx-auto max-w-max">
          {hotelsInfo.length > 0 &&
            hotelsInfo.map((hotel: any) => {
              return (
                <Link key={hotel._id} href={`/hotels/${hotel._id}`}>
                  <HotelContainer hotel={hotel} />
                </Link>
              );
            })}
        </div>
        {hotelsInfo.length > 0 && (
          <Link href="/landmarks" className="flex justify-center mt-8">
            <button className="btn">Load More...</button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default HomePage;
