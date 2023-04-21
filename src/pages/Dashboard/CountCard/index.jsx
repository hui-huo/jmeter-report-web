import React, {useEffect} from 'react';
import {StatisticCard} from '@ant-design/pro-components';
import {useState} from 'react';
import {RingProgress} from '@ant-design/plots';
import LaunchSVG from '/public/launch.svg'
import CaseSVG from '/public/case.svg'
import {latestBuildInfo} from "@/services/jmeter-report/api";
import {Link} from "@@/exports";
import {notification} from 'antd';

const {Divider} = StatisticCard;

function CountCard({filter}) {
  const [data, setData] = useState({})

  useEffect(() => {
    const init = async () => {
      await latestBuildInfo(filter).then((res) => {
        setData({...res.data})
      }).catch((error) => {
        console.log(error)
      })
    }
    init()
  }, [filter])

  return (

    <StatisticCard.Group direction='row'>
      <StatisticCard
        statistic={{
          title: '最新构建',
          value: data.id ? '#'.concat(data.id) : '暂无构建',
          tip: '点击小火箭，快速打开详情',
        }}
        chart={
          <Link to={`/detail/${data.id}`}>
            <img
              src={LaunchSVG}
              alt="百分比"
              width="100%"
            /></Link>}
        chartPlacement="left"
      />
      <Divider type='vertical'/>
      <StatisticCard
        statistic={{
          title: '用例数',
          value: data.total,
        }}
        chart={
          <img
            src={CaseSVG}
            alt="百分比"
            width="100%"
          />
        }
        chartPlacement="left"
      />
      <StatisticCard
        statistic={{
          title: '成功',
          value: data.success,
        }}
        chart={
          <RingProgress
            height={68}
            width={68}
            autoFit={false}
            percent={data.success / data.total}
            color={['#2ca02c', '#E8EDF3']}
          />
        }
        chartPlacement="left"
      />
      <StatisticCard
        statistic={{
          title: '失败',
          value: data.fail,
        }}
        chart={
          <RingProgress
            height={68}
            width={68}
            autoFit={false}
            percent={data.fail / data.total}
            color={['#d62728', '#E8EDF3']}
          />
        }
        chartPlacement="left"
      />
    </StatisticCard.Group>

  );
}

export default CountCard;
