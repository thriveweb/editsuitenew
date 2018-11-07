import React from 'react'
import Swiper from 'react-id-swiper/lib/custom'
// import 'react-id-swiper/src/styles/css/swiper.css'

import Image from './Image'
import './Testimonials.css'

class Testimonials extends React.Component {
  render() {
    const { testimonials = [] } = this.props
    const params = {
      slidesPerView: 1,
      spaceBetween: 30,
      direction: 'vertical',
      pagination: {
        el: '.swiper-pagination',
        clickable: true
      },
      autoplay: {
        delay: 5000,
        disableOnInteraction: false
      },
      breakpoints: {
        700: {
          slidesPerView: 1
        }
      }
    }

    return (
      <div className="testimonials relative flex">
        <Image src="images/quote.svg" alt="" />
        <Swiper {...params}>
          {testimonials.map((item, index) => (
            <div key={item.name}>
              <p>{item.content}</p>
              <h5>
                {item.name}, {item.company}
              </h5>
            </div>
          ))}
        </Swiper>
      </div>
    )
  }
}
export default Testimonials
