# [suddenlyGiovanni.dev]

My personal JAM Stack Website, built with Gatsby, TypeScript, React, and deployed with Netlify

It host **my blog** and some auxiliary resources.

| Page       | Path           | url                                                                              |
| ---------- | -------------- | -------------------------------------------------------------------------------- |
| Blog       | `/`            | [suddenlygiovanni.dev](https://www.suddenlygiovanni.dev)                         |
| About Me   | `/about-me`    | [suddenlygiovanni.dev/about-me](https://www.suddenlygiovanni.dev/about-me)       |
| Résumé     | `/resume`      | [suddenlygiovanni.dev/resume](https://www.suddenlygiovanni.dev/resume)           |
| Motivation | `/motivations` | [suddenlygiovanni.dev/motivations](https://www.suddenlygiovanni.dev/motivations) |

## Contributing

If you desire to contribute to the website codebase or fix an error in a post (code or copy), feel free to open an issue or submit a Pull Request.

To get started, please read the steps below.

## Getting Started

This is a Gatsby project, so all the required knowledge can be learned from the [gatsby documentation](https://www.gatsbyjs.org/docs/).

The only significant difference from a standard Gatsby project is the usage of TypeScript for both front end code and also for all the Node build scripts.
This means that `gatsby-config.js` is just as a proxy for the gatsby's configurations modules located at `/.gatsby/**.ts`

### Installing

To install just run:

```shell
yarn install
```

### Running

Start it up:

```shell
gatsby develop
```

the site will be running locally at `http://localhost:8000`

## 🧐 What's inside?

A quick look at the top-level files and directories:

```shell
.
├── .gatsby
│ ├── create-blog-pages.ts
│ ├── create-pages.ts
│ ├── create-posts.ts
│ ├── gatsby-browser.ts
│ ├── gatsby-config.ts
│ ├── gatsby-node.ts
│ ├── gatsby-ssr.ts
│ └── on-create-node.ts
├── config
│ ├── site-metadata.ts
│ └── website.ts
├── content
│ ├── assets
│ ├── blog
│ └── resume
├── cypress
├── src
│ ├── components
│ ├── hooks
│ ├── lib
│ ├── pages
│ ├── templates
│ └── utils
├── tests
├── typings
├── apollo.config.js
├── gatsby-config.js
├── LICENSE
├── package.json
├── README.md
└── tsconfig.json
```

## Built With

- [Gatsby] - The JAM Stack web framework used.
- [TypeScript] - Typed JavaScript at Any Scale.
- [Jest] - JavaScript testing framework
- [Cypress] - E2E testing framework
- [Netlify] - E2E testing framework

## Versioning

We use [SemVer] for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags).

## Authors

- **Giovanni Ravalico** - _Initial work_

See also the list of [contributors] who participated in this project.

## License

This website codebase is licensed under the BSD Zero Clause License - see the [LICENSE-website] file for details
The code snippets are licensed under the MIT License - see the [LICENSE-code-snippets] file for details
The post are protected by copyright - see the [LICENSE-posts] file for details

[suddenlygiovanni.dev]: https://overreacted.io/
[gatsby]: https://www.gatsbyjs.org
[typescript]: https://www.typescriptlang.org
[jest]: https://jestjs.io
[cypress]: https://www.cypress.io
[netlify]: https://www.netlify.com
[semver]: http://semver.org/
[contributors]: https://github.com/your/project/contributors
[license-website]: LICENSE-website.md
[license-code-snippets]: LICENSE-code-snippets.md
[license-posts]: LICENSE-posts.md
