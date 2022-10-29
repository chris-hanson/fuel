export default function getStartOfDate(from = new Date()) {
  const date = new Date(from)
  date.setHours(0, 0, 0, 0)
  return +date
}
