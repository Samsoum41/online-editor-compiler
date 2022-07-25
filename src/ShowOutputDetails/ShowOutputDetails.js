import React from 'react';
import './ShowOutputDetails.css'

export default function ShowOutput({ outputDetails }) {
    const getOutput = (output) => {
        let statusId = output?.status?.id;
        let printedOutput = (customStyle, data) => (
          <pre className={customStyle}>
            {data}
          </pre>
        );
        switch(statusId) {
          case 6: 
            return printedOutput('failed-output',atob(output?.compile_output));
          case 3: 
            const successData = atob(output.stdout) !== null ? `${atob(output.stdout)}` : null;
            return printedOutput('success-output', successData);
          case 5: 
            return printedOutput('failed-output','Time limit exceeded');
          default: 
            return printedOutput('failed-output',atob(output?.stderr));
        }
      };

    return (
      <>

        <div className='output-details-performance'>
          <label>Status :</label>
          <p>{outputDetails?.status?.description}</p>
        </div>
        <div className='output-details-performance'>
          <label>Memory :</label>
          <p>{outputDetails?.memory}</p>
        </div>
        <div className='output-details-performance'>
          <label>Time :</label>
          <p>{outputDetails?.time}</p>
        </div>

        <label>Output : </label>
        <div className='output-details'>
          {outputDetails && getOutput(outputDetails)}
        </div>
      </>
    )
}
