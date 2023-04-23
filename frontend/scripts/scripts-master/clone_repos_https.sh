#!/bin/bash

declare BASE_REPO_URL=https://gitlab.com/yesodot/iron/atom/mynet
declare SCRIPT_DIR=$( cd $( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )") ..  &> /dev/null && pwd)
declare MICROSERVICES_DIR=${SCRIPT_DIR}/backEnd/microServices
declare FRONT_DIR=${SCRIPT_DIR}/frontEnd 
microServices=("item-compositor" "news-service" "news-service" "media-service" "user-service" "lesson-service")
frontProjects=("nest-client" "mynet-client")

#backend
mkdir -p ${MICROSERVICES_DIR}

cd ${SCRIPT_DIR}/
git clone ${BASE_REPO_URL}/common

cd ${SCRIPT_DIR}/backEnd
git clone ${BASE_REPO_URL}/backend/shared --recursive

for service in ${microServices[@]}; do
    cd ${MICROSERVICES_DIR}
    git clone ${BASE_REPO_URL}/backend/microservices/${service}
done

#frontend
mkdir ${FRONT_DIR}
for project in ${frontProjects[@]}; do
    cd ${FRONT_DIR}
    git clone ${BASE_REPO_URL}/frontend/${project}
done
