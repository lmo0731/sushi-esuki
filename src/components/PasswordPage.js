import React, { useState, useEffect } from 'react'
import { Form, Button, Card, Alert } from 'react-bootstrap'
import Axios from 'axios'
import config from '../config'
import Head from 'next/head'

const PasswordPage = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [errorText, setErrorText] = useState('')
  const [infoText, setInfoText] = useState('')

  const setError = (msg) => {
    setErrorText(msg)
    if (msg) {
      setTimeout(() => {
        setInfoText('')
        setErrorText('')
      }, 10000)
    }
  }
  const setInfo = (msg) => {
    setInfoText(msg)
    if (msg) {
      setTimeout(() => {
        setErrorText('')
        setInfoText('')
      }, 10000)
    }
  }

  const passwd = async () => {
    setLoading(true)
    setError('')
    try {
      await Axios.post(config.PUBLIC_API_URL + '/admin/passwd', { username, password, newPassword })
      setInfo('Success')
    } catch (e) {
      const { error } = e.response.data || {}
      setError(error || 'Unknown error')
    }
    setLoading(false)
  }

  useEffect(() => {

  })

  return (
    <>
      <Head>
        <title>Password Change</title>
      </Head>
      <div className='d-flex flex-row justify-content-center align-items-center'>
        <Card style={{ maxWidth: 500, minWidth: 240, marginTop: '10%' }}>
          <Card.Body>
            <Card.Title>Change Password</Card.Title>
            <Form>
              {infoText &&
                <Form.Group>
                  <Alert variant='success'>{infoText}</Alert>
                </Form.Group>}
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
                <Form.Control
                  type='password' placeholder='New password' value={newPassword} onChange={(e) => {
                    setNewPassword(e.target.value)
                  }}
                />
              </Form.Group>
              <Form.Group>
                <Button onClick={passwd} disabled={loading}>
                  {loading ? 'Loading...' : 'Change'}
                </Button>
              </Form.Group>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </>
  )
}
export default PasswordPage
