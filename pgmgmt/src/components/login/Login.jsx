import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import loginData from './loginData.json'
import './Login.scss'

function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [fieldErrors, setFieldErrors] = useState({ username: '', password: '' })
  const navigate = useNavigate()

  const validate = () => {
    const errors = { username: '', password: '' }

    if (!username.trim()) {
      errors.username = 'Username is required.'
    }

    if (!password) {
      errors.password = 'Password is required.'
    } else if (password.length < 6) {
      errors.password = 'Password must be at least 6 characters.'
    }

    setFieldErrors(errors)
    return !errors.username && !errors.password
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setMessage('')

    if (!validate()) {
      return
    }

    const matchedUser = loginData.users.find(
      (user) => user.username === username.trim() && user.password === password
    )

    if (!matchedUser) {
      setMessage('Invalid username or password. Please check your credentials.')
      return
    }

    localStorage.setItem(
      'authUser',
      JSON.stringify({ id: matchedUser.id, role: matchedUser.role, username: matchedUser.username })
    )

    navigate('/dashboard')
  }

  return (
    <div className="login-page">
      <div className="login-card">        
        <div className="login-brand">LOGO</div>
        <form className="login-form" onSubmit={handleSubmit} noValidate>
          <div className="field-group">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              placeholder="Enter username"
              autoComplete="username"
            />
            {fieldErrors.username && <span className="field-error">{fieldErrors.username}</span>}
          </div>

          <div className="field-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Enter password"
              autoComplete="current-password"
            />
            {fieldErrors.password && <span className="field-error">{fieldErrors.password}</span>}
          </div>

          <button type="submit" className="login-button">
            LOGIN
          </button>
        </form>
        {message && <p className="login-message">{message}</p>}
      </div>
    </div>
  )
}

export default Login
