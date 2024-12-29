import { IconButton, Link, Tooltip, Typography } from "@mui/material";
import { useNavigate } from "@tanstack/react-router";
import { ClassValue } from "clsx";
import { memo } from "react";
import { GoHome as HomeIcon } from "react-icons/go";
import { cn } from "~/shared/helpers/classname-helpers";

export default function TopBarButtons(props: { className?: ClassValue }) {
  const { className } = props;
  const navigate = useNavigate();

  const TechnologyLinks = () => {
    return (
      <Tooltip title="Made with React & .NET">
        <div className="flex items-center gap-2 rounded-md border border-stone-200 px-2 py-1">
          <Link href={"https://react.dev/"} target="_blank" rel="noopener noreferrer">
            <img src="/images/react-logo.png" className="h-5 w-5 animate-spin" />
          </Link>
          <Typography className="!font-graffiti text-stone-600">x</Typography>
          <Link href={"https://dotnet.microsoft.com/"} target="_blank" rel="noopener noreferrer">
            <img src="/images/dotnet-mascot.png" className="h-5 w-5 duration-150 hover:scale-105" />
          </Link>
        </div>
      </Tooltip>
    );
  };

  return (
    <div className={cn(className, "flex items-center gap-3")}>
      <IconButton
        size="small"
        aria-label="Go home"
        onClick={() => navigate({ to: "/" })}
        sx={{ borderRadius: "5px", "&:focus": { outline: "none" } }} // remove the focus outline (blue ring)
      >
        <HomeIcon className="h-full text-black" />
      </IconButton>
      <TechnologyLinks />
    </div>
  );
}

export const MemoisedTopBarButtons = memo(TopBarButtons);
