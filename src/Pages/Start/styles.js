import styled, { css } from 'styled-components'
import colors from '../../styles/colors'
import { shade } from 'polished'

export const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  background: ${colors.primary};

  img {
    width: 25rem;
  }
`

export const ContentCard = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  padding: 50px;
  background: #373737;
  border-radius: 4px;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
`

export const StartButton = styled.div`
  width: 12.5rem;
  height: 14.4rem;
  margin: 5px;
  padding: 10px;

  background: #00e676;

  border-radius: 4px;
  cursor: pointer;
  color: #111111;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transition: 0.2s;

  ${props =>
    props.color &&
    css`
      color: ${props.color};
    `}

  ${props =>
    props.background
      ? css`
          background: ${props.background};
          &:hover {
            background: ${shade(0.2, props.background)};
          }
        `
      : css`
          background: '#00e676';
          &:hover {
            background: ${shade(0.2, '#00e676')};
          }
        `}
`
