export const getCurrentDateFromTime = (time: string): Date => {
  const now = new Date()
  const choosenHour = Number(time.split(':')[0])
  const choosenMinute = Number(time.split(':')[1])
  return new Date(now.getFullYear(), now.getMonth(), now.getDate(), choosenHour, choosenMinute, 0, 0)
}
