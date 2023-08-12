import React from 'react';
import {PageContainer} from "@ant-design/pro-components";
import DetailSummary from "@/pages/TestDetail/DetailSummary";
import CaseTable from "@/pages/TestDetail/CaseTable";
import {useParams} from "@@/exports";
import {useEffect, useState} from 'react';
import {queryCaseDetail} from "@/services/jmeter-report/api";

function TestDetail() {
  const params = useParams();

  const [summaryInfo, setSummaryInfo] = useState({})
  const [caseList, setCaseList] = useState([])

  useEffect(() => {
    const init = async () => {
      await queryCaseDetail(params).then(res => {
        let cases = res.data.case_info.map((_case, index) => {
          return { ..._case, index: index + 1 };
        })
        setSummaryInfo({...summaryInfo, ...res.data.summary_info})
        setCaseList([...caseList, ...cases])
      }).catch((error) => {
        console.log(error)
      })
    }
    init()
  }, [])

  return (
    <>
      <PageContainer title={false}>
        {
          Object.keys(summaryInfo).length !== 0 ? <DetailSummary summaryInfo={summaryInfo}/> : ""
        }
        {
          caseList.length !== 0 ? <CaseTable caseData={caseList}/> : ""
        }
        {/*<DetailSummary summaryInfo={summaryInfo}/>*/}
        {/*<CaseTable caseData={caseList}/>*/}
      </PageContainer>
    </>
  );
}

export default TestDetail;
