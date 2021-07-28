import { rest } from "msw";
import { API_ENDPOINT } from "../constants";

const handlers = [rest.post(API_ENDPOINT.MEMBERS, (_, res, ctx) => res(ctx.status(201)))];

export default handlers;
