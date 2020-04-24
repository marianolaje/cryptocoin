import React, {useEffect, useState} from 'react';
import useCoin from '../hooks/useCoin.js'
import Error from './Error.js'
import axios from 'axios'
import useCrypto from '../hooks/useCrypto.js'
import styled from '@emotion/styled';
import PropTypes from 'prop-types';

const Boton = styled.input`
  margin-top: 20px;
  font-weight: bold;
  font-size: 20px;
  padding: 10px;
  background-color: #66a2fe;
  border: none;
  width: 100%;
  border-radius: 10px;
  color: white;
  transition: background-color .3s ease;
  &:hover{
    background-color: #326ac0;
    cursor: pointer;
  }
`

const Formulario = ({setMonedasMain, setCryptoMain}) => {

  const MONEDAS = [
    {codigo: 'USD', nombre: 'American Dollar'},
    {codigo: 'EUR', nombre: 'Euro'},
    {codigo: 'GBP', nombre: 'Pound'},
    {codigo: 'JPY', nombre: 'Japanese Yen'},
    {codigo: 'CNY', nombre: 'Chinese yuan'},
    {codigo: 'ARS', nombre: 'Argentinian peso'},
    {codigo: 'MXN', nombre: 'Mexican peso'},
    {codigo: 'KRW', nombre: 'South Korean won'},
    {codigo: 'TRY', nombre: 'Turkish lira'},
    {codigo: 'RUB', nombre: 'Russian ruble'},
    {codigo: 'INR', nombre: 'Indian rupee'},
    {codigo: 'BRL', nombre: 'Brazilian real'},
    {codigo: 'ZAR', nombre: 'South African rand'},
    {codigo: 'HKD', nombre: 'Hong Kong dollar'},
    {codigo: 'AUD', nombre: 'Australian dollar'},
    {codigo: 'CAD', nombre: 'Canadian dollar'}
  ]

//state del listado de cryptomonedas
  const [listaCripto, setListaCripto] = useState([])

//utilizando useCoin
  const [moneda, SelecMoneda] = useCoin('', MONEDAS)

//utilizar useCrypto
  const [crypto, SelectCrypto] = useCrypto('', listaCripto)

//validador de Formulario
  const [error, setError] = useState(false)

  //ejecutar el llamado a la API
  useEffect( () => {
    const consultarAPI = async () => {
      const url = `https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD`;
      const resultado = await axios.get(url);
      setListaCripto(resultado.data.Data);
    }
    consultarAPI();
  }, [])

  //cuando el usuario hace submit
  const cotizarMoneda = e => {
    e.preventDefault();
    //validar si los campos estan llenos
    if(moneda === '' || crypto === ''){
      setError(true)
      return;
    }
    setError(false)
    //pasar los datos al componente principal
    setMonedasMain(moneda);
    setCryptoMain(crypto);
  }

  return(
    <form
      onSubmit= { cotizarMoneda }
    >
      {error ? <Error mensaje="complete ambos datos"/> : null}
      <SelecMoneda/>
      <SelectCrypto/>
      <Boton
        type="submit"
        value="Calculate"
      />
    </form>
  )
}

Formulario.propTypes = {
  setCryptoMain: PropTypes.func.isRequired,
  setMonedasMain: PropTypes.func.isRequired
}

export default Formulario;
