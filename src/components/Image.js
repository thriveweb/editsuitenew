import React from 'react'
import PropTypes from 'prop-types'
// import Observer from '@researchgate/react-intersection-observer'

import './Image.css'

class Image extends React.Component {
  imageSizes = [
    '320',
    '450',
    '640',
    '750',
    '800',
    '900',
    '1000',
    '1200',
    '1500',
    '1600',
    '2000'
  ] // image siezes used for image source sets

  // state = {
  //   isIntersecting: true
  // }

  // handleIntersection = e => {
  //   if (e.isIntersecting) this.setState({ isIntersecting: true })
  // }

  checkIfIsLocalSrc(src) {
    return typeof src === 'string' && src.includes('ucarecdn.com')
  }

  render() {
    let {
      background,
      backgroundSize = 'cover',
      resolutions = '1000x',
      className = '',
      src,
      secSet = '',
      fullSrc,
      smallSrc,
      onClick,
      alt = ''
    } = this.props

    const isLocalImg = this.checkIfIsLocalSrc(src)
    /* create source set for images */
    if (!isLocalImg) {
      secSet = this.imageSizes.map(size => {
        return `${src}-/progressive/yes/-/format/auto/-/preview/${size}x${size}/-/quality/lightest/${size}.jpg ${size}w`
      })
    }

    /* add resolutions options for inline images */
    if (resolutions === 'small') {
      resolutions = '800x'
    } else if (resolutions === 'medium') {
      resolutions = '1000x'
    } else if (resolutions === 'large') {
      resolutions = '2000x'
    }

    fullSrc = `${src}${
      isLocalImg
        ? ''
        : '-/progressive/yes/-/format/auto/-/resize/' + resolutions + '/'
    }`
    // smallSrc = `${src}${
    //   isLocalImg ? '' : '-/progressive/yes/-/format/auto/-/resize/10x/'
    // }`

    if (background) {
      return (
        // <Observer onChange={this.handleIntersection}>
        <div
          className={`BackgroundImage absolute ${className}`}
          style={{
            backgroundImage: `url(${fullSrc})`,
            backgroundSize
          }}
          // style={{
          //   backgroundImage: `url(${
          //     this.state.isIntersecting ? fullSrc : smallSrc
          //   })`,
          //   backgroundSize
          // }}
        />
        // </Observer>
      )
    }

    return (
      // <Observer onChange={this.handleIntersection}>
      <img
        className={`LazyImage ${className}`}
        src={fullSrc}
        srcSet={secSet}
        // src={this.state.isIntersecting ? fullSrc : smallSrc}
        // srcSet={this.state.isIntersecting ? secSet : ''}
        sizes={'100vw'}
        onClick={onClick}
        alt={alt}
      />
      // </Observer>
    )
  }
}

Image.propTypes = {
  alt: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired
}

export default Image
