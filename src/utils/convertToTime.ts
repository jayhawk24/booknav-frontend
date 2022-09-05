export default function convertToTime(time: number): string {
  if (time % 1 === 0) {
    return `${time}:00:00`
  }
  return `${time.toString().split('.')[0]}:30:00`
}
export function convertTimeToNumber(time: string): number {
  const [hours, minutes] = time.split(':')
  return Number(hours) + Number(minutes) / 60
}
