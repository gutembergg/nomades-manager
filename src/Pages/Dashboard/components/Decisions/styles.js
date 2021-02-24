import styled from 'styled-components'
import colors from '../../../../styles/colors'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`

export const Form = styled.form`
  background: #000;

  .area_decision {
    width: 100%;
    background: #000;
    color: #fff;
  }
`

export const TitleForm = styled.h5`
  color: #fff;
`

export const ButtonTextArea = styled.button`
  width: 100%;
  background: ${colors.green};
`

export const DecisionsList = styled.ul`
  width: 100%;
  height: 160px;
  overflow-y: scroll;

  background: #000;
  color: #fff;
  padding: 10px;

  .decisions_list {
    padding: 10px;

    list-style: none;
    cursor: pointer;

    border: 1px solid ${colors.gray};
  }

  .decision_date {
    margin-right: 10px;
  }

  .icon_decision {
    margin-left: 7px;
  }
`

export const ListDecision = styled.div`
  width: 100%;
  background: #282828;
  border: none;
  color: #fff;

  padding-left: 10px;
  margin-top: 20px;
  cursor: pointer;

  .icon_decision {
    margin-right: 8px;
  }
`
