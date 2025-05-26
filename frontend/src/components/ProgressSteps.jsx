import React from 'react';
import { Badge } from 'primereact/badge';

const ProgressSteps = ({ steps }) => {
  return (
    <div className="bg-white border-bottom-1 border-round-lg surface-border py-4">
      <div className="flex align-items-center justify-content-center flex-wrap gap-2">
        {steps.map((step, index) => (
          <React.Fragment key={step.number}>
            <div className="flex align-items-center">
              <Badge
                value={step.number}
                severity={step.active ? 'danger' : 'secondary'}
                className="mr-2"
              />
              <span
                className={`text-sm font-medium ${step.active ? 'text-red-500' : 'text-gray-500'}`}
              >
                STEP {step.number}: {step.label}
              </span>
            </div>
            {index < steps.length - 1 && (
              <i className="pi pi-chevron-right text-gray-400 mx-2 hidden sm:block"></i>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default ProgressSteps;
