import {
  Button,
  MenuItem,
  RadioGroup,
  Radio,
  FormLabel,
  FormControlLabel,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import TextField from "@mui/material/TextField";

import {
  addWeatherThunk,
  editWeatherThunk,
  weatherThunk,
} from "../../redux/thunk/allthunks";
import Select from "@mui/material/Select";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { constantRoute } from "../../constants/route";

export default function DeviceForm() {
  const savedName = localStorage.getItem("name") || "";
  const savedColor = localStorage.getItem("color") || "";
  const navigate = useNavigate();
  const [name, setName] = useState(savedName);
  const [color, setColor] = useState(savedColor);
  const [deviceName, setDeviceName] = useState("");
  const [deviceColor, setDeviceColor] = useState("");
  const [generation, setGeneration] = useState("1st");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [year, setYear] = useState();
  const [capacity, setCapcity] = useState(0);
  const [cpu, setCpu] = useState("");
  const [hd, setHd] = useState("");
  const [strapCol, setStrapCol] = useState("");
  const [storeType, setStoreType] = useState("GB");
  const [caseSize, setCaseSize] = useState("");
  const [screenSize, setScreenSize] = useState("");
  const [editingId, setEditingId] = useState(null);
  const { weatherData, status, error } = useSelector((state) => state.Weather);
  const location = useLocation();
  const id = location.state;

  console.log("edited data=", id);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(weatherThunk());
  }, [id]);

  useEffect(() => {
    if (location.state) {
      console.log("here=", weatherData);
      const currentData = weatherData.find((data) => data.id === id);
      let cap;
      let csz;
      let hdz;

      let regex = /\d/;

      if (!regex.test(currentData.data.capacity)) {
        cap = 0;
      } else {
        cap = parseInt(currentData.data.capacity.match(/\d+/)[0], 10);
      }
      if (!regex.test(currentData.data["Case Size"])) {
        csz = 0;
      } else {
        csz = parseInt(currentData.data["Case Size"].match(/\d+/)[0], 10);
      }
      if (!regex.test(currentData.data["Hard disk size"])) {
        hdz = 0;
      } else {
        hdz = parseInt(currentData.data["Hard disk size"].match(/\d+/)[0], 10);
      }

      setDeviceName(currentData.name || "");
      setDeviceColor(currentData.data.color || "");
      setPrice(currentData.data.price || 0);
      setDescription(
        currentData.data.description || currentData.data.Description || ""
      );
      setYear(currentData.data.year || 0);
      setGeneration(
        currentData.data.Generation || currentData.data.generation || "1st"
      );
      setCapcity(cap || "");
      setCpu(currentData.data["CPU model"] || "");
      setHd(hdz || "");
      setStrapCol(currentData.data["Strap Colour"] || "");
      setCaseSize(csz || 0);
      setScreenSize(currentData.data["Screen size"] || 0);
    }
  }, []);

  function resetForm() {
    setDeviceName("");
    setDeviceColor("");
    setPrice(0);
    setDescription("");
    setYear(0);
    setGeneration("1st");
    setCapcity("");
    setCpu("");
    setHd("");
    setStrapCol("");
    setCaseSize(0);
    setScreenSize(0);
  }

  function GenerationChangeHandler(value) {
    setGeneration(value);
  }

  function formHandler(e) {
    e.preventDefault();

    const cap = capacity + "GB";
    const csz = caseSize + "mm";
    const hardDisk = hd + storeType;

    const data = {
      name: deviceName,
      data: {
        price: price,
        color: deviceColor,
        Description: description,
        year: year,
        generation: generation,
        capacity: cap,
        ["CPU model"]: cpu,
        ["Strap Colour"]: strapCol,
        ["Case Size"]: csz,
        ["Screen size"]: screenSize,
        ["Hard disk size"]: hardDisk,
      },
    };

    if (editingId) {
      // Dispatch an edit thunk if editing
      dispatch(editWeatherThunk({ id: editingId, data }));
      setEditingId(null); // Reset after saving
    } else {
      // Dispatch an add thunk if creating new
      console.log("data=", data);
      dispatch(addWeatherThunk(data));
    }

    // Clear form after submission
    resetForm();
    navigate(constantRoute.reduxdevice);
  }

  return (
    <>
      <Button variant="contained" onClick={() => navigate(-1)}>
        Back
      </Button>
      <form
        className="flex flex-col  items-center gap-y-3"
        onSubmit={formHandler}
        noValidate
        autoComplete="off"
      >
        <TextField
          type="text"
          variant="outlined"
          label="Enter Name"
          onChange={(e) => setDeviceName(e.target.value)}
          className="m-1 w-64 border border-gray-500 rounded-md text-xs p-2"
          value={deviceName}
          required
        />
        <TextField
          type="text"
          label="Enter Color"
          onChange={(e) => setDeviceColor(e.target.value)}
          value={deviceColor}
          variant="outlined"
          className="m-1 w-64 border border-gray-500 rounded-md text-xs p-2"
        />
        <TextField
          type="number"
          label="Enter price"
          onChange={(e) => setPrice(e.target.value)}
          value={price}
          className="m-1 w-64 border border-gray-500 rounded-md text-xs p-2"
        />
        <TextField
          rows="5"
          label="Description"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          className="m-1 w-64 border border-gray-500 rounded-md text-xs p-2"
          multiline
        />
        <TextField
          type="number"
          label="Enter Year"
          onChange={(e) => setYear(e.target.value)}
          value={year}
          className="m-1 w-64 border border-gray-500 rounded-md text-xs p-2"
        />
        <FormLabel id="demo-radio-buttons-group-label">Generation</FormLabel>
        <Select
          onChange={(e) => GenerationChangeHandler(e.target.value)}
          value={generation}
          className="m-1 w-64 border border-gray-500 rounded-md text-xs p-2"
        >
          <MenuItem value="1st">1st</MenuItem>
          <MenuItem value="2nd">2nd</MenuItem>
          <MenuItem value="3rd">3rd</MenuItem>
          <MenuItem value="4th">4th</MenuItem>
          <MenuItem value="5th">5th</MenuItem>
          <MenuItem value="6th">6th</MenuItem>
          <MenuItem value="7th">7th</MenuItem>
          <MenuItem value="8th">8th</MenuItem>
          <MenuItem value="9th">9th</MenuItem>
          <MenuItem value="10th">10th</MenuItem>
        </Select>
        <TextField
          type="number"
          label="Enter capacity"
          onChange={(e) => setCapcity(e.target.value)}
          className="m-1 w-64 border border-gray-500 rounded-md text-xs p-2"
          value={capacity}
        />
        <TextField
          type="text"
          label="Enter Cpu model"
          onChange={(e) => setCpu(e.target.value)}
          value={cpu}
          className="m-1 w-64 border border-gray-500 rounded-md text-xs p-2"
        />
        <FormLabel id="demo-radio-buttons-group-label">Strap Color</FormLabel>
        <RadioGroup defaultValue="Eldeberry" name="radio-buttons-group">
          <div className="flex gap-x-2 m-1">
            <label>
              <FormControlLabel
                value="Eldeberry"
                label="Eldeberry"
                onChange={(e) => setStrapCol(e.target.value)}
                control={<Radio />}
                checked={strapCol === "Eldeberry"} // Check if value matches strapCol
              />
            </label>
            <label>
              <FormControlLabel
                value="violet"
                label="violet"
                onChange={(e) => setStrapCol(e.target.value)}
                control={<Radio />}
                checked={strapCol === "violet"} // Check if value matches strapCol
              />
            </label>
          </div>
        </RadioGroup>
        <TextField
          type="number"
          label="Case size"
          className="m-1 w-64 border border-gray-500 rounded-md text-xs p-2"
          onChange={(e) => setCaseSize(e.target.value)}
          value={caseSize}
        />
        <TextField
          type="number"
          label="Screen size"
          className="m-1 w-64 border border-gray-500 rounded-md text-xs p-2"
          onChange={(e) => setScreenSize(e.target.value)}
          value={screenSize}
        />
        <TextField
          type="number"
          label="Hard Disk size"
          className="m-1 w-64 border border-gray-500 rounded-md text-xs p-2"
          onChange={(e) => setHd(e.target.value)}
          value={hd}
        />
        <Select
          onChange={(e) => setStoreType(e.target.value)}
          value={storeType}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
        >
          <MenuItem value="GB">GB</MenuItem>
          <MenuItem value="TB">TB</MenuItem>
        </Select>
        <button
          type="submit"
          className="m-1 bg-blue-500 text-white py-2 px-4 rounded"
        >
          {id ? "update" : "Add"}
        </button>
      </form>
    </>
  );
}
