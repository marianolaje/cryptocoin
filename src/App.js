import React, {useState, useEffect, Fragment} from 'react';
import Formulario from './components/Formulario.js'
import Cotizacion from './components/Cotizacion.js'
import Spinner from './components/Spinner.js'
import axios from 'axios'
import { useTranslation } from 'react-i18next';
import styled from '@emotion/styled';
import imagen from './cryptomonedas.png'

const Contenedor = styled.div`
 max-width: 900px;
 margin: 0 auto;
 @media(min-width: 992px){
   display: grid;
   grid-template-columns: repeat(2, 1fr);
   column-gap: 2rem;
 }
`
const Imagen = styled.img`
  max-width: 100%;
  margin-top: 5rem;
`
const Heading = styled.h1`
  font-family: "Bebas Neue", cursive;
  color: white;
  text-align: left;
  font-weight: 700;
  font-size: 50px;
  margin-bottom:50px;
  margin-top: 80px;
`
const Lang = styled.div`
  position: absolute;
  right: 0px;
  top: 20px;
`
const Button = styled.div`
  display:inline-block;
  padding:0.7em 1.7em;
  margin:0 0.3em 0.3em 0;
  border-radius:0.2em;
  box-sizing: border-box;
  text-decoration:none;
  font-family:'Roboto',sans-serif;
  font-weight:400;
  color:#FFFFFF;
  background-color:#3369ff;
  box-shadow:inset 0 -0.6em 1em -0.35em rgba(0,0,0,0.17),inset 0 0.6em 2em -0.3em rgba(255,255,255,0.15),inset 0 0 0em 0.05em rgba(255,255,255,0.12);
  text-align:center;
  position:relative;
`

function App() {
  console.log("Developed by Mariano Laje Arrigoni")

//funcion para el Translate
  const { t, i18n } = useTranslation();
  function handleClick(lang){
    i18n.changeLanguage(lang);
  }

//trayendo los datos de los CustomHooks
  const [monedasMain, setMonedasMain] = useState('');
  const [cryptoMain, setCryptoMain] = useState('');
  const [resultado, setResultado] = useState({});
  const [cargando, setCargando] = useState(false);

  useEffect(()=>{
    const cotizarCriptomoneda = async () => {
      //evitamos la ejecución de la 1ra vez
      if(monedasMain==='') return;
      //consultar la API para cotizar
      const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${cryptoMain}&tsyms=${monedasMain}`;
      const resultado = await axios.get(url);
      setCargando(true);
      setTimeout(()=>{
        setCargando(false);
        setResultado(resultado.data.DISPLAY[cryptoMain][monedasMain])
      }, 3000);
    }
    cotizarCriptomoneda()
  }, [monedasMain, cryptoMain])

  return (
    <Fragment>
      <Lang>
        <Button onClick={()=>handleClick('en')}>
          English
        </Button>
        <Button onClick={()=>handleClick('es')}>
          Español
        </Button>
        <Button onClick={()=>handleClick('de')}>
          Deutch
        </Button>
      </Lang>

      <Contenedor>
      <div>
        <Imagen src={imagen} alt="Image Crypto"/>
      </div>
      <div>
        <Heading>{t('title')} </Heading>
        <Formulario
          setMonedasMain={setMonedasMain}
          setCryptoMain={setCryptoMain}
        />
        {cargando ? <Spinner/>
          : <Cotizacion
              resultado={resultado}
            />}
      </div>
      </Contenedor>
    </Fragment>
  );
}

export default App;
