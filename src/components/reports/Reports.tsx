import React from 'react';
import UtilizationChart from '../dashboard/UtilizationChart';
import ExportOptions from './ExportOptions';

const Reports: React.FC = () => {
  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold mb-6">Resource Reports</h2>
      
      <ExportOptions />
      
      <UtilizationChart />
      
      {/* Additional reports could be added here */}
    </div>
  );
};

export default Reports;
