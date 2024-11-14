import React, { useState } from 'react';

export const Card = ({title = '', subtitle = '', children}) => {
  const cardStyle = {
    padding: '20px',
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    maxWidth: '390px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  };

  const imageStyle = {
    width: '100%',
    borderRadius: '8px',
  };

  const titleStyle = {
    fontSize: '28px',
    fontWeight: '700',
    lineHeight: '35.42px',
    color: '#E12F32'
  };

  const subtitleStyle = {
    fontSize: '16px',
    fontWeight: '400',
    lineHeight: '20.83px',
    color:'#4D4D4D'

  };

  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <div
      style={cardStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
    
      <h3 style={titleStyle}>{title}</h3>
      <h4 style={subtitleStyle}>{subtitle}</h4>
      {children}
    </div>
  );
};

