
<center> <img src="https://raw.githubusercontent.com/woowacourse-teams/2021-gpu-is-mine/ed20a2971047d34d0e1716a196e8597b03113156/front-end/src/components/GpuIcon/gpu.svg" width="100" height="100"> </center>

# <center> [GPU 내껀데](https://www.gpuismine.com/) </center>
### <center> 딥러닝 학습 자동화 서비스 </center>

---
# 서비스 소개
### 기존현황
- 딥러닝 학습의 경우, 기존 학습의 종료를 사람이 확인하고 다음 학습을 실행
- `기존 작업의 종료~다음 작업의 시작` 시간동안 gpu 자원이 유휴상태
- gpu 가 작업 진행 중인지 사람이 확인
### 서비스
- 메타 정보를 통해 예약만 해두면 기존 작업이 끝나는 대로 자동으로 다음 학습을 진행
- gpu 자원의 유휴상태를 최소화
- 작업 진행여부를 이메일로 알람
---
# 사용방법
[gif 넣을 예정]
1. 회원가입을 통해 로그인을 한다.
2. 기존 등록되어 있는 GpuServer 에 학습을 진행하고 싶은 job 을 등록할 수 있다.
3. job 등록에서 job 메타데이터 정보와 서버를 선택하여 예약할 수 있다.   
4. 학습의 진행사항은 job 조회 페이지에서 확인 가능하다.
   - 상태: `대기중`, `진행중`, `완료`, `취소`
   - `진행중`, `완료`인 작업에 대해 상세조회가 가능하다.
     - 실시간으로 학습 진행 로그 확인
     - accuracy & loss / epoch 그래프
   - `대기중`인 작업에 대해서만 예약을 `취소`할 수 있다.
5. **자동**으로 다음 예약된 작업이 실행된다.
6. 학습 시작, 종료 에 등록된 이메일로 알림을 보내준다.
---
# 업데이트 로그
- [v1.0.0](https://github.com/woowacourse-teams/2021-gpu-is-mine/releases)
---
# 기술
### 스택
<img src="https://img.shields.io/badge/java-007396?style=for-the-badge&logo=java&logoColor=purple">
<img src="https://img.shields.io/badge/spring_boot-6DB33F?style=for-the-badge&logo=springboot&logoColor=darkgreen">
<img src="https://img.shields.io/badge/type_script-3178C6?style=for-the-badge&logo=typescript&logoColor=darkblue">
<img src="https://img.shields.io/badge/java_script-F7DF1E?style=for-the-badge&logo=javascript&logoColor=yellow">
<img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=darkblue">
<img src="https://img.shields.io/badge/elastic_stack-005571?style=for-the-badge&logo=elasticstack&logoColor=magenta">
<img src="https://img.shields.io/badge/amazon_aws-232F3E?style=for-the-badge&logo=amazonaws&logoColor=orange">
<img src="https://img.shields.io/badge/docker-2496ED?style=for-the-badge&logo=docker&logoColor=skyblue">
<img src="https://img.shields.io/badge/maria_DB-003545?style=for-the-badge&logo=mariadb&logoColor=skyblue">

### 플로우

### 문서화


---
# 팀원

|<img alt="콜린" src="https://avatars.githubusercontent.com/u/46412689?v=4" height="80"/>|<img alt="동동" src="https://avatars.githubusercontent.com/u/31029000?v=4" height="80"/>|<img alt="배럴" src="https://avatars.githubusercontent.com/u/66905013?v=4" height="80"/>|<img alt="코기" src="https://avatars.githubusercontent.com/u/46060746?v=4" height="80"/>|<img alt="완태" src="https://avatars.githubusercontent.com/u/49307266?v=4" height="80"/>|<img alt="마갸" src="https://avatars.githubusercontent.com/u/38939015?v=4" height="80"/>|<img alt="에드" src="https://avatars.githubusercontent.com/u/66653739?v=4" height="80"/>|
|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
|[콜린](https://github.com/2SOOY)|[동동](https://github.com/bigsaigon333)|[배럴](https://github.com/knae11)|[코기](https://github.com/ecsimsw)|[완태](https://github.com/wannte)|[마갸](https://github.com/MyaGya)|[에드](https://github.com/sjpark-dev)|
| front-end |front-end|back-end|back-end|back-end|back-end|back-end|
