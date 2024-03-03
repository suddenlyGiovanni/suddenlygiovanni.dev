#!/usr/bin/env bash

docker build --tag web-app .


docker build --target web --tag web-app:latest .
