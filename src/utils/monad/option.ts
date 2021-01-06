enum OptionType {
  Some,
  None
}

interface Match<T, R> {
  some: (val: T) => R;
  none: any;
}

export interface Option<T> {
  isNone: () => boolean;
  isSome: () => boolean;
  unwrap: () => T;
  match: <R>(expr: Match<T, R>) => R;
}

class OptionBase<T> implements Option<T> {
  private readonly type: OptionType;
  private readonly val: T;

  public constructor(val: T, type: OptionType) {
    this.val = val;
    this.type = type;
  }

  public isNone() {
    return this.type === OptionType.None;
  }

  public isSome() {
    return this.type === OptionType.Some;
  }

  public unwrap(): T {
    return this.val;
  }

  public match<R>(expr: Match<T, R>): R {
    return this.isSome()
      ? expr.some(this.val)
      : typeof expr.none === "function"
      ? expr.none()
      : expr.none;
  }
}

export const None = (): OptionBase<any> => {
  return new OptionBase<any>(null, OptionType.None);
};

export const Some = <T>(val: T): OptionBase<T> => {
  return new OptionBase<T>(val, OptionType.Some);
};
