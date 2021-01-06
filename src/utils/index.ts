export * from "./monad";

export const isExpired = (previousDate: Date, expiresIn: number): boolean => {
  const now: Date = new Date();
  const prev: Date = previousDate;
  prev.setSeconds(expiresIn);
  return prev.getTime() - now.getTime() <= 0;
};
