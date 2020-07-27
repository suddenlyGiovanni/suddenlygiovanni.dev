import { css } from '@emotion/core'
import React from 'react'
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa'

import config from '../../config/website'

type Props = {
  color?: string
  url?: string
}

export const Twitter = ({
  color = `rgba(255,255,255,0.7)`,
  url = `${config.twitter}`,
}: Props): JSX.Element => (
  <a
    href={url}
    css={css`
      display: flex;
      align-items: center;
      justify-content: center;

      color: ${color};
      :hover {
        color: rgba(255, 255, 255, 1);
      }
    `}
    aria-label="Visit my Twitter"
  >
    <FaTwitter size={24} />
  </a>
)

export const LinkedIn = ({
  color = `rgba(255,255,255,0.7)`,
  url = `${config.linkedin}`,
}: Props): JSX.Element => (
  <a
    href={url}
    css={css`
      display: flex;
      align-items: center;
      justify-content: center;

      color: ${color};
      :hover {
        color: rgba(255, 255, 255, 1);
      }
    `}
    aria-label="Visit my LinkedIn"
  >
    <FaLinkedin size={24} />
  </a>
)

export const GitHub = ({
  color = `rgba(255,255,255,0.7)`,
  url = `${config.github}`,
}: Props): JSX.Element => (
  <a
    href={url}
    css={css`
      display: flex;
      align-items: center;
      justify-content: center;

      color: ${color};
      :hover {
        color: rgba(255, 255, 255, 1);
      }
    `}
    aria-label="Visit my GitHub"
  >
    <FaGithub size={24} />
  </a>
)
