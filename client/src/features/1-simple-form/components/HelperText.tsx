import { ReactNode } from "react";

type HelperTextProps = {
  icon?: ReactNode;
  text?: string;
};

export default function HelperText(props: HelperTextProps) {
  const { icon, text } = props;
  return (
    <span className="flex h-5 items-center gap-1">
      {icon && <span className="mb-[2px]">{icon}</span>}
      {text && text.trim() !== "" && <span className="truncate">{text}</span>}
    </span>
  );
}
