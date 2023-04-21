// 环境信息：项目，执行环境，构建方式
import {useEffect, useState} from "react";
import {queryBaseInfo} from "@/services/jmeter-report/api";

export default function base() {
  const [baseInfo, setBaseInfo] = useState({project:[], env: []})

  useEffect(() => {
    // queryBaseInfo().then(res => setBaseInfo({...baseInfo, ...res.data})).catch((error) => {
    //   console.log(error)
    // })
    const init = async () => {
      await queryBaseInfo().then(res => setBaseInfo({...baseInfo, ...res.data})).catch((error) => {
        console.log(error)
      })
      init()
    }
  }, [])

  return {
    baseInfo
  }
}
