---
'@suddenlygiovanni/open-graph-protocol': minor
'@suddenlygiovanni/open-graph-protocol-react': minor
'@suddenlygiovanni/open-graph-protocol-utils': minor
---

[//]: # (WHAT the change is)
[//]: # (WHY the change was made)
[//]: # (HOW a consumer should update their code)

## WHAT the change is?
Rename the package name scope from `@suddenlyGiovanni/...` to `@suddenlygiovanni`

## WHY the change was made?
To comply with `npm` and `GitHub Packages` specifications.
GitHub Packages will equally match the package name scope to the repo owner (even if the char chases do not match)!

## HOW a consumer should update their code?
BREAKING CHANGE: all consumer need to import the package as:
- `@suddenlygiovanni/open-graph-protocol`
- `@suddenlygiovanni/open-graph-protocol-utils`
- `@suddenlygiovanni/open-graph-protocol-react`
