import Head from 'next/head'
import CoverHeader from './CoverHeader'

const MainPage = (props) => {
  const { storage, posts } = props
  const { siteTitle } = storage || {}
  return (
    <>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <div className='home'>
        <CoverHeader storage={storage} />
      </div>
    </>
  )
}
export default MainPage
