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

    const NavLink = ({ className, children, ...props }) => (
      <Link
        {...props}
        className={`NavLink ${className || ''}`}
        onClick={this.handleLinkClick}
      >
        {children}
      </Link>
    )

    return (
      <nav className={`nav ${active ? 'nav-active' : ''}`}>
        <div className="wide">
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
          </div>
        </div>
      </nav>
    )
  }
}
