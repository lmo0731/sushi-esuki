import { Element } from 'react-scroll'

const OnlineOrder = (props) => {
  const { title } = props
  return (
    <div className='online-order'>
      <Element id='online-order' />
      <div className='content paper'>
        Boka bord på de bästa restaurangerna.
      </div>
    </div>
  )
}

export default OnlineOrder
