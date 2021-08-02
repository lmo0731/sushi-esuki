import { Image } from 'react-bootstrap'
import moment from 'moment'

const Post = (props) => {
  const { post } = props
  return (
    <div className='post'>
      <a name={post.id} />
      <div className='post-image'>
        <Image src={post.json.image || '/uploads/blank.png'} fluid className='w-100' />
      </div>
      <div className='post-title'>
        {post.json.title}
      </div>
      <div className='post-date'>
        {moment(post.publishedAt).format('DD.MM.YYYY')}
      </div>
      <div className='post-body' dangerouslySetInnerHTML={{ __html: post.json.body }}>
        {/* Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis. */}
      </div>
    </div>
  )
}

export default Post
