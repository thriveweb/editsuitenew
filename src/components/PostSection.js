import React from 'react'
import { Link } from 'gatsby'

import Image from '../components/Image'

import '../components/PostSection.css'

class PostSection extends React.Component {
  static defaultProps = {
    posts: [],
    limit: 12,
    showLoadMore: true,
    loadMoreTitle: 'Load More',
    perPageLimit: 12
  }

  state = {
    limit: this.props.limit
  }

  increaseLimit = () =>
    this.setState(prevState => ({
      limit: prevState.limit + this.props.perPageLimit
    }))

  render() {
    const { posts, showLoadMore, loadMoreTitle } = this.props
    const { limit } = this.state

    const visiblePost = posts.slice(0, limit || posts.length)

    return (
      <div className="posts">
        <div className="flex">
          {visiblePost.map((item, index) => (
            <Link className="item" to={item.slug} key={`post-${item.title}`}>
              <div className="post-card flex">
                <Image
                  background
                  className="cover"
                  resolutions="small"
                  src={item.featuredImage}
                  alt={item.title}
                />
              </div>
              <div className="card taCenter">
                <h5>{item.date}</h5>
                <h4>{item.title}</h4>
              </div>
            </Link>
          ))}
        </div>

        {showLoadMore && visiblePost.length < posts.length && (
          <div className="taCenter">
            <div className="button" onClick={this.increaseLimit}>
              {loadMoreTitle}
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default PostSection
