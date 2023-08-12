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

export const convertValueEnum = (data, field) => {
  let valueEnum = {}
  data.map(item => {
    if (item.hasOwnProperty(field)) {
      valueEnum[item[field]] = {text: item[field]}
    }
  })
  return valueEnum

}

export const formatNumber = (number) => {
  const roundedNumber = Math.round(number * 100) / 100; // 四舍五入到两位小数
  const formattedNumber = roundedNumber.toFixed(2); // 保留两位小数

  // 使用 padStart() 方法在不足两位小数时使用零进行补充
  const parts = formattedNumber.split('.');
  const integerPart = parts[0];
  const decimalPart = parts[1].padStart(2, '0');

  return `${integerPart}.${decimalPart}`;
}
