import React from 'react'

import Image from './Image'

const ContactInfo = ({ contact }) => (
  <div className="flex half">
    <div className="map">
      <a
        href="https://www.google.com/maps/place/The+Edit+Suite/@-28.0464532,153.4328513,17z/data=!3m1!4b1!4m5!3m4!1s0x6b910390b2975c77:0xeda10e8c33766cf7!8m2!3d-28.046458!4d153.43504?hl=en-GB"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Image
          className="cover"
          src="https://ucarecdn.com/e0af54bf-9947-495d-b1ee-e2d60c00aa6c/"
          alt="Find The Edit Suite"
        />
      </a>
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
