import { rest } from "msw";
import { membersMeResponse, logs } from "../__fixtures__";
import { API_ENDPOINT, BASE_URL } from "../constants";

const handlers = [
  rest.post(API_ENDPOINT.MEMBER.SIGNUP, (_, res, ctx) => res(ctx.status(201))),
  rest.post(API_ENDPOINT.MEMBER.LOGIN, (_, res, ctx) =>
    res(ctx.json({ accessToken: "access-token" }), ctx.status(200))
  ),
  rest.get(API_ENDPOINT.MEMBER.ME, (_, res, ctx) =>
    res(ctx.json(membersMeResponse), ctx.status(200))
  ),
  rest.get(`${BASE_URL}/labs/:labId/jobs/:jobId/logs`, (_, res, ctx) =>
    res(ctx.json(logs), ctx.status(200))
  ),
];

export default handlers;
