# @suddenlygiovanni/open-graph-protocol-react

## 0.2.0

### Minor Changes

- [`bac8677`](https://github.com/suddenlyGiovanni/seo-utilities/commit/bac8677e5972f40af6c7c70fc8f1311538ccba00) Thanks [@suddenlyGiovanni](https://github.com/suddenlyGiovanni)! -

  #### WHAT the change is?

  Rename the package name scope from `@suddenlyGiovanni/...` to `@suddenlygiovanni`

  #### WHY the change was made?

  To comply with `npm` and `GitHub Packages` specifications.
  GitHub Packages will equally match the package name scope to the repo owner (even if the char chases do not match)!

  #### HOW a consumer should update their code?

  BREAKING CHANGE: all consumer need to import the package as:

  - `@suddenlygiovanni/open-graph-protocol`
  - `@suddenlygiovanni/open-graph-protocol-utils`
  - `@suddenlygiovanni/open-graph-protocol-react`

### Patch Changes

- Updated dependencies [[`bac8677`](https://github.com/suddenlyGiovanni/seo-utilities/commit/bac8677e5972f40af6c7c70fc8f1311538ccba00)]:
  - @suddenlygiovanni/open-graph-protocol@0.2.0

## 0.1.0

### Minor Changes

- #### WHAT the change is?
  - change the package scope from `@seo-utilities/...` to `@suddenlyGiovanni/...` to match the repository OWNER on GitHub.
    This was done in order to correctly been abel to publish to GitHub's package registry.
  - for `@suddenlyGiovanni/open-graph-protocol-react` drop `helmet` as a dependency, pushing the responsibility on how to consume the package to the caller.
  - [internal] add publication only configs

### Patch Changes

- Updated dependencies []:
  - @suddenlyGiovanni/open-graph-protocol@0.1.0

## 0.0.2

### Patch Changes

- #### WHAT the change is?

  Internal changes related to the publishing workflow:

  - package documentation
  - package keywords
  - proxying of `@seo-utilities/open-graph-protocol` API out of the `@seo-utilities/open-graph-protocol-react` module

- Updated dependencies
  - @seo-utilities/open-graph-protocol@0.0.2

## 0.0.1

### Patch Changes

- [dcb0864]

  #### WHAT the change is?

  First iteration on the public package API
  providing top level factory fns to more easily produce tags fulfilling Open Graph Protocol contract

  - `makeOpenGraphBase`
  - `makeOpenGraphBook`
  - `makeOpenGraphMusicAlbum`
  - `makeOpenGraphMusicPlaylist`
  - `makeOpenGraphMusicRadioStation`
  - `makeOpenGraphMusicSong`
  - `makeOpenGraphProfile`
  - `makeOpenGraphVideoEpisode`
  - `makeOpenGraphVideoMovie`
  - `makeOpenGraphVideoOther`
  - `makeOpenGraphVideoTvShow`
  - `makeOpenGraphVideoTvShow`
  - `makeOpenGraphTwitterCard`

  And a more general and low level helper fn to compose each tag individually

  - `makeOpenGraphMetaAttributesRecord`

  #### WHY the change was made?

  please refer to the [README.md](https://github.com/suddenlyGiovanni/seo-utilities/blob/main/README.md).

- Updated dependencies [dcb0864]
  - @seo-utilities/open-graph-protocol@0.0.1
