import React from 'react'
import DocumentServices from '../../Services/docs'
import Card from '../../assets/Crad/Card'
import './AllPost.css'
import { Link } from 'react-router-dom'
import Button from '../../assets/button/Button'

interface Post {
  $id: string;
  title: string;
  content: string;
  writer: string;
  [key: string]: any;
}

const AllPost: React.FC = () => {
  const [posts, setPosts] = React.useState<Post[]>([])

  React.useEffect(() => {
    DocumentServices.gets().then((res: any) => {
      if (res && res.documents) {
        setPosts(res.documents)
        console.log(posts);
      }
    })
  }, [])

  return (
    <div id="allpos_body">
      {posts.length > 0 ? (
        <>
          <div id="back">
            <Link to="/">
              <Button type="button" width="5vw" work="Home" bgcolor="ff6200" />
            </Link>
          </div>
          <div id="posts">
            <div id="allPosts">
              <div id="tagline">
                Voices from Everywhere, Stories for Everyone.
              </div>
            </div>
            <div id="card_body">
              {posts.map((post: Post) => (
                <Link
                  to={`/post/${post.$id}`}
                  key={post.$id}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <Card
                    title={post.title}
                    content={post.content}
                    writer={post.writer}
                    id={post.$id}
                  />
                </Link>
              ))}
            </div>
          </div>
        </>
      ) : (
        <div id="none">
          <div id="all_post_text">No Blogs found</div>
          <Link to="/">
            <Button type="button" width="20vw" work="Home" bgcolor="ff6200" />
          </Link>
        </div>
      )}
    </div>
  )
}

export default AllPost
