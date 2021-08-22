
import { Parallax } from 'react-parallax'
import { Element } from 'react-scroll'
import { Locations } from './Locations'

const CoverHeader = (props) => {
  const { storage } = props
  const { siteBackground = '/uploads/cover.png' } = storage || {}
  return (
    <div className='cover-header'>
      <Element id='cover-header'>
        <Parallax bgImage={siteBackground} strength={0} className='w-100'>
          <div className='cover-header-content w-100 d-flex flex-column align-items-end justify-content-start'>
            <div className='cover-header-content1 d-flex flex-column align-items-end justify-content-start'>
              <dvi className='cover-header-logo'>
                <img src='uploads/logo.png' width='40' />
              </dvi>
              <div className='cover-header-title bold italic'>
                Sushi<br />
                Ramen<br />
                Koreansk<br />
                Japansk<br />
              </div>
              <div className='cover-header-subtitle'>
                restaurang
              </div>
            </div>
            <Locations storage={storage} />
          </div>
        </Parallax>
      </Element>
    </div>
  )
}

export default CoverHeader
