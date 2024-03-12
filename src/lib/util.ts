export function digest(string: string): string {
  return string.split("").reduce((digest, char) =>
    ((digest << 5) - digest) + char.charCodeAt(0)
, 0).toString(36)
}
