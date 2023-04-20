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
    queryCaseDetail(params).then(res => {
      setSummaryInfo({...summaryInfo, ...res.data.summary_info})
      setCaseList([...caseList, ...res.data.case_info])
    }).catch((error) => {
      console.log(error)
    })
  }, [])

  return (
    <>
      <PageContainer title={false}>
        <DetailSummary summaryInfo={summaryInfo}/>
        <CaseTable caseData={caseList}/>
      </PageContainer>
    </>
  );
}

export default TestDetail;
