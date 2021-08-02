import axios from 'axios'
import { useCallback, useEffect, useReducer, useRef, useState } from 'react'
import { Button, ButtonGroup, Form, Image, Modal, Table } from 'react-bootstrap'
import { Pencil, Plus, Trash } from 'react-bootstrap-icons'
import config from '../config'

// import CKEditor from '@ckeditor/ckeditor5-react'
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic'

// import dynamic from 'next/dynamic'
// const CKEditor = dynamic(() => import('@ckeditor/ckeditor5-react'), { ssr: false })
// const ClassicEditor = dynamic(() => import('@ckeditor/ckeditor5-build-classic'), { ssr: false })

import dynamic from 'next/dynamic'
import moment from 'moment'

const Editor = dynamic(() => import('./Editor'), { ssr: false })

const merge = (target, source) => {
  // Iterate through `source` properties and if an `Object` set property to merge of `target` and `source` properties
  for (const key of Object.keys(source)) {
    if (source[key] instanceof Object) Object.assign(source[key], merge(target[key], source[key]))
  }

  // Join `target` and modified `source`
  Object.assign(target || {}, source)
  return target
}

const PostEdit = (props) => {
  const { postId, token, onHide } = props
  const [post, setPost] = useReducer(merge, { json: {} })
  const [uploads, setUploads] = useState({
    values: {},
    files: {}
  })
  const { files, values } = uploads
  const [isChanged, setChanged] = useState(false)

  const uploadCallback = useCallback(({
    name, value, files
  }) => {
    const newUploads = { ...(uploads) }
    if (files) {
      newUploads.files[name] = files
    } else if (value !== undefined) {
      newUploads.values[name] = value
    }
    setUploads(newUploads)
    setChanged(true)
  }, [uploads, setUploads, setChanged])

  const getPost = useCallback(async (postId) => {
    if (postId !== 'new') {
      const res = await axios.get(`${config.PUBLIC_API_URL}/admin/posts/${postId}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setPost(res.data)
    }
    setUploads({ values: {}, files: {} })
    setChanged(false)
  }, [token, setPost, setUploads, setChanged])

  const upload = useCallback(async (postId) => {
    const data = new window.FormData()
    for (const name in files) {
      const fileList = files[name]
      try {
        for (const file of fileList) {
          data.append(name, file)
        }
      } catch (e) {
        data.append(name, fileList)
      }
    }
    for (const name in values) {
      data.append(name, JSON.stringify(values[name]))
    }
    if (postId) {
      await axios.put(`${config.PUBLIC_API_URL}/admin/posts/${postId}`, data, {
        headers: { Authorization: `Bearer ${token}` }
      })
      getPost(postId)
    } else {
      const res = await axios.post(`${config.PUBLIC_API_URL}/admin/posts`, data, {
        headers: { Authorization: `Bearer ${token}` }
      })
      getPost(res.data.id)
    }
  }, [files, token, values, getPost])

  const publish = useCallback(async (postId) => {
    await axios.put(`${config.PUBLIC_API_URL}/admin/posts/${postId}/publish`, {}, {
      headers: { Authorization: `Bearer ${token}` }
    })
    getPost(postId)
  }, [token, getPost])

  const deletePost = useCallback(async (postId) => {
    await axios.delete(`${config.PUBLIC_API_URL}/admin/posts/${postId}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    onHide()
  }, [token, getPost])

  useEffect(() => {
    getPost(postId)
  }, [getPost])

  const onChange = useCallback((e) => {
    const { name, value, files } = e.target
    const postNew = { ...post }
    if (files) {
      const { name: fileName = 'File Selected' } = files[0] || {}
      postNew.json[name] = fileName
    } else {
      postNew.json[name] = value
    }
    setPost(postNew)
    uploadCallback({ name, value, files })
  }, [post, setPost, uploadCallback])

  return (
    <Modal show onHide={onHide} size='lg'>
      <Modal.Header>
        <Modal.Title>
          {post?.json?.title || 'New Post'}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group>
          {post?.json?.image && <Image thumbnail src={post?.json?.image} className='w-100' />}
          <Form.File name='image' accept='image/*' onChange={onChange} custom label='Browse Cover Image' />
        </Form.Group>
        <Form.Group>
          <Form.Label>Title</Form.Label>
          <Form.Control as='input' name='title' onChange={onChange} value={post?.json?.title} />
        </Form.Group>
        {/* <Form.Control as='textarea' name='body' onChange={onChange} value={post?.json?.body} /> */}
        <Form.Group>
          <Form.Label>Content</Form.Label>
          <Editor name='body' onChange={onChange} value={post?.json?.body} />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <ButtonGroup>
          {post?.id &&
            <Button
              variant='danger' onClick={() => {
                if (window.confirm('Confirm to delete post')) {
                  deletePost(post.id)
                }
              }}
            >
              Delete
            </Button>}
        </ButtonGroup>
        <ButtonGroup>
          <Button
            disabled={!isChanged} onClick={() => {
              upload(post?.id)
            }}
          >
            Save
          </Button>
          {post?.id &&
            <Button
              disabled={isChanged}
              onClick={() => {
                publish(post?.id)
              }}
            >
              {post?.publishedAt ? 'Unpublish' : 'Publish'}
            </Button>}
        </ButtonGroup>
      </Modal.Footer>
    </Modal>
  )
}

const PostsEdit = (props) => {
  const { token } = props
  const [posts, setPosts] = useState([])
  const [offset, setOffset] = useState(0)
  const [postId, setPostId] = useState()

  const getPosts = useCallback(async (offset, limit) => {
    const res = await axios.get(`${config.PUBLIC_API_URL}/admin/posts?limit=` + limit + '&offset=' + offset, {
      headers: { Authorization: `Bearer ${token}` }
    })
    setPosts(res.data)
    setOffset(offset + limit)
  }, [setPosts, token, setOffset])

  const onHide = useCallback(() => {
    setPostId(undefined)
    getPosts(0, offset)
  }, [setPostId, getPosts, offset])

  useEffect(() => {
    getPosts(0, 5)
  }, [getPosts])

  const loadMore = useCallback(() => {
    getPosts(0, 5 + offset)
  }, [offset, getPosts])

  return (
    <div>
      {postId && <PostEdit onHide={onHide} postId={postId} token={token} />}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Image</th>
            <th>Title</th>
            <th>Date</th>
            <th>
              <ButtonGroup>
                <Button onClick={() => {
                  setPostId('new')
                }}
                >
                  New Post
                </Button>
              </ButtonGroup>
            </th>
          </tr>
        </thead>
        {
          posts && posts.map((post, i) => {
            return (
              <tr key={i}>
                <td style={{ width: 150 }}>
                  <Image width={100} src={post.json.image} />
                </td>
                <td>{post.json.title}</td>
                <td style={{ width: 200 }}>{post.publishedAt
                  ? `Published ${moment(post.publishedAt).format('YYYY-MM-DD')}`
                  : `Created ${moment(post.createdAt).format('YYYY-MM-DD')}`}
                </td>
                <td style={{ width: 200 }}>
                  <ButtonGroup>
                    <Button>
                      <Pencil onClick={() => {
                        setPostId(post.id)
                      }}
                      />
                    </Button>
                  </ButtonGroup>
                </td>
              </tr>
            )
          })
        }
      </Table>
      <Button onClick={loadMore}>More</Button>
    </div>
  )
}

export default PostsEdit
