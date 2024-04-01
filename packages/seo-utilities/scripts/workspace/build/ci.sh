#! /usr/bin/env bash

echo "┏━━━ 📦 Building Workspace ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
pnpm exec tsc --build packages
pnpm exec prettier packages/**/dist/ --ignore-unknown --write
