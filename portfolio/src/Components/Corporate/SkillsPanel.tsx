import React, { useEffect, useRef, useState } from 'react';
import { SkillGroup } from '@/Interface/TSkills';

interface SkillsPanelProps {
  groups: SkillGroup[];
}

const SkillsPanel: React.FC<SkillsPanelProps> = ({ groups }) => {
  const [visibleGroups, setVisibleGroups] = useState<Set<string>>(new Set());
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const groupId = entry.target.getAttribute('data-group-id');
            if (groupId) {
              setVisibleGroups((prev) => new Set(prev).add(groupId));
            }
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      const groupElements = sectionRef.current.querySelectorAll('[data-group-id]');
      groupElements.forEach((el) => observer.observe(el));
    }

    return () => observer.disconnect();
  }, []);

  const getProficiency = (skillName: string): number => {
    const hash = skillName.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return 70 + (hash % 26);
  };

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="py-16 lg:py-24 bg-corp-gray-50"
      aria-labelledby="skills-heading"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2
          id="skills-heading"
          className="text-3xl sm:text-4xl lg:text-5xl font-bold text-corp-navy mb-12 text-center"
        >
          Skills & Technologies
        </h2>

        <div className="max-w-5xl mx-auto space-y-12">
          {groups.map((group, groupIndex) => {
            const groupId = `group-${groupIndex}`;
            const isVisible = visibleGroups.has(groupId);

            return (
              <div
                key={group.position}
                data-group-id={groupId}
                className="animate-fade-in"
              >
                <h3 className="text-xl sm:text-2xl font-semibold text-corp-navy mb-6">
                  {group.position}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {group.skills.map((skill) => {
                    const proficiency = getProficiency(skill.skill_name);
                    return (
                      <div
                        key={skill.skill_id}
                        className="bg-white rounded-lg p-4 shadow-md border border-corp-gray-200"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-semibold text-corp-navy">
                            {skill.skill_name}
                          </span>
                          <span className="text-xs text-corp-gray-600">
                            {isVisible ? `${proficiency}%` : '0%'}
                          </span>
                        </div>
                        <div className="w-full bg-corp-gray-200 rounded-full h-2 overflow-hidden">
                          <div
                            className="h-full bg-corp-accent rounded-full transition-all duration-1000 ease-out"
                            style={{
                              width: isVisible ? `${proficiency}%` : '0%',
                            }}
                            role="progressbar"
                            aria-valuenow={isVisible ? proficiency : 0}
                            aria-valuemin={0}
                            aria-valuemax={100}
                            aria-label={`${skill.skill_name} proficiency: ${proficiency}%`}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SkillsPanel;

