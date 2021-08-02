import Image from 'next/image'
import { Col, Row } from 'react-bootstrap'
import Link from 'next/link'
const RecentPosts = (props) => {
  const { posts } = props
  return (
    <div className='recent-posts'>
      <div className='content paper'>
        <div className='recent-post-list'>
          <Row xs={1} sm={1} md={2} lg={2} xl={2}>
            {
                posts.map((p, i) => {
                  return (
                    <Col key={i}>
                      <div className='recent-post'>
                        {/* <Image src={p.json.image || '/uploads/blank.png'} width={440} height={330} className='recent-post-image' /> */}
                        <div className='recent-post-image' style={{ backgroundImage: `url(${p.json.image})`, height: 330, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center center' }} />
                        <div className='recent-post-content'>
                          <div className='recent-post-title'>
                            <Link href={`/posts#${p.id}`}>{p.json.title}</Link>
                          </div>
                          <div className='recent-post-body' dangerouslySetInnerHTML={{ __html: p.json.body }} />
                        </div>
                      </div>
                    </Col>
                  )
                })
              }
          </Row>
        </div>
      </div>
    </div>
  )
}

export default RecentPosts
