#! /usr/bin/env sh

pm2 start run.js --name github_run --cron '0 */2 * * *'