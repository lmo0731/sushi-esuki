import { Carousel } from 'react-bootstrap'
import { Element } from 'react-scroll'
import { useWindowDimensions } from '../hooks'

const Gallery = (props) => {
  const { storage } = props
  const {
    galleryImages = [
      { image: '/uploads/bg2.png' },
      { image: '/uploads/bg2.png' },
      { image: '/uploads/bg2.png' }
    ]
  } = storage || {}

  const { width, height } = useWindowDimensions()

  let imageHeight = '80vh'

  if (width) {
    imageHeight = `${Math.min(width * 0.75, height * 0.8)}px`
  }

  return (
    <div className='gallery'>
      <Element id='gallery'>
        <Carousel>
          {galleryImages.map((image, i) => {
            return (
              <Carousel.Item key={i}>
                <div className='gallery-image w-100' style={{ backgroundImage: `url(${image.image})`, height: imageHeight }} />
                {/* <Image className='gallery-image w-100' src={image.image} fluid /> */}
              </Carousel.Item>
            )
          })}
        </Carousel>
      </Element>
    </div>
  )
}

export default Gallery
