import styled from 'styled-components'

export const Container = styled.div`
  width: 300px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`

export const ClientTitle = styled.h2`
  color: #fff;
`

export const AddProjetsFormTitle = styled.div`
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

export const AddProjetForm = styled.form`
  .input_style {
    width: 295px;
    border: 2px solid #282828;
    border-radius: 3px;
    background: #000;
    color: #fff;
    padding-left: 7px;
  }

  .btn_addClient {
    width: 295px;

    background: #00e676;
  }
`
