import { css } from '@emotion/core'
import { Link, PageProps } from 'gatsby'
import React, { FC } from 'react'
import { FaEnvelope, FaMapMarkerAlt, FaMobile } from 'react-icons/fa'

import { Layout, ReadLink, SocialIcon } from '../components/index'
import { useResume } from '../hooks'

const ResumePage: FC<PageProps> = () => {
  const resume = useResume()
  const {
    awards,
    basics,
    education,
    interests,
    languages,
    meta,
    projects,
    publications,
    references,
    skills,
    volunteer,
  } = resume
  return (
    <Layout>
      <h1>Résumé</h1>
      <article>
        <header>
          <hgroup
            css={css`
              & > h1,
              & h2 {
                border-bottom: unset;
              }
            `}
          >
            <h1>{basics?.name || 'name'}</h1>
            <h2>{basics?.label || 'title'}</h2>
          </hgroup>
          <p>{basics?.summary || 'summary'}</p>
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
              {/* LOCATION */}
              <li>
                <FaMapMarkerAlt aria-label="location icon" />
                {`${basics?.location?.city || 'city'}, ${
                  basics?.location?.countryCode || 'country'
                }`}
              </li>

              {/* MAIL */}
              <li>
                <FaEnvelope aria-label="mail icon" />
                <a
                  href={`mailto:${basics?.email || ''}`}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="email"
                >
                  {basics?.email}
                </a>
              </li>

              {/* PHONE */}
              <li>
                <FaMobile aria-label="phone icon" />
                <a
                  href={`tel:${basics?.phone || ''}`}
                  aria-label="phone number"
                >
                  {basics?.phone}
                </a>
              </li>

              {/* SOCIALS */}
              {basics?.profiles?.map((profile) => (
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
                    {profile.url?.replace(
                      /(https:\/\/www\.)|(https:\/\/)/i,
                      ''
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </address>
          <p>
            If you consider me for a role, read through{' '}
            <Link to="/motivations"> my motivations</Link> first.
          </p>
        </header>
        <pre>{JSON.stringify(resume, null, 2)}</pre>
        <ReadLink to="/">&larr; back to my Blog</ReadLink>
      </article>
    </Layout>
  )
}

export default ResumePage
