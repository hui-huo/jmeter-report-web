import React, {useState} from 'react';
import {PageContainer} from "@ant-design/pro-components";
import CountCard from "@/pages/Dashboard/CountCard";
import TrendChart from "@/pages/Dashboard/TrendChart";
import {Button, Col, Row, Badge, Affix} from "antd";
import CurveChart from "@/pages/Dashboard/CurveChart";
import ErrorsTable from "@/pages/Dashboard/ErrorsTable";
import {SettingOutlined} from '@ant-design/icons'
import SettingModal from "@/pages/Dashboard/SettingModal";

function Summary() {
  const [visible, setVisible] = useState(false)
  const [filter, setFilter] = useState({})
  const [text, setText] = useState('全部')

  return (
    <Badge.Ribbon text={text} color="green">
      <PageContainer title={false}>
        <CountCard filter={filter}/>
        <Row style={{marginTop: '8px'}}>
          <Col span={13}>
            <TrendChart filter={filter}/>
          </Col>
          <Col span={11}>
            <CurveChart filter={filter}/>
          </Col>
        </Row>
        <ErrorsTable filter={filter}/>
        <Affix style={{
          position: 'fixed',
          top: '25%',
          right: 0,
          transform: 'translateY(-50%)',
        }}>
          <Button shape="circle" icon={<SettingOutlined/>} onClick={() => setVisible(true)}/>
        </Affix>
        <SettingModal
          filter={filter}
          setFilter={setFilter}
          setText={setText}
          visible={visible}
          setVisible={setVisible}
        />
      </PageContainer>
    </Badge.Ribbon>
  );
}

export default Summary;
