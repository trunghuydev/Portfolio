import { WorkExp } from '@/Interface/TWorkExp';
import ScrollFloat from '@/Util/Animation/scrollFloat';

const getDotColor = (index: number) => {
  const colors = ['bg-blue-500', 'bg-purple-500', 'bg-cyan-400'];
  return colors[index % colors.length];
};

const getTextColor = (index: number) => {
  const colors = ['text-blue-500', 'text-purple-500', 'text-cyan-500'];
  return colors[index % colors.length];
};

const Experience = ({ items }: { items: WorkExp[] }) => {
  return (
    <div className="w-full bg-[#F9FBFC]">
      <section className="max-w-5xl px-6 py-24 mx-auto bg-[#F9FBFC]">
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

        <div className="relative ml-10">
          <div className="absolute top-0 left-0 w-1 h-full rounded-full bg-gradient-to-b from-blue-500 via-purple-500 to-cyan-400" />

          {items.map((item, idx) => (
            <div key={idx} className="relative ml-6 transition-all duration-300 mb-14 group">
              <span
                className={`absolute w-5 h-5 border-[3px] ${getDotColor(
                  idx
                )} rounded-full -left-[2rem] top-0.5`}
              ></span>

              <div className="bg-white shadow-md rounded-2xl p-8 transition-all duration-300 group-hover:shadow-2xl group-hover:scale-[1.02]">
                <div className="mb-2 space-y-1">
                  <h3 className="text-2xl font-semibold text-gray-900">{item.project_id}</h3>

                  <div className="flex items-center justify-between">
                    <h4 className="text-xl font-medium text-gray-800">{item.position}</h4>
                    <span className={`text-sm font-bold ${getTextColor(idx)}`}>
                      {item.duration}
                    </span>
                  </div>
                </div>

                <p className="mb-2 text-lg text-gray-700">{item.company_name}</p>
                <p className="text-base text-gray-600">{item.description}</p>

                {item.tasks && item.tasks.length > 0 && (
                  <ul className="mt-4 space-y-1 text-gray-700 list-disc list-inside">
                    {item.tasks.map((task, taskIdx) => (
                      <li key={taskIdx} className="text-base">
                        {task.task_description}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Experience;
