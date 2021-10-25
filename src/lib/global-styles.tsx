import { createGlobalStyle } from 'styled-components'

const GlobalStyles = createGlobalStyle`
  /* CSS Reset */
  /* Global Remedies ******************/

  /* Use border-box by default, globally */
  *,
  ::before,
  ::after {
    box-sizing: border-box;
  }

  /*
  * Consistent line spacing...
  * CSS Inline Layout Module Level 3: https://drafts.csswg.org/css-inline-3/#line-sizing-property
  */
  html {
    line-sizing: normal;
  }

  /* Remove the tiny space around the edge of the page */
  body {
    margin: 0;
  }

  /* Headings ***********/

  /* Switch to rem units for headings */

  /* @@@ Initial values are based on existing browser defaults */

  /* h1 {
    font-size: 2rem;
  }
  h2 {
    font-size: 1.5rem;
  }
  h3 {
    font-size: 1.17rem;
  }
  h4 {
    font-size: 1rem;
  }
  h5 {
    font-size: 0.83rem;
  }
  h6 {
    font-size: 0.67rem;
  } */

  /* Keep h1 margins consistent, even when nested */
  /* h1 {
    margin: 0.67em 0;
  } */

  /* Typography *************/

  /* Overflow by default is bad */
  pre {
    white-space: pre-wrap;
  }

  /*
  * 1. Solid, thin horizontal rules
  * 2. Remove Firefox 'color: gray'
  * 3. Remove default '1px' height, and common 'overflow: hidden'
  */
  hr {
    height: 0;
    overflow: visible;

    color: inherit;

    border-style: solid;
    border-width: 1px 0 0;
  }

  /* Embedded Elements ********************/

  /*
  * 1. Block display is usually what we want
  * 2. Remove strange space-below when inline
  * 3. Responsive by default
  */
  img,
  svg,
  video,
  canvas,
  audio,
  iframe,
  embed,
  object {
    display: block;
    max-width: 100%;

    vertical-align: middle;
  }

  /*
  * Maintain intrinsic aspect ratios when 'max-width' is applied
  * (iframe, embed, and object have no intrinsic ratio, set height explicitly)
  */
  img,
  svg,
  video,
  canvas {
    height: auto;
  }

  /*
  * There is no good reason elements default to 300px,
  * and audio files are unlikely to come with a width attribute
  */
  audio {
    width: 100%;
  }

  /* Old Browsers ***************/

  /* Remove the border on images inside links in IE 10 and earlier */
  img {
    border-style: none;
  }

  /* Hide the overflow in IE 10 and earlier */
  svg {
    overflow: hidden;
  }

  /* Default block display on HTML5 elements */
  article,
  aside,
  figcaption,
  figure,
  footer,
  header,
  hgroup,
  main,
  nav,
  section {
    display: block;
  }

  /*
  * 1. Add the correct box sizing in IE 10
  * 2. Remove the padding in IE 10
  */
  [type='checkbox'],
  [type='radio'] {
    box-sizing: border-box;
    padding: 0;
  }


  /* Global Styles */
  pre {
    overflow: auto;

    word-wrap: normal;

    background: hsla(0, 0%, 0%, 0.04);
    border-radius: 3px;
  }
  tt,
  code {
    padding: 0;
    padding-top: 0.2em;
    padding-bottom: 0.2em;

    font-family: 'SFMono-Regular', Consolas, 'Roboto Mono', 'Droid Sans Mono',
      'Liberation Mono', Menlo, Courier, monospace;

    background-color: hsla(0, 0%, 0%, 0.04);
    border-radius: 3px;
  }
  pre code {
    line-height: 1.42;

    background: none;
  }
  code::before,
  code::after,
  tt::before,
  tt::after {
    letter-spacing: -0.2em;

    content: ' ';
  }
  pre code::before,
  pre code::after,
  pre tt::before,
  pre tt::after {
    content: '';
  }
  @media only screen and (max-width: 480px) {
    html {
      font-size: 100%;
    }
  }
`

export default GlobalStyles
