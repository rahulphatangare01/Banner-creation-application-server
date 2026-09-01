import type { UserActivityEvent } from "../../models/index.js";

export interface IUserActivityEventRepository {
  create(data: UserActivityEvent): Promise<void>;
}
