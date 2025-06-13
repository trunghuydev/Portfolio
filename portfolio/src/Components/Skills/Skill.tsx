import ScrollFloat from '@/Util/Animation/scrollFloat';

export type SkillGroup = {
  category: string;
  color: string;
  skills: string[];
};

const Skills = ({ skillGroups }: { skillGroups: SkillGroup[] }) => {
  return (
    <section className="max-w-6xl px-6 py-16 mx-auto">
      <div className="flex flex-col items-center mb-10 text-center">
        <ScrollFloat
          animationDuration={1.2}
          ease="back.out(1.7)"
          scrollStart="top 80%"
          scrollEnd="bottom 60%"
          stagger={0.03}
        >
          <h2 className="mb-2 text-4xl font-bold text-center text-purple-600">
            Skills & Expertise
          </h2>
        </ScrollFloat>
        <p className="mb-10 text-center text-gray-500">Technologies I work with</p>
      </div>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((group, idx) => (
          <div key={idx}>
            <h3 className={`mb-4 text-xl font-semibold ${group.color}`}>{group.category}</h3>
            <ul className="space-y-2 text-gray-700 list-disc list-inside">
              {group.skills.map((skill, i) => (
                <li key={i}>{skill}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
