import Head from 'next/head'
import Contact from './Contact'
import Menu from './Menu'
import MenuHeader from './MenuHeader'
import MenuNavbar from './MenuNavbar'

const MenuPage = (props) => {
  console.log(props)
  const { storage } = props
  const { siteTitle } = storage || {}
  return (
    <>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <div className='home'>
        <MenuHeader storage={storage} />
        <div className='relative'>
          <Menu storage={storage} />
        </div>
        <Contact storage={storage} />
      </div>
    </>
  )
}
export default MenuPage
