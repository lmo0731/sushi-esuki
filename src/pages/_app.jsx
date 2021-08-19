import 'bootstrap/dist/css/bootstrap.min.css'
import '../styles/index.css'
import '../styles/scroll.css'
import Head from 'next/head'
import App from 'next/app'

function MyApp ({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link rel='stylesheet' href='/myriad-pro/style.css' />
      </Head>
      <Component {...pageProps} />
    </>
  )
}

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
MyApp.getInitialProps = async (appContext) => {
  // calls page's `getInitialProps` and fills `appProps.pageProps`
  const appProps = await App.getInitialProps(appContext)
  return { ...appProps }
}

export default MyApp
