import React from 'react'
import Swiper from 'react-id-swiper/lib/custom'
import 'react-id-swiper/src/styles/css/swiper.css'

import Image from './Image'
import './Testimonials.css'

class Testimonials extends React.Component {
  render() {
    const { testimonials } = this.props
    const params = {
      slidesPerView: 1,
      direction: 'horizontal',
      pagination: {
        el: '.swiper-pagination',
        clickable: true
      },
      autoplay: {
        delay: 5000
      }
    }

    return (
      <div className="testimonials relative">
        <Image
          src="https://theeditsuite.netlify.com/images/quote.svg"
          alt="quote"
        />
        <div className="wrap relative">
          <Swiper {...params}>
            {testimonials.map((item, index) => (
              <div key={`${item.name} + ${index}`}>
                <p>{item.content}</p>
                <h5>
                  {item.name}, {item.company}
                </h5>
              </div>
            ))}
          </Swiper>
        </div>
      </div>
    )
  }
}
export default Testimonials
