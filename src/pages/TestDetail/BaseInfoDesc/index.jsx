import {Descriptions} from "antd";
import SimpleView from "@/pages/TestDetail/SimpleView";


function BaseInfoDesc({data}) {
  return (
    <>
      <Descriptions bordered>
        <Descriptions.Item label="请求URL" span={24}>{data.request_url}</Descriptions.Item>
        <Descriptions.Item label="请求方式" >{data.request_method}</Descriptions.Item>
        <Descriptions.Item label="状态码" span={24}>{data.response_code}</Descriptions.Item>
        <Descriptions.Item label="测试结果">{data.test_result ? '成功' : '失败'}</Descriptions.Item>
        <Descriptions.Item label="开始时间" span={24}>{data.start_time}</Descriptions.Item>
        <Descriptions.Item label="断言信息" span={24}><SimpleView data={data.fail_message}/></Descriptions.Item>
      </Descriptions>
    </>
  )
}

export default BaseInfoDesc
