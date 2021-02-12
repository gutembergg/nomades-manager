import React, { useState, useRef } from 'react'

import { InputWrapper } from './styles'
import { FaEye, FaEyeSlash } from 'react-icons/fa'

const Input = ({ icon: Icon, isPassword, ...rest }) => {
  const [isFilled, setFilled] = useState(false)
  const [isFocused, setFocused] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

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
        type={showPassword ? 'text' : rest.type}
        onFocus={handleInputFocused}
        onBlur={handleInputFilled}
      />
      {isPassword &&
        (showPassword ? (
          <FaEyeSlash
            size={16}
            color="#00e676"
            onClick={() => setShowPassword(!showPassword)}
            className="icon-click"
          />
        ) : (
          <FaEye
            size={16}
            color="#00e676"
            onClick={() => setShowPassword(!showPassword)}
            className="icon-click"
          />
        ))}
    </InputWrapper>
  )
}

export default Input
