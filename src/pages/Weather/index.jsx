import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { weatherThunk, deleteWeatherThunk } from "../../redux/thunk/allthunks";
import Button from "@mui/material/Button";
import {
  Box,
  Input,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
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
        <div className="flex gap-x-3  items-center  h-full">
          <EditIcon onClick={() => handleEdit(params.row)} />
          <DeleteIcon onClick={() => handleOpenDialog(params.id)} />
        </div>
      ),
    },
  ];

  const dispatch = useDispatch();

  // Get saved filter values from localStorage, or set to empty string if not found
  const savedName = localStorage.getItem("name") || "";
  const savedColor = localStorage.getItem("color") || "";
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(savedName);
  const [color, setColor] = useState(savedColor);

  const [editingId, setEditingId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
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
  function handleDelete() {
    dispatch(deleteWeatherThunk(deletingId));
    handleCloseDialog();
  }

  function handleOpenDialog(id) {
    setDeletingId(id);
    setOpen(true);
  }
  function handleCloseDialog() {
    setOpen(false);
    setDeletingId(null);
  }
  function handleEdit(row) {
    if (!editingId) {
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
  let temp = weatherData.find((data) => data.id === deletingId);

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

      {/* DataGrid for displaying filtered data */}
      <Box className="flex justify-end my-2">
        <Button
          variant="outlined"
          color="primary"
          onClick={() => navigate("/weatherform")}
        >
          <Box className="flex items-center gap-x-2 ">
            <i className="fa-solid fa-plus "></i> <p className>create New</p>
          </Box>
        </Button>
      </Box>
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
      <Dialog open={open} onClose={handleCloseDialog} className="px-2">
        <DialogTitle> Delete row</DialogTitle>
        <DialogContentText className="flex flex-col px-3">
          Are you sure you want to delete a specific DialogContent
          <Box sx={{ fontWeight: 900, color: "black" }}>
            {temp ? temp.name : ""}
          </Box>
        </DialogContentText>
        <DialogActions>
          <Button onClick={() => handleCloseDialog()}>cancel</Button>
          <Button onClick={() => handleDelete()}>OK</Button>
        </DialogActions>
      </Dialog>
      {/* <button onClick={() => dispatch(addWeatherThunk())} variant="outlined">
        Add
      </button> */}
    </div>
  );
}
