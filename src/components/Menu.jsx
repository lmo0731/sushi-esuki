import { Col, Row } from 'react-bootstrap'
import { Element } from 'react-scroll'

const Menu = (props) => {
  const { menuPage } = props
  // console.log(menuPage)
  const {
    menus = []
  } = menuPage || {}

  return (
    <div className='menu'>
      <Element id='menu'>
        <div className='content paper'>
          <Row xs={1} sm={1} md={2} lg={2} xl={2}>
            {
            menus.map((menu, i) => {
              return (
                <Col key={i}>
                  <div className='menu-bundle'>
                    <div className='menu-item'>
                      <div className='menu-bundle-title'>{menu.title}</div>
                      <div className='menu-bundle-border' />
                      <div className='menu-item-body'>
                        {menu.description}
                      </div>
                    </div>
                    <div className='menu-item-list'>
                      {menu.items.map((item, j) => {
                        return (
                          <div className='menu-item' key={j}>
                            <div className='menu-item-line d-flex justify-content-between'>
                              <div className='menu-item-title'>{item.title}</div>
                              <div className='menu-item-dots ' style={{ flexGrow: '4' }} />
                              <div className='menu-item-price'>{item.price}</div>
                            </div>
                            <div className='menu-item-body'>
                              {item.description}
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </Col>
              )
            })
          }
          </Row>
        </div>
      </Element>
    </div>
  )
}

export default Menu
