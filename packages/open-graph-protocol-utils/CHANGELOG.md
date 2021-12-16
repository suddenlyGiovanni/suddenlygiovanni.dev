# @suddenlyGiovanni/open-graph-protocol-utils

## 0.1.0

### Minor Changes

- ## WHAT the change is?
  - change the package scope from `@seo-utilities/...` to `@suddenlyGiovanni/...` to match the repository OWNER on GitHub.
    This was done in order to correctly been abel to publish to GitHub's package registry.
  - for `@suddenlyGiovanni/open-graph-protocol-react` drop `helmet` as a dependency, pushing the responsibility on how to consume the package to the caller.
  - [internal] add publication only configs

## 0.0.2

### Patch Changes

- ## WHAT the change is?

  Internal changes related to the publishing workflow:

  - package documentation
  - package keywords
  - proxying of `@seo-utilities/open-graph-protocol` API out of the `@seo-utilities/open-graph-protocol-react` module

## 0.0.1

### Patch Changes

- dcb0864:
  [//]: # (WHAT the change is)
  [//]: # (WHY the change was made)
  [//]: # (HOW a consumer should update their code)

  ## WHAT the change is?

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

  ## WHY the change was made?

  please refer to the [README.md](https://github.com/suddenlyGiovanni/seo-utilities/blob/main/README.md).
