let id = 0;
const createId = (): number => {
  return id++;
};
export { createId };
