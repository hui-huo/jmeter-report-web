import React from 'react';
import {Pie} from '@ant-design/plots';

function RightChart({summaryInfo}) {
  const {success, fail} = summaryInfo
  const data = [
    {
      type: '成功',
      value: success,
    },
    {
      type: '失败',
      value: fail,
    },

  ];
  const config = {
    appendPadding: 10,
    data,
    height: 200,
    angleField: 'value',
    colorField: 'type',
    color: ({type}) => {
      if (type === '成功') {
        return '#72c140';
      }
      return '#e13c39';
    },
    radius: 0.80,
    label: {
      type: 'spider',
      labelHeight: 28,
      content: '{name}\n{percentage}',
    },
    interactions: [
      {
        type: 'element-selected',
      },
      {
        type: 'element-active',
      },
    ],
  };
  return <Pie {...config} />;
}

export default RightChart;
