import Navbar from './Navbar'
import Posts from './Posts'

const PostsPage = (props) => {
  const { storage, posts } = props
  return (
    <div className='posts-page'>
      <div className='relative'>
        <Navbar storage={storage} />
        <Posts posts={posts} />
      </div>
    </div>
  )
}
export default PostsPage
