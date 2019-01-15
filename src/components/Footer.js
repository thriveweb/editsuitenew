import React from 'react'

import './Footer.css'

export default () => (
  <footer className="flex">
    <div className="footer">
      <div className="flex">
        <p>
          © Copyright {new Date().getFullYear()} The Edit Suite. All Rights
          Reserved.
        </p>

        <p>
          Website by{' '}
          <a
            href="https://thriveweb.com.au"
            target="_blank"
            rel="noopener noreferrer"
          >
            Thrive Digital
          </a>
        </p>
      </div>
    </div>
  </footer>
)
