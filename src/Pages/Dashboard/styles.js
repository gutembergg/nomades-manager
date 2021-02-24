import styled, { css } from 'styled-components'
import colors from '../../styles/colors'

export const Container = styled.div`
  height: 200vh;
  display: flex;
  flex-direction: column;
  align-items: center;

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
  cursor: pointer;

  .icon_plus {
    margin-right: 5px;
  }
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

export const NotClientSelectedText = styled.div`
  width: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  margin-top: 80px;

  border: 1px solid #282828;

  ${props =>
    props.width &&
    css`
      width: ${props.width};
    `}
`

export const NotClientText = styled.p`
  margin-top: 20px;
`
