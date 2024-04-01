#! /usr/bin/env bash

echo "┏━━━ 👀 Building (watching ) Workspace ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
pnpm exec tsc --build packages --watch --preserveWatchOutput
