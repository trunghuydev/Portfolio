import React from 'react';
import { FiBriefcase, FiFolder, FiCode } from 'react-icons/fi';
import InfoCard from './InfoCard';

interface HighlightsProps {
  yearsOfExperience?: number | string | null;
  projectCount?: number;
  techStackCount?: number;
}

const Highlights: React.FC<HighlightsProps> = ({
  yearsOfExperience,
  projectCount,
  techStackCount,
}) => {
  return (
    <section className="py-12 lg:py-16 bg-white -mt-20 relative z-10" aria-label="Highlights">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 lg:gap-8">
          <InfoCard
            icon={FiBriefcase}
            label="Years of Experience"
            value={yearsOfExperience || '0'}
          />
          <InfoCard
            icon={FiFolder}
            label="Projects Completed"
            value={projectCount || 0}
          />
          <InfoCard
            icon={FiCode}
            label="Technologies"
            value={techStackCount || 0}
          />
        </div>
      </div>
    </section>
  );
};

export default Highlights;

