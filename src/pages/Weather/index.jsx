import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { weatherThunk } from "../../services/WeatherSlice/thunk/WeatherThunk";
import { addWeatherThunk } from "../../services/WeatherSlice/thunk/addWeatherThunk";
import { deleteWeatherThunk } from "../../services/WeatherSlice/thunk/deleteWeatherThunk";
import { editWeatherThunk } from "../../services/WeatherSlice/thunk/editWeatherThunk";
import Button from "../../components/Button";
import { Box, Input } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

export default function WeatherDashboard() {
  const columns = [
    { field: "name", headerName: "Device Name", width: 200, editable: false },
    { field: "color", headerName: "Color", width: 80 },
    { field: "price", headerName: "Price", width: 80 },
    { field: "description", headerName: "Description", width: 100 },
    { field: "year", headerName: "Year", width: 80 },
    { field: "Generation", header: "Generation", width: 100 },
    { field: "Capacity", header: "Capacity", width: 80 },
    { field: "CPU model", header: "CPU model", width: 100 },
    { field: "Hard disk size", header: "Hard disk size", width: 110 },
    { field: "Strap Colour", header: "Strap Color", width: 100 },
    { field: "Case Size", header: "Case Size", width: 100 },
    { field: "Screen size", header: "Screen size", width: 100 },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => (
        <>
          <Button
            onClick={() => handleEdit(params.row)}
            variant="contained"
            color="primary"
            size="small"
            style={{ marginRight: "10px" }}
          >
            Edit
          </Button>
          <Button
            onClick={() => handleDelete(params.id)}
            variant="contained"
            color="error"
            size="small"
          >
            Delete
          </Button>
        </>
      ),
    },
  ];

  const dispatch = useDispatch();

  // Get saved filter values from localStorage, or set to empty string if not found
  const savedName = localStorage.getItem("name") || "";
  const savedColor = localStorage.getItem("color") || "";

  const [name, setName] = useState(savedName);
  const [color, setColor] = useState(savedColor);
  const [deviceName, setDeviceName] = useState("");
  const [deviceColor, setDeviceColor] = useState("");
  const [generation, setGeneration] = useState("1st");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [year, setYear] = useState();
  const [capacity, setCapcity] = useState("");
  const [cpu, setCpu] = useState("");
  const [hd, setHd] = useState("");
  const [strapCol, setStrapCol] = useState("");
  const [storeType, setStoreType] = useState("GB");
  const [caseSize, setCaseSize] = useState("");
  const [screenSize, setScreenSize] = useState("");
  const [editingId, setEditingId] = useState(null);
  const { weatherData, status, error } = useSelector((state) => state.Weather);

  useEffect(() => {
    if (status === "idle") {
      dispatch(weatherThunk());
    }
  }, [status]);

  // Save filters to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("name", name);
    localStorage.setItem("color", color);
  }, [name, color]);

  if (status === "loading" || status === "pending" || status === "idle")
    return <p>loading data</p>;
  if (error) return <p>{error}</p>;

  const totalRows = weatherData.map((data) => {
    return {
      id: data.id,
      name: data.name,
      color: data.data && (data.data.color || data.data.Color),
      price: data.data && (data.data.price || data.data.Price),
      description: data.data && data.data.Description,
      Capacity: data.data && (data.data.Capacity || data.data.capacity),
      Generation: data.data && (data.data.Generation || data.data.generation),
      year: data.data && data.data.year,
      ["Strap Colour"]: data.data && data.data["Strap Colour"],
      ["Case Size"]: data.data && data.data["Case Size"],
      ["Hard disk size"]: data.data && data.data["Hard disk size"],
      ["CPU model"]: data.data && data.data["CPU model"],
      ["Screen size"]: data.data && data.data["Screen size"],
    };
  });

  const rows = totalRows.filter((data) => {
    const matchesName = data.name
      .toLocaleLowerCase()
      .includes(name.toLocaleLowerCase());
    const matchesColor =
      color === "" ||
      (data.color &&
        data.color.toLocaleLowerCase().includes(color.toLocaleLowerCase()));

    return matchesName && matchesColor;
  });
  function handleDelete(id) {
    dispatch(deleteWeatherThunk(id));
  }
  function handleEdit(row) {
    const cap = parseInt(row.Capacity.match(/\d+/)[0], 10);
    const csz = parseInt(row["Case Size"].match(/\d+/)[0], 10);
    const hdz = parseInt(row["Hard disk size"].match(/\d+/)[0], 10);

    setDeviceName(row.name || "");
    setDeviceColor(row.color || "");
    setPrice(row.price || 0);
    setDescription(row.description || "");
    setYear(row.year || 0);
    setGeneration(row.Generation || "1st");
    setCapcity(cap || "");
    setCpu(row["CPU model"] || "");
    setHd(hdz || "");
    setStrapCol(row["Strap Colour"] || ""); // Ensure this sets the correct value
    setCaseSize(csz || 0);
    setScreenSize(row["Screen size"] || 0);
    setEditingId(row.id);
  }

  function GenerationChangeHandler(value) {
    setGeneration(value);
  }
  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleColorChange = (e) => {
    setColor(e.target.value);
  };
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
      dispatch(addWeatherThunk(data));
    }

    // Clear form after submission
    resetForm();
  }

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
  return (
    <div className="">
      {/* Input fields for filtering */}
      <input
        type="text"
        value={name}
        onChange={handleNameChange}
        className="border border-blue-500"
        placeholder="Enter text to filter by name"
      />
      <input
        type="text"
        value={color}
        onChange={handleColorChange}
        className="border border-blue-500"
        placeholder="Enter color to filter"
      />

      {/* DataGrid for displaying filtered data */}
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
      <form
        className="flex flex-col  items-center"
        onSubmit={formHandler}
        noValidate
        autoComplete="off"
      >
        <input
          type="text"
          placeholder="Enter name"
          onChange={(e) => setDeviceName(e.target.value)}
          className="m-1 w-64 border border-gray-500 rounded-md text-xs p-2"
          value={deviceName}
          required
        />
        <input
          type="text"
          placeholder="Enter Color"
          onChange={(e) => setDeviceColor(e.target.value)}
          value={deviceColor}
          className="m-1 w-64 border border-gray-500 rounded-md text-xs p-2"
        />
        <input
          type="number"
          placeholder="Enter price"
          onChange={(e) => setPrice(e.target.value)}
          value={price}
          className="m-1 w-64 border border-gray-500 rounded-md text-xs p-2"
        />
        <textarea
          placeholder="Enter description"
          rows="5"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          className="m-1 w-64 border border-gray-500 rounded-md text-xs p-2"
        ></textarea>
        <input
          type="number"
          placeholder="Enter Year"
          onChange={(e) => setYear(e.target.value)}
          value={year}
          className="m-1 w-64 border border-gray-500 rounded-md text-xs p-2"
        />
        <select
          onChange={(e) => GenerationChangeHandler(e.target.value)}
          value={generation}
          className="m-1 w-64 border border-gray-500 rounded-md text-xs p-2"
        >
          <option value="1st">1st</option>
          <option value="2nd">2nd</option>
          <option value="3rd">3rd</option>
          <option value="4th">4th</option>
          <option value="5th">5th</option>
          <option value="6th">6th</option>
          <option value="7th">7th</option>
          <option value="8th">8th</option>
          <option value="9th">9th</option>
          <option value="10th">10th</option>
        </select>
        <input
          type="number"
          placeholder="Enter capacity"
          onChange={(e) => setCapcity(e.target.value)}
          className="m-1 w-64 border border-gray-500 rounded-md text-xs p-2"
          value={capacity}
        />
        <input
          type="text"
          placeholder="Enter Cpu model"
          onChange={(e) => setCpu(e.target.value)}
          value={cpu}
          className="m-1 w-64 border border-gray-500 rounded-md text-xs p-2"
        />
        <label>Strap Color</label>
        <div className="flex gap-x-2 m-1">
          <label>
            <input
              type="radio"
              name="strapColor"
              value="Eldeberry"
              onChange={(e) => setStrapCol(e.target.value)}
              checked={strapCol === "Eldeberry"} // Check if value matches strapCol
            />
            Eldeberry
          </label>
          <label>
            <input
              type="radio"
              name="strapColor"
              value="violet"
              onChange={(e) => setStrapCol(e.target.value)}
              checked={strapCol === "violet"} // Check if value matches strapCol
            />
            Violet
          </label>
        </div>

        <input
          type="number"
          placeholder="Case size"
          className="m-1 w-64 border border-gray-500 rounded-md text-xs p-2"
          onChange={(e) => setCaseSize(e.target.value)}
          value={caseSize}
        />
        <input
          type="number"
          placeholder="Screen size"
          className="m-1 w-64 border border-gray-500 rounded-md text-xs p-2"
          onChange={(e) => setScreenSize(e.target.value)}
          value={screenSize}
        />
        <input
          type="number"
          placeholder="Hard Disk size"
          className="m-1 w-64 border border-gray-500 rounded-md text-xs p-2"
          onChange={(e) => setHd(e.target.value)}
          value={hd}
        />
        <select
          onChange={(e) => setStoreType(e.target.value)}
          value={storeType}
        >
          <option value="GB">GB</option>
          <option value="TB">TB</option>
        </select>
        <button
          type="submit"
          className="m-1 bg-blue-500 text-white py-2 px-4 rounded"
        >
          Add
        </button>
      </form>

      {/* <button onClick={() => dispatch(addWeatherThunk())} variant="outlined">
        Add
      </button> */}
    </div>
  );
}
