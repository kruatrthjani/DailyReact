import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { weatherThunk } from "../../services/WeatherSlice/thunk/WeatherThunk";
import { addWeatherThunk } from "../../services/WeatherSlice/thunk/addWeatherThunk";
import { deleteWeatherThunk } from "../../services/WeatherSlice/thunk/deleteWeatherThunk";
import { editWeatherThunk } from "../../services/WeatherSlice/thunk/editWeatherThunk";
import Button from "@mui/material/Button";
import { Box, Input } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";

export default function WeatherDashboard() {
  const navigate = useNavigate();
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
      width: 350,
      renderCell: (params) => (
        <span className="flex gap-x-3">
          <Button
            onClick={() => handleEdit(params.row)}
            variant="contained"
            color="primary"
            size="small"
          >
            {editingId === params.id ? "cancel" : "Edit"}
          </Button>
          <Button
            onClick={() => handleDelete(params.id)}
            variant="contained"
            color="primary"
            size="small"
          >
            Delete
          </Button>
        </span>
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
    if (!editingId) {
      let cap;
      let csz;
      let hdz;

      let regex = /\d/;

      if (!regex.test(row.Capacity)) {
        cap = 0;
      } else {
        cap = parseInt(row.Capacity.match(/\d+/)[0], 10);
      }
      if (!regex.test(row["Case Size"])) {
        csz = 0;
      } else {
        csz = parseInt(row["Case Size"].match(/\d+/)[0], 10);
      }
      if (!regex.test(row["Hard disk size"])) {
        hdz = 0;
      } else {
        hdz = parseInt(row["Hard disk size"].match(/\d+/)[0], 10);
      }

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

      const data = {
        name: row.name || "",
        color: row.color || "",
        price: row.price || 0,
        description: row.description || "",
        year: row.year || 0,
        generation: row.Generation || "1st",
        capacity: cap || "",
        cpu: row["CPU model"] || "",
        hd: hdz || "",
        strapCol: row["Strap Colour"] || "",
        caseSize: csz || 0,
        screenSize: row["Screen size"] || 0,
        id: row.id,
      };
      const id = row.id;
      navigate("/weatherform", { state: id });
    } else {
      resetForm();
      setEditingId("");
    }
  }

  // function GenerationChangeHandler(value) {
  //   setGeneration(value);
  // }
  // const handleNameChange = (e) => {
  //   setName(e.target.value);
  // };

  // const handleColorChange = (e) => {
  //   setColor(e.target.value);
  // };
  // function formHandler(e) {
  //   e.preventDefault();

  //   const cap = capacity + "GB";
  //   const csz = caseSize + "mm";
  //   const hardDisk = hd + storeType;

  //   const data = {
  //     name: deviceName,
  //     data: {
  //       price: price,
  //       color: deviceColor,
  //       Description: description,
  //       year: year,
  //       generation: generation,
  //       capacity: cap,
  //       ["CPU model"]: cpu,
  //       ["Strap Colour"]: strapCol,
  //       ["Case Size"]: csz,
  //       ["Screen size"]: screenSize,
  //       ["Hard disk size"]: hardDisk,
  //     },
  //   };

  //   if (editingId) {
  //     // Dispatch an edit thunk if editing
  //     dispatch(editWeatherThunk({ id: editingId, data }));

  //     setEditingId(null); // Reset after saving
  //   } else {
  //     // Dispatch an add thunk if creating new
  //     dispatch(addWeatherThunk(data));
  //   }

  //   // Clear form after submission
  //   resetForm();
  // }

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
      {/* <input
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
      /> */}
      <Button variant="outlined" onClick={() => navigate("/weatherform")}>
        create new
      </Button>
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

      {/* <button onClick={() => dispatch(addWeatherThunk())} variant="outlined">
        Add
      </button> */}
    </div>
  );
}
