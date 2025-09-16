import { http, HttpResponse } from "msw";
import { API_URL } from "../../../config/consts";

export const handlers = [
  http.get(`${API_URL}/health`, () => {
    return HttpResponse.json({ status: "ok" });
  }),
];
