const safeParse = (str: string) => {
  try {
    return JSON.parse(str);
  } catch (ex) {
    return false;
  }
};

export default safeParse;
