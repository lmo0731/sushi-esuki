import { Col, Row } from 'react-bootstrap'
import { Element } from 'react-scroll'

const Menu = (props) => {
  const { storage } = props
  const { menus = [] } = storage || {}

  return (
    <div className='menu'>
      <Element id='menu'>
        <div className='content paper'>
          {
            menus.map((menu, i) => {
              return (
                <div key={i} className='menu-bundle'>
                  <div className='menu-item'>
                    <div className='menu-bundle-title'>{menu.title}</div>
                    <div className='menu-item-price'>&nbsp;</div>
                    <div className='menu-item-body'>
                      {menu.description}
                    </div>
                  </div>
                  <div className='menu-item-list'>
                    <Row xs={1} sm={1} md={2} lg={2} xl={2}>
                      {menu.items.map((item, j) => {
                        return (
                          <Col key={j}>
                            <div className='menu-item'>
                              <div className='menu-item-title'>{item.title}</div>
                              <div className='menu-item-price'>{item.price}</div>
                              <div className='menu-item-body'>
                                {item.description}
                              </div>
                            </div>
                          </Col>
                        )
                      })}
                    </Row>
                  </div>
                </div>
              )
            })
          }
        </div>
      </Element>
    </div>
  )
}

export default Menu
