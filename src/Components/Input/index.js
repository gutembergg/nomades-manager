import React, { useState, useRef } from 'react'

import { InputWrapper } from './styles'

const Input = ({ icon: Icon, isPassword, ...rest }) => {
  const [isFilled, setFilled] = useState(false)
  const [isFocused, setFocused] = useState(false)

  const inputRef = useRef(null)

  const handleInputFocused = () => {
    setFocused(true)
  }

  const handleInputFilled = () => {
    setFocused(false)

    setFilled(!!inputRef.current?.value)
  }

  return (
    <InputWrapper isFilled={isFilled} isFocused={isFocused}>
      {Icon && <Icon size={16} />}
      <input
        {...rest}
        ref={inputRef}
        type="text"
        onFocus={handleInputFocused}
        onBlur={handleInputFilled}
      />
    </InputWrapper>
  )
}

export default Input
