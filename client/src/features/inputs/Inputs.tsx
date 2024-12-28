import { Button, ButtonGroup, Divider } from "@mui/material";
import { useState } from "react";
import { FaAngleLeft as ArrowLeft, FaAngleRight as ArrowRight } from "react-icons/fa";

export default function Inputs() {
  const [currStep, setCurrStep] = useState<number>(1);
  const totalStepCount = 3;
  const handleGoBackwards = () => setCurrStep((prev) => Math.max(prev - 1, 1));
  const handleGoForwards = () => setCurrStep((prev) => Math.min(prev + 1, totalStepCount));

  return (
    <ButtonGroup
      size="small"
      variant="contained"
      aria-label="Buttons to navigate onboarding"
      disableElevation
      sx={{
        backgroundColor: "#0391ca",
        "& .MuiButtonGroup-grouped": {
          backgroundColor: "inherit",
          textTransform: "none",
          borderRight: "none",
          fontWeight: "bold",
        },
      }}
    >
      <div className="grid w-full select-none place-content-center pl-1 text-sm font-bold text-white">
        {currStep}/{totalStepCount}
      </div>
      <Button onClick={handleGoBackwards}>
        <ArrowLeft />
      </Button>
      <Button onClick={handleGoForwards}>
        <ArrowRight />
      </Button>
      <Divider orientation="vertical" variant="middle" flexItem sx={{ backgroundColor: "#006e9b" }} />
      <Button>Skip</Button>
    </ButtonGroup>
  );
}
