import styled from 'styled-components'
import colors from '../../styles/colors'

export const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;

  background: ${colors.primary};
`

export const UserName = styled.div`
  text-align: center;
  color: gray;

  margin-top: 20px;
`

export const AddClientFormTitle = styled.div`
  width: 295px;
  background: #282828;
  border: none;
  color: #fff;

  padding-left: 10px;
  margin-top: 20px;
`

export const ClientCollapse = styled.div`
  display: flex;
  flex-direction: column;
`

export const ClientInfos = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`
