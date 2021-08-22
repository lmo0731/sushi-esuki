import Head from 'next/head'
import Contact from './Contact'
import Menu from './Menu'
import MenuHeader from './MenuHeader'

const MenuPage = (props) => {
  // console.log(props)
  const { storage, menuPage } = props
  const { restaurantName } = storage || {}
  const { title } = menuPage || {}
  return (
    <>
      <Head>
        <title>{restaurantName} {title}</title>
      </Head>
      <div className='home'>
        <MenuHeader storage={storage} menuPage={menuPage} />
        <div className='relative'>
          <Menu storage={storage} menuPage={menuPage} />
        </div>
        <Contact storage={storage} />
      </div>
    </>
  )
}
export default MenuPage
