import React from 'react';

interface DataRow {
  label: string;
  value: React.ReactNode;
  badgeClass?: string;
}

interface ResponsiveDataCardProps {
  header: React.ReactNode;
  rows: DataRow[];
  actions?: React.ReactNode;
}

const ResponsiveDataCard: React.FC<ResponsiveDataCardProps> = ({ header, rows, actions }) => (
  <div className="rounded-xl bg-white shadow-sm p-4 mb-4 border">
    <div className="flex items-center justify-between mb-2">
      <span className="font-semibold text-primary-600">{header}</span>
      {actions && <div>{actions}</div>}
    </div>
    {rows.map((row, idx) => (
      <div key={idx} className="flex justify-between py-1">
        <span className="text-gray-500">{row.label}</span>
        {row.badgeClass ? (
          <span className={row.badgeClass}>{row.value}</span>
        ) : (
          <span className="font-medium text-gray-900">{row.value}</span>
        )}
      </div>
    ))}
  </div>
);

export default ResponsiveDataCard; 