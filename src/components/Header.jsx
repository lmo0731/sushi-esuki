
import { Parallax } from 'react-parallax'
import { Element } from 'react-scroll'
import MyNavbar from './Navbar'

const Header = (props) => {
  const { storage } = props
  const {
    restaurantName,
    restaurantBackground
  } = storage || {}
  return (
    <div className='header'>
      <Element id='header'>
        <Parallax bgImage={restaurantBackground} strength={300} className='w-100'>
          <MyNavbar storage={storage} />
          <div className='content header-content d-flex flex-column align-items-center justify-content-center'>
            <div className='buttons d-flex justify-content-center flex-wrap'>
              <div className='header-title'>
                {restaurantName}
              </div>
            </div>
          </div>
        </Parallax>
      </Element>
    </div>
  )
}

export default Header
