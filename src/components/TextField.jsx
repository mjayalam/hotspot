import React, { useState } from 'react';

export const TextField = ({ label, onChange, value, ...rest }) => {
  const [isFocused, setIsFocused] = useState(false);

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    marginBottom: '20px',
    width: '100%',
    maxWidth: '300px',
  };

  const labelStyle = {
    position: 'absolute',
    top: value || isFocused ? '-10px' : '10px',
    left: '10px',
    fontSize: value || isFocused ? '12px' : '16px',
    color: isFocused ? '#3f51b5' : '#aaa',
    backgroundColor: '#fff',
    padding: '0 4px',
    transition: '0.2s ease all',
    pointerEvents: 'none',
  };

  const inputStyle = {
    padding: '10px',
    paddingTop: '18px',
    fontSize: '16px',
    border: `1px solid ${isFocused ? '#3f51b5' : '#ccc'}`,
    borderRadius: '4px',
    outline: 'none',
    transition: 'border-color 0.2s ease-in-out',
    width: '100%',
  };

  return (
    <div style={containerStyle}>
      <label style={labelStyle}>{label}</label>
      <input
        type="text"
        value={value}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        style={inputStyle}
        {...rest}
      />
    </div>
  );
};

