import { Element } from 'react-scroll'

const About = (props) => {
  const { storage } = props
  const {
    aboutTitle = '',
    aboutText = ''
  } = storage || {}
  return (
    <div className='about'>
      <Element id='about'>
        <div className='content paper black'>
          <div className='content-title'>{aboutTitle}</div>
          <div className='content-body'>
            {aboutText}
          </div>
        </div>
      </Element>
    </div>
  )
}

export default About
