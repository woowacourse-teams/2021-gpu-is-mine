import { rest } from "msw";
import { API_ENDPOINT } from "../constants";

const handlers = [
  rest.post(API_ENDPOINT.MEMBER.SIGNUP, (_, res, ctx) => res(ctx.status(201))),
  rest.post(API_ENDPOINT.MEMBER.LOGIN, (_, res, ctx) =>
    res(ctx.json({ accessToken: "access-token" }), ctx.status(200))
  ),
];

export default handlers;
