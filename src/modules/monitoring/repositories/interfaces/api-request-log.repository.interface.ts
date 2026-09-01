import type { ApiRequestLog } from "../../models/index.js";
export interface IApiRequestLogRepository {
  create(data: ApiRequestLog): Promise<void>;
}
