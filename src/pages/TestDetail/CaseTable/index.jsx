import React, {useRef, useState} from 'react';
import {ProTable} from '@ant-design/pro-components';
import {Button, Input, Space, Tag, Tooltip, Row, Col} from 'antd';
import DetailModal from "@/pages/TestDetail/DetailModal";
import {SearchOutlined} from "@ant-design/icons";
import Highlighter from 'react-highlight-words';
import {convertValueEnum} from "@/utils";


const CaseTable = ({caseData}) => {
  const [visible, setVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState({})
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };
  const getColumnSearchProps = (dataIndex, title) => ({
    filterDropdown: ({setSelectedKeys, selectedKeys, confirm, clearFilters, close}) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Row>
          <Col>
            <Input
              ref={searchInput}
              placeholder={`搜索 ${title}`}
              value={selectedKeys[0]}
              onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
              onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
              size="small"
              style={{
                marginRight: 8,
                width: 160,
                display: 'block',
              }}
            />
          </Col>
          <Col>
            <Space>
              <Button
                type="primary"
                onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                size="small"
                style={{
                  padding: '0 7px',
                }}
              >
                搜索
              </Button>
              <Button
                onClick={() => clearFilters && handleReset(clearFilters)}
                size="small"
                style={{
                  padding: '0 7px',
                }}
              >
                重置
              </Button>
            </Space>
          </Col>
        </Row>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? '#1890ff' : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: '#ffc069',
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  const columns = [
    {
      title: '用例ID',
      dataIndex: 'id',
      width: 60,
    },
    {
      title: '所属模块',
      dataIndex: 'module_name',
      filters: true,
      onFilter: true,
      width: 120,
      valueEnum: convertValueEnum(caseData, 'module_name')
    },
    {
      title: '用例名称',
      dataIndex: 'case_name',
      width: 240,
      ...getColumnSearchProps('case_name', '用例名称'),
      render: (_, record) => (
        <Tooltip placement="topLeft" title={record.case_name}>
          {record.case_name}
        </Tooltip>
      ),
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
      width: 280,
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
      filters: true,
      onFilter: true,
      valueEnum: {
        true: {text: '成功', status: 'Success'},
        false: {text: '失败', status: 'Error'}
      },
      render: (_, record) => {
        // boolean
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
      width: 180
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
