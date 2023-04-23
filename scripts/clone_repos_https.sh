#!/bin/bash

declare BASE_REPO_URL=https://gitlab.com/yesodot/iron/atom/mynet
declare BACKEND_URL=${BASE_REPO_URL}/backend/microservices
declare FRONTEND_URL=${BASE_REPO_URL}/frontend
declare SCRIPT_DIR=$( cd $( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )") ..  &> /dev/null && pwd)

#backend
mkdir -p ${SCRIPT_DIR}/backEnd/microServices

cd ${SCRIPT_DIR}/backEnd
git clone ${BASE_REPO_URL}/backend/shared

cd ${SCRIPT_DIR}/backEnd/microServices
git clone ${BACKEND_URL}/news-service  --recursive
git clone ${BACKEND_URL}/media-service --recursive
git clone ${BACKEND_URL}/user-service --recursive
git clone ${BACKEND_URL}/lesson-service --recursive
git clone ${BACKEND_URL}/item-compositor --recursive

#frontend
mkdir ${SCRIPT_DIR}/frontEnd
cd ${SCRIPT_DIR}/frontEnd
git clone ${FRONTEND_URL}/mynetapp --recursive
git clone ${FRONTEND_URL}/nest-client --recursive
