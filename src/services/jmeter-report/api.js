// 查询最新构建信息
import request from "@/utils/request";

export async function latestBuildInfo({project, env}) {
  return request.post('/api/result/latest', {
    data: {
      project, env
    }
  })
}

// 查询图表数据
export async function queryChartData({project, env, type, startTime, endTime}) {
  return request.post('/api/chart/data',
    {data: {project, env, type, start_time: startTime, end_time: endTime}})
}

// 查询报告列表
export async function querySummaryList({project, env, pass_rate, type, result, start_time: start}) {
  const [start_time, end_time] = start || []
  return request.post('/api/summary/list',
    {
      data: {
        project, env, pass_rate, type, result, start_time, end_time
      }
    }
  )
}

// 删除测试报告
export async function deleteSummary({id}) {
  return request.post('/api/summary/delete',
    {
      data: {
        id
      }
    }
  )
}

// 查询测试详情
export async function queryCaseDetail({id}) {
  return request.get(`/api/case/detail/${id}`,
  )
}

// 查询基础信息
export async function queryBaseInfo() {
  return request.get('/api/project/info',
  )
}
