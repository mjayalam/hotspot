import { useEffect, useState } from 'react'
import { Card } from './components/Card';
import {TextField } from './components/TextField';
import { Loader } from './components/Loader';
import { Modal } from './components/Modal';
import { useIsMobile } from './hooks/useIsMobile';
import './App.css'

function App() {
  const isMobile = useIsMobile();
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [attemptSuccessful, setAttemptSuccesfull] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const styleMainContainer = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
  const styleMainContainerSuccess = {
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'space-between'
  }
  const handleOnSubmit = async (e) => {
    console.log("martin",e);

    e.preventDefault();
    const url = '8b000ab778fd.sn.mynetname.net'
    try {
      setIsLoading(true);
      const res = await fetch(url);
      // const res = await fetch(url, {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     //'Authorization': 'Basic ' + btoa('username:password') // Reemplaza con tus credenciales
      //   },
      //   body: JSON.stringify({name})
      // });

      if (!res.ok) {
        setIsLoading(false);

        throw new Error('Network response was not ok');
      }

      const result = await res.json(); // Asume que el router MikroTik responde con JSON
      //setResponse(result);
      setAttemptSuccesfull(true);
      setIsLoading(false);

    } catch (error) {
      setAttemptSuccesfull(true);

      // setIsModalOpen(true);
      setIsLoading(false);

      console.error('Error en la solicitud:', error);
      //setResponse({ error: error.message });
    }
  }
 
  const handleOnChangeName = (e) => setName(e.target.value);
  const handleOnChangeLastName = (e) => setLastName(e.target.value);
  const handleOnChangeEmail = (e) => setEmail(e.target.value);
  console.log("martin", isMobile);
  if(attemptSuccessful !== null && attemptSuccessful) {
    return (
      <div style={styleMainContainerSuccess} >
        <img src={"/src/assets/logo.png"} style={{width: "289px",  height: "147px"}}/>
          <Card title={"Conexión exitosa"} subtitle='Bienvenido a nuestra red WiFi. Mientras navegas, descubre nuestras sorpresas especiales del día. ¡Itadakimasu!'>
            <div className={"success-img"} style={{width: '400px', height: '100px'}}> </div>          
            <button>Cerrar</button>
            <button>Descrubrir ahora</button>
          </Card>
      </div>
    )
  }
  return (
    <div style={!isMobile ? { ...styleMainContainer} : {}} >
      {isLoading && <Loader />}
      <div style={{textAlign: 'center'}}>
        <img src={"/src/assets/logo.png"}/>
        <h1 className={"welcome-title"}>¡BIENVENIDO!</h1>
        <h3 className={"welcome-subtitle"}>Conéctate y disfruta al máximo.</h3>
       </div>
     <Card title={"Registrate para conectarte al wifi"}>
        <form onSubmit={(e) => handleOnSubmit(e)}>
          <TextField placeholder='Nombre' value={name} onChange={handleOnChangeName} />
          <TextField placeholder='Apellido' value={lastName} onChange={handleOnChangeLastName} />
          <TextField type="email" placeholder='Email' value={email} onChange={handleOnChangeEmail} />
          <button>Conectarme</button>
        </form>
      </Card>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        "Algo Salio mal"
      </Modal>
     
    </div>
   
  )
}

export default App
