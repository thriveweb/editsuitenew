import React, { Component } from 'react'
import { Link } from 'gatsby'

import Logo from './Logo'
import './Nav.css'

export default class Nav extends Component {
  state = {
    active: false
  }

  handleMenuToggle = () => this.setState({ active: !this.state.active })
  handleLinkClick = () => this.state.active && this.handleMenuToggle()

  render() {
    const { active } = this.state

    const NavLink = ({ className, children, social, ...props }) => (
      <Link
        {...props}
        className={`NavLink ${className || ''}`}
        onClick={this.handleLinkClick}
      >
        {children}
      </Link>
    )

    const { social } = this.props

    return (
      <nav className={`nav ${active ? 'nav-active' : ''}`}>
        <div className="wrap">
          <div className="menu-button" onClick={this.handleMenuToggle}>
            <div className="bar" />
            <div className="bar" />
          </div>

          <Link to="/" onClick={this.handleLinkClick}>
            <Logo />
          </Link>

          <div className="nav-links">
            <NavLink to="/about/">About</NavLink>
            <NavLink to="/work/">Work</NavLink>
            <NavLink to="/blog/">Blog</NavLink>
            <NavLink to="/contact/">Contact</NavLink>

            {!!social && (
              <div className="social hide">
                <a
                  href={social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fab fa-facebook-f" />
                </a>
                <a
                  href={social.vimeo}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fab fa-vimeo-v" />
                </a>
                <a
                  href={social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fab fa-instagram" />
                </a>
                <a
                  href={social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fab fa-linkedin-in" />
                </a>
              </div>
            )}
          </div>

          {!!social && (
            <div className="social show">
              <a
                href={social.facebook}
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-facebook-f" />
              </a>
              <a href={social.vimeo} target="_blank" rel="noopener noreferrer">
                <i className="fab fa-vimeo-v" />
              </a>
              <a
                href={social.instagram}
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-instagram" />
              </a>
              <a
                href={social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-linkedin-in" />
              </a>
            </div>
          )}
        </div>
      </nav>
    )
  }
}
