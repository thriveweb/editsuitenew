import React from 'react'

import './Icons.css'

const Icons = ({ icons }) => (
  <div className="thin flex">
    <div className="icon one">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
        <path d="M30,49L50,59L70,49" />
        <path d="M70,49l10-5L50,29,20,44l10,5V59c0,5.53,9,10,20,10s20-4.47,20-10Z" />
        <path d="M46,44.5A4.5,2.5 0,1,1 55,44.5A4.5,2.5 0,1,1 46,44.5" />
        <path d="M46,44L20,43.99L20,69" />
        <path d="M18.92,72.08L20,69L21.09,72.08" />
      </svg>

      <h5>{icons.oneTitle}</h5>
      <p>{icons.oneDescription}</p>
    </div>

    <div className="icon two">
      <svg version="1.1" x="0px" y="0px" viewBox="0 0 100 100">
        <path d="M50,42.287c0-4.606,5.197-11.114,10.643-11.114c5.446,0,10.643,3.728,10.643,10.328 C71.286,61.179,50,68.766,50,68.766S28.714,61.179,28.714,41.5c0-6.6,5.197-10.328,10.643-10.328S50,37.681,50,42.287z" />
      </svg>
      <h5>{icons.twoTitle}</h5>
      <p>{icons.twoDescription}</p>
    </div>

    <div className="icon three">
      <svg version="1.1" viewBox="0 0 100 100">
        <path d="M45.2,67.2c0-2.5-2.1-7.8-4.4-9.8c-2.5-2.3-4-5.5-4-9.1c0-7,5.9-12.7,13.2-12.7s13.2,5.7,13.2,12.7 c0,3.6-1.6,6.9-4.1,9.2c-1.9,1.9-4.6,6.7-4.6,9.7" />
        <path d="M43.5,71.8L56.6,71.8" />
        <path d="M43.5,76.9L56.6,76.9" />
        <path d="M50.1,28.5L50.1,22.1" />
        <path d="M36,34.1L31.3,29.5" />
        <path d="M30.2,47.5L23.5,47.5" />
        <path d="M35.9,61L31.2,65.6" />
        <path d="M64,61.1L68.7,65.7" />
        <path d="M69.8,47.6L76.5,47.6" />
        <path d="M64.1,34.1L68.8,29.6" />
      </svg>

      <h5>{icons.threeTitle}</h5>
      <p>{icons.threeDescription}</p>
    </div>
  </div>
)

export default Icons
