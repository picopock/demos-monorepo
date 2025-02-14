export const safeJSONParse = <T>(jsonStr: string, defaultValue: T): T => {
  let ret = defaultValue;
  try {
    ret = JSON.parse(jsonStr);
  } catch (err) {}
  return ret;
};
