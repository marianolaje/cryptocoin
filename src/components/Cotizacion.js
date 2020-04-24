import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { useTranslation } from 'react-i18next';

const ResultadoDiv = styled.div`
  color: white;
  font-family: Arial, Helvetica, sans-serif;
`
const Info = styled.p`
  font-size: 18px;
  span{
    font-weight: bold;
  }
`
const Precio = styled.p`
  font-size: 30px;
  span{
    font-weight: bold;
  }
`

const Cotizacion = ({resultado}) => {
  const { t } = useTranslation();

  if(Object.keys(resultado).length === 0) return null;

  return(
    <ResultadoDiv>
      <Precio>{t('resultado.precio')}<span>{resultado.PRICE}</span></Precio>
      <Info>{t('resultado.precioAlto')}<span>{resultado.HIGHDAY}</span></Info>
      <Info>{t('resultado.precioBajo')}<span>{resultado.LOWDAY}</span></Info>
      <Info>{t('resultado.variacion')}<span>{resultado.CHANGEPCT24HOUR}</span></Info>
      <Info>{t('resultado.update')}<span>{resultado.LASTUPDATE}</span></Info>
    </ResultadoDiv>
  )

}
Cotizacion.propTypes = {
  resultado: PropTypes.object.isRequired
}

export default Cotizacion;
