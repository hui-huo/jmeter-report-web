import React, {useState, useEffect} from 'react';
import {Line} from '@ant-design/plots';
import {Card, notification} from "antd";
import {queryChartData} from "@/services/jmeter-report/api";
import FilterCard from "@/pages/Dashboard/FilterCard";
import {formatNumber, timeStampRange} from "@/utils";

const CurveChart = ({filter}) => {
  const [data, setData] = useState([]);
  const [range, setRange] = useState('7')


  useEffect(() => {
    const init = async () => {
      const {currentStamp, agoTimestamp} = timeStampRange(parseInt(range), 'days')
      await queryChartData({...filter, type: 1, startTime: agoTimestamp, endTime: currentStamp})
        .then(res => {
          // Chart组件读取id字段为数字时有问题，换个类型
          const data = res.data
          const newData = data.map((value) => {
            value.id = value.id.toString()
            return value
          })
          setData(newData)
        })
        .catch((error) => {
          console.log(error)
        })
    }
    init()
  }, [range, filter]);

  const onChange = ({target: {value}}) => {
    setRange(value);
  };

  const config = {
    data,
    xField: 'id',
    yField: 'pass_rate',
    scrollbar: {
      type: 'id',
    },
    height: 280,
    tooltip: {
      formatter: (datum) => {
        // console.log(datum)
        return {name: '通过率', value: formatNumber(datum.pass_rate * 100) + '%'};
      },
    },
    yAxis: {
      label: {
        formatter: (value) => {
          return value * 100;
        },
      },
    },
    xAxis: {
      label: {
        formatter: (value) => {
          return '#' + value;
        },
      },
    },
    smooth: true
  };

  return (
    <>
      <Card bodyStyle={{padding: '0px 5px'}} title="通过率" extra={<FilterCard range={range} setRange={onChange}/>}>
        <Line {...config} >
        </Line>
      </Card>
    </>
  )
};

export default CurveChart
