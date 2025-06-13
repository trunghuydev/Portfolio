import ScrollFloat from '@/Util/Animation/scrollFloat';

export type ExperienceItem = {
  title: string;
  company: string;
  years: string;
  description: string;
  skills?: string[];
};

const getDotColor = (index: number) => {
  const colors = ['bg-blue-500', 'bg-purple-500', 'bg-cyan-400'];
  return colors[index % colors.length];
};

const getTextColor = (index: number) => {
  const colors = ['text-blue-500', 'text-purple-500', 'text-cyan-500'];
  return colors[index % colors.length];
};

const Experience = ({ items }: { items: ExperienceItem[] }) => {
  return (
    <section className="max-w-5xl px-6 py-16 mx-auto">
      {/* Title & Description */}
      <div className="flex flex-col items-center mb-10 text-center">
        <ScrollFloat
          animationDuration={1.2}
          ease="back.out(1.7)"
          scrollStart="top 80%"
          scrollEnd="bottom 60%"
          stagger={0.03}
        >
          <h2 className="mb-2 text-4xl font-bold text-purple-600">Experience</h2>
        </ScrollFloat>
        <p className="text-gray-500">My professional journey</p>
      </div>

      {/* Timeline */}
      <div className="relative ml-6">
        {/* Vertical timeline gradient line */}
        <div className="absolute top-0 left-0 w-0.5 h-full rounded-full bg-gradient-to-b from-blue-500 via-purple-500 to-cyan-400" />

        {items.map((item, idx) => (
          <div key={idx} className="relative mb-12 ml-6 transition-all duration-300 group">
            {/* Dot */}
            <span
              className={`absolute w-4 h-4 border-[3px] ${getDotColor(
                idx
              )} rounded-full -left-[1.9rem] top-0.5`}
            ></span>

            {/* Card */}
            <div className="bg-white shadow-md rounded-xl p-6 transition-all duration-300 group-hover:shadow-2xl group-hover:scale-[1.02]">
              <div className="flex items-start justify-between mb-1">
                <h3 className="text-xl font-semibold text-gray-900">{item.title}</h3>
                <span className={`text-sm font-bold ${getTextColor(idx)}`}>{item.years}</span>
              </div>
              <p className="mb-1 text-gray-700">{item.company}</p>
              <p className="text-gray-600">{item.description}</p>
              {item.skills && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {item.skills.map((skill, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 text-xs font-medium text-gray-700 bg-gray-100 rounded-full shadow-sm hover:bg-gray-200"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Experience;
