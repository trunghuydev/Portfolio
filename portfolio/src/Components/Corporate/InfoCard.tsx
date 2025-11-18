import React from 'react';
import { IconType } from 'react-icons';

interface InfoCardProps {
  icon: IconType;
  label: string;
  value: string | number;
}

const InfoCard: React.FC<InfoCardProps> = ({ icon: Icon, label, value }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200 border border-corp-gray-200">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-corp-accent/10 rounded-lg flex items-center justify-center">
          <Icon className="w-6 h-6 text-corp-accent" aria-hidden="true" />
        </div>
        <div>
          <p className="text-2xl sm:text-3xl font-bold text-corp-navy">{value}</p>
          <p className="text-sm sm:text-base text-corp-gray-600 mt-1">{label}</p>
        </div>
      </div>
    </div>
  );
};

export default InfoCard;

