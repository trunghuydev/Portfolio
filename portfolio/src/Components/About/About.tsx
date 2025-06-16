import ScrollFloat from '@/Util/Animation/scrollFloat';

type AboutProps = {
  background: string;
  mindset: string;
  avatarUrl: string;
};

const About = ({ background, mindset, avatarUrl }: AboutProps) => {
  return (
    <section className="px-6 py-20 text-gray-700 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col items-center text-center mb-14">
          <ScrollFloat
            animationDuration={1.2}
            ease="back.out(1.7)"
            scrollStart="top 80%"
            scrollEnd="bottom 60%"
            stagger={0.03}
          >
            <h2 className="mb-4 text-5xl font-extrabold text-purple-700">About</h2>
          </ScrollFloat>

          <p className="max-w-xl text-lg text-gray-500">
            Passionate developer with 5+ years of experience creating innovative digital solutions
          </p>
        </div>

        <div className="flex flex-col items-center gap-12 md:flex-row md:items-start">
          {/* Avatar */}
          <img
            src={avatarUrl}
            alt="Avatar"
            className="object-cover shadow-lg w-60 h-60 rounded-2xl"
          />

          {/* Info */}
          <div className="flex-1 space-y-10 text-left">
            <div>
              <h3 className="mb-2 text-2xl font-semibold text-blue-600">Background</h3>
              <p className="text-lg text-gray-700">{background}</p>
            </div>
            <div>
              <h3 className="mb-2 text-2xl font-semibold text-blue-600">Mindset</h3>
              <p className="text-lg text-gray-700">{mindset}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
