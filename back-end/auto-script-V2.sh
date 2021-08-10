JAR_NAME=$(ls |grep 'back-end' | tail -n 1)
echo "> JAR Name: $JAR_NAME"

echo "> now build was1 in 8081"
fuser -k 8081/tcp
nohup java -jar -Dspring.profiles.active=was1 -Dserver.port=8081 -Duser.timezone=Asia/Seoul $JAR_NAME &

sleep 25

echo "> now build was2 in 8082"
fuser -k 8082/tcp
nohup java -jar -Dspring.profiles.active=was2 -Dserver.port=8082 -Duser.timezone=Asia/Seoul $JAR_NAME &
sleep 3