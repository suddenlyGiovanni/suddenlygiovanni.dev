#! /usr/bin/env bash

echo "┏━━━ 🧹 CLEAN ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
pnpm run clean --recursive --if-present --parallel --workspace-concurrency 4
