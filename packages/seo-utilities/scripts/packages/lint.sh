#! /usr/bin/env bash

echo "┏━━━ 🕵️‍♀️ LINT: eslint src --ext ts,js,tsx,jsx ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
pmpm exec eslint src --ext ts,js,tsx,jsx
