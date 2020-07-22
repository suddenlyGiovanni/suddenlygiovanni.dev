import { css } from '@emotion/core'

export const globalStyles = css`
  html {
    font-family: sans-serif;
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
  }
  body {
    margin: 0;
  }
  article,
  aside,
  details,
  figcaption,
  figure,
  footer,
  header,
  main,
  menu,
  nav,
  section,
  summary {
    display: block;
  }
  audio,
  canvas,
  progress,
  video {
    display: inline-block;
  }
  audio:not([controls]) {
    display: none;
    height: 0;
  }
  progress {
    vertical-align: baseline;
  }
  [hidden],
  template {
    display: none;
  }
  a {
    background-color: transparent;
    -webkit-text-decoration-skip: objects;
  }
  a:active,
  a:hover {
    outline-width: 0;
  }
  abbr[title] {
    text-decoration: underline;
    text-decoration: underline dotted;

    border-bottom: none;
  }
  b,
  strong {
    font-weight: inherit;
    font-weight: bolder;
  }
  dfn {
    font-style: italic;
  }
  h1 {
    margin: 0.67em 0;

    font-size: 2em;
  }
  mark {
    color: #000;

    background-color: #ff0;
  }
  small {
    font-size: 80%;
  }
  sub,
  sup {
    position: relative;

    font-size: 75%;
    line-height: 0;
    vertical-align: baseline;
  }
  sub {
    bottom: -0.25em;
  }
  sup {
    top: -0.5em;
  }
  img {
    border-style: none;
  }
  svg:not(:root) {
    overflow: hidden;
  }
  code,
  kbd,
  pre,
  samp {
    font-size: 1em;
    font-family: monospace, monospace;
  }
  figure {
    margin: 1em 40px;
  }
  hr {
    box-sizing: content-box;
    height: 0;
    overflow: visible;
  }
  button,
  input,
  optgroup,
  select,
  textarea {
    margin: 0;

    font: inherit;
  }
  optgroup {
    font-weight: 700;
  }
  button,
  input {
    overflow: visible;
  }
  button,
  select {
    text-transform: none;
  }
  [type='reset'],
  [type='submit'],
  button,
  html [type='button'] {
    -webkit-appearance: button;
  }
  [type='button']::-moz-focus-inner,
  [type='reset']::-moz-focus-inner,
  [type='submit']::-moz-focus-inner,
  button::-moz-focus-inner {
    padding: 0;

    border-style: none;
  }
  [type='button']:-moz-focusring,
  [type='reset']:-moz-focusring,
  [type='submit']:-moz-focusring,
  button:-moz-focusring {
    outline: 1px dotted ButtonText;
  }
  fieldset {
    margin: 0 2px;
    padding: 0.35em 0.625em 0.75em;

    border: 1px solid silver;
  }
  legend {
    display: table;
    box-sizing: border-box;
    max-width: 100%;
    padding: 0;

    color: inherit;
    white-space: normal;
  }
  textarea {
    overflow: auto;
  }
  [type='checkbox'],
  [type='radio'] {
    box-sizing: border-box;
    padding: 0;
  }
  [type='number']::-webkit-inner-spin-button,
  [type='number']::-webkit-outer-spin-button {
    height: auto;
  }
  [type='search'] {
    outline-offset: -2px;

    -webkit-appearance: textfield;
  }
  [type='search']::-webkit-search-cancel-button,
  [type='search']::-webkit-search-decoration {
    -webkit-appearance: none;
  }
  ::-webkit-input-placeholder {
    color: inherit;

    opacity: 0.54;
  }
  ::-webkit-file-upload-button {
    font: inherit;

    -webkit-appearance: button;
  }
  html {
    box-sizing: border-box;
    overflow-y: scroll;

    font: 112.5%/1.45em georgia, serif;
  }
  * {
    box-sizing: inherit;
  }
  *::before {
    box-sizing: inherit;
  }
  *::after {
    box-sizing: inherit;
  }
  body {
    color: hsla(0, 0%, 0%, 0.8);
    font-weight: normal;
    font-family: georgia, serif;
    word-wrap: break-word;
    font-kerning: normal;
    -moz-font-feature-settings: 'kern', 'liga', 'clig', 'calt';
    -ms-font-feature-settings: 'kern', 'liga', 'clig', 'calt';
    -webkit-font-feature-settings: 'kern', 'liga', 'clig', 'calt';
    font-feature-settings: 'kern', 'liga', 'clig', 'calt';
  }
  img {
    max-width: 100%;
    margin-top: 0;
    margin-right: 0;
    margin-bottom: 1.45rem;
    margin-left: 0;
    padding-top: 0;
    padding-right: 0;
    padding-bottom: 0;
    padding-left: 0;
  }
  h1 {
    margin-top: 0;
    margin-right: 0;
    margin-bottom: 1.45rem;
    margin-left: 0;
    padding-top: 0;
    padding-right: 0;
    padding-bottom: 0;
    padding-left: 0;

    color: inherit;
    font-weight: bold;
    font-size: 2.25rem;
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
      Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
    line-height: 1.1;
    text-rendering: optimizeLegibility;
  }
  h2 {
    margin-top: 0;
    margin-right: 0;
    margin-bottom: 1.45rem;
    margin-left: 0;
    padding-top: 0;
    padding-right: 0;
    padding-bottom: 0;
    padding-left: 0;

    color: inherit;
    font-weight: bold;
    font-size: 1.62671rem;
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
      Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
    line-height: 1.1;
    text-rendering: optimizeLegibility;
  }
  h3 {
    margin-top: 0;
    margin-right: 0;
    margin-bottom: 1.45rem;
    margin-left: 0;
    padding-top: 0;
    padding-right: 0;
    padding-bottom: 0;
    padding-left: 0;

    color: inherit;
    font-weight: bold;
    font-size: 1.38316rem;
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
      Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
    line-height: 1.1;
    text-rendering: optimizeLegibility;
  }
  h4 {
    margin-top: 0;
    margin-right: 0;
    margin-bottom: 1.45rem;
    margin-left: 0;
    padding-top: 0;
    padding-right: 0;
    padding-bottom: 0;
    padding-left: 0;

    color: inherit;
    font-weight: bold;
    font-size: 1rem;
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
      Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
    line-height: 1.1;
    text-rendering: optimizeLegibility;
  }
  h5 {
    margin-top: 0;
    margin-right: 0;
    margin-bottom: 1.45rem;
    margin-left: 0;
    padding-top: 0;
    padding-right: 0;
    padding-bottom: 0;
    padding-left: 0;

    color: inherit;
    font-weight: bold;
    font-size: 0.85028rem;
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
      Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
    line-height: 1.1;
    text-rendering: optimizeLegibility;
  }
  h6 {
    margin-top: 0;
    margin-right: 0;
    margin-bottom: 1.45rem;
    margin-left: 0;
    padding-top: 0;
    padding-right: 0;
    padding-bottom: 0;
    padding-left: 0;

    color: inherit;
    font-weight: bold;
    font-size: 0.78405rem;
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
      Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
    line-height: 1.1;
    text-rendering: optimizeLegibility;
  }
  hgroup {
    margin-top: 0;
    margin-right: 0;
    margin-bottom: 1.45rem;
    margin-left: 0;
    padding-top: 0;
    padding-right: 0;
    padding-bottom: 0;
    padding-left: 0;
  }
  ul {
    margin-top: 0;
    margin-right: 0;
    margin-bottom: 1.45rem;
    margin-left: 1.45rem;
    padding-top: 0;
    padding-right: 0;
    padding-bottom: 0;
    padding-left: 0;

    list-style-position: outside;
    list-style-image: none;
  }
  ol {
    margin-top: 0;
    margin-right: 0;
    margin-bottom: 1.45rem;
    margin-left: 1.45rem;
    padding-top: 0;
    padding-right: 0;
    padding-bottom: 0;
    padding-left: 0;

    list-style-position: outside;
    list-style-image: none;
  }
  dl {
    margin-top: 0;
    margin-right: 0;
    margin-bottom: 1.45rem;
    margin-left: 0;
    padding-top: 0;
    padding-right: 0;
    padding-bottom: 0;
    padding-left: 0;
  }
  dd {
    margin-top: 0;
    margin-right: 0;
    margin-bottom: 1.45rem;
    margin-left: 0;
    padding-top: 0;
    padding-right: 0;
    padding-bottom: 0;
    padding-left: 0;
  }
  p {
    margin-top: 0;
    margin-right: 0;
    margin-bottom: 1.45rem;
    margin-left: 0;
    padding-top: 0;
    padding-right: 0;
    padding-bottom: 0;
    padding-left: 0;
  }
  figure {
    margin-top: 0;
    margin-right: 0;
    margin-bottom: 1.45rem;
    margin-left: 0;
    padding-top: 0;
    padding-right: 0;
    padding-bottom: 0;
    padding-left: 0;
  }
  pre {
    margin-top: 0;
    margin-right: 0;
    margin-bottom: 1.45rem;
    margin-left: 0;
    padding: 1.45rem;
    padding-top: 0;
    padding-right: 0;
    padding-bottom: 0;
    padding-left: 0;
    overflow: auto;

    font-size: 0.85rem;
    line-height: 1.42;
    word-wrap: normal;

    background: hsla(0, 0%, 0%, 0.04);
    border-radius: 3px;
  }
  table {
    width: 100%;
    margin-top: 0;
    margin-right: 0;
    margin-bottom: 1.45rem;
    margin-left: 0;
    padding-top: 0;
    padding-right: 0;
    padding-bottom: 0;
    padding-left: 0;

    font-size: 1rem;
    line-height: 1.45rem;

    border-collapse: collapse;
  }
  fieldset {
    margin-top: 0;
    margin-right: 0;
    margin-bottom: 1.45rem;
    margin-left: 0;
    padding-top: 0;
    padding-right: 0;
    padding-bottom: 0;
    padding-left: 0;
  }
  blockquote {
    margin-top: 0;
    margin-right: 1.45rem;
    margin-bottom: 1.45rem;
    margin-left: 1.45rem;
    padding-top: 0;
    padding-right: 0;
    padding-bottom: 0;
    padding-left: 0;
  }
  form {
    margin-top: 0;
    margin-right: 0;
    margin-bottom: 1.45rem;
    margin-left: 0;
    padding-top: 0;
    padding-right: 0;
    padding-bottom: 0;
    padding-left: 0;
  }
  noscript {
    margin-top: 0;
    margin-right: 0;
    margin-bottom: 1.45rem;
    margin-left: 0;
    padding-top: 0;
    padding-right: 0;
    padding-bottom: 0;
    padding-left: 0;
  }
  iframe {
    margin-top: 0;
    margin-right: 0;
    margin-bottom: 1.45rem;
    margin-left: 0;
    padding-top: 0;
    padding-right: 0;
    padding-bottom: 0;
    padding-left: 0;
  }
  hr {
    height: 1px;
    margin-top: 0;
    margin-right: 0;
    margin-bottom: calc(1.45rem - 1px);
    margin-left: 0;
    padding-top: 0;
    padding-right: 0;
    padding-bottom: 0;
    padding-left: 0;

    background: hsla(0, 0%, 0%, 0.2);
    border: none;
  }
  address {
    margin-top: 0;
    margin-right: 0;
    margin-bottom: 1.45rem;
    margin-left: 0;
    padding-top: 0;
    padding-right: 0;
    padding-bottom: 0;
    padding-left: 0;
  }
  b {
    font-weight: bold;
  }
  strong {
    font-weight: bold;
  }
  dt {
    font-weight: bold;
  }
  th {
    font-weight: bold;
  }
  li {
    margin-bottom: calc(1.45rem / 2);
  }
  ol li {
    padding-left: 0;
  }
  ul li {
    padding-left: 0;
  }
  li > ol {
    margin-top: calc(1.45rem / 2);
    margin-bottom: calc(1.45rem / 2);
    margin-left: 1.45rem;
  }
  li > ul {
    margin-top: calc(1.45rem / 2);
    margin-bottom: calc(1.45rem / 2);
    margin-left: 1.45rem;
  }
  blockquote *:last-child {
    margin-bottom: 0;
  }
  li *:last-child {
    margin-bottom: 0;
  }
  p *:last-child {
    margin-bottom: 0;
  }
  li > p {
    margin-bottom: calc(1.45rem / 2);
  }
  code {
    font-size: 0.85rem;
    line-height: 1.45rem;
  }
  kbd {
    font-size: 0.85rem;
    line-height: 1.45rem;
  }
  samp {
    font-size: 0.85rem;
    line-height: 1.45rem;
  }
  abbr {
    border-bottom: 1px dotted hsla(0, 0%, 0%, 0.5);
    cursor: help;
  }
  acronym {
    border-bottom: 1px dotted hsla(0, 0%, 0%, 0.5);
    cursor: help;
  }
  abbr[title] {
    text-decoration: none;

    border-bottom: 1px dotted hsla(0, 0%, 0%, 0.5);
    cursor: help;
  }
  thead {
    text-align: left;
  }
  td,
  th {
    padding-top: 0.725rem;
    padding-right: 0.96667rem;
    padding-bottom: calc(0.725rem - 1px);
    padding-left: 0.96667rem;

    text-align: left;

    border-bottom: 1px solid hsla(0, 0%, 0%, 0.12);
    -moz-font-feature-settings: 'tnum';
    -ms-font-feature-settings: 'tnum';
    -webkit-font-feature-settings: 'tnum';
    font-feature-settings: 'tnum';
  }
  th:first-child,
  td:first-child {
    padding-left: 0;
  }
  th:last-child,
  td:last-child {
    padding-right: 0;
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
