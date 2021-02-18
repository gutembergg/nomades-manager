import styled from 'styled-components'
import colors from '../../styles/colors'

export const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;

  background: ${colors.primary};
`
export const Content1 = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;

  margin-top: 100px;
`

export const UserName = styled.div`
  text-align: center;
  color: gray;

  margin-top: 20px;
`

export const AddClientFormTitle = styled.p`
  background: #fff;
  border-bottom: 1px solid gray;

  margin-top: 20px;
`

export const ClientCollapse = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`
export const ClientInfos = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`
