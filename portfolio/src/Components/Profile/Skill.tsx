import { SkillGroup } from '@/Interface/TSkills';
import ScrollFloat from '@/Util/Animation/scrollFloat';

const Skills = ({ skillGroups }: { skillGroups: SkillGroup[] }) => {
  return (
    <section className="max-w-6xl px-6 py-24 mx-auto">
      <div className="flex flex-col items-center text-center mb-14">
        <ScrollFloat
          animationDuration={1.2}
          ease="back.out(1.7)"
          scrollStart="top 80%"
          scrollEnd="bottom 60%"
          stagger={0.03}
        >
          <h2 className="mb-4 text-5xl font-extrabold text-center text-purple-600">
            Skills & Expertise
          </h2>
        </ScrollFloat>
        <p className="text-lg text-gray-500">Technologies I work with</p>
      </div>

      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((group, idx) => (
          <div key={idx}>
            <h3 className={`mb-4 text-2xl font-semibold ${group.color}`}>{group.position}</h3>
            <ul className="space-y-2 text-base text-gray-700 list-disc list-inside">
              {group.skills.map((skill) => (
                <li key={skill.skill_id}>{skill.skill_name}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
