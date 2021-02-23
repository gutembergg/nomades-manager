import styled from 'styled-components'

export const Container = styled.div`
  height: 180px;
  width: 300px;
  overflow-y: scroll;

  border: 1px solid rgba(0, 0, 0, 0.3);
  border-radius: 4px;
  background: #000;
  padding: 10px;

  .client_list {
    list-style: none;
    cursor: pointer;
  }
  h2 {
    color: #fff;
  }
`
