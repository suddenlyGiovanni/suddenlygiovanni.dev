import * as React from 'react'
import { FaBlog, FaEnvelope, FaMapMarkerAlt, FaMobile } from 'react-icons/fa'
import styled from 'styled-components'

import Breakpoints from '../../lib/breakpoints'
import type { Basics } from '../../types/resume'
import * as Social from '../social-icon'

const AddressStyled = styled.address`
  background: hsla(0, 0%, 0%, 0.04);
`

const ListStyled = styled.ul`
  display: flex;
  flex-flow: column wrap;
  align-content: space-evenly;
  align-items: flex-start;
  justify-content: flex-start;
  max-height: 10em;
  margin-bottom: unset;
  margin-left: unset;

  list-style: none;

  ${Breakpoints.mediaQuerySmallDevices} {
    max-height: unset;
  }
`

const ListItemStyled = styled.li`
  li {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;

    svg {
      margin-right: 0.75rem;
    }
  }
`

interface Props {
  readonly basics: Basics
}

export const SectionContacts: React.VFC<Props> = ({ basics }) => {
  const { email, location, phone, profiles, url } = basics
  return (
    <AddressStyled>
      <ListStyled>
        <ListItemStyled>
          <FaMapMarkerAlt aria-label="location icon" />
          {`${location?.city || 'city'}, ${location?.countryCode || 'country'}`}
        </ListItemStyled>

        <ListItemStyled>
          <FaEnvelope aria-label="mail icon" />
          <a
            href={`mailto:${email || ''}`}
            target="_blank"
            rel="noreferrer"
            aria-label="email"
          >
            {email}
          </a>
        </ListItemStyled>

        <ListItemStyled>
          <FaBlog aria-label="mail icon" />
          <a
            href={url}
            target="_blank"
            rel="noreferrer"
            aria-label="link to my website"
          >
            {url}
          </a>
        </ListItemStyled>

        <ListItemStyled>
          <FaMobile aria-label="phone icon" />
          <a href={`tel:${phone || ''}`} aria-label="phone number">
            {phone}
          </a>
        </ListItemStyled>

        {profiles?.map((profile, idx) => (
          <ListItemStyled key={String(idx) + String(profile.network)}>
            {Social.IconMap.has(profile.network as Social.SocialNetworks) && (
              <Social.SocialIcon
                network={profile.network!}
                aria-label={`${profile?.network || ''} icon`}
              />
            )}
            <a
              href={profile.url}
              aria-label={`link to ${profile.network || ''}`}
            >
              {profile.url?.replace(/(https:\/\/www\.)|(https:\/\/)/i, '')}
            </a>
          </ListItemStyled>
        ))}
      </ListStyled>
    </AddressStyled>
  )
}
