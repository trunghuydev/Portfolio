import { PersonalInfo } from '@/Interface/TPersonalInfo';
import Wave from './waave';

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
    <section className="relative flex flex-col items-center justify-center min-h-[100vh] px-4 text-center bg-[#f9f9fb] overflow-hidden">
      <div className="absolute top-[-100px] left-[-100px] w-[300px] h-[300px] bg-purple-300 opacity-30 rounded-full filter blur-3xl"></div>
      <div className="absolute top-[200px] right-[-100px] w-[300px] h-[300px] bg-cyan-200 opacity-40 rounded-full filter blur-3xl"></div>
      <div className="absolute bottom-[-80px] left-[30%] w-[250px] h-[250px] bg-pink-200 opacity-30 rounded-full filter blur-3xl"></div>

      <h1 className="pb-4 mb-5 text-6xl font-extrabold text-transparent sm:text-7xl bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">
        {fullname}
      </h1>
      <p className="mb-8 text-2xl font-medium text-gray-700 sm:text-3xl">{position_career}</p>

      <div className="flex flex-col gap-4 mb-6 text-lg text-gray-600 sm:flex-row sm:gap-8">
        <span>{email}</span>
        <span>{phone_number}</span>
        <span>{dob}</span>
        {gpa > 0 && <span>GPA: {gpa}</span>}
      </div>

      <div className="flex flex-col gap-4 mb-8 text-lg text-gray-600 sm:flex-row sm:gap-8">
        <span>{university_name}</span>
        <span>{address}</span>
      </div>

      <div className="flex gap-4">
        <a
          href="#projects"
          className="px-8 py-3 text-lg font-medium text-white transition rounded-full shadow bg-gradient-to-r from-purple-500 to-blue-500 hover:opacity-90"
        >
          View My Work
        </a>
        <a
          href="#contact"
          className="px-8 py-3 text-lg font-medium text-blue-600 transition border border-blue-500 rounded-full hover:bg-blue-50"
        >
          Get In Touch
        </a>
      </div>

      <Wave fill="#ffffff" flip />
    </section>
  );
}
