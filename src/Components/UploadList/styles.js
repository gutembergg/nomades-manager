import styled from 'styled-components'

export const Container = styled.div`
  background: #000;
  color: #fff;
  padding: 10px;
  height: 150px;
  overflow-y: scroll;

  .file_list {
    list-style: none;
    cursor: pointer;
  }
`

export const FilesListButton = styled.div`
  width: 100%;
  background: #282828;
  border: none;
  color: #fff;

  padding-left: 10px;
  margin-top: 20px;
  cursor: pointer;

  .icon_class {
    margin-right: 5px;
  }
`

export const ListFiles = styled.ul`
  width: 100%;

  a {
    color: #fff;
  }
`
