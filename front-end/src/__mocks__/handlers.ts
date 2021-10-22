import { rest } from "msw";
import { membersMeResponse, logs, gpuServersResponses } from "../__fixtures__";
import { API_ENDPOINT, BASE_URL } from "../constants";
import { GpuServerViewResponses, MemberLoginRequest, MemberLoginResponse } from "../types";
import { emailValidator, passwordValidator } from "../features/member/validator/validator";

const handlers = [
  rest.post(BASE_URL + API_ENDPOINT.MEMBER.SIGNUP, (_, res, ctx) => res(ctx.status(201))),
  rest.post<MemberLoginRequest, MemberLoginResponse>(
    BASE_URL + API_ENDPOINT.MEMBER.LOGIN,
    (req, res, ctx) => {
      const { email, password } = req.body;

      return emailValidator(email) === "" && passwordValidator(password) === ""
        ? res(ctx.json({ accessToken: "access-token", expires: 3600 }), ctx.status(200))
        : res(ctx.status(400));
    }
  ),
  rest.get(BASE_URL + API_ENDPOINT.MEMBER.ME, (_, res, ctx) =>
    res(ctx.json(membersMeResponse), ctx.status(200))
  ),
  rest.get<GpuServerViewResponses>(`${BASE_URL}/labs/:labId/gpus`, (_, res, ctx) =>
    res(ctx.json(gpuServersResponses), ctx.status(200))
  ),
  rest.delete(`${BASE_URL}/labs/:labId/gpus/:serverId`, (_, res, ctx) => res(ctx.status(204))),
  rest.get(`${BASE_URL}/labs/:labId/jobs/:jobId/logs`, (_, res, ctx) =>
    res(ctx.json(logs), ctx.status(200))
  ),
];

export default handlers;
