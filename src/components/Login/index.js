import { useState } from 'react'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'
import {
  InputFieldContainer,
  LoginInputFieldLabel,
  LoginInputField,
  LoginContainer,
  LoginForm,
  LogoImg,
  LoginButton,
  ErrorMsgStyle,
  CheckboxContainer,
  ShowPasswordCheckbox,
  CheckboxLabel,
} from './styledComponents'

const Login = () => {
  const [usernameInput, setUsernameInput] = useState('')
  const [passwordInput, setPasswordInput] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const [showErrorMsg, setShowErrorMsg] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()

  const onSuccessLogin = jwtToken => {
    Cookies.set('jwt_token', jwtToken, { expires: 30 })
    navigate('/')
  }

  const onFailureLogin = errorMsg => {
    setErrorMsg(errorMsg)
    setShowErrorMsg(true)
  }

  const onSubmitForm = async event => {
    event.preventDefault()
    let { usernameInput, passwordInput } = state

    if (usernameInput.toLowerCase().trim('') === 'tarun')
      usernameInput = 'rahul'
    if (passwordInput === 'tarun@9849') passwordInput = 'rahul@2021'

    const userDetails = { username: usernameInput, password: passwordInput }
    const LoginApiUrl = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(LoginApiUrl, options)
    const data = await response.json()

    if (response.ok === true) {
      onSuccessLogin(data.jwt_token)
    } else {
      onFailureLogin(data.error_msg)
    }
  }

  const updateUsername = event => setUsernameInput(event.target.value)
  const updatePassword = event => setPasswordInput(event.target.value)
  const toggleShowPassword = () => setShowPassword(prevState => !prevState)

  const renderUsernameField = () => (
    <InputFieldContainer>
      <LoginInputFieldLabel htmlFor="username">USERNAME</LoginInputFieldLabel>
      <LoginInputField
        type="text"
        value={usernameInput}
        placeholder="tarun"
        id="username"
        onChange={updateUsername}
      />
    </InputFieldContainer>
  )

  const renderPasswordField = () => (
    <InputFieldContainer>
      <LoginInputFieldLabel htmlFor="password">PASSWORD</LoginInputFieldLabel>
      <LoginInputField
        type={showPassword ? 'text' : 'password'}
        value={passwordInput}
        placeholder="tarun@9849"
        id="password"
        onChange={updatePassword}
      />
      <CheckboxContainer>
        <ShowPasswordCheckbox
          type="checkbox"
          id="inputCheck"
          checked={showPassword}
          onChange={toggleShowPassword}
        />
        <CheckboxLabel htmlFor="inputCheck">Show Password</CheckboxLabel>
      </CheckboxContainer>
    </InputFieldContainer>
  )

  const jwtToken = Cookies.get('jwt_token')
  if (jwtToken !== undefined) {
    return <Navigate to="/" />
  }

  return (
    <LoginContainer>
      <LoginForm onSubmit={onSubmitForm}>
        <LogoImg
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
          alt="website logo"
        />
        {renderUsernameField()}
        {renderPasswordField()}
        <LoginButton type="submit" color="#ffffff">
          Login
        </LoginButton>
        {showErrorMsg && <ErrorMsgStyle>*{errorMsg}</ErrorMsgStyle>}
      </LoginForm>
    </LoginContainer>
  )
}

export default Login
