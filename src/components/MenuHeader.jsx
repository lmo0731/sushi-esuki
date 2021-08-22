
import { Parallax } from 'react-parallax'
import { Element } from 'react-scroll'
import MenuNavbar from './MenuNavbar'

const MenuHeader = (props) => {
  const { storage, menuPage } = props
  const { menuBackground, title } = menuPage
  const { restaurantName } = storage || {}
  return (
    <div className='header'>
      <Element id='header'>
        <Parallax bgImage={menuBackground} strength={300} className='w-100'>
          <MenuNavbar storage={storage} />
          <div className='content header-content d-flex flex-column align-items-center justify-content-center'>
            <div className='buttons d-flex justify-content-center flex-wrap'>
              <div className='header-title text-center'>
                {restaurantName}<br />
                {title}
              </div>
            </div>
          </div>
        </Parallax>
      </Element>
    </div>
  )
}

export default MenuHeader
