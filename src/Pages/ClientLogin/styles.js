import styled from 'styled-components'
import colors from '../../styles/colors'

export const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  background: ${colors.primary};
`

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100%;
  max-width: 700px;
`

export const Form = styled.div`
  margin-top: 20px;
  padding: 40px;
  border: 1px solid ${colors.gray};
  background: ${colors.gray};
  border-radius: 4px;

  display: flex;
  flex-direction: column;
  align-items: center;

  h1 {
    text-align: center;
    margin-bottom: 20px;
    color: ${colors.black};
  }
`

export const FormActions = styled.div`
  width: 100%;

  margin-top: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  a {
    text-decoration: none;
    color: #00e676;
    font-size: 14px;
  }
`
