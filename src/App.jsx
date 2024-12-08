import { useState } from 'react'
import FormControlLabel from '@mui/material/FormControlLabel';
import Modal from '@mui/material/Modal';
import MailchimpSubscribe from 'react-mailchimp-subscribe';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';
import { PhoneInputMUI } from './components/PhoneInput';
import { Loader } from './components/Loader';

import './App.css';
import 'react-international-phone/style.css';
import './fonts.css';

const BASE_URL = '/images';
const mailchimp_url = 'https://restauranteyamamoto.us20.list-manage.com/subscribe/post?u=fcf44a2f37a1160cf7fcdd4dd&amp;id=c606e4c0db&amp;f_id=00e508e3f0';

const username = 'yamamoto';
const password = 'yamamoto';

function App() {
  let _email, _name, _lastname, _phone;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^\+?(\d{1,3})?[-.\s]?(\(?\d{1,4}\)?)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/;
  const nameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/;
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [phone, setPhone] = useState('');
  const [errorKey, setErrorKey] = useState('key');
  const [termsandConditions, setTermsandConditions] = useState(false);
  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const styleMainContainer = {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: "wrap",
  }

  const submit = (subscribe) => {
    subscribe({
      'FNAME': name,
      'LNAME': lastName,
      'EMAIL': email,
      'PHONE': phone
    });
  }

  const SuccessConection = () => {

    return (<div className="main-container-success" >
      <img className='logo-size' src={`${BASE_URL}/logo.png`} />
      <Paper id="success-pop" className='formPaper' square={false} elevation={3}>
        <Box
          className='success-box'
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
          <h1 className={"welcome-title form-title-conection "}>¡Conexión Exitosa!</h1>
          <p className={"welcome-subtitle-pop"}>Disfruta de tu experiencia en Yamamoto al máximo.</p>
          {/* <img className='img-logo-pop '
            src={`${BASE_URL}/promo.png`}
            style={{ marginBottom: '1.3rem' }} /> */}
          <div style={{ display: "none", justifyContent: 'space-around', width: '100%' }}>
            <Button
              className='btn-form'
              size="large"
              variant="outlined"
              color="#262626"
              onClick={() => window.location.href = 'https://www.google.com'}
            >
              Cerrar
            </Button>
            <Button
              className='btn-form'
              onClick={() => window.location.href = 'https://www.instagram.com/restaurantyamamoto'}
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

  const ErrorConnection = ({ resetForm, setShowError }) => {
    const handleErrorButton = () => {
      resetForm();
      setShowError(false);
    }

    return (
      <div className="main-container-success">
        <img className='logo-size' src={`${BASE_URL}/logo.png`} />
        <Paper id="error-pop" className='formPaper' square={false} elevation={3}>

          <Box
            component="form"
            id='error-conection'
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              width: '100%',
              gap: '1rem',
              margin: '0 auto',
              padding: 2,

            }}
          >
            <img
              src={`${BASE_URL}/img-icono.png`}
              style={{ height: '64px', width: '64px' }} />
            <h1 className={"error-title"}>Error de Conexión</h1>
            <p className={"error-message"}> No es posible completar el registro o la conexión en este momento. Inténtalo nuevamente más tarde. </p>
            <Button
              className='ok-btn'
              size="large"
              variant="text"
              color="#262626"
              onClick={handleErrorButton}
            >
              Ok
            </Button>
          </Box>
        </Paper>
      </div>

    )
  }
  const errorsText = {
    name: 'Por favor, ingresa un nombre válido.',
    lastname: 'Por favor, ingresa un apellido válido.',
    email: 'Por favor, ingresa un correo electrónico válido.',
    phone: 'Por favor, ingresa un número de teléfono válido.'

  }
  const isValidForm = () => {


    if (!nameRegex.test(name)) {
      setErrorKey('name');
      return false;
    }
    if (!nameRegex.test(lastName)) {
      setErrorKey('lastname')
      return false
    }
    if (!emailRegex.test(email)) {
      setErrorKey('email');
      return false;
    }
    if (!phoneRegex.test(phone) || (phone.length - 1) < 7) {
      setErrorKey('phone');
      return false;
    }
    return true;

  }
  const handleSubmit = async (e, subscribe) => {
    e.preventDefault();
    if (!isValidForm()) return;
    setIsLoading(true);
    setErrorKey('');

    const url = 'http://10.10.0.1/login';
    const url2 = 'http://10.10.0.1/status';
    const data = new URLSearchParams({
      username,
      password,
    });

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: data.toString(),
      });
      const response2 = await fetch(url2, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: data.toString(),
      });
      console.log("martin response", response);
      console.log("martin response 2", response2);
      if (response2.url === url) {
        setShowError(true);
      } else if (response2.url === url2 && response2.status === 200) {
        setShowSuccess(true);
        submit(subscribe);
        setTimeout(() => {
          window.location.href = 'https://www.restauranteyamamoto.com';
        },2500)
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setShowError(true);
      console.error("Error during login:", error);
    }
  }

  const handleTermsandConditions = () => setTermsandConditions(true)

  const handleCloseTermsandConditions = () => setTermsandConditions(false);


  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const handleOnChangeName = (e) => {
    if (nameRegex.test(e.target.value)) {
      setErrorKey('');
    }
    setName(e.target.value);
  }
  const handleOnChangeLastName = (e) => {
    if (nameRegex.test(e.target.value)) {
      setErrorKey('');
    }
    setLastName(e.target.value);
  }
  const handleOnChangeEmail = (e) => {
    if (emailRegex.test(email)) {
      setErrorKey('');
    }
    setEmail(e.target.value);
  }
  const resetForm = () => {
    setName('');
    setLastName('');
    setEmail('');
  }
  return (
    <>

      {isLoading && <Loader />}
      { showError && <ErrorConnection resetForm={resetForm} setShowError={setShowError} />}
      {console.log("martin", showSuccess, showError)}
      { showSuccess  && <SuccessConection />}
      <MailchimpSubscribe
        url={mailchimp_url}
        render={({ subscribe, status, message }) => (
          <>
            {status == null && (!showError) && (
              <div id="main-container" style={{ ...styleMainContainer }} >

                <div className='div-logos'>
                  <img className='logo-form' src={`${BASE_URL}/logo.png`} loading="lazy" />
                  <div className='welcome-div'>
                    <h1 className="welcome-title title-form">¡Bienvenido!</h1>
                    <h3 className=" subtitle-form">Conéctate y disfruta al máximo.</h3>
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
                    <h3 className='form-title'>Regístrate para conectarte al wifi</h3>
                    <TextField
                      required
                      size="small"
                      error={errorKey === 'name'}
                      helperText={errorKey === 'name' && errorsText[errorKey]}
                      ref={(name) => (_name = name)}
                      sx={{ borderRadius: '5px' }}
                      label="Nombre"
                      value={name}
                      variant="outlined"
                      fullWidth
                      onChange={handleOnChangeName}
                    />
                    <TextField
                      required
                      size="small"
                      error={errorKey === 'lastname'}
                      helperText={errorKey === 'lastname' && errorsText[errorKey]}
                      ref={(lastname) => (_lastname = lastname)}
                      className='f-input'
                      label="Apellido"
                      value={lastName}
                      variant="outlined" fullWidth
                      onChange={handleOnChangeLastName}
                    />
                    <TextField
                      required
                      size="small"
                      error={errorKey === 'email'}
                      helperText={errorKey === 'email' && errorsText[errorKey]}
                      ref={(email) => (_email = email)}
                      className='f-input'
                      label="Correo electrónico"
                      type="email"
                      value={email}
                      variant="outlined"
                      fullWidth
                      onChange={handleOnChangeEmail}
                    />
                    <PhoneInputMUI
                      size="small"
                      error={errorKey === 'phone'}
                      helperText={errorKey === 'phone' && errorsText[errorKey]}
                      ref={(phone) => (_phone = phone)}
                      onChange={(phone) => {
                        if (phoneRegex.test(phone) && (phone.length - 1) >= 7) {
                          setErrorKey('');
                        }
                        setPhone(phone);
                      }}
                    />
                    <FormControlLabel
                      disabled
                      className='font-size-checkbox'
                      control={<Checkbox defaultChecked />}
                      label="Me gustaría recibir correos electrónicos de Yamamoto con ofertas exclusivas, promociones, novedades y ofertas de último minuto."
                    />
                    <Button
                      size="medium"
                      className='btn-formulario'
                      onClick={(e) => {
                        handleSubmit(e, subscribe, status);
                      }}
                      variant="contained"
                      color="primary">
                      Conectarme
                    </Button>
                    <p className='text-tems'>Al registrarse, aceptas todos los <span className='terms-and-conditions' onClick={handleTermsandConditions}> Términos y Condiciones. </span></p>
                    <Modal
                      open={termsandConditions}
                      onClose={handleCloseTermsandConditions}
                      aria-labelledby="transition-modal-title"
                      aria-describedby="transition-modal-description"
                      sx={{
                        display: 'flex',
                        p: 1,
                        alignItems: 'center',
                        justifyContent: 'center',

                      }}
                    >

                      <Box className='termsModal' sx={style}>
                        <h3>Términos y Condiciones del Portal de Acceso Wi-Fi de Yamamato Restaurante Japonés </h3> <br></br>
                        Bienvenido al servicio gratuito de red inalámbrica para huéspedes de Yamamato Restaurante Japonés (en adelante, "Yamamato", "nosotros" o "nuestro"). Este servicio proporciona acceso temporal a internet desde su dispositivo personal (computadora, tableta o móvil) mientras se encuentra en el restaurante. Al acceder a nuestra red Wi-Fi (la “Red”), usted acepta estos Términos y Condiciones. Si no está de acuerdo, no podrá utilizar la Red.
                        Nos reservamos el derecho de modificar, suspender o discontinuar este servicio en cualquier momento sin previo aviso.

                        <h3> 1. Uso del Servicio</h3>
                        El acceso a la Red es gratuito y está destinado exclusivamente para fines personales y no comerciales.
                        Está prohibido el uso de la Red para:
                        Actividades ilegales, fraudulentas, abusivas o acosadoras.
                        Acceder a contenido ofensivo, inapropiado o explícito.
                        Transmitir, recibir o almacenar material protegido por derechos de autor sin autorización.
                        <br></br>
                        <h3> 2. Privacidad y Seguridad </h3>
                        Las conexiones realizadas a través de la Red no son seguras. Le recomendamos evitar la transmisión de información sensible, como contraseñas o datos bancarios.
                        Yamamato podrá monitorear la actividad en la Red por razones de seguridad y para garantizar el cumplimiento de estos Términos. Sin embargo, no garantizamos la privacidad de las actividades realizadas en la Red.
                        <br></br>
                        <h3>3. Restricciones de Uso</h3>
                        Al utilizar la Red, usted se compromete a:
                        No utilizar la Red para dañar, desactivar o sobrecargar el sistema.
                        No intentar obtener acceso no autorizado a sistemas o redes conectadas.
                        No introducir virus, malware, spyware o cualquier software dañino.
                        No transmitir contenido ofensivo, difamatorio o que promueva odio, violencia o discriminación.
                        No usar la Red para enviar spam, correos masivos o promociones no autorizadas.
                        No realizar ingeniería inversa ni intentar hackear el servicio.
                        <br></br>
                        <h3>4. Limitación de Responsabilidad</h3>
                        Yamamato no se responsabiliza por daños directos, indirectos o consecuentes que resulten del uso de la Red, como pérdida de datos, interrupción del servicio o problemas con dispositivos personales.
                        El uso de la Red corre completamente bajo su propio riesgo.
                        <br></br>
                        <h3>5. Cambios en los Términos</h3>
                        Yamamato se reserva el derecho de modificar estos Términos en cualquier momento. Le recomendamos revisarlos regularmente. Al continuar usando la Red después de la actualización de los Términos, usted acepta cumplir con las modificaciones realizadas.
                        <br></br>
                        <h3>6. Conducta del Usuario</h3>
                        El uso de la Red implica aceptar las siguientes reglas:
                        No causar molestias, inconvenientes ni ansiedad innecesaria a otros usuarios.
                        No hacerse pasar por otra persona o entidad.
                        No utilizar la Red para actividades comerciales, promociones o sorteos no autorizados.
                        <br></br>
                        <h3>7. Cancelación del Acceso</h3>
                        Nos reservamos el derecho de suspender o cancelar su acceso a la Red en caso de violación de estos Términos o si consideramos que su actividad representa un riesgo para la seguridad o integridad del servicio.
                        <br></br>
                        <h3>Advertencia de Seguridad</h3>
                        El acceso a internet proporcionado por Yamamato es una cortesía y está sujeto a las limitaciones de seguridad inherentes a cualquier red pública. Al utilizar este servicio, usted reconoce los riesgos asociados y asume la responsabilidad por su uso.
                        Gracias por visitar Yamamato Restaurante Japonés.
                        Esperamos que disfrute de nuestra conexión Wi-Fi y tenga una experiencia gastronómica excepcional.
                      </Box>
                    </Modal>
                  </Box>
                </Paper>

              </div>
            )}
            {console.log("martin subscribe", status)}
            {/* {status === 'loading' && <Loader />}
            {status === 'error' && ErrorConnection(handleSubmit, BASE_URL, message)}
            {status === 'success' && SuccessConection(BASE_URL, handleSubmit, btnDiscovery, styleMainContainerSuccess)} */}
          </>

        )}
      />
    </>

  )
}

export default App
