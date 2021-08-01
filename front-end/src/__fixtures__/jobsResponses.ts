import { JobViewResponses } from "../types";

export const JobResponseMock = {
  id: 4,
  name: "위암 1,2기 구분 학습",
  status: "COMPLETED",
  memberId: 1,
  memberName: "name1",
  gpuServerId: 1,
  gpuServerName: "server1",
};

export const jobsResponsesMock: JobViewResponses = {
  jobResponses: [
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
    },
    {
      id: 5,
      name: "소셜 미디어 게시물을 기반으로 한 우울증 감정 분석",
      status: "COMPLETED",
      memberId: 2,
      memberName: "name",
      gpuServerId: 1,
      gpuServerName: "serverA",
      metaData: "wannte/social_media",
      expectedTime: "20",
    },
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
    },
    {
      id: 7,
      name: "CNN 모델을 활용한 마스크 인식 학습",
      status: "WAITING",
      memberId: 1,
      memberName: "name",
      gpuServerId: 2,
      gpuServerName: "serverB",
      metaData: "collin/mask_recognition",
      expectedTime: "50",
    },
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
    },
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
    },
  ],
} as const;

export const logData = `
Train on 60000 samples, validate on 10000 samples
Epoch 1/5
60000/60000 [==============================] - 15s 246us/sample - loss: 0.2217 - accuracy: 0.9343 - val_loss: 0.1019 - val_accuracy: 0.9685
Epoch 2/5
60000/60000 [==============================] - 14s 229us/sample - loss: 0.0975 - accuracy: 0.9698 - val_loss: 0.0787 - val_accuracy: 0.9758
Epoch 3/5
60000/60000 [==============================] - 14s 229us/sample - loss: 0.0975 - accuracy: 0.9698 - val_loss: 0.0787 - val_accuracy: 0.9758
Epoch 4/5
60000/60000 [==============================] - 14s 229us/sample - loss: 0.0975 - accuracy: 0.9698 - val_loss: 0.0787 - val_accuracy: 0.9758
Epoch 5/5
60000/60000 [==============================] - 14s 229us/sample - loss: 0.0975 - accuracy: 0.9698 - val_loss: 0.0787 - val_accuracy: 0.9758
`;
