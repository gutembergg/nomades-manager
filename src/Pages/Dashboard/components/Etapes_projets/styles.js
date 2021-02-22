import styled from 'styled-components'
import colors from '../../../../styles/colors'

export const NavBarCreateStep = styled.div`
  width: 100%;
  background: #282828;
  border: none;
  color: #fff;

  padding-left: 10px;
  cursor: pointer;

  .icon_etape {
    margin-right: 9px;
  }
`

export const Input_block = styled.form`
  margin-bottom: 100px;
  color: #fff;
  .input_projet {
    width: 100%;
    background: #000;
    color: #fff;
    border: 3px solid #282828;
  }

  .btn_etape {
    width: 100%;
    background: ${colors.green};
  }
`
