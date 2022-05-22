import { FaBlog, FaEnvelope, FaMapMarkerAlt, FaMobile } from 'react-icons/fa'
import styled from 'styled-components'

import * as Responsive from '../../lib/responsive'
import type { Basics } from '../../types/resume'
import * as Social from '../social-icon'

const Address = styled.address`
  background: hsla(0, 0%, 0%, 0.04);
`

const Ul = styled.ul`
  display: flex;
  flex-flow: column wrap;
  align-content: space-evenly;
  align-items: flex-start;
  justify-content: flex-start;
  max-height: 10em;
  margin-bottom: unset;
  margin-left: unset;

  list-style: none;

  @media ${Responsive.Queries.mobile} {
    max-height: unset;
  }
`

const Li = styled.li`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;

  svg {
    margin-right: 0.75rem;
  }
`

interface Props {
  readonly basics: Basics
}

export const SectionContacts: React.VFC<Props> = ({ basics }) => {
  const { email, location, phone, profiles, url } = basics
  return (
    <Address>
      <Ul>
        <Li>
          <FaMapMarkerAlt aria-label="location icon" />
          {`${location?.city || 'city'}, ${location?.countryCode || 'country'}`}
        </Li>

        <Li>
          <FaEnvelope aria-label="mail icon" />
          <a
            href={`mailto:${email || ''}`}
            target="_blank"
            rel="noreferrer"
            aria-label="email"
          >
            {email}
          </a>
        </Li>

        <Li>
          <FaBlog aria-label="mail icon" />
          <a
            href={url}
            target="_blank"
            rel="noreferrer"
            aria-label="link to my website"
          >
            {url}
          </a>
        </Li>

        <Li>
          <FaMobile aria-label="phone icon" />
          <a href={`tel:${phone || ''}`} aria-label="phone number">
            {phone}
          </a>
        </Li>

        {profiles?.map((profile, idx) => (
          <Li key={String(idx) + String(profile.network)}>
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
          </Li>
        ))}
      </Ul>
    </Address>
  )
}
