import React, {useEffect, useState} from 'react';
import {ProTable} from '@ant-design/pro-components';
import {Tag} from 'antd';
import {querySummaryList} from "@/services/jmeter-report/api";
import {formatTime} from "@/utils";
import {Link} from "@@/exports";


const columns = [
  {
    dataIndex: 'id',
    title: '构建ID',
    align: 'center',
    width: 80,
    search: false,
    render: (_, record) => {
      const url = `/detail/${record.id}`
      return (
        <Link to={url}>#{record.id}</Link>
      )
    }
  },
  {
    title: '项目',
    dataIndex: 'project',
  },
  {
    title: '环境',
    dataIndex: 'env',
    align: 'center',
  },
  {
    title: '方式',
    dataIndex: 'type',
    align: 'center',
    render: (_, record) => {
      return record.type === 1 ? '手动' : '自动'
    }
  },
  {
    title: '总数',
    dataIndex: 'total',
    align: 'center',
    render: (_, record) => (<Tag color="default">{record.total}</Tag>)
  },
  {
    title: '成功',
    dataIndex: 'success',
    align: 'center',
    render: (_, record) => (<Tag color="success">{record.total}</Tag>)
  },
  {
    title: '失败',
    dataIndex: 'fail',
    align: 'center',
    render: (_, record) => (<Tag color="error">{record.total}</Tag>)
  },
  {
    title: '通过率',
    dataIndex: 'pass_rate',
    align: 'center',
    render: (_, record) => {
      if (record.pass_rate < 1) {
        return <Tag color="error">{record.pass_rate * 100}%</Tag>
      } else {
        return <Tag color="success">{record.pass_rate * 100}%</Tag>
      }
    }
  },
  {
    title: '耗时',
    dataIndex: 'duration',
    align: 'center',
    render: (_, record) => {
      const duration = formatTime(parseInt(record.duration))
      return <Tag color="default">{duration}</Tag>
    }
  },
  {
    title: '开始时间',
    dataIndex: 'start_time',
    align: 'center',
    width: 210
  },
];

const ErrorsTable = ({filter}) => {

  const [data, setData] = useState([])

  useEffect(() => {
    const init = async () => {
      await querySummaryList({result: '0', ...filter}).then(res => {
        setData(res.data)
      }).catch((error) => {
        console.log(error)
      })
    }
    init()
  }, [filter])

  return (
    <ProTable
      headerTitle="最近失败"
      style={{marginTop: '8px'}}
      columns={columns}
      dataSource={data}
      rowKey="id"
      search={false}
      options={false}
      pagination={{
        pageSize: 5,
        // onChange: (page) => console.log(page),
      }}
      // pagination={false}
      dateFormatter="string"
    />
  );
}
export default ErrorsTable;
