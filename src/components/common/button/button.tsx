import React, { ReactElement, useState } from 'react';
import { Button, ButtonProps, theme } from 'antd';
import resolveConfig from 'tailwindcss/resolveConfig';
import tailwindConfig from '../../../../tailwind.config'; // Adjust the path according to your structure

const fullConfig = resolveConfig(tailwindConfig) as TailwindConfig;
const { useToken } = theme;

export const CustomButton = (props: CustomButtonProps & ButtonProps): ReactElement => {
  const [isHovered, setIsHovered] = useState(false);


   // Access colors from the Tailwind config dynamically
  //  const primaryColor = fullConfig.theme?.extend?.colors?.['pl-primary'];
   const hoverColor = fullConfig.theme?.extend?.colors?.['pl-primay-hover'];
   const hoverRedColor = fullConfig.theme?.extend?.colors?.['pl-red-hover'];

  // Dynamically set styles based on hover state
  const myStyle: React.CSSProperties = {
    backgroundColor: isHovered ? props.hoverColor || hoverColor : props.defaultColor , // Change background color on hover
    // color: isHovered ? props.hoverTextColor || 'white' : props.textColor || 'white', // Change text color on hover
    boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px',
    // width: '100%',
    ...props.style, // Merge additional styles passed via props
  };

  return (
    <Button

      style={myStyle}
      onMouseEnter={() => setIsHovered(true)}  // Set hover state when mouse enters
      onMouseLeave={() => setIsHovered(false)} // Reset hover state when mouse leaves
      
      {...props}
    >
      {props.text}
    </Button>
  );
};

interface CustomButtonProps {
  text: string;
  defaultColor?: string; // Default background color
  hoverColor?: string;   // Background color on hover
  textColor?: string;    // Text color
  hoverTextColor?: string; // Text color on hover
}

interface TailwindConfig {
  theme: {
    extend: {
      colors: {
        'pl-primary': string;
        'pl-primay-hover': string;
        'pl-red-hover':string
      };
    };
  };
}