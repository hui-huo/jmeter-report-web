import React from 'react';
import SummaryTable from "@/pages/Report/SummaryTable";
import {PageContainer} from "@ant-design/pro-components";

function Report() {
  return (
    <PageContainer title={false}>
      <SummaryTable/>
    </PageContainer>
  );
}

export default Report;
