import React, { useCallback, useState } from 'react'
import { Form, Button, Card, Alert } from 'react-bootstrap'
import { useRouter } from 'next/router'
import Axios from 'axios'
import config from '../config'
import { useLocalStorage } from '../hooks'
import Head from 'next/head'

const LoginPage = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [errorText, setErrorText] = useState('')
  // eslint-disable-next-line
  const [token, setToken] = useLocalStorage('token', '')
  const history = useRouter()

  const setError = (msg) => {
    setErrorText(msg)
    if (msg) {
      setTimeout(() => {
        setErrorText('')
      }, 10000)
    }
  }

  const login = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const res = await Axios.post(config.PUBLIC_API_URL + '/admin/login', { username, password })
      const { data } = res || {}
      const { token } = data || {}
      if (token) {
        setToken(token)
        history.push('/admin')
      }
    } catch (e) {
      const { error } = e.response.data || {}
      setError(error || 'Unknown error')
    }
    setLoading(false)
  }, [history, password, setToken, username])

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <div className='d-flex flex-row justify-content-center align-items-center'>
        <Card style={{ maxWidth: 500, minWidth: 240, marginTop: '10%' }}>
          <Card.Body>
            <Card.Title>Login</Card.Title>
            <Form>
              {errorText &&
                <Form.Group>
                  <Alert variant='danger'>{errorText}</Alert>
                </Form.Group>}
              <Form.Group>
                <Form.Control
                  placeholder='username' value={username} onChange={(e) => {
                    setUsername(e.target.value)
                  }}
                />
              </Form.Group>
              <Form.Group>
                <Form.Control
                  type='password' placeholder='password' value={password} onChange={(e) => {
                    setPassword(e.target.value)
                  }}
                />
              </Form.Group>
              <Form.Group>
                <Button onClick={login} disabled={loading}>
                  {loading ? 'Loading...' : 'Login'}
                </Button>
              </Form.Group>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </>
  )
}
export default LoginPage
