#!/bin/bash
set -e

npm run db:migrate & PID=$!
# Wait for migrate to finish
wait $PID

npm run db:seed & PID=$!
# Wait for seed to finish
wait $PID

npm start & PID=$!
wait $PID