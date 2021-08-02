/* global FormData */

import React, { useState, useEffect, useCallback } from 'react'
import { Form, Jumbotron, Button, Alert, ButtonGroup, Nav } from 'react-bootstrap'
import axios from 'axios'
import config from '../config'
import FormEdit from './FormEdit'
import PostsEdit from './PostsEdit'
import Card from 'react-bootstrap/Card'
import { useLocalStorage, useAuth } from '../hooks'
import { useRouter } from 'next/router'
import Head from 'next/head'

const AdminPage = (props) => {
  const router = useRouter()
  const { query } = router
  const { page } = query || {}
  const pageIndex = page || 'home'
  const [storage, setStorage] = useState({})
  const history = useRouter()
  const { publishedAt = 0, draftAt = 1 } = storage || {}
  const [loading, setLoading] = useState(false)
  const [token, setToken] = useLocalStorage('token', '')
  const user = useAuth()
  const fetchStorage = useCallback(async () => {
    setLoading(true)
    const res = await axios.get(`${config.PUBLIC_API_URL}/admin/draft`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    if (res.data) {
      setStorage(res.data)
    }
    setLoading(false)
  }, [token, setStorage])

  const logout = async () => {
    setToken('')
    history.push('/login')
  }

  const passwd = async () => {
    history.push('/passwd')
  }

  useEffect(() => {
    fetchStorage()
  }, [fetchStorage])

  const publish = async () => {
    if (window.confirm('Publish your changes')) {
      try {
        setLoading(true)
        const data = new FormData()
        data.append('submit', 'true')
        const res = await axios.post(`${config.PUBLIC_API_URL}/admin/publish`, data, {
          headers: { Authorization: `Bearer ${token}` }
        })
        if (res.data) {
          fetchStorage()
        }
      } catch (e) {
        console.error(e)
      }
      setLoading(false)
    }
  }
  if (user) {
    return (
      <>
        <Head>
          <title>{config.PAGES[pageIndex].name}</title>
        </Head>
        <div>
          <Jumbotron>
            <Alert variant='primary'>Hello, <span>{user}</span> <Button size='sm' onClick={logout}>Logout</Button> </Alert>
            <Form style={{ paddingTop: 40, paddingBottom: 40 }}>
              <Nav variant='tabs'>
                {
                  Object.keys(config.PAGES).map((key, i) => {
                    const e = config.PAGES[key]
                    return (
                      <Nav.Link active={key === pageIndex} key={i} href={`/admin/${key}`}>
                        {/* <Link href={`/admin/${i}`}> */}
                        {e.name}
                        {/* </Link> */}
                      </Nav.Link>
                    )
                  })
                }
              </Nav>
              <Card>
                <Card.Body>
                  {config.PAGES[pageIndex].elements
                    ? (
                      <div>
                        {config.PAGES[pageIndex].elements.map((element, i) => {
                          return <FormEdit key={i} element={element} storage={storage} token={token} callback={fetchStorage} />
                        })}
                        <Form.Group>
                          <ButtonGroup>
                            {draftAt > publishedAt && <Button onClick={publish} disabled={loading}>{loading ? 'Loading...' : 'Publish'}</Button>}
                            {draftAt > publishedAt && <Button as='a' variant='secondary' href='/preview' target='_blank'>Preview</Button>}
                          </ButtonGroup>
                          <Form.Text>Last saved at {new Date(draftAt).toString()}</Form.Text>
                          <Form.Text>Last published at {new Date(publishedAt).toString()}</Form.Text>
                        </Form.Group>
                      </div>)
                    : <PostsEdit token={token} />}
                </Card.Body>
              </Card>
            </Form>
            <div className='text-center'>
              <Button size='sm' onClick={passwd}>Change Password Here</Button>
            </div>
          </Jumbotron>
        </div>
      </>
    )
  }
  return (
    <>
      <Head>
        <title>{config.PAGES[pageIndex].name}</title>
      </Head>
      <Jumbotron>
        <Alert variant='warning'>Hello, <Button size='sm' onClick={logout}>Login</Button> required</Alert>
      </Jumbotron>
    </>
  )
}

export default AdminPage
