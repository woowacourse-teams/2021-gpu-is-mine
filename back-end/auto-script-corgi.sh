#!/bin/bash

# find build file

echo "> 빌드 파일(jar) 확인"
#cd 2021-gpu-is-mine/back-end/build/libs
JAR_NAME=$(ls |grep 'back-end' | tail -n 1)

# find IDLE PROFILE

echo "> 현재 구동중인 profile 확인"
CURRENT_PROFILE=$(curl -s http://localhost/profiles)

if [ $CURRENT_PROFILE == was1 ]; then
  IDLE_PROFILE=was2
  IDLE_PORT=8082
elif [ $CURRENT_PROFILE == was2 ]; then
  IDLE_PROFILE=was1
  IDLE_PORT=8081
else
  IDLE_PROFILE=was1
  IDLE_PORT=8081
fi

# deploy in IDLE_PORT

IDLE_PID=$(pgrep -f $IDLE_PROFILE)

echo "> $IDLE_PORT 가 사용중인 PID 확인 :  $IDLE_PID"
if [ -z $IDLE_PID ]; then
  echo "> 현재 구동중인 애플리케이션이 없으므로 종료하지 않습니다."
else
  echo "> kill -9 $IDLE_PID"
  kill -15 $IDLE_PID
  sleep 5
fi

echo "> $IDLE_PROFILE 를 $IDLE_PORT 포트로 실행합니다."
nohup java -jar -Dspring.profiles.active=$IDLE_PROFILE $JAR_NAME &

# health checking

echo "> Health check 시작합니다."
echo "> curl -s http://localhost:$IDLE_PORT/healths"
sleep 1

for retry_count in {1..1000}
do
  response=$(curl -s http://localhost:$IDLE_PORT/healths)
  up_count=$(echo $response | grep 'UP' | wc -l)

  if [ $up_count -ge 1 ]
  then
      echo "> Health check 성공"
      break
  else
      echo "> Health check: ${response}"
  fi

  if [ $retry_count -eq 1000 ]
  then
    echo "> Health check 실패. "
    echo "> Nginx에 연결하지 않고 배포를 종료합니다."
    exit 1
  fi

  echo "> Health check 연결 실패. 재시도..."
  sleep 1
done

# nginx $service_url switching

docker exec -it proxy sh /scripts/switch-serve.sh ${IDLE_PORT}
docker exec -it proxy service nginx reload

PROXY_PORT=$(curl -s http://localhost/profiles)
echo "> Nginx Current Proxy Port: $PROXY_PORT"

# kill orin process

sleep 1
echo "> 정상 빌드 확인을 마쳐, 이전의 프로세스를 제거합니다."
CURRENT_PID=$(pgrep -f $CURRENT_PROFILE)
echo "> $CURRENT_PORT 가 사용중인 PID 확인 :  $CURRENT_PID"

if [ -z $CURRENT_PID ]; then
  echo "> kill NONE"
else
  echo "> kill -9 $CURRENT_PID"
  kill -9 $CURRENT_PID
  sleep 2
fi