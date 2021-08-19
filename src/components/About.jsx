import { Element } from 'react-scroll'

const About = (props) => {
  const { storage } = props
  const {
    aboutTitle = 'Om Oss',
    aboutDescription = 'Vi har ca 40 sittplatser. Tamiji Yasumoto öppnade dörrarna 1994 som ”ett hål i väggen” med fokus på sushi. Det blev snabbt populärt och vi började även servera traditionella japanska varmrätter. Smakerna är så välbalanserade att vi fortfarande serverar många av de rätter vi hade från början. Utöver våra klassiska rätter experimenterar vi oss fram till nya smaker med inspiration från trender och säsonger.'
  } = storage || {}
  return (
    <div className='about'>
      <Element id='about'>
        <div className='content paper black'>
          <div className='content-title'>{aboutTitle}</div>
          <div className='content-body'>
            {aboutDescription}
          </div>
        </div>
      </Element>
    </div>
  )
}

export default About
