import React from 'react';

interface ButtonProps {
  onClick: () => void;
  backgroundColor: string;
  textColor: string;
  text: string;
  icon?: React.ReactNode;
  width?: string;
  height?: string;
  shadow?: boolean;
}

const Button: React.FC<ButtonProps> = ({ onClick, backgroundColor, textColor, text, icon, width = 'auto', height = 'auto', shadow = false }) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2 hover:cursor-pointer rounded-lg ${backgroundColor} ${textColor} w-${width} h-${height} hover:opacity-80 focus:outline-none 
        ${shadow ? 'shadow-md shadow-neutral-700/20 hover:shadow-md  hover:shadow-neutral-700/40' : ''} 
         focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none`}
    >
      {icon}
      <span className='text-sm font-bold'>{text}</span>
    </button>
  );
};

export default Button;
