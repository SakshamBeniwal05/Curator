import React from 'react'
import './button.css'

interface ButtonProps {
  type: 'submit' | 'reset' | 'button';
  work: string;
  width: string;
  bgcolor?: string;
  color?: string;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ type, color, work, width, bgcolor, ...rest }) => {
  const hoverbgColor: string = bgcolor ? `#${bgcolor}` : '#fff';
  const hoverColor: string = color ? '#000' : '#fff'
  return (
    <div>
      <button 
        style={{ 
          width, 
          '--bg-hover-bgcolor': hoverbgColor, 
          '--hover-color': hoverColor 
        } as React.CSSProperties} 
        type={type} 
        {...rest}
      >
        {work}
      </button>
    </div>
  )
}

export default Button