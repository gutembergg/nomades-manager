import styled, { css } from 'styled-components'

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  border: 2px solid #111111;
  background: #111111;
  border-radius: 4px;
  width: 300px;
  height: 42px;
  margin-bottom: 10px;
  padding: 10px;

  svg {
    margin-right: 5px;
    color: #373737;
  }

  ${props =>
    props.isFocused &&
    css`
      svg {
        color: #00e676;
      }

      border-color: #00e676;
    `}

  ${props =>
    props.isFilled &&
    css`
      svg {
        color: #00e676;
      }
    `}

    input {
    flex: 1;
    height: 100%;
    padding-left: 10px;
    font-size: 16px;
    background: transparent;
    color: #fff;
    border: none;

    &::placeholder {
      color: #a5a5a5;
    }
  }
`
