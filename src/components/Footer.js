import React from 'react'

import './Footer.css'

export default ({ globalSettings, socialSettings, navLinks }) => (
  <footer className="flex">
    <div className="taLeft">
      <p>
        © Copyright {new Date().getFullYear()} The Edit Suite. All rights
        reserved.
      </p>
    </div>
    <div className="taRight">
      <p>
        Site by{' '}
        <a
          href="https://thriveweb.com.au/"
          rel="noopener noreferrer"
          target="_blank"
        >
          Thrive
        </a>
      </p>
    </div>
  </footer>
)
