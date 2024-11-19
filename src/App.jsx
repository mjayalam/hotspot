import {  useState } from 'react'
import { Card } from './components/Card';
import { FormControl } from '@mui/material';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { PhoneInputMUI } from './components/PhoneInput';
import { Loader } from './components/Loader';
import { Modal } from './components/Modal';
import { useIsMobile } from './hooks/useIsMobile';
import './App.css';
import 'react-international-phone/style.css';


const BASE_URL = '/images';
const username =  'captive_portal';
const password = '5Y*@*hbN45Xmzf';
function App() {
  const isMobile = useIsMobile();
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [attemptSuccessful, setAttemptSuccesfull] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [phone, setPhone] = useState('');
  const styleMainContainer = {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: "wrap",
    justifyContent: 'space-between'
  }
  const styleMainContainerSuccess = {
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'space-between'
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    //const url = 'http://189.174.109.137/login';
    const url = 'https://nodejs-serverless-function-express-six-pi.vercel.app/api/hello.ts'
    const data = new URLSearchParams({
      username,
      password,
    });
    console.log(data.toString());
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          //"Content-Type": "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: data.toString(),
      });
      console.log("martin response", response);
      // if (response.redirected) {
      //   console.log("Login successful! Redirecting to:", response.url);
      //   window.location.href = response.url; // Follow the redirect
      // } else {
      //   const text = await response.text();
      //   console.log("Login response:", text);
      // }
    } catch (error) {
      console.error("Error during login:", error);
    }



    // try {
    //   setIsLoading(true);
    //   const res = await fetch(url,{
    //     mode: 'no-cors',
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "'application/x-www-form-urlencoded'",
    //       "Authorization": "Basic " + btoa(`${username}:${password}`)
    //     },
    //     body: JSON.stringify({username, password})});
    //   // const res = await fetch(url, {
    //   //   method: 'POST',
    //   //   headers: {
    //   //     'Content-Type': 'application/json',
    //   //     //'Authorization': 'Basic ' + btoa('username:password') // Reemplaza con tus credenciales
    //   //   },
    //   //   body: JSON.stringify({name})
    //   // });
    //   console.log("martin", res);

    //   if (!res.ok) {
    //     setIsLoading(false);

    //     throw new Error('Network response was not ok');
    //   }
    //   //const result = await res.json(); // Asume que el router MikroTik responde con JSON
    //   //setResponse(result);
    //   setAttemptSuccesfull(true);
    //   setIsLoading(false);

    // } catch (error) {
    //   setAttemptSuccesfull(true);

    //   // setIsModalOpen(true);
    //   setIsLoading(false);

    //   console.error('Error en la solicitud:', error);
    //   //setResponse({ error: error.message });
    // }
  }
 
  const handleOnChangeName = (e) => setName(e.target.value);
  const handleOnChangeLastName = (e) => setLastName(e.target.value);
  const handleOnChangeEmail = (e) => setEmail(e.target.value);
  if(attemptSuccessful !== null && attemptSuccessful) {
    return (
      <div style={styleMainContainerSuccess} >
        <img src={`${BASE_URL}/logo.png`} style={{width: "289px",  height: "147px"}}/>
          <Card title={"Conexión exitosa"} subtitle='Bienvenido a nuestra red WiFi. Mientras navegas, descubre nuestras sorpresas especiales del día. ¡Itadakimasu!'>
            <div className={"success-img"} style={{width: '400px', height: '100px'}}> </div>          
            <button>Cerrar</button>
            <button>Descrubrir ahora</button>
          </Card>
      </div>
    )
  }
  return (
    <div id="main-container" style={{...styleMainContainer}} >
      {isLoading && <Loader />}
      <div style={{textAlign: 'center'}}>
        <img src={`${BASE_URL}/logo.png`} loading="lazy"/>
        <h1 className={"welcome-title"}>¡BIENVENIDO!</h1>
        <h3 className={"welcome-subtitle"}>Conéctate y disfruta al máximo.</h3>
       </div>
     
       {/* <Stack direction="column" spacing={2} gap={5}>
      <Paper square={false}>
      <h3>Registrate para conectarte al wif</h3>
          <TextField label="Nombre" required value={name} variant="outlined" fullWidth onChange={handleOnChangeName} />
          <TextField label="Apellido" required value={lastName} variant="outlined" fullWidth onChange={handleOnChangeLastName} />
          <TextField label="Email" required type="email" value={email}  variant="outlined" fullWidth onChange={handleOnChangeEmail} />
          <PhoneInputMUI onChange={(phone) => setPhone(phone)}/>
          
          <Button type="submit" size="large" variant="contained" color="primary">
            Conectarme
          </Button>
      </Paper> 
   
    </Stack>*/}
<Paper square={false}>
     <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        margin: '0 auto',
        padding: 2
      }}
    >
        
          <h3>Registrate para conectarte al wifi</h3>
          <TextField label="Nombre"  value={name} variant="outlined" fullWidth onChange={handleOnChangeName} />
          <TextField label="Apellido"  value={lastName} variant="outlined" fullWidth onChange={handleOnChangeLastName} />
          <TextField label="Correo electrónico"  type="email" value={email}  variant="outlined" fullWidth onChange={handleOnChangeEmail} />
          <PhoneInputMUI onChange={(phone) => setPhone(phone)}/>
          
          <Button type="submit" size="large" variant="contained" color="primary">
            Conectarme
          </Button>
         
        </Box>
        </Paper>

     
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        "Algo Salio mal"
      </Modal>
     
    </div>
   
  )
}

export default App
