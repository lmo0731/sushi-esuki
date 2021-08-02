import Head from 'next/head'
import About from './About'
import Contact from './Contact'
import Gallery from './Gallery'
import Header from './Header'
import Menu from './Menu'
import Navbar from './Navbar'

const HomePage = (props) => {
  console.log(props)
  const { storage, posts } = props
  const { siteTitle } = storage || {}
  return (
    <>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <div className='home'>
        <Header storage={storage} />
        <div className='relative'>
          <About storage={storage} />
          {/* <RecentPosts posts={posts} /> */}
          <Gallery storage={storage} />
          <Menu storage={storage} />
        </div>
        <Contact storage={storage} />
      </div>
    </>
  )
}
export default HomePage
