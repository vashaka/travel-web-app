import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppActions } from "../../redux";

const Plan = ({ PlanTitle, amountOfLandmarks }) => {
  const dispatch = useDispatch();
  const ActivePlan = useSelector((state) => state.ActivePlan);

  return (
    <div className="w-full col-span-2 md:col-span-1 row-span-1 xl:col-span-1 relative">
      <div>
        <div
          onClick={() => dispatch(AppActions.setActivePlan(PlanTitle))}
          className="hover:scale-105 cursor-pointer ease-in duration-300 w-full h-[auto] object-cover"
          style={{
            borderRadius: "25px",
            border: "3px solid rgb(255, 255, 255)",
            boxShadow: "rgb(19 15 235 / 15%) 1px 2px 20px",
            // backgroundColor: PlanTitle === ActivePlan ? "red" : "",
            // border:
            //   PlanTitle === ActivePlan ? "3px solid rgb(245, 23, 103)" : "",
            // backgroundColor: PlanTitle === "VIP" ? "red" : "",
            border:
              PlanTitle === ActivePlan ? "3px solid rgb(245, 23, 103)" : "",
          }}
        >
          <p className="">{PlanTitle}</p>
          <p className="opacity-30">What You'll Get</p>
          {ActivePlan === PlanTitle && (
            <>
              <li>cars</li>
              <li>up to {amountOfLandmarks} Landmarks</li>
              <li>{PlanTitle} cars</li>
              <li>car</li>
              <li>car</li>
              <li>car</li>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Plan;
