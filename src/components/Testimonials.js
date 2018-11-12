import React from 'react'
import Swiper from 'react-id-swiper/lib/custom'
// import 'react-id-swiper/src/styles/css/swiper.css'

import Image from './Image'
import './Testimonials.css'

class Testimonials extends React.Component {
  render() {
    const { testimonials } = this.props
    const params = {
      slidesPerView: 1,
      direction: 'vertical',
      pagination: {
        el: '.swiper-pagination',
        clickable: true
      },
      autoplay: {
        delay: 5000
      },
      breakpoints: {
        700: {
          slidesPerView: 1
        }
      }
    }

    return (
      <div className="testimonials relative flex">
        <Image
          src="https://theeditsuite.netlify.com/images/quote.svg"
          alt="quote"
        />
        <Swiper {...params}>
          {testimonials.map((item, index) => (
            <div key={`${item.name} + ${index}`}>
              <div>
                <p>{item.content}</p>
                <h5>
                  {item.name}, {item.company}
                </h5>
              </div>
            </div>
          ))}
        </Swiper>
      </div>
    )
  }
}
export default Testimonials
