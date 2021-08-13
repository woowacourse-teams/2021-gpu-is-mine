import { GpuServerViewResponse, GpuServerViewResponses } from "../types";

export const gpuServersResponses: GpuServerViewResponses = {
  gpuServers: [
    {
      id: 1,
      serverName: "serverA",
      memorySize: 1024,
      diskSize: 4096,
      isOn: true,
      gpuBoard: {
        id: 1,
        modelName: "NVIDIA42",
        performance: 600,
        isWorking: true,
      },
      jobs: [
        {
          id: 1,
          name: "영화 리뷰 분석을 통한 긍정도 평가",
          status: "COMPLETED",
          memberId: 1,
          memberName: "name",
          gpuServerId: 1,
          gpuServerName: "serverA",
          metaData: "danny/movie_review",
          expectedTime: "80",
          calculatedTime: {
            createdTime: "2021-08-12T23:01:41",
            startedTime: "2021-08-12T23:02:54",
            expectedStartedTime: "2021-08-13T02:01:41",
            completedTime: "2021-08-12T23:08:22",
            expectedCompletedTime: "2021-08-13T04:01:41",
          },
        },
        {
          id: 2,
          name: "가짜 뉴스 검증을 위한 댓글 분류 학습",
          status: "RUNNING",
          memberId: 1,
          memberName: "name",
          gpuServerId: 1,
          gpuServerName: "serverA",
          metaData: "myagya/fake_news",
          expectedTime: "50",
          calculatedTime: {
            createdTime: "2021-08-12T23:01:41",
            startedTime: "2021-08-12T23:02:54",
            expectedStartedTime: "2021-08-13T02:01:41",
            completedTime: "2021-08-12T23:08:22",
            expectedCompletedTime: "2021-08-13T04:01:41",
          },
        },
        {
          id: 3,
          name: "신경망을 이용한 스포츠 경기 비디오와 텍스트 요약",
          status: "COMPLETED",
          memberId: 1,
          memberName: "name",
          gpuServerId: 1,
          gpuServerName: "serverA",
          metaData: "better/sports_analysis",
          expectedTime: "60",
          calculatedTime: {
            createdTime: "2021-08-12T23:01:41",
            startedTime: "2021-08-12T23:02:54",
            expectedStartedTime: "2021-08-13T02:01:41",
            completedTime: "2021-08-12T23:08:22",
            expectedCompletedTime: "2021-08-13T04:01:41",
          },
        },
        {
          id: 4,
          name: "보스턴 주택 가격 예측과 k-겹 검증",
          status: "COMPLETED",
          memberId: 1,
          memberName: "name",
          gpuServerId: 1,
          gpuServerName: "serverA",
          metaData: "ed/housing_prices",
          expectedTime: "70",
          calculatedTime: {
            createdTime: "2021-08-12T23:01:41",
            startedTime: "2021-08-12T23:02:54",
            expectedStartedTime: "2021-08-13T02:01:41",
            completedTime: "2021-08-12T23:08:22",
            expectedCompletedTime: "2021-08-13T04:01:41",
          },
        },
        {
          id: 5,
          name: "소셜 미디어 게시물을 기반으로 한 우울증 감정 분석",
          status: "WAITING",
          memberId: 2,
          memberName: "name",
          gpuServerId: 1,
          gpuServerName: "serverA",
          metaData: "wannte/social_media",
          expectedTime: "20",
          calculatedTime: {
            createdTime: "2021-08-12T23:01:41",
            startedTime: "2021-08-12T23:02:54",
            expectedStartedTime: "2021-08-13T02:01:41",
            completedTime: "2021-08-12T23:08:22",
            expectedCompletedTime: "2021-08-13T04:01:41",
          },
        },
      ],
    },
    {
      id: 2,
      serverName: "serverB",
      memorySize: 1024,
      diskSize: 1024,
      isOn: true,
      gpuBoard: {
        id: 2,
        modelName: "NVIDIA Titan V",
        performance: 700,
        isWorking: false,
      },
      jobs: [
        {
          id: 6,
          name: "교통 표지판 분류 학습",
          status: "CANCELED",
          memberId: 2,
          memberName: "name",
          gpuServerId: 2,
          gpuServerName: "serverB",
          metaData: "corgy/traffic_signs",
          expectedTime: "30",
          calculatedTime: {
            createdTime: "2021-08-12T23:01:41",
            startedTime: "2021-08-12T23:02:54",
            expectedStartedTime: "2021-08-13T02:01:41",
            completedTime: "2021-08-12T23:08:22",
            expectedCompletedTime: "2021-08-13T04:01:41",
          },
        },
        {
          id: 7,
          name: "CNN 모델을 활용한 마스크 인식 학습",
          status: "COMPLETED",
          memberId: 1,
          memberName: "name",
          gpuServerId: 2,
          gpuServerName: "serverB",
          metaData: "collin/mask_recognition",
          expectedTime: "50",
          calculatedTime: {
            createdTime: "2021-08-12T23:01:41",
            startedTime: "2021-08-12T23:02:54",
            expectedStartedTime: "2021-08-13T02:01:41",
            completedTime: "2021-08-12T23:08:22",
            expectedCompletedTime: "2021-08-13T04:01:41",
          },
        },
      ],
    },
    {
      id: 3,
      serverName: "serverC",
      memorySize: 1024,
      diskSize: 1024,
      isOn: true,
      gpuBoard: {
        id: 3,
        modelName: "RTX 6000",
        performance: 670,
        isWorking: true,
      },
      jobs: [
        {
          id: 8,
          name: "자연어 처리 : 문자-단위 RNN으로 이름 생성하기",
          status: "RUNNING",
          memberId: 1,
          memberName: "name",
          gpuServerId: 3,
          gpuServerName: "serverC",
          metaData: "danny/natural_language",
          expectedTime: "100",
          calculatedTime: {
            createdTime: "2021-08-12T23:01:41",
            startedTime: "2021-08-12T23:02:54",
            expectedStartedTime: "2021-08-13T02:01:41",
            completedTime: "2021-08-12T23:08:22",
            expectedCompletedTime: "2021-08-13T04:01:41",
          },
        },
      ],
    },
    {
      id: 4,
      serverName: "serverD",
      memorySize: 1024,
      diskSize: 1024,
      isOn: false,
      gpuBoard: {
        id: 4,
        modelName: "RTX 2080 Ti",
        performance: 300,
        isWorking: false,
      },
      jobs: [
        {
          id: 9,
          name: "유튜브 댓글 긍정도 평가 학습",
          status: "WAITING",
          memberId: 2,
          memberName: "name",
          gpuServerId: 4,
          gpuServerName: "serverD",
          metaData: "myagya/youtube_comments",
          expectedTime: "20",
          calculatedTime: {
            createdTime: "2021-08-12T23:01:41",
            startedTime: "2021-08-12T23:02:54",
            expectedStartedTime: "2021-08-13T02:01:41",
            completedTime: "2021-08-12T23:08:22",
            expectedCompletedTime: "2021-08-13T04:01:41",
          },
        },
        {
          id: 10,
          name: "망막 이미지 분류, 망막 질환 진단 학습",
          status: "RUNNING",
          memberId: 2,
          memberName: "name",
          gpuServerId: 4,
          gpuServerName: "serverD",
          metaData: "better/retina_classification",
          expectedTime: "10",
          calculatedTime: {
            createdTime: "2021-08-12T23:01:41",
            startedTime: "2021-08-12T23:02:54",
            expectedStartedTime: "2021-08-13T02:01:41",
            completedTime: "2021-08-12T23:08:22",
            expectedCompletedTime: "2021-08-13T04:01:41",
          },
        },
      ],
    },
    {
      id: 5,
      serverName: "serverC",
      memorySize: 104,
      diskSize: 124,
      isOn: true,
      gpuBoard: {
        id: 3,
        modelName: "RTX 6000",
        performance: 8400,
        isWorking: true,
      },
      jobs: [
        {
          id: 8,
          name: "자연어 처리 : 문자-단위 RNN으로 이름 생성하기",
          status: "RUNNING",
          memberId: 1,
          memberName: "name",
          gpuServerId: 3,
          gpuServerName: "serverC",
          metaData: "danny/natural_language",
          expectedTime: "100",
          calculatedTime: {
            createdTime: "2021-08-12T23:01:41",
            startedTime: "2021-08-12T23:02:54",
            expectedStartedTime: "2021-08-13T02:01:41",
            completedTime: "2021-08-12T23:08:22",
            expectedCompletedTime: "2021-08-13T04:01:41",
          },
        },
      ],
    },
  ],
} as const;

export const gpuServerResponse: GpuServerViewResponse = gpuServersResponses.gpuServers[0];
