import React from 'react';
import {Radio} from "antd";

function FilterCard({range, setRange}) {
  return (
    <>
      <Radio.Group defaultValue={range} size="small" onChange={setRange}>
        <Radio.Button value="7" style={{padding: '0px 5px'}}>W</Radio.Button>
        <Radio.Button value="30" style={{padding: '0px 5px'}}>M</Radio.Button>
        <Radio.Button value="90" style={{padding: '0px 5px'}}>Q</Radio.Button>
      </Radio.Group>
    </>
  );
}

export default FilterCard;
