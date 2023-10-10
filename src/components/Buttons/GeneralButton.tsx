import { JSX } from "react";

interface GeneralButtonProps {
  text: string;
  type: "submit" | "button" | "reset" | undefined;
  color?: string;
  width?: string;
  onClick?: () => void;
  disabled: boolean;
}

const GeneralButton = ({ text, type, color, width, onClick, disabled }: GeneralButtonProps) => {
  return (
    <button
      type={type}
      disabled={disabled}
      className={`block ${width ? `w-${width}` : "w-full"} rounded-md ${
        color ? `bg-${color}-600` : "bg-blue-600"
      } px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm ${
        color ? `hover:bg-${color}-500` : "hover:bg-blue-500"
      } focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${
        color
          ? `focus-visible:outline-${color}-600`
          : "focus-visible:outline-blue-600"
      } `}
      onClick={onClick}
    >
      {text}
    </button>
  );
}

export default GeneralButton;
