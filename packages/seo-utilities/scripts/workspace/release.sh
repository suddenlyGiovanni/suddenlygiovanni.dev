#! /usr/bin/env bash

echo "┏━━━ 📯 RELEASE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
pnpm run build:ci
pnpm exec changeset publish
