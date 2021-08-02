import axios from 'axios'
import { useReducer, useState } from 'react'
import { Element } from 'react-scroll'
import config from '../config'
import Post from './Post'
import { useBottomScrollListener } from 'react-bottom-scroll-listener'

const push = (array, elements) => {
  return [...array, ...elements]
}

const Posts = (props) => {
  const { posts } = props
  const [offset, setOffset] = useState(posts.length)
  const [morePosts, addMorePosts] = useReducer(push, [])
  const loadPosts = async () => {
    if (offset > 0) {
      const res = await axios.get(config.PUBLIC_API_URL + '/posts?offset=' + offset)
      if (res.data && res.data.length > 0) {
        setOffset(offset + res.data.length)
        addMorePosts(res.data)
      } else {
        setOffset(0)
      }
    }
  }
  useBottomScrollListener(loadPosts)

  return (
    <div className='posts'>
      <Element id='posts'>
        <div className='content paper'>
          <div className='post-list'>
            {posts.map((post, i) => {
              return <Post post={post} key={i} />
            })}
            {morePosts.map((post, i) => {
              return <Post post={post} key={i} />
            })}
          </div>
        </div>
      </Element>
    </div>
  )
}

export default Posts
