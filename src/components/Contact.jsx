import { Col, Row } from 'react-bootstrap'
import { Facebook, Instagram } from 'react-bootstrap-icons'
import { Element } from 'react-scroll'

const Contact = (props) => {
  const { storage } = props
  const {
    contactTitle, aboutTelephone,
    socialTitle, addressTitle,
    facebookAddress, instagramAddress,
    contactLatLong, contactEmail,
    timeTableTitle, timeTables = [],
    aboutAddressLine1, aboutAddressLine2,
    copyright
  } = storage || {}
  return (
    <div className='contact'>
      <Element id='contact'>
        <div className='content paper'>
          <Row>
            <Col xs={12} sm={12} md={4} lg={4}>
              <div className='content-title bold'>RAMEN HOUSE</div>
              <div className='content-body'>
                Råsundavägen 126
                169 50 Solna
                Stockholm, Sweden
              </div>
            </Col>
            <Col xs={12} sm={12} md={4} lg={4}>
              <div className='content-title bold'>RAMEN HOUSE</div>
              <div className='content-body'>

                ramenhouse.esuki@gmail.com
                +46 08-96 80 88
              </div>
            </Col>
            <Col xs={12} sm={12} md={4} lg={4}>
              <div className='content-title bold'>RAMEN HOUSE</div>
              <div className='content-body'>
                MÅN-FRE: 1100-2100
                LÖR - SÖN: 1200-2130
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
