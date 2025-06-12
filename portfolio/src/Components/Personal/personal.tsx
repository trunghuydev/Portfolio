type PersonalProp = {
  name: string;
  title: string;
  location: string;
  email: string;
  gpa?: string;
};

export default function Personal({ name, title, email, location, gpa }: PersonalProp) {
  return (
    <section className="flex flex-col items-center justify-center min-h-screen px-4 text-center bg-gradient-to-br from-purple-100 via-blue-100 to-cyan-100">
      <h1 className="mb-4 text-5xl font-extrabold text-transparent sm:text-6xl bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">
        {name}
      </h1>
      <p className="mb-6 text-xl text-gray-700">{title}</p>

      <div className="flex flex-col gap-4 mb-6 text-sm text-gray-600 sm:flex-row">
        <span>{email}</span>
        <span>{location}</span>
        {gpa && <span>GPA: {gpa}</span>}
      </div>

      <div className="flex gap-4">
        <a
          href="#projects"
          className="px-6 py-3 font-semibold text-white transition rounded-full shadow bg-gradient-to-r from-purple-500 to-blue-500 hover:opacity-90"
        >
          View My Work
        </a>
        <a
          href="#contact"
          className="px-6 py-3 font-semibold text-blue-600 transition border border-blue-500 rounded-full hover:bg-blue-50"
        >
          Get In Touch
        </a>
      </div>
    </section>
  );
}
