#!/bin/bash
echo "> now ing app pid find!"
CURRENT_PID=$(pgrep -f back-end)
echo "$CURRENT_PID"
if [ -z $CURRENT_PID ]; then
        echo "> no ing app."
else
        echo "> kill -9 $CURRENT_PID"
        kill -9 $CURRENT_PID
        sleep 3
fi
echo "> new app deploy"
JAR_NAME=$(ls |grep 'back-end' | tail -n 1)
echo "> JAR Name: $JAR_NAME"

nohup java -jar -Dspring.profiles.active=prod $JAR_NAME &
sleep 3
