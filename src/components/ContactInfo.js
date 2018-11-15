import React from 'react'

import GoogleMap from './GoogleMap'

const ContactInfo = ({ address, phone, email }) => (
  <div className="flex half">
    <div className="map">
      <GoogleMap />
    </div>
    <div>
      {!!address && (
        <span>
          <h5>Office</h5>
          <p>{address}</p>
          <br />
        </span>
      )}

      {!!phone && (
        <span>
          <h5>Phone</h5>
          <a href={`tel:${phone}`}>
            <p>{phone}</p>
          </a>
          <br />
        </span>
      )}

      {!!email && (
        <span>
          <h5>Email</h5>
          <a href={`mailto:${email}`}>
            <p>{email}</p>
          </a>
        </span>
      )}
    </div>
  </div>
)

export default ContactInfo
