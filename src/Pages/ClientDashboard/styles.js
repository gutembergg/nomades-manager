import styled from 'styled-components'
import colors from '../../styles/colors'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: ${colors.primary};
`
export const DevName = styled.h4`
  display: flex;
  justify-content: center;
  margin-top: 30px;
  color: #fff;
`
export const NavBar = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 39px;

  background: #000;
`
export const Image = styled.img`
  width: 130px;
  margin-left: 17px;
`

export const Content = styled.div``
