import { Button, ButtonGroup, Divider } from "@mui/material";
import { FaAngleLeft as ArrowLeft, FaAngleRight as ArrowRight } from "react-icons/fa";

export default function Inputs() {
  return (
    <>
      <ButtonGroup
        size="small"
        variant="contained"
        aria-label="Buttons to navigate onboarding"
        disableElevation
        sx={{
          backgroundColor: "#0391ca",
          "& .MuiButtonGroup-grouped": {
            fontWeight: "bold",
            borderRight: "none",
            textTransform: "none",
            backgroundColor: "inherit",
          },
        }}
      >
        <Button>
          <ArrowLeft />
        </Button>
        <Button>
          <ArrowRight />
        </Button>
        <Divider orientation="vertical" variant="middle" flexItem sx={{ backgroundColor: "#006e9b" }} />
        <Button>Skip</Button>
      </ButtonGroup>
    </>
  );
}
