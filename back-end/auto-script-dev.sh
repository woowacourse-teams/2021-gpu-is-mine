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

nohup java -jar -Dspring.profiles.active=dev -Duser.timezone=Asia/Seoul $JAR_NAME &
sleep 2

# health checking

echo "> Health check 시작합니다."
echo "> curl -s http://localhost:8080/healths"
sleep 1

for retry_count in {1..100}
do
  response=$(curl -s http://localhost:8080/healths)
  up_count=$(echo $response | grep 'UP' | wc -l)

  if [ $up_count -ge 1 ]
  then
      echo "> Health check 성공"
      break
  else
      echo "> Health check: ${response}"
  fi

  if [ $retry_count -eq 100 ]
  then
    echo "> Health check 실패. "
    exit 1
  fi

  echo "> Health check 연결 실패. 재시도..."
  sleep 1
done

sleep 3


