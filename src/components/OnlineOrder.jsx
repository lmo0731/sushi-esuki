import { Col, Row } from 'react-bootstrap'
import { Element } from 'react-scroll'

const OnlineOrder = (props) => {
  const { title } = props
  return (
    <div className='online-order'>
      <Element id='online-order' />
      <div className='content paper'>
        <Row>
          <Col className='d-flex align-items-center justify-content-center'>
            Boka bord på de bästa restaurangerna.
          </Col>
          <Col className='d-flex align-items-center justify-content-center'>
            <a href=''>
              <img src='/uploads/forkbutton.png' height='50' />
            </a>
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default OnlineOrder
