import React from 'react'
import { stringify } from 'qs'
import { serialize } from 'dom-form-serializer'

import './Form.css'

class Form extends React.Component {
  static defaultProps = {
    name: 'Simple Form Ajax',
    subject: '', // optional subject of the notification email
    action: '',
    honeypot: 'confirm',
    successMessage: 'Thanks for your enquiry, we will get back to you soon',
    errorMessage:
      'There is a problem, your message has not been sent, please try contacting us via email'
  }

  state = {
    alert: '',
    disabled: false
  }

  handleSubmit = e => {
    e.preventDefault()
    if (this.state.disabled) return

    const form = e.target
    const data = serialize(form)
    this.setState({ disabled: true })
    fetch(form.action + '?' + stringify(data), {
      method: 'POST'
    })
      .then(res => {
        if (res.ok) {
          return res
        } else {
          throw new Error('Network error')
        }
      })
      .then(() => {
        form.reset()
        this.setState({
          alert: this.props.successMessage,
          disabled: false
        })
      })
      .catch(err => {
        console.error(err)
        this.setState({
          disabled: false,
          alert: this.props.errorMessage
        })
      })
  }

  render() {
    const { name, subject, action, honeypot } = this.props

    return (
      <form
        className="form"
        name={name}
        action={action}
        onSubmit={this.handleSubmit}
        data-netlify=""
        data-netlify-honeypot={honeypot}
      >
        <div className="flex">
          {this.state.alert && <div className="alert">{this.state.alert}</div>}
          <label className="label">
            <input
              className="input"
              type="text"
              value="What's your name?"
              name="name"
              required
            />
          </label>
          <label className="label">
            <input
              className="input"
              type="email"
              value="What's your email address?"
              name="email"
              required
            />
          </label>
          <label className="label">
            <input
              className="input"
              type="text"
              value="Give this email a subject"
              name="subject"
              required
            />
          </label>
          <label className="label">
            <input
              className="input textarea"
              value="How can we help?"
              name="message"
              required
            />
          </label>
        </div>
        <input
          type="text"
          name={honeypot}
          className="input-honey"
          value="Leave blank if you are a human"
        />
        {!!subject && <input type="hidden" name="subject" value={subject} />}
        <input type="hidden" name="form-name" value={name} />
        <input
          className="button"
          type="submit"
          value="Submit"
          disabled={this.state.disabled}
        />
        <div className="clear" />
      </form>
    )
  }
}

export default Form
