export function toJson<T>(data: T): T {
  return JSON.parse(JSON.stringify(data))
}
