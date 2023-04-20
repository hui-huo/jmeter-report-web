import request from 'umi-request'

// 查询最新构建信息
export async function latestBuildInfo({project, env}) {
  return request.post('http://127.0.0.1:8000/api/latest_build', {
    data: {
      project, env
    }
  })
}

// 查询图表数据
export async function queryChartData({project, env, type, startTime, endTime}) {
  return request.post('http://127.0.0.1:8000/api/chart_data',
    {data: {project, env, type, start_time: startTime, end_time: endTime}})
}

// 查询构建信息列表
export async function querySummaryList({project, env, pass_rate, type, result, start_time: start}) {
  const [start_time, end_time] = start || []
  return request.post('http://127.0.0.1:8000/api/summary_list',
    {
      data: {
        project, env, pass_rate, type, result, start_time, end_time
      }
    }
  )
}

// 查询测试详情
export async function queryCaseDetail({id}) {
  return request.get(`http://127.0.0.1:8000/api/case_detail/${id}`,
  )
}

// 查询基础信息
export async function queryBaseInfo() {
  return request.get('http://127.0.0.1:8000/api/base_info',
  )
}
