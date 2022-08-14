export default function shortenString(str: string, maxLength: number): string {
  if (!str) return ''
  if (str.length > maxLength) {
    return str.substring(0, maxLength) + '...'
  }
  return str
}
