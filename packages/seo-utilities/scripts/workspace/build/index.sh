#! /usr/bin/env bash

echo "┏━━━ 📦 Building Workspace ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
pnpm exec tsc --build packages
