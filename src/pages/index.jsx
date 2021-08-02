import { getPublishedPosts } from '../api/posts'
import { readFile } from '../api/storage'
import CoverPage from '../components/CoverPage'
import config from '../config'
export default CoverPage

export async function getServerSideProps () {
  const posts = await getPublishedPosts(0, 2)
  return {
    props: {
      storage: readFile(config.STORAGE_PATH + '/storage.db'),
      posts
    }
  }
}
