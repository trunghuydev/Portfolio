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
    <section className="max-w-5xl px-6 py-24 mx-auto">
      {/* Title & Description */}
      <div className="flex flex-col items-center text-center mb-14">
        <ScrollFloat
          animationDuration={1.2}
          ease="back.out(1.7)"
          scrollStart="top 80%"
          scrollEnd="bottom 60%"
          stagger={0.03}
        >
          <h2 className="mb-4 text-5xl font-extrabold text-purple-600">Experience</h2>
        </ScrollFloat>
        <p className="max-w-xl text-lg text-gray-500">My professional journey</p>
      </div>

      {/* Timeline */}
      <div className="relative ml-10">
        {/* Vertical timeline gradient line */}
        <div className="absolute top-0 left-0 w-1 h-full rounded-full bg-gradient-to-b from-blue-500 via-purple-500 to-cyan-400" />

        {items.map((item, idx) => (
          <div key={idx} className="relative ml-6 transition-all duration-300 mb-14 group">
            {/* Dot */}
            <span
              className={`absolute w-5 h-5 border-[3px] ${getDotColor(
                idx
              )} rounded-full -left-[2rem] top-0.5`}
            ></span>

            {/* Card */}
            <div className="bg-white shadow-md rounded-2xl p-8 transition-all duration-300 group-hover:shadow-2xl group-hover:scale-[1.02]">
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-2xl font-semibold text-gray-900">{item.title}</h3>
                <span className={`text-sm font-bold ${getTextColor(idx)}`}>{item.years}</span>
              </div>
              <p className="mb-2 text-lg text-gray-700">{item.company}</p>
              <p className="text-base text-gray-600">{item.description}</p>
              {item.skills && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {item.skills.map((skill, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 text-sm font-medium text-gray-700 bg-gray-100 rounded-full shadow-sm hover:bg-gray-200"
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
