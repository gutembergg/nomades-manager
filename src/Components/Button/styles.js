import styled from 'styled-components'
import { shade } from 'polished'

import colors from '../../styles/colors'

export const Container = styled.button`
  margin-top: 10px;
  cursor: pointer;
  width: 300px;
  height: 42px;
  border-radius: 4px;
  border: 0;
  background: ${colors.green};
  color: #fff;
  font-weight: bold;
  font-size: 16px;
  transition: 0.2s;

  &:hover {
    background: ${shade(0.2, `${colors.green}`)};
  }
`
