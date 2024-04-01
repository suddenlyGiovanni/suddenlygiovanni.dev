#! /usr/bin/env bash

echo "┏━━━ 🧩 API REPORT: $(pwd) ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
pnpm exec api-extractor run --local --verbose
