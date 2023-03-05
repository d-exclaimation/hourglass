export function state<T>(value: T): T {
  return value;
}

export function optional<T>(): T | undefined {
  return undefined;
}
