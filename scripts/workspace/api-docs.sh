#! /usr/bin/env bash

echo "┏━━━ 📚 API DOCS: Extracting API surface ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
pnpm run clean --stream --aggregate-output
pnpm exec tsc -b packages
pnpm run api-report --recursive --workspace-concurrency 1 --stream

echo "┏━━━ 📝 API DOCS: Generating Markdown Docs ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
GH_PAGES_CFG_EXISTS=$(test -f docs/_config.yml)

if [ $GH_PAGES_CFG_EXISTS ]; then
  echo "GitHub pages config file DETECTED"
  cp docs/_config.yml .
fi

pnpm exec api-documenter markdown --input-folder temp --output-folder docs

if [ $GH_PAGES_CFG_EXISTS ]; then
  cp _config.yml docs/_config.yml
fi
