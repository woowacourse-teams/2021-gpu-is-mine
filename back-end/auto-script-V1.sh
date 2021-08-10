#!/bin/bash
echo "> now ing was1 pid find!"
CURRENT_PID=$(pgrep -f was1)

echo "$CURRENT_PID"
if [ -z $CURRENT_PID ]; then
        echo "> no ing was1."
else
        echo "> kill -9 $CURRENT_PID"
        kill -9 $CURRENT_PID
fi
echo "> new app deploy"
cd 2021-gpu-is-mine/back-end/build/libs
JAR_NAME=$(ls |grep 'back-end' | tail -n 1)
echo "> JAR Name: $JAR_NAME"

nohup java -jar -Dspring.profiles.active=was1 -Dserver.port=8081 -Duser.timezone=Asia/Seoul $JAR_NAME &
sleep 30

CURRENT_PID=$(pgrep -f was2)

echo "$CURRENT_PID"
if [ -z $CURRENT_PID ]; then
        echo ">no ing was2."
else
        echo "> kill -9 $CURRENT_PID"
        kill -9 $CURRENT_PID
fi
echo "> new app deploy"
echo "> JAR NAME: $JAR_NAME"
nohup java -jar -Dspring.profiles.active=was2 -Dserver.port=8082 -Duser.timezone=Asia/Seoul $JAR_NAME &
sleep 3