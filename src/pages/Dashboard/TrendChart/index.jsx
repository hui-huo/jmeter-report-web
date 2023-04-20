import React, {useState, useEffect} from 'react';
import {Column} from '@ant-design/plots';
import {Card} from "antd";
import {queryChartData} from "@/services/jmeter-report/api";
import FilterCard from "@/pages/Dashboard/FilterCard";
import {timeStampRange} from "@/utils";

function TrendChart({filter}) {
  const [data, setData] = useState([]);
  const [range, setRange] = useState('7')

  useEffect(() => {
    const {currentStamp, agoTimestamp} = timeStampRange(parseInt(range), 'days')
    queryChartData({...filter, type: 0, startTime: agoTimestamp, endTime: currentStamp})
      .then(res => {
        // Chart组件读取id字段为数字时有问题，换个类型
        const data = res.data
        const newData = data.map((value) => {
          value.id = value.id.toString()
          return value
        })
        setData(newData)
      })
  }, [range, filter]);

  const onChange = ({target: {value}}) => {
    setRange(value);
  };

  const config = {
    data,
    title: {
      visible: true,
      text: '折线图', // 标题文本
    },
    theme: {
      styleSheet: {
        backgroundColor: '#fff'
      }
    }, // 'dark',
    isStack: true,
    xField: 'id',
    yField: 'value',
    scrollbar: {
      type: 'id',
    },
    seriesField: 'type',
    minColumnWidth: '10',
    maxColumnWidth: '15',
    height: 280,
    meta: {
      type: {
        values: ['fail', 'success'],
        alias: ['失败', '成功'],
      },
    },
    color: ({type}) => {
      if (type === 'success') {
        return '#2ca02c';
      }
      return '#d62728';
    },
    xAxis: {
      label: {
        formatter: (value) => {
          return '#' + value;
        },
      },
    },
    label: {
      // 可手动配置 label 数据标签位置
      position: 'middle',
      // 'top', 'bottom', 'middle'
      // 可配置附加的布局方法
      layout: [
        // 柱形图数据标签位置自动调整
        {
          type: 'interval-adjust-position',
        }, // 数据标签防遮挡
        {
          type: 'interval-hide-overlap',
        }, // 数据标签文颜色自动调整
        {
          type: 'adjust-color',
        },
      ],
    },
  };

  return (
    <>
      <Card bodyStyle={{padding: '0px 5px'}} title="构建历史"
            extra={<FilterCard range={range} setRange={onChange}/>
            }>
        <Column {...config} />
      </Card>
    </>
  );
}

export default TrendChart;
