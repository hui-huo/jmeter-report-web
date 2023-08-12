import React, {useRef} from 'react';
import {ProTable} from '@ant-design/pro-components';
import {Button, Popconfirm, Tag} from 'antd';
import {deleteSummary, querySummaryList} from "@/services/jmeter-report/api";
import {columnAddValueEnum, formatNumber, formatTime} from "@/utils";
import {useModel} from "@umijs/max";
import {Link, useSearchParams} from "@@/exports";


const SummaryTable = () => {
  const ref = useRef()
  const [searchParams] = useSearchParams()
  const {baseInfo} = useModel('base');
  const isShowDelete = searchParams.get("show") === "delete"

  let columns = [
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
      title: '所属项目',
      dataIndex: 'project',
      align: 'center',
      valueType: 'select',
    },
    {
      title: '执行环境',
      dataIndex: 'env',
      align: 'center',
    },
    {
      title: '构建方式',
      dataIndex: 'type',
      align: 'center',
      valueEnum: {
        1: {text: '手动'},
        0: {text: '自动'},
      },
      render: (_, record) => {
        return record.type === 1 ? '手动' : '自动'
      }
    },
    // {
    //   title: '场景',
    //   dataIndex: 'total',
    //   align: 'center',
    //   search: false,
    //   render: (_, record) => (<Tag color="default">{record.scenario}</Tag>)
    // },
    {
      title: '用例数',
      dataIndex: 'total',
      align: 'center',
      search: false,
      render: (_, record) => (<Tag color="default">{record.total}</Tag>)
    },
    {
      title: '成功',
      dataIndex: 'success',
      align: 'center',
      search: false,
      render: (_, record) => (<Tag color="success">{record.success}</Tag>)
    },
    {
      title: '失败',
      dataIndex: 'fail',
      align: 'center',
      search: false,
      render: (_, record) => (<Tag color="error">{record.fail}</Tag>)
    },
    {
      title: '通过率',
      sorter: true,
      dataIndex: 'pass_rate',
      align: 'center',
      search: false,
      // width: 120,
      render: (_, record) => {
        if (record.pass_rate < 1) {
          return <Tag color="error">{formatNumber(record.pass_rate * 100)}%</Tag>
        } else {
          return <Tag color="success">{formatNumber(record.pass_rate * 100)}%</Tag>
        }
      }
    },
    {
      title: '耗时',
      dataIndex: 'duration',
      align: 'center',
      search: false,
      // width: 120,
      render: (_, record) => {
        const duration = formatTime(parseInt(record.duration))
        return <Tag color="default">{duration}</Tag>
      }
    },
    {
      title: '开始时间',
      dataIndex: 'start_time',
      align: 'center',
      width: 180,
      valueType: 'dateRange',
      render: (_, record) => record.start_time
    },
    {
      title: '操作',
      align: 'center',
      key: 'option',
      search: false,
      render: (text, record, _, action) => {
        const url = `/detail/${record.id}`
        return (
          <>
            <Link to={url}>查看</Link>
            {
              isShowDelete ?
                <>
                  <Popconfirm
                    title={`确定删除 #${record.id}?`}
                    okButtonProps={{danger: true, type: 'default'}}
                    cancelButtonProps={{type: 'primary'}}
                    onConfirm={() => {
                      deleteSummary({id: record.id}).then(r => ref.current.reload())
                    }}
                    // onCancel={cancel}
                    okText="是"
                    cancelText="否"
                  >
                    <Button type="link" size="small" danger>删除</Button>
                  </Popconfirm>
                </> : null
            }
          </>
        )
      }
    }
  ];

  return (
    <ProTable
      actionRef={ref}
      style={{marginTop: '8px'}}
      columns={columnAddValueEnum(columns, baseInfo)}
      request={async (params = {}, sort, filter) => {
        const queryFilter = {...params, ...sort, ...filter}
        const res = await querySummaryList(queryFilter).catch((error) => {
          console.log(error)
        })
        const {data} = res
        return {data}
      }}
      rowKey="id"
      search={{
        labelWidth: '120',
      }}
      options={false}
      pagination={{
        pageSize: 10,
        // onChange: (page, pageSize) => console.log(page, pageSize),
      }}
      dateFormatter="string"
      headerTitle="构建历史"
    />
  );
}
export default SummaryTable;
