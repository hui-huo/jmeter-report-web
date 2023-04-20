import moment from "moment";

export function timeStampRange(offset, unit) {
  const currentStamp = moment().valueOf()
  const agoTimestamp = moment().subtract(offset, unit).valueOf();
  return {currentStamp, agoTimestamp}
}


export function formatTime(seconds) {
  if (seconds <= 60) {
    return `${seconds}s`;
  } else {
    let minutes = Math.floor(seconds / 60);
    let remainingSeconds = seconds % 60;
    return `${minutes}m${remainingSeconds}s`;
  }
}

export const columnAddValueEnum = (data, baseInfo) => {
  data.map((col) => {
    if (col.dataIndex === 'project') {
      let valueEnum = {}
      const project = baseInfo.project
      project.map((value) => {
        valueEnum[value] = {text: value}
      })
      col.valueEnum = valueEnum
    }
    if (col.dataIndex === 'env') {
      let valueEnum = {}
      const project = baseInfo.env
      project.map((value) => {
        valueEnum[value] = {text: value}
      })
      col.valueEnum = valueEnum
    }
  })
  return data
}
