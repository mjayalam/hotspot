import { useState } from 'react'
import FormControlLabel from '@mui/material/FormControlLabel';
import Stack from '@mui/material/Stack';
import MailchimpSubscribe from 'react-mailchimp-subscribe';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
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
const mailchimp_url = 'https://restauranteyamamoto.us20.list-manage.com/subscribe/post?u=fcf44a2f37a1160cf7fcdd4dd&amp;id=c606e4c0db&amp;f_id=00e508e3f0';
//const username = 'captive_portal';
//const password = '5Y*@*hbN45Xmzf';
const username = 'yamamoto';
const password = 'yamamoto';
// const CustomForm = ({status, message, onValidated}) => {
//   let email, name;
//   const submit = () =>
//     email &&
//     name &&
//     email.value.indexOf("@") > -1 &&
//     onValidated({
//       EMAIL: email.value,
//       NAME: name.value
//     });
//   return (
//     <>
//       <h3 className='form-title'>Registrate para conectarte al wifi</h3>
//     <TextField ref={(name) => (_name = name)} sx={{ borderRadius: '5px' }} label="Nombre" value={name} variant="outlined" fullWidth onChange={handleOnChangeName} />
//     <TextField ref={(lastname) => (_lastname = lastname)} className='f-input' label="Apellido" value={lastName} variant="outlined" fullWidth onChange={handleOnChangeLastName} />
//     <TextField ref={(email) => (_email = email)} className='f-input' label="Correo electrónico" type="email" value={email} variant="outlined" fullWidth onChange={handleOnChangeEmail} />
//     <PhoneInputMUI ref={(phone) => (_phone = phone)} onChange={(phone) => setPhone(phone)} />
//     <FormControlLabel  className='font-size-checkbox' control={<Checkbox defaultChecked />} label="Me gustaría recibir correos electrónicos de Yamamoto con ofertas exclusivas, promociones, novedades y ofertas de último minuto." />
//     <Button type="submit" size="large" variant="contained" color="primary">
//       Conectarme
//     </Button>
//     <p className='text-tems'>Al registrarse, aceptas todos los <span className='terms-and-conditions'> Términos y Condiciones. </span></p>
//     <h4>{status}</h4>
//   </>
//   )
// }


function App() {
  let _email, _name, _lastname, _phone;
  const isMobile = useIsMobile();
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [attemptSuccessful, setAttemptSuccesfull] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [phone, setPhone] = useState('');
  const [errorKey, setErrorKey] = useState('key');
  //const [isMailchimpLoading, setIsMailchimpLoading ]
  const styleMainContainer = {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: "wrap",

  }
  const styleMainContainerSuccess = {
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '1rem',
    justifyContent: 'center'
  }
  const btnDiscovery = () => {
    let instaPage = 'https://www.instagram.com/restaurantyamamoto?igsh=dnBzamtzZWV5OG5k'
    const loc = document.location;
    loc.assign(instaPage);
  }
  const submit = (subscribe) => {
    console.log(name, lastName, email, phone);
    subscribe({
      'FNAME': name,
      'LNAME': lastName,
      'EMAIL': email,
      'PHONE': phone
    });
    // email &&
    // name &&
    // email.indexOf("@") > -1 &&
    // subscribe({
    //   FNAME: name,
    //   LNAME: lastName,
    //   EMAIL: email,
    //   PHONE: phone
    // });
  }

  const successConection = (BASE_URL, handleSubmit, btnDiscovery, styleMainContainerSuccess) => {

    return (<div style={styleMainContainerSuccess} >
      <img src={`${BASE_URL}/logo.png`} style={{ width: "230px", height: "120px" }} />
      <Paper id="success-pop" className='formPaper' square={false} elevation={3}>
        <Box
          component="form"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            gap: '1rem',
            margin: '0 auto',
            padding: 2,
  
          }}
        >
          <h1 className={"welcome-title form-title"}>¡Conexión Exitosa!</h1>
          <p className={"welcome-subtitle-pop"}>Bienvenido a nuestra red WiFi. Mientras navegas, descubre nuestras sorpresas especiales del día. <span className='text-red'> ¡Itadakimasu! </span> </p>
          <img className='img-logo-pop'
            src={`${BASE_URL}/promo.png`}
            style={{ marginBottom: '1.3rem' }} />
          <div style={{ display: "flex", justifyContent: 'space-around', width: '100%' }}>
            <Button
              className='btn-form'
              size="large"
              variant="outlined"
              color="#262626">
              Cerrar
            </Button>
            <Button
              className='btn-form'
              onClick={btnDiscovery}
              type="submit"
              size="large"
              variant="contained"
              color="primary">
              Descubrir ahora
            </Button>
  
          </div>
        </Box>
      </Paper>
    </div>)
  }

  const errorConection = (handleSubmit, BASE_URL) => {

    return (
      <Paper id="success-pop" className='formPaper' square={false} elevation={3}>
     
      <Box
        component="form"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          gap: '1rem',
          margin: '0 auto',
          padding: 2,
  
        }}
      >
        <img
          src={`${BASE_URL}/img-icono.png`}
          style={{ height: '76px', width: '60px' }} />
        <h1 className={"error-title"}>Error de Conexión</h1>
        <p className={"welcome-subtitle-pop"}> No es posible completar el registro o la conexión en este momento. Inténtalo nuevamente más tarde. </p>
        <Button
          size="large"
          variant="text"
          color="#262626">
          Ok
        </Button>
      </Box>
      </Paper>
    )
  }
  const errorsText = {
    name: 'Por favor, ingresa un nombre válido.',
    lastname: 'Por favor, ingresa un apellido válido.',
    email: 'Por favor, ingresa un correo electrónico válido.',
    phone: 'Por favor, ingresa un número de teléfono válido.'

  }
  const isValidForm = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\+?(\d{1,3})?[-.\s]?(\(?\d{1,4}\)?)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/;
    if(!/^[a-zA-Z]+$/.test(name)) {
      setErrorKey('name');
      return false;
    }
    if(!/^[a-zA-Z]+$/.test(lastName)) {
      setErrorKey('lastname')
      return false
    }
    if(!emailRegex.test(email)) { 
      setErrorKey('email');
      return false;
    }
    if(!phoneRegex.test(phone)) {
      setErrorKey('phone');
      return false;
    }
    return true;

  }
  const handleSubmit = async (e, subscribe) => {
    e.preventDefault();
    if(!isValidForm()) return;
    const url = 'http://10.10.0.1/login';

    const data = new URLSearchParams({
      username,
      password,
    });

    try {
      setIsLoading(true);
      const response = await fetch(url, {
        //mode: 'no-cors',
        method: "POST",
        headers: {
          //"Content-Type": "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: data.toString(),
      });
      console.log("martin response", response);
      setIsLoading(false);
      setErrorKey('');
    } catch (error) {
      setIsLoading(false);
      submit(subscribe);
      setErrorKey('');
      console.error("Error during login:", error);
    }
  }

  const handleOnChangeName = (e) => setName(e.target.value);
  const handleOnChangeLastName = (e) => setLastName(e.target.value);
  const handleOnChangeEmail = (e) => setEmail(e.target.value);

  return (
    <>
      {isLoading && <Loader />}

      <MailchimpSubscribe
        url={mailchimp_url}
        render={({ subscribe, status, message }) => (
          <>
          { status == null && (
            <div id="main-container" style={{ ...styleMainContainer }} >
            <div>
              <div style={{ textAlign: 'center' }}>
                <img src={`${BASE_URL}/logo.png`} loading="lazy" />
                <div className='welcome-div'>
                  <h1 className={"welcome-title"}>¡BIENVENIDO!</h1>
                  <h3 className={"welcome-subtitle"}>Conéctate y disfruta al máximo.</h3>
                </div>
              </div>
              <Paper className='formPaper' square={false} elevation={3}>
                <Box
                  id="principal-form"
                  component="form"
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                    margin: '0 auto',
                    padding: 2
                  }}
                >
                  <h3 className='form-title'>Registrate para conectarte al wifi</h3>
                  <TextField required error={errorKey === 'name'} helperText={errorKey === 'name' && errorsText[errorKey]}  ref={(name) => (_name = name)} sx={{ borderRadius: '5px' }} label="Nombre" value={name} variant="outlined" fullWidth onChange={handleOnChangeName} />
                  <TextField required error={errorKey === 'lastname'} helperText={errorKey === 'lastname'&& errorsText[errorKey]}  ref={(lastname) => (_lastname = lastname)} className='f-input' label="Apellido" value={lastName} variant="outlined" fullWidth onChange={handleOnChangeLastName} />
                  <TextField required error={errorKey === 'email'} helperText={errorKey === 'email' && errorsText[errorKey]}  ref={(email) => (_email = email)} className='f-input' label="Correo electrónico" type="email" value={email} variant="outlined" fullWidth onChange={handleOnChangeEmail} />
                  <PhoneInputMUI error={errorKey === 'phone'} helperText={errorKey === 'phone' && errorsText[errorKey]}  ref={(phone) => (_phone = phone)} onChange={(phone) => setPhone(phone)} />
                  <FormControlLabel className='font-size-checkbox' control={<Checkbox defaultChecked />} label="Me gustaría recibir correos electrónicos de Yamamoto con ofertas exclusivas, promociones, novedades y ofertas de último minuto." />
                  <Button onClick={(e) => {
                    handleSubmit(e, subscribe, status);
                  }} size="large" variant="contained" color="primary">
                    Conectarme
                  </Button>
                  <p className='text-tems'>Al registrarse, aceptas todos los <span className='terms-and-conditions'> Términos y Condiciones. </span></p>
                </Box>
              </Paper>
            </div>
            </div>
          ) }
        {status === 'loading' && <Loader />}
        {status === 'error' && errorConection(handleSubmit, BASE_URL, message)}
        {status === 'success' && successConection(BASE_URL,  handleSubmit, btnDiscovery, styleMainContainerSuccess)}
          </>

        )}
      />
    </>

  )
}

export default App
