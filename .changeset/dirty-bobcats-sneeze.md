---
'@seo-utilities/open-graph-protocol': patch
'@seo-utilities/open-graph-protocol-react': patch
'@seo-utilities/utils': patch
---

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



