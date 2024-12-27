import { IconButton, Link, Typography } from "@mui/material";
import { useNavigate } from "@tanstack/react-router";
import { memo } from "react";
import { GoHome as HomeIcon } from "react-icons/go";

export default function TopBarButtons() {
  const navigate = useNavigate();

  const TechnologyLinks = () => {
    return (
      <div className="flex items-center gap-2 rounded-md border border-stone-200 px-2 py-1">
        <Link href={"https://react.dev/"} target="_blank" rel="noopener noreferrer">
          <img src="./images/react-logo.png" className="h-5 w-5 animate-spin rounded-full" />
        </Link>
        <Typography className="!font-whisper text-stone-600">x</Typography>
        <Link href={"https://dotnet.microsoft.com/"} target="_blank" rel="noopener noreferrer">
          <img src="./images/dotnet-mascot.png" className="h-5 w-5 rounded-full" />
        </Link>
      </div>
    );
  };

  return (
    <div className="flex items-center gap-3">
      <IconButton
        onClick={() => navigate({ to: "/" })}
        aria-label="Go home"
        sx={{ "&:focus": { outline: "none" } }} // remove the focus outline (blue ring)
        size="small"
      >
        <HomeIcon className="h-full text-black" />
      </IconButton>
      <TechnologyLinks />
    </div>
  );
}

export const MemoisedTopBarButtons = memo(TopBarButtons);
