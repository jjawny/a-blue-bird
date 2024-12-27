import { IconButton, Link, Typography } from "@mui/material";
import { useNavigate } from "@tanstack/react-router";
import { GoHome as HomeIcon } from "react-icons/go";

export default function TopBarButtons() {
  const navigate = useNavigate();

  return (
    <div className="flex items-center gap-3">
      <IconButton
        onClick={() => navigate({ to: "/" })}
        aria-label="Go home"
        sx={{ "&:focus": { outline: "none" } }} // remove the focus outline (blue ring)
      >
        <HomeIcon className="h-full text-stone-400" />
      </IconButton>
      <Link href={"https://react.dev/"} target="_blank" rel="noopener noreferrer">
        <img src="./images/react-logo.png" className="h-5 w-5 rounded-full" />
      </Link>
      <Typography className="!font-whisper text-stone-600">x</Typography>
      <Link href={"https://dotnet.microsoft.com/"} target="_blank" rel="noopener noreferrer">
        <img src="./images/dotnet-mascot.png" className="h-5 w-5 rounded-full" />
      </Link>
    </div>
  );
}
