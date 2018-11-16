import React from 'react'

import GoogleMap from './GoogleMap'

const ContactInfo = ({ contact }) => (
  <div className="flex half">
    <div className="map">
      <GoogleMap />
    </div>
    {!!contact && (
      <div>
        {!!contact.address && (
          <span>
            <h5>Office</h5>
            <p>{contact.address}</p>
            <br />
          </span>
        )}

        {!!contact.phone && (
          <span>
            <h5>Phone</h5>
            <a href={`tel:${contact.phone}`}>
              <p>{contact.phone}</p>
            </a>
            <br />
          </span>
        )}

        {!!contact.email && (
          <span>
            <h5>Email</h5>
            <a href={`mailto:${contact.email}`}>
              <p>{contact.email}</p>
            </a>
          </span>
        )}
      </div>
    )}
  </div>
)

export default ContactInfo
