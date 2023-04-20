import React from 'react';
import ReactJson from "react-json-view";

function JSONView({data}) {
  return (
    <>
      <ReactJson
        src={JSON.parse(data)}
        collapsed={2}
        collapseStringsAfterLength={25}
        theme="monokai"
        displayDataTypes={false}
      />
    </>
  );
}

export default JSONView;
