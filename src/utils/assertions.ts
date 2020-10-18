export function isJust<T>(target: T | undefined): target is T {
  return target !== undefined
}
