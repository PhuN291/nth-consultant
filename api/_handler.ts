import type { IncomingMessage, ServerResponse } from "http";
import { buildApp } from "../server/app";

let appPromise: Promise<(req: IncomingMessage, res: ServerResponse) => void> | undefined;

function getApp() {
  if (!appPromise) {
    appPromise = buildApp().then(({ app }) => app as unknown as (
      req: IncomingMessage,
      res: ServerResponse,
    ) => void);
  }
  return appPromise;
}

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  const app = await getApp();
  return app(req, res);
}
