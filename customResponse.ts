import type { ServerResponse } from "node:http";

export interface CustomResponse extends ServerResponse {
  status(statusCode: number): CustomResponse;
  json(data: any): void;
}

export function customResponse(response: ServerResponse) {
  const res = response as CustomResponse;
  res.status = (statusCode) => {
    res.statusCode = statusCode;
    return res;
  };
  res.json = (data: string) => {
    try {
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify(data));
    } catch {
      res.status(500).end("Error");
    }
  };
  return res;
}
