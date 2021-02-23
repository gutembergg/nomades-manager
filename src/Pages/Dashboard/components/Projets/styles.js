import styled from 'styled-components'
import colors from '../../../../styles/colors'

export const Container = styled.div`
  width: 100%;
  max-width: 1200px;
  margin-top: 90px;
`

export const InfoContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  color: #fff;
  background: #000;
  padding: 10px;

  border: 1px solid #000;
  border-radius: 3px;

  .btn_update {
    background: ${colors.green};
  }
`

export const InfoBlock = styled.div`
  display: flex;
  flex-direction: row;
`

export const FormUpdate = styled.form`
  .input_style {
    width: 100%;
    border: 2px solid #282828;
    border-radius: 3px;
    background: #000;
    color: #fff;
    padding-left: 7px;
  }

  .btn_addClient {
    width: 100%;
    background: ${colors.green};
  }
`
