import styled from 'styled-components'
import colors from '../../../../styles/colors'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`

export const Form = styled.form`
  background: #000;

  .area_decision {
    width: 100%;
    background: #000;
    color: #fff;
  }
`

export const TitleForm = styled.h4`
  color: #fff;
`

export const ButtonTextArea = styled.button`
  width: 100%;
  background: ${colors.green};
`
