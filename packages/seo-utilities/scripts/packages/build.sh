#! /usr/bin/env bash

echo "┏━━━ 📦 Building $(pwd) ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
pnpm exec tsc -b
