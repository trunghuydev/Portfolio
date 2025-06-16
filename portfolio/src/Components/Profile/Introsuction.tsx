import { PersonalInfo } from '@/Interface/TInformation';

type IntroductionProps = Pick<
  PersonalInfo,
  | 'fullname'
  | 'position_career'
  | 'email'
  | 'address'
  | 'gpa'
  | 'university_name'
  | 'phone_number'
  | 'dob'
>;

export default function Introduction({
  fullname,
  position_career,
  email,
  address,
  gpa,
  dob,
  university_name,
  phone_number,
}: IntroductionProps) {
  return (
    <section className="flex flex-col items-center justify-center min-h-[100vh] px-4 text-center bg-gradient-to-br from-purple-100 via-blue-100 to-cyan-100">
      <h1 className="pb-4 mb-5 font-extrabold text-transparent text-7xl sm:text-8xl bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">
        {fullname}
      </h1>
      <p className="mb-10 text-3xl font-extrabold text-gray-700 ">{position_career}</p>

      <div className="flex flex-col gap-6 mb-8 text-lg text-gray-600 sm:flex-row">
        <span>{email}</span>
        <span>{address}</span>
        {gpa && <span>GPA: {gpa}</span>}
      </div>

      <div className="flex flex-col gap-6 mb-10 text-lg text-gray-600 sm:flex-row">
        <span>{university_name}</span>
        <span>{phone_number}</span>
        <span>{dob}</span>
      </div>

      <div className="flex gap-6">
        <a
          href="#projects"
          className="px-10 py-5 text-xl font-semibold text-white transition rounded-full shadow bg-gradient-to-r from-purple-500 to-blue-500 hover:opacity-90"
        >
          View My Work
        </a>
        <a
          href="#contact"
          className="px-10 py-5 text-xl font-semibold text-blue-600 transition border border-blue-500 rounded-full hover:bg-blue-50"
        >
          Get In Touch
        </a>
      </div>
    </section>
  );
}
