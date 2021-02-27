import styled from 'styled-components'
import colors from '../../../../../styles/colors'

export const Container = styled.div`
  height: 190px;
  width: 100%;
  overflow-y: scroll;

  border: 1px solid rgba(0, 0, 0, 0.3);
  border-radius: 4px;
  background: #000;
  padding: 10px;

  .decisions_list {
    height: 80px;
    overflow-y: scroll;

    list-style: none;
    padding: 10px;
    color: #fff;

    border: 1px solid ${colors.gray};
    cursor: pointer;
  }

  .icon_decision {
    margin-right: 8px;
  }
`
export const ListTitle = styled.div`
  width: 100%;
  background: #282828;
  border: none;
  color: #fff;

  padding-left: 10px;
  margin-top: 20px;
  cursor: pointer;

  .icon_list {
    margin-right: 5px;
  }
`
