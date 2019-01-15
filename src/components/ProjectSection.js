import React from 'react'
import { Link } from 'gatsby'
import _kebabCase from 'lodash/kebabCase'

import Image from '../components/Image'

class ProjectSection extends React.Component {
  static defaultProps = {
    projects: [],
    limit: 9,
    showLoadMore: true,
    loadMoreTitle: 'Load More',
    perPageLimit: 9
  }

  state = {
    limit: this.props.limit
  }

  increaseLimit = () =>
    this.setState(prevState => ({
      limit: prevState.limit + this.props.perPageLimit
    }))

  render() {
    const { projects, showLoadMore, loadMoreTitle } = this.props
    const { limit } = this.state

    const visibleProject = projects.slice(0, limit || projects.length)

    return (
      <div className="items-expand">
        <div className="flex">
          {visibleProject.map((item, index) => (
            <Link
              className="item flex"
              to={item.slug}
              key={`project-${_kebabCase(item.title)}`}
            >
              <Image
                className="cover"
                src={item.preview}
                alt={_kebabCase(item.title)}
              />
            </Link>
          ))}
        </div>

        {showLoadMore && visibleProject.length < projects.length && (
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

export default ProjectSection
