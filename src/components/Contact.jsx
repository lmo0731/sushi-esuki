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
            <Col xs={12} sm={12} md={6} lg={4}>
              <div className='content-title'>{socialTitle}</div>
              <div className='content-body'>
                <a href={facebookAddress}><Facebook style={{ fontSize: 32 }} /></a> &nbsp;
                <a href={instagramAddress}><Instagram style={{ fontSize: 32 }} /></a>
              </div>
              <div className='content-title'>{addressTitle}</div>
              <div className='content-body'>
                <div>{aboutAddressLine1 || 'Spiralen'}</div>
                <div>{aboutAddressLine2 || '602 32 Norrköping'}</div>
              </div>
              <div className='content-title'>{contactTitle}</div>
              <div className='content-body'>
                <div>{aboutTelephone || '08-12345678'}</div>
                <div>{contactEmail || 'mr.bowl@info.com'}</div>
              </div>
              <div className='content-title'>{timeTableTitle}</div>
              <div className='content-body'>
                {timeTables.map(({ title, description }, index) => {
                  return (
                    <div key={index}>{title}: {description}</div>
                  )
                })}
              </div>

            </Col>
            <Col xs={12} sm={12} md={6} lg={8}>
              <iframe
                title='gmap'
                style={{ width: '100%', height: 280, border: 0 }}
                frameBorder='0'
                src={`https://www.google.com/maps/embed/v1/view?zoom=19&center=${contactLatLong || '59.355961,18.134163'}&key=AIzaSyBYv0r67hQg-zKJTAHd6BthH7h1vpFpBK0`}
                allowFullScreen
              />
            </Col>
          </Row>
        </div>
        <div className='footer'>
          {copyright || 'Mr.Bowl Norkkoping © 2021'}
        </div>
      </Element>
    </div>
  )
}

export default Contact
