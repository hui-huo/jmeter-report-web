import React from 'react';

function SimpleView({data}) {
  return (
    <>
      <div>
        <div style={{whiteSpace: 'pre-wrap'}}>
          {data}
        </div>
      </div>
    </>
  );
}

export default SimpleView;
