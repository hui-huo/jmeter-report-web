import {ProCard, ProField} from "@ant-design/pro-components";
import YongLie from "/public/yonglie.svg";
import Fail from "/public/fail.svg";
import Success from "/public/success.svg";
import Rate from "/public/rate.svg";
import ScenarioDetail from "/public/scenario_detail.svg";
import {Card, Col, Descriptions, Row, Statistic} from "antd";
import RightChart from "@/pages/TestDetail/RightChart";
import './index.css'

function DetailSummary({summaryInfo}) {
  const title = `测试报告 #${summaryInfo.id}`
  return (
    <Card title={title}>
      <Row>
        <Col span={16}>
          <ProCard title={false} bordered={false}>
            <Row gutter={16}>
              <Col span={4}>
                <Card bordered={false} hoverable size='small'>
                  <Statistic
                    title="场景数"
                    value={summaryInfo.scenario}
                    valueStyle={{fontSize: 21}}
                    prefix={<img src={ScenarioDetail} style={{height: '1em', width: '1em'}}/>}
                  />
                </Card>
              </Col>
              <Col span={4}>
                <Card bordered={false} hoverable size='small'>
                  <Statistic
                    title="用例数"
                    value={summaryInfo.total}
                    valueStyle={{fontSize: 21}}
                    prefix={<img src={YongLie} style={{height: '1em', width: '1em'}}/>}
                  />
                </Card>
              </Col>
              <Col span={4}>
                <Card bordered={false} hoverable size='small'>
                  <Statistic
                    title="成功"
                    value={summaryInfo.success}
                    valueStyle={{fontSize: 21}}
                    prefix={<img src={Success} style={{height: '1em', width: '1em'}}/>}
                  />
                </Card>
              </Col>
              <Col span={4}>
                <Card bordered={false} hoverable size='small'>
                  <Statistic
                    title="失败"
                    value={summaryInfo.fail}
                    valueStyle={{fontSize: 21}}
                    prefix={<img src={Fail} style={{height: '1em', width: '1em'}}/>}
                  />
                </Card>
              </Col>
              <Col span={4}>
                <Card bordered={false} hoverable size='small'>
                  <Statistic
                    title="通过率"
                    value={summaryInfo.pass_rate * 100}
                    valueStyle={{fontSize: 21}}
                    prefix={<img src={Rate} style={{height: '1em', width: '1em'}}/>}
                    suffix="%"
                  />
                </Card>
              </Col>
            </Row>
            <Row style={{paddingTop: 15, paddingLeft: 12}}>
              <Descriptions column={3}>
                <Descriptions.Item label="项目名称">
                  <ProField text={summaryInfo.project} mode="read"/>
                </Descriptions.Item>
                <Descriptions.Item label="测试环境">
                  <ProField text={summaryInfo.env} mode="read"/>
                </Descriptions.Item>
                <Descriptions.Item label="测试结果">
                  <ProField text={summaryInfo.result ? '通过' : '不通过'} mode="read"/>
                </Descriptions.Item>
                <Descriptions.Item label="构建方式">
                  <ProField text={summaryInfo.type ? '手动' : '自动'} mode="read"/>
                </Descriptions.Item>
                <Descriptions.Item label="开始时间">
                  <ProField text={summaryInfo.start_time} mode="read"/>
                </Descriptions.Item>
                <Descriptions.Item label="结束时间">
                  <ProField text={summaryInfo.end_time} mode="read"/>
                </Descriptions.Item>
              </Descriptions>
            </Row>
          </ProCard>
        </Col>
        <Col span={8}>
          <RightChart summaryInfo={summaryInfo}/>
        </Col>
      </Row>
    </Card>
  );
}

export default DetailSummary;
