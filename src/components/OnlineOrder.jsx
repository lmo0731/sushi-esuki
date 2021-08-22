import { Col, Row } from 'react-bootstrap'
import { Element } from 'react-scroll'

const OnlineOrder = (props) => {
  const { storage } = props
  const { orderText, orderUrl, orderImage = '/uploads/forkbutton.png' } = storage
  return (
    <div className='online-order'>
      <Element id='order' />
      <div className='content paper'>
        <Row>
          <Col className='d-flex align-items-center justify-content-center'>
            {orderText}
          </Col>
          <Col className='d-flex align-items-center justify-content-center'>
            <a href={orderUrl}>
              <img src={orderImage} height='50' />
            </a>
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default OnlineOrder
