import { createHttp } from "../http";

export type Ctx = {
    http: ReturnType<typeof createHttp>
}