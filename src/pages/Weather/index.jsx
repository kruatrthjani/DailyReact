import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { weatherThunk } from "../../services/WeatherSlice";
import Button from "../../components/Button";
import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

export default function WeatherDashboard() {
  const columns = [
    { field: "name", headerName: "Device Name", width: 200, editable: false },
    { field: "color", headerName: "Color", width: 80 },
    { field: "price", headerName: "Price", width: 80 },
    {
      field: "description",
      headerName: "Description",
      width: 100,
    },
    {
      field: "year",
      headerName: "Year",
      width: 80,
    },
    { field: "generation", header: "Generation", width: 100 },
    { field: "capacity", header: "Capacity", width: 80 },
    { field: "Cpu model", header: "Cpu Model", width: 100 },
    {
      field: "HarsDisksize",
      header: "HARD disk size",
      width: 110,
    },
    { field: "Strap Colour", header: "Strap Color", width: 100 },
    { field: "Case Size", header: "Case Size", width: 100 },
  ];

  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const { weatherData, status, error } = useSelector((state) => state.Weather);

  useEffect(() => {
    if (status === "idle") {
      dispatch(weatherThunk());
    }
  }, [status]);
  // const unitsmeasureHandler = (value) => {
  //   console.log("unit=", value);
  //   setUnit(value);
  // };
  // function filterCityHandler(value) {
  //   setCity(value);
  // }

  // const formDataHandler = (e) => {
  //   e.preventDefault();

  //   dispatch(weatherThunk());
  // };

  if (status === "loading" || status === "pending" || status === "idle")
    return <p>loading data</p>;
  if (error) return <p>{error}</p>;
  const toatalrows = weatherData.map((data) => {
    return {
      id: data.id,
      name: data.name,
      color: data.data && data.data.color,
      description: data.data && data.data.Description,
      capacity: data.data && data.data.capacity,
      generation: data.data && data.data.generation,
      year: data.data && data.data.year,
      ["Strap Colour"]: data.data && data.data["Strap Colour"],
      ["Case Size"]: data.dat && data.data["Case Size"],
      ["Hard disk size"]: data.data && data.data["Hard disk size"],
      ["CPU model"]: data.data && data.data["CPU model"],
    };
  });
  const rows = toatalrows.filter((data) =>
    data.name.toLocaleLowerCase().includes(name.toLocaleLowerCase())
  );
  return (
    <div className="">
      {console.log(weatherData)}
      {/* <form onSubmit={formDataHandler} className="flex items-center flex-col">
        {/* <input
          type="number"
          min={-90}
          max={90}
          name="lat"
          className="border-blue-500 border w-2/12"
          placeholder="Latitude"
          onChange={(e) => setLat(e.target.value)}
        />
        <input
          type="number"
          min={-180}
          max={180}
          name="long"
          className="border-blue-500 border w-2/12"
          placeholder="Longitude"
          onChange={(e) => setLong(e.target.value)}
        /> */}
      {/* <select
          onChange={(e) => filterCityHandler(e.target.value)}
          value={city}
        >
          <option value="New Delhi"> New Delhi</option>
          <option value="New York"> New York</option>
          <option value="Dhaka">Dhaka</option>
          <option value="Mumbai">Mumbai</option>
        </select> }
        <Button type="submit">submit</Button>
        {/* <div className="bg-black text-white">
          <span className="flex border border-white justify-around">
            <p>humidity</p> <p>{weatherData.current.humidity}</p>
          </span>
          <span className="flex border border-white justify-around">
            <p>windDegree </p>
            <p>{weatherData.current.wind_degree}</p>
          </span>
          <span className="flex border border-white justify-around">
            <p>wind speed</p> <p> {weatherData.current.wind_speed}</p>
          </span>
          <span className="flex border border-white justify-around">
            <p>wind direction</p>
            <p>{weatherData.current.wind_dir}</p>
          </span>
          <span className="flex border border-white justify-around">
            <p>longititude</p>
            <p>{weatherData.location.lon}</p>
          </span>
          <span className="flex border border-white justify-around">
            <p>pressure</p>
            <p> {weatherData.current.pressure}</p>
          </span>
          <span className="flex border border-white justify-around">
            <p>tempreture</p>
            <p> {weatherData.current.temperature}</p>
          </span>
          <span className="flex border border-white justify-around">
            <p>latitude</p>
            <p>{weatherData.location.lat}</p>
          </span>
          <span className="flex border border-white justify-around">
            <p>loaction </p>
            <p>{weatherData.request.query}</p>
          </span>
        </div> }
        {console.log(weatherData)}

        {/* {weatherData.map((data) => {
          return (
            <span key={data.id} className="border-8 bg-black text-white w-6/12">
              <span className="flex justify-between border">
                <p className="font-bold">Device</p> <p>{data.name}</p>
              </span>
              <span className="flex justify-between border">
                <p className="font-bold">color</p>
                <p>{data.data && data.data.color}</p>
              </span>
              <span className="flex justify-between border">
                <p className="font-bold">capacity</p>
                <p>{data.data && data.data.capacity}</p>
              </span>
              <span className="flex justify-between">
                <p className="font-bold">price</p>
                <p>{data.data && data.data.price}</p>
              </span>
              <span className="flex justify-between">
                <p className="font-bold">Generation</p>
                <p>{data.data && data.data.generation}</p>
              </span>
              <span className="flex justify-between">
                <p className="font-bold">year</p>
                <p>{data.data && data.data.year}</p>
              </span>
              <span className="flex justify-between">
                <p className="font-bold">cpu model</p>
                <p>{data.data && data.data["CPU model"]}</p>
              </span>
              <span className="flex justify-between">
                <p className="font-bold">Hard Disk size</p>
                <p>{data.data && data.data["Hard disk size"]}</p>
              </span>
              <span className="flex justify-between">
                <p className="font-bold">Strap Colour</p>
                <p>{data.data && data.data["Strap Colour"]}</p>
              </span>
              <span className="flex justify-between">
                <p className="font-bold">Case Size</p>
                <p>{data.data && data.data["Case Size"]}</p>
              </span>
            </span>
          );
        })} }        
      </form> */}
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border border-blue-500"
        placeholder="Enter tet to enter"
      />
      {/* <TextField
        id="outlined-basic"
        label="Outlined"
        variant="outlined"
        onChange={(e) => setName(e.target.value)}
        value={name}
      /> */}
      <Box sx={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5]}
        />
      </Box>
    </div>
  );
}
