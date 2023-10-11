interface GeneralButtonProps {
  text: string;
  type: "submit" | "button" | "reset" | undefined;
  color?: string;
  width?: string;
  onClick?: any;
  disabled: boolean;
}



const GeneralButton = ({ text, type, color, width, onClick, disabled }: GeneralButtonProps) => {

  const colorClasses = () => {
    switch(color) {
        case 'green': return 'bg-green-600 hover:bg-green-500 focus-visible:outline-green-600';
        case 'blue': return 'bg-blue-600 hover:bg-blue-500 focus-visible:outline-blue-600';
        default: return 'bg-blue-600 hover:bg-blue-500 focus-visible:outline-blue-600';
    }
  }


  return (
    <button
      type={type}
      disabled={disabled}
      className={`mt-3 block cursor-pointer ${width || 'w-full'} rounded-md ${colorClasses()} px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm`}
      onClick={onClick}
    >
      {text}
    </button>
  );
}

export default GeneralButton;
