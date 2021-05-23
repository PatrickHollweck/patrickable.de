import { useState } from "react";

import { v4 as uuid } from "uuid";

export const useElementID = (prefix: string = "ID") => {
  const [id] = useState(`${prefix}-${uuid()}`);

  return id;
};
