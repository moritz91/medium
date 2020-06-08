import * as DataLoader from "dataloader";
import { User } from "src/entity/User";
import { DataLoaderOptions } from "src/types/data-loader";

export default (options?: DataLoaderOptions) =>
  new DataLoader(async (keys: string[]) => {
    const users = await User.findByIds(keys);

    const userMap: { [key: string]: User } = {};

    users.forEach((u) => {
      userMap[u.id] = u;
    });

    // O(n) * O(1)
    return keys.map((k) => userMap[k]);
  }, options);
