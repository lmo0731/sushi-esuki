import React, { useState, useEffect, useCallback } from 'react'
import { Form, Button, InputGroup, Tabs, Tab, Badge, Table, Card, ButtonGroup } from 'react-bootstrap'
import config from '../config'
import axios from 'axios'
import { ArrowDown, ArrowUp, Plus, PlusSquareFill, Trash, Check } from 'react-bootstrap-icons'

const FormEdit = (props) => {
  const {
    element, storage = {}, parent, token, callback, noLabel
  } = props
  let {
    uploadCallback
  } = props
  const { name, type, elements = [], title } = element
  const defaultValue = type === 'array' || type === 'list' ? [] : ''
  const oldValue = storage[name] || defaultValue
  const [value, setValue] = useState(defaultValue)
  // const [files, setFiles] = useState({})
  // const [values, setValues] = useState({})
  const [uploads, setUploads] = useState({
    values: {},
    files: {}
  })
  const { files, values } = uploads
  const [uploadRequired, setUploadRequired] = useState(false)
  const [activeKey, setActiveKey] = useState(0)
  const [isChanged, setChanged] = useState(false)
  if (!uploadCallback) {
    uploadCallback = useCallback(({
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
  }
  const fieldName = (parent ? `${parent}.` : '') + name
  const onChange = (e) => {
    const { name, value, files } = e.target
    if (files) {
      const { name: fileName = 'File Selected' } = files[0] || {}
      setValue(fileName)
    } else {
      setValue(value)
    }
    uploadCallback && uploadCallback({ name, value, files })
  }
  const upload = useCallback(async () => {
    // console.log('upload', { values, files })
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
    await axios.post(`${config.PUBLIC_API_URL}/admin/upload`, data, {
      headers: { Authorization: `Bearer ${token}` }
    })
    setUploads({ values: {}, files: {} })
    setUploadRequired(false)
    setChanged(false)
    callback && callback()
  }, [
    files, token, values
  ])
  useEffect(() => {
    setValue(oldValue)
  }, [oldValue])

  useEffect(() => {
    if (uploadRequired) {
      upload()
    }
  }, [uploadRequired, upload])

  if (type === 'image') {
    return (
      <div>
        <Form.Group>
          {!noLabel && <Form.Label>{title}</Form.Label>}
          <InputGroup>
            <Form.File
              name={fieldName} accept='image/*' onChange={onChange} custom label={value || 'Browse File'}
            />
            {isChanged &&
              <InputGroup.Append>
                <Button onClick={upload}>Upload</Button>
              </InputGroup.Append>}
          </InputGroup>
          {oldValue &&
            <Form.Text>
              Uploaded Image <a href={oldValue}>VIEW</a>
            </Form.Text>}
        </Form.Group>
      </div>
    )
  }
  if (type === 'text') {
    return (
      <div>
        <Form.Group>
          {!noLabel && <Form.Label>{title}</Form.Label>}
          <InputGroup>
            <Form.Control name={fieldName} onChange={onChange} value={value} />
            {isChanged &&
              <InputGroup.Append>
                <Button onClick={upload}>Edit</Button>
              </InputGroup.Append>}
          </InputGroup>
        </Form.Group>
      </div>
    )
  }
  if (type === 'textarea') {
    return (
      <div>
        <Form.Group>
          {!noLabel && <Form.Label>{title}</Form.Label>}
          <InputGroup>
            <Form.Control as='textarea' name={fieldName} onChange={onChange} value={value} />
            {isChanged &&
              <InputGroup.Append>
                <Button onClick={upload}>Edit</Button>
              </InputGroup.Append>}
          </InputGroup>
        </Form.Group>
      </div>
    )
  }
  if (type === 'array' && elements) {
    return (
      <div>
        <Form.Group>
          <Tabs
            variant='tabs'
            transition={false} activeKey={activeKey} onSelect={(key) => {
              if (parseInt(key, 10) === oldValue.length) {
                const newValue = [...oldValue]
                newValue.push({})
                onChange({ target: { name: fieldName, value: newValue } })
                setUploadRequired(true)
              }
              setActiveKey(key)
            }}
          >
            {value && value.map((child, i) => {
              const subFieldName = `${fieldName}.${i}`
              const subTitle = (
                <span>
                  {title}{' '}
                  <Badge variant='secondary'>{i + 1}</Badge>{' '}
                  <a
                    onClick={() => {
                      if (window.confirm(`Confirm to delete."${title} ${i + 1}" `)) {
                        const newValue = [...oldValue]
                        newValue.splice(i, 1)
                        onChange({ target: { name: fieldName, value: newValue } })
                        setUploadRequired(true)
                      }
                    }}
                  >
                    <Trash />
                  </a>
                </span>
              )
              return (
                <Tab eventKey={i} title={subTitle} key={i}>
                  <Card>
                    <Card.Body>
                      {elements.map((element, j) => {
                        return <FormEdit key={j} element={element} storage={child} parent={subFieldName} token={token} callback={callback} />
                      })}
                    </Card.Body>
                  </Card>
                </Tab>
              )
            })}
            <Tab
              title={
                <PlusSquareFill />
                }
              eventKey={oldValue.length}
            />
          </Tabs>
        </Form.Group>
      </div>
    )
  }
  if (type === 'list' && elements) {
    return (
      <Table striped bordered hover>
        <tbody>
          <tr>
            {elements.map((element, j) => {
              return (
                <th key={j}>
                  {element.title}
                </th>
              )
            })}
            <th>
              <Button onClick={() => {
                const newValue = [...value]
                newValue.push({})
                onChange({ target: { name: fieldName, value: newValue } })
                setUploadRequired(true)
              }}
              >
                <Plus />
              </Button>
            </th>
          </tr>
          {value && value.map((child, i) => {
            const subFieldName = `${fieldName}.${i}`
            const { header } = child
            const rowStyle = header ? { backgroundColor: '#555' } : {}
            return (
              <tr key={i} style={rowStyle}>
                {elements.map((element, j) => {
                  return (
                    <td key={j}>
                      <FormEdit element={element} storage={child} parent={subFieldName} token={token} callback={callback} uploadCallback={uploadCallback} noLabel />
                    </td>
                  )
                })}
                <td>
                  <ButtonGroup>
                    <Button
                      disabled={!isChanged}
                      onClick={() => {
                        setUploadRequired(true)
                      }}
                    >
                      <Check />
                    </Button>
                    <Button onClick={() => {
                      const newValue = [...value]
                      if (i > 0) {
                        const tmp = newValue[i]
                        newValue[i] = newValue[i - 1]
                        newValue[i - 1] = tmp
                        onChange({ target: { name: fieldName, value: newValue } })
                        setUploadRequired(true)
                      }
                    }}
                    >
                      <ArrowUp />
                    </Button>
                    <Button onClick={() => {
                      const newValue = [...value]
                      if (i < newValue.length - 1) {
                        const tmp = newValue[i]
                        newValue[i] = newValue[i + 1]
                        newValue[i + 1] = tmp
                        onChange({ target: { name: fieldName, value: newValue } })
                        setUploadRequired(true)
                      }
                    }}
                    >
                      <ArrowDown />
                    </Button>
                    <Button
                      variant='danger'
                      onClick={() => {
                        if (window.confirm(`Confirm to delete."${title} ${i + 1}" `)) {
                          const newValue = [...value]
                          newValue.splice(i, 1)
                          onChange({ target: { name: fieldName, value: newValue } })
                          setUploadRequired(true)
                        }
                      }}
                    >
                      <Trash />
                    </Button>
                    <Button onClick={() => {
                      const newValue = [...value]
                      newValue.splice(i + 1, 0, {})
                      onChange({ target: { name: fieldName, value: newValue } })
                      setUploadRequired(true)
                    }}
                    >
                      <Plus />
                    </Button>
                  </ButtonGroup>
                </td>
                {/* <td>
                  <ButtonGroup>
                    <Button
                      variant='secondary'
                      onClick={() => {
                        const newValue = [...value]
                        newValue.splice(i + 1, 0, { header: true })
                        onChange({ target: { name: fieldName, value: newValue } })
                        setUploadRequired(true)
                      }}
                    >
                      <Plus />
                    </Button>
                  </ButtonGroup>
                </td> */}
              </tr>
            )
          })}
        </tbody>
      </Table>
    )
  }
  return (<div />)
}
export default FormEdit
