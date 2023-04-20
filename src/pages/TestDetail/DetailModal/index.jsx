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
    try {
      JSON.parse(value);
      return true;
    } catch (e) {
      return false;
    }
  }

  return (
    <>
      <Modal
        width={800}
        title="用例 #1001"
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
                  label: `用例基本信息`,
                  key: 'tab1',
                  children: <BaseInfoDesc data={caseInfo}/>,
                },
                {
                  label: `Request Body`,
                  key: 'tab2',
                  children: (
                    isJSONStr(caseInfo.request_body) ? <JSONView data={caseInfo.request_body}/> :
                      <SimpleView data={caseInfo.request_body}/>
                  )
                },
                {
                  label: `Response Body`,
                  key: 'tab3',
                  children: (
                    isJSONStr(caseInfo.response_body) ? <JSONView data={caseInfo.response_body}/> :
                      <SimpleView data={caseInfo.response_body}/>
                  )
                },
                {
                  label: `Request Header`,
                  key: 'tab4',
                  children: <SimpleView data={caseInfo.request_header}/>,
                },
                {
                  label: `Response Header`,
                  key: 'tab5',
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
