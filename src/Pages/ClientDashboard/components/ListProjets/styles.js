import styled from 'styled-components'
import colors from '../../../../styles/colors'

export const Container = styled.div`
  width: 100%;
  height: 150px;

  margin-top: 50px;
  background: #000;
  color: ${colors.black};
  overflow-y: scroll;

  padding: 10px;

  .projet_list {
    list-style: none;
    cursor: pointer;
    margin-bottom: 4px;
  }
`
