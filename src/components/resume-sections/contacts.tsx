import { css } from '@emotion/core'
import React from 'react'
import { FaBlog, FaEnvelope, FaMapMarkerAlt, FaMobile } from 'react-icons/fa'

import type { Basics } from '../../../typings/resume'

import { SocialIcon } from '../social-icon'

type Props = { basics: Basics }
export const Contacts = ({ basics }: Props): JSX.Element => {
  const { email, location, phone, profiles, url } = basics
  return (
    <address
      css={css`
        background: hsla(0, 0%, 0%, 0.04);
      `}
    >
      <ul
        css={css`
          margin-bottom: unset;
          margin-left: unset;

          list-style: none;
          li {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: flex-start;
            svg {
              margin-right: 0.75rem;
            }
          }
        `}
      >
        <li>
          <FaMapMarkerAlt aria-label="location icon" />
          {`${location?.city || 'city'}, ${location?.countryCode || 'country'}`}
        </li>

        <li>
          <FaEnvelope aria-label="mail icon" />
          <a
            href={`mailto:${email || ''}`}
            target="_blank"
            rel="noreferrer"
            aria-label="email"
          >
            {email}
          </a>
        </li>

        <li>
          <FaBlog aria-label="mail icon" />
          <a
            href={url}
            target="_blank"
            rel="noreferrer"
            aria-label="link to my website"
          >
            {url}
          </a>
        </li>

        <li>
          <FaMobile aria-label="phone icon" />
          <a href={`tel:${phone || ''}`} aria-label="phone number">
            {phone}
          </a>
        </li>

        {profiles?.map((profile) => (
          <li>
            <SocialIcon
              network={profile.network || ''}
              aria-label={`${profile?.network || ''} icon`}
            />
            <a
              key={profile.network}
              href={profile.url}
              aria-label={`link to ${profile.network || ''}`}
            >
              {profile.url?.replace(/(https:\/\/www\.)|(https:\/\/)/i, '')}
            </a>
          </li>
        ))}
      </ul>
    </address>
  )
}
