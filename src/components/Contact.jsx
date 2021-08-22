import { Col, Row } from 'react-bootstrap'
import { Facebook, Instagram } from 'react-bootstrap-icons'
import { Element } from 'react-scroll'

const Contact = (props) => {
  const { storage } = props
  const {
    addressLine1,
    addressLine2,
    restaurantName,
    contactTitle,
    contactEmail,
    contactPhone,
    timeTableTitle,
    timeTables = [],
    facebookAddress,
    instagramAddress,
    copyright
  } = storage || {}
  return (
    <div className='contact'>
      <Element id='contact'>
        <div className='content paper'>
          <Row>
            <Col xs={12} sm={12} md={4} lg={4}>
              <div className='content-title bold'>{restaurantName}</div>
              <div className='content-body'>
                {addressLine1}<br />
                {addressLine2}
              </div>
            </Col>
            <Col xs={12} sm={12} md={4} lg={4}>
              <div className='content-title bold'>{contactTitle}</div>
              <div className='content-body'>
                {contactEmail}<br />
                {contactPhone}
              </div>
            </Col>
            <Col xs={12} sm={12} md={4} lg={4}>
              <div className='content-title bold'>{timeTableTitle}</div>
              <div className='content-body'>
                {timeTables.map((t, i) => {
                  return (
                    <div key={i}>
                      {t.title} {t.description}
                    </div>
                  )
                })}
              </div>
            </Col>
          </Row>
          <Row>
            <Col xs={12} sm={12} md={12} lg={12}>
              <div className='content-title bold'>
                <a href={facebookAddress}><Facebook style={{ fontSize: 32 }} /></a> &nbsp;
                <a href={instagramAddress}><Instagram style={{ fontSize: 32 }} /></a>
              </div>
              <div className='content-body' />
            </Col>
          </Row>
        </div>
        <div className='footer'>
          {copyright || 'Esuki Sushi © 2021'}
        </div>
      </Element>
    </div>
  )
}

export default Contact
