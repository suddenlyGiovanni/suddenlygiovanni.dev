#! /usr/bin/env bash

echo "┏━━━ 🕵️‍♀️ LINT: eslint src --ext ts,js,tsx,jsx ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
pnpm run lint --recursive --if-present --concurrency 1
