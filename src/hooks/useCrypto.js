import React, {useState, Fragment} from 'react';
import styled from '@emotion/styled';
import { useTranslation } from 'react-i18next';

const Label = styled.label`
  font-family: 'Bebas Neue', cursive;
  color: white;
  text-transform: uppercase;
  font-weight: bold;
  font-size: 2.4rem;
  margin-top: 2rem;
  display: block;
`;

const Select = styled.select`
  font-size: 1.2rem;
  display: block;
  width: 100%;
  padding: 1rem;
  -webkit-appearance: none;
  border-radius: 10px;
  border: none;
`;

const useCrypto = (stateInicial, monedas) => {

  const { t } = useTranslation();

//state de nuestro custmo hook
  const [state, setState] = useState(stateInicial)

  const SelectCrypto = () => {
    return(
      <Fragment>
        <Label>{t('form.moneda')}</Label>
        <Select
          onChange={e => setState(e.target.value)}
          value={state}
        >
          <option value="">- Select</option>
          {monedas.map(moneda => (
            <option key={moneda.CoinInfo.Id} value={moneda.CoinInfo.Name}>{moneda.CoinInfo.FullName}</option>
          ))}
        </Select>
      </Fragment>
    )
  }
//Retornar state, interfaz y funcion que modifica el state
  return [state, SelectCrypto, setState];
}

export default useCrypto;
