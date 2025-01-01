import { Typography } from "@mui/material";
import { Box } from "@mui/material";
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
  const [phone, setPhone] = useState(0);
  const [eyecolor, setEyeColor] = useState("");

  const dispatch = useDispatch();
  const { userData, status, error } = useSelector((state) => state.Login);
  useEffect(() => {
    if (status === "loading" || status === "idle") {
      dispatch(getUserThunk());
    }
  }, [status]);

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
        <Typography>{"fn=" + userData && userData.firstName}</Typography>
        <Typography>{"ln=" + userData && userData.lastName}</Typography>
        <Typography>{"email=" + userData && userData.email}</Typography>
        <Typography>{"phone=" + userData && userData.phone}</Typography>
        <Typography>{"eye=" + userData && userData.eyeColor}</Typography>
        <form
          className="w-3/12 mx-auto flex flex-col gap-y-3"
          onSubmit={editFormHandler}
        >
          <StyledInput
            placeholder="first Name"
            onChange={(e) => setFirstName(e.target.value)}
            value={firstName}
          ></StyledInput>
          <StyledInput
            placeholder="last Name"
            onChange={(e) => setLastName(e.target.value)}
            value={lastName}
          ></StyledInput>
          <StyledInput
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          ></StyledInput>
          <StyledInput
            placeholder="phone"
            type="number"
            onChange={(e) => setPhone(e.target.value)}
            value={phone}
          ></StyledInput>
          <StyledInput
            placeholder="eyecolor"
            value={eyecolor}
            onChange={(e) => setEyeColor(e.target.value)}
          ></StyledInput>
          <Button variant="contained" type="submit" color="primary">
            Submit
          </Button>
        </form>
      </Box>
    )
  );
}
