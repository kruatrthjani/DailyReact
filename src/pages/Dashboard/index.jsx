import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Error from "../../components/Error";
import { dashboardThunk } from "../../redux/thunk/allthunks";
import { weatherDashboardThunk } from "../../redux/thunk/allthunks";
import Loader from "../../components/Loader";
import { Button } from "@mui/material";
import CircularProgress from "@mui/joy/CircularProgress";
import GraphGraphComponent from "./GraphComponent";
import { BarChart } from "@mui/x-charts/BarChart";

export default function HouseDashboard() {
  const { houseData, status, error } = useSelector((state) => state.Dashboard);
  const {
    weatherDashboardData,
    status: weatherstatus,
    error: weathererror,
  } = useSelector((state) => state.WeatherDashboard);
  const dispatch = useDispatch();

  useEffect(() => {
    if (status === "idle" || status === "loading" || status === "pending") {
      dispatch(dashboardThunk());
    }
  }, [status]);

  useEffect(() => {
    if (
      weatherstatus === "idle" ||
      weatherstatus === "loading" ||
      weatherstatus === "pending"
    ) {
      dispatch(weatherDashboardThunk());
    }
  }, [weatherstatus]);

  function furnishedProgress() {
    const furlen = houseData.filter((data) => {
      return data.furnishingstatus === "unfurnished";
    });
    console.log(furlen.length);
    const furdata = houseData.length - furlen.length;
    const data = (furdata / houseData.length) * 100;
    console.log("percent=", data);
    return data.toFixed(2);
  }

  function luxuryhouse(data) {
    let count = 0;

    if (data.mainroad === "yes") {
      count += 1;
    }
    if (data.guestroom === "yes") {
      count += 1;
    }
    if (data.basement === "yes") {
      count += 1;
    }
    if (data.hotwaterheating === "yes") {
      count += 1;
    }
    if (data.airconditioning === "yes") {
      count += 1;
    }
    if (data.parking > 0) {
      count += 1;
    }

    return count;
  }

  function facilityProgress() {
    const facility = houseData.filter((data) => {
      const count = luxuryhouse(data);

      return count > 3;
    });

    const value = (facility.length / houseData.length) * 100;
    return value.toFixed(2);
  }

  function Budget(type) {
    if (type == "low") {
      const lowBudget = houseData.filter((data) => data.price < 3000000);
      return lowBudget.length;
    } else if (type == "mid") {
      const lowBudget = houseData.filter(
        (data) => data.price > 3000000 && data.price < 6000000
      );
      return lowBudget.length;
    } else if (type == "high") {
      const lowBudget = houseData.filter((data) => data.price > 6000000);
      return lowBudget.length;
    } else {
      return;
    }
  }

  function priceareaRatio() {
    const totalratio = houseData.reduce(
      (acc, data) => acc + data.price / data.area,
      0
    );
    const ratio = totalratio / houseData.length;
    console.log("ratio=", ratio);
    return ratio.toFixed(2);
  }

  function hugefamily() {
    const data = houseData.filter((data) => {
      return data.bedrooms >= 3;
    });
    const value = (data.length / houseData.length) * 100;
    return value.toFixed(2);
  }

  if (status === "idle" || status === "pending") {
    return <Loader />;
  }

  if (error) return <Error data={error} />;
  if (weathererror) return <Error data={weathererror} />;
  const colors = ["yellow", "red", "blue"];
  const seriesData = weatherDashboardData.map((data, index) => ({
    data: [data.current.temp_c],
    label: data.location.name,
    color: colors[index % colors.length],
  }));
  console.log(weatherDashboardData);
  return (
    <Box className={``}>
      <Box className="flex justify-around">
        <GraphGraphComponent
          text="Furhished House ratio"
          value={furnishedProgress()}
        />

        <GraphGraphComponent text="For Huge family" value={hugefamily()} />
        <GraphGraphComponent
          text="Luxury facilities houses"
          value={facilityProgress()}
        />
      </Box>
      <Box className=" flex">
        <BarChart
          xAxis={[{ scaleType: "band", data: ["range"] }]}
          series={seriesData}
          width={500}
          height={400}
        />
        <BarChart
          xAxis={[{ scaleType: "band", data: ["range"] }]}
          series={[
            { data: [Budget("low")], label: "low", color: "yellow" },
            { data: [Budget("mid")], label: "mid" },
            { data: [Budget("high")], label: "high" },
          ]}
          width={500}
          height={400}
        />
      </Box>
      <Box className="flex justify-around mt-6">
        <Box className="bg-slate-100 p-2 rounded-md w-3/12 text-center">
          <Typography sx={{ fontStyle: "italic" }}>P/A Ratio</Typography>
          <Typography sx={{ fontSize: "20px" }}>{priceareaRatio()}</Typography>
        </Box>
        <Box className="bg-slate-100 p-2 rounded-md w-3/12 text-center">
          <Typography sx={{ fontStyle: "italic" }}>LOW BUDGET</Typography>
          <Typography sx={{ fontSize: "20px" }}>
            {Budget("low")}/{houseData.length} houses
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
