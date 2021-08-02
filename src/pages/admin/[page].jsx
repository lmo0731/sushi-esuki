import AdminPage from '../../components/AdminPage'
import config from '../../config'

export default AdminPage

export async function getStaticProps () {
  return {
    props: {
    }
  }
}

export async function getStaticPaths () {
  return {
    paths: Object.keys(config.PAGES).map((page) => {
      return {
        params: { page }
      }
    }),
    fallback: false
  }
}
