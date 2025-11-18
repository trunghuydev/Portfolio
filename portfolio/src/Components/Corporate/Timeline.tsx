import React from 'react';
import { WorkExp } from '@/Interface/TWorkExp';

interface TimelineItemProps {
  company: string;
  role: string;
  period: string;
  bullets: string[];
  description?: string;
}

const TimelineItem: React.FC<TimelineItemProps> = ({
  company,
  role,
  period,
  bullets,
  description,
}) => {
  return (
    <div className="relative pl-8 pb-8 border-l-4 border-corp-accent last:border-l-0 last:pb-0">
      <div className="absolute -left-2 top-0 w-4 h-4 bg-corp-accent rounded-full border-4 border-white" />
      <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200 border border-corp-gray-200">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
          <div>
            <h3 className="text-xl font-bold text-corp-navy">{company}</h3>
            <p className="text-lg font-semibold text-corp-accent">{role}</p>
          </div>
          <span className="text-sm font-medium text-corp-gray-600 bg-corp-gray-100 px-3 py-1 rounded-full">
            {period}
          </span>
        </div>
        {description && (
          <p className="text-corp-gray-700 mb-4 leading-relaxed">{description}</p>
        )}
        {bullets.length > 0 && (
          <ul className="space-y-2">
            {bullets.map((bullet, index) => (
              <li key={index} className="flex items-start gap-2 text-corp-gray-700">
                <span className="text-corp-accent mt-1.5">•</span>
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

interface TimelineProps {
  items: WorkExp[];
}

const Timeline: React.FC<TimelineProps> = ({ items }) => {
  return (
    <section
      id="experience"
      className="py-16 lg:py-24 bg-white"
      aria-labelledby="experience-heading"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2
          id="experience-heading"
          className="text-3xl sm:text-4xl lg:text-5xl font-bold text-corp-navy mb-12 text-center"
        >
          Work Experience
        </h2>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {items.map((item) => (
              <TimelineItem
                key={item.we_id}
                company={item.company_name}
                role={item.position}
                period={item.duration}
                bullets={item.tasks.map((task) => task.task_description)}
                description={item.description}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Timeline;

