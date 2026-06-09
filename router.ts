import type { CustomRequest } from "./customRequest.ts";
import type { CustomResponse } from "./customResponse.ts";

type Handler = (
  req: CustomRequest,
  res: CustomResponse,
) => Promise<void> | void;

type Routes = {
  GET: Record<string, Handler>;
  POST: Record<string, Handler>;
};

export class Router {
  routes: Routes = {
    GET: {},
    POST: {},
  };

  get(route: string, handler: Handler) {
    this.routes.GET[route] = handler;
  }

  post(route: string, handler: Handler) {
    this.routes.POST[route] = handler;
  }

  find(method: string | undefined, route: string) {
    if (method !== "GET" && method !== "POST") {
      return null;
    }

    return this.routes[method][route] || null;
  }
}
