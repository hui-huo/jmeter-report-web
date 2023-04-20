import React, {useState} from 'react';
import {ProTable} from '@ant-design/pro-components';
import {Tag, Tooltip} from 'antd';
import DetailModal from "@/pages/TestDetail/DetailModal";


const CaseTable = ({caseData}) => {
  const [visible, setVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState({})

  const columns = [
    {
      title: '用例ID',
      dataIndex: 'id',
      width: 100,
    },
    {
      title: '所属模块',
      dataIndex: 'module_name',
    },
    {
      title: '用例名称',
      dataIndex: 'case_name',
    },
    {
      title: '请求方式',
      dataIndex: 'type',
      render: (_, record) => {
        return record.request_method
      }
    },
    {
      title: '请求路径',
      dataIndex: 'request_url',
      width: 300,
      ellipsis: {
        showTitle: false,
      },
      render: (_, record) => (
        <Tooltip placement="topLeft" title={record.request_url}>
          {new URL(record.request_url).pathname}
        </Tooltip>
      ),
    },
    {
      title: '测试结果',
      dataIndex: 'test_result',
      align: 'center',
      render: (_, record) => {
        if (record.test_result) {
          return <Tag color="success">成功</Tag>
        } else {
          return <Tag color="error">失败</Tag>
        }
      }
    },
    {
      title: '开始时间',
      dataIndex: 'start_time',
      align: 'center',
      width: 210
    },
    {
      title: '操作',
      align: 'center',
      key: 'option',
      search: false,
      render: (_, record,) => {
        return <a onClick={() => {
          setCurrentRecord(record)
          setVisible(true)
        }
        }>查看</a>
      }
    }
  ];


  return (
    <>
      <ProTable
        style={{marginTop: '8px'}}
        headerTitle="测试用例"
        columns={columns}
        dataSource={caseData}
        rowKey="id"
        search={false}
        options={false}
        pagination={{
          pageSize: 10,
          // onChange: (page) => console.log(page),
        }}
        dateFormatter="string"
      />
      <DetailModal caseInfo={currentRecord} visible={visible} setVisible={setVisible}/>
    </>
  );
}
export default CaseTable;
