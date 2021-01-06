import { Some, None, Option } from "./option";

enum ResultType {
  Ok,
  Err
}

interface Match<T, E, ROk, RErr> {
  Ok: (val: T) => ROk;
  Err: (err?: E) => RErr;
}

export interface Result<T, E> {
  isOk: () => boolean;
  isErr: () => boolean;
  unwrap: () => T | E;
  match: <ROk, RErr>(matchExpr: Match<T, E, ROk, RErr>) => ROk | RErr;
}

class OptionBase<T, E> implements Result<T, E> {
  private readonly type: ResultType;
  private readonly val: T | E;

  public constructor(val: T, type: ResultType) {
    this.val = val;
    this.type = type;
  }

  public isErr() {
    return this.type === ResultType.Err;
  }

  public isOk() {
    return this.type === ResultType.Ok;
  }

  public ok(): Option<T> {
    return this.type === ResultType.Ok ? Some(this.val) : None();
  }

  public err(): Option<E> {
    return this.type === ResultType.Err ? Some(this.val) : None();
  }

  public unwrap(): T {
    return this.val as T;
  }

  public match<ROk, RErr>(expr: Match<T, E, ROk, RErr>): ROk | RErr {
    return this.isOk()
      ? expr.Ok(this.val as T)
      : typeof expr.Err === "function"
      ? expr.Err(this.val as E)
      : expr.Err;
  }
}

export const Err = <T>(val?: any): OptionBase<any, T> => {
  return new OptionBase<any, T>(val, ResultType.Err);
};

export const Ok = <T>(val: T): OptionBase<T, any> => {
  return new OptionBase<T, any>(val, ResultType.Ok);
};
