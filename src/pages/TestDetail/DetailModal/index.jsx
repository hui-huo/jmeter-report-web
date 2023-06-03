import React, {useState} from 'react';
import {Modal} from "antd";
import {ProCard} from "@ant-design/pro-components";
import BaseInfoDesc from "@/pages/TestDetail/BaseInfoDesc";
import JSONView from "@/pages/TestDetail/JSONView";
import SimpleView from "@/pages/TestDetail/SimpleView";


function DetailModal({caseInfo, visible, setVisible}) {
  const [tab, setTab] = useState('tab1');

  const handleCancel = () => {
    setVisible(false)
    setTab('tab1')
  }

  const isJSONStr = (value) => {
    if (typeof value == 'string') {
      try {
        let obj = JSON.parse(value);
        if (typeof obj == 'object' && obj) {
          return true;
        } else {
          return false;
        }
      } catch (e) {
        // console.log('error：' + value + '!!!' + e);    return false;
      }
    }
  }

  return (
    <>
      <Modal
        width={800}
        title={`用例名称：${caseInfo.case_name}`}
        open={visible}
        footer={null}
        onCancel={handleCancel}
      >
        <ProCard
          tabs={
            {
              tabPosition: 'left',
              activeKey: tab,
              items: [
                {
                  label: `基本信息`,
                  key: 'tab1',
                  children: <BaseInfoDesc data={caseInfo}/>,
                },
                {
                  label: `请求体`,
                  key: 'tab3',
                  children: (
                    isJSONStr(caseInfo.request_body) ? <JSONView data={caseInfo.request_body}/> :
                      <SimpleView data={caseInfo.request_body}/>
                  )
                },
                {
                  label: `响应体`,
                  key: 'tab4',
                  children: (
                    isJSONStr(caseInfo.response_body) ? <JSONView data={caseInfo.response_body}/> :
                      <SimpleView data={caseInfo.response_body}/>
                  )
                },
                {
                  label: `请求头`,
                  key: 'tab5',
                  children: <SimpleView data={caseInfo.request_header}/>,
                },
                {
                  label: `响应头`,
                  key: 'tab6',
                  children: <SimpleView data={caseInfo.response_header}/>,
                },
              ],
              onChange: (key) => {
                setTab(key);
              },
            }
          }
        />
      </Modal>
    </>
  );
}

export default DetailModal;
