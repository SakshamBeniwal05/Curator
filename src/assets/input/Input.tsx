import React, { type CSSProperties } from 'react';
import './input.css';

interface Props {
  label: string;
  type?: string;
  placeholder?: string;
  style?: CSSProperties;
  custom_div?: React.ReactNode;
}

const Input: React.FC<Props> = ({
  style,
  label,
  type = 'text',
  placeholder = '',
  custom_div,
  ...rest
}) => {
  return (
    <div className="input-wrapper">
      <label htmlFor={label}>{label}</label>
      {custom_div ? null : (
        <input
          style={style}
          id={label}
          placeholder={placeholder}
          type={type}
          {...rest}
        />
      )}
    </div>
  );
};

export default Input;
