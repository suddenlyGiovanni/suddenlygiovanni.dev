import { css } from '@emotion/core'
import React from 'react'

import config from '../../config/website'

import { SocialIcon } from './social-icon'

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
    <SocialIcon network="twitter" size={24} aria-label="Twitter icon" />
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
    <SocialIcon network="linkedin" size={24} aria-label="LinkedIn icon" />
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
    <SocialIcon network="github" size={24} aria-label="GitHub icon" />
  </a>
)
