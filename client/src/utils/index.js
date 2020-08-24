export default {
  secondsToMinutesAndSeconds(time) {
    return new Date(time * 1000).toISOString().substring(14, 19)
  },
  minutesAndSecondsToSeconds(timeStr) {
    return (Number(timeStr.substring(0, 2)) * 60) + Number(timeStr.substring(3))
  }
}
