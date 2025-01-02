import { Typography } from "@mui/material";
import { Box, TextField, TableFooter } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { EditUserThunk, getUserThunk } from "../../redux/thunk/allthunks";
import StyledInput from "../../components/StyledInput";
import { useState } from "react";
import { Button } from "@mui/material";

export default function Profile() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [eyecolor, setEyeColor] = useState("");

  const dispatch = useDispatch();
  const { userData, status, error } = useSelector((state) => state.Login);
  useEffect(() => {
    if (status === "idle" || status == "loading") {
      dispatch(getUserThunk());
    }
  }, [status]);

  useEffect(() => {
    {
      userData && setData();
    }
    function setData() {
      setFirstName(userData.firstName);
      setLastName(userData.lastName);
      setEmail(userData.email);
      setPhone(userData.phone);
      setEyeColor(userData.eyeColor);
    }
  }, [status, userData]);

  function editFormHandler() {
    event.preventDefault();
    const data = {
      id: userData.id,
      firstName,
      lastName,
      email,
      phone,
      eyeColor: eyecolor,
    };

    dispatch(EditUserThunk(data));
  }

  if (status === "idle") return <p>loading...</p>;
  if (error) return <p> error loading</p>;

  return (
    userData && (
      <Box>
        <form
          className="w-3/12 mx-auto flex flex-col gap-y-3"
          onSubmit={editFormHandler}
        >
          <TextField
            variant="filled"
            onChange={(e) => setFirstName(e.target.value)}
            value={firstName}
            label="first Name"
          />

          <TextField
            variant="filled"
            label="last Name"
            onChange={(e) => setLastName(e.target.value)}
            value={lastName}
          />

          <TextField
            variant="filled"
            label="Email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />

          <TextField
            variant="filled"
            label="phone"
            onChange={(e) => setPhone(e.target.value)}
            value={phone}
          />

          <TextField
            variant="filled"
            label="eyecolor"
            value={eyecolor}
            onChange={(e) => setEyeColor(e.target.value)}
          />

          <Button
            variant="contained"
            type="submit"
            color="secondary"
            className="hover:font-bold active:bg-blue-500 active:mt-1 "
          >
            Submit
          </Button>
        </form>
      </Box>
    )
  );
}
