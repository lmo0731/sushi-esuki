import { getPublishedPosts } from '../../api/posts'
import { readFile } from '../../api/storage'
import PostsPage from '../../components/PostsPage'
import config from '../../config'

export default PostsPage

export async function getServerSideProps () {
  const posts = await getPublishedPosts(0, 5)
  return {
    props: {
      storage: readFile(config.STORAGE_PATH + '/storage.db'),
      posts
    }
  }
}
