import React from 'react';

export const Loader = () => {
  // Estilo para el fondo oscuro tipo modal
  const overlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fondo semi-transparente oscuro
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000, // Asegura que el modal esté sobre otros elementos
  };

  const dotStyle = {
    width: '10px',
    height: '10px',
    margin: '0 4px',
    backgroundColor: '#fff', // Color blanco para los puntos
    borderRadius: '50%',
    display: 'inline-block',
    animation: 'loadingDots 0.6s infinite ease-in-out',
  };

  return (
    <div style={overlayStyle}>
      <div>
        <span style={{ ...dotStyle, animationDelay: '0s' }}></span>
        <span style={{ ...dotStyle, animationDelay: '0.2s' }}></span>
        <span style={{ ...dotStyle, animationDelay: '0.4s' }}></span>
      </div>
    </div>
  );
};
