import { useProfile } from '@/Hook/usegetInform';
import { useWorkexp } from '@/Hook/usegetWorkexp';
import { useProject } from '@/Hook/usegetProject';

import Introduction from '../Introsuction';
import About from '../About';
import Experience from '../Experience';
import Projects from '../Project';
import Navbar from '@/Components/Header/Header';
import { useSkills } from '@/Hook/usegetSkills';
import Skills from '../Skill';
import { groupSkillsByPosition } from '@/Interface/TSkills';
import Contact from '../Contact';

type ProfileContainerProps = {
  accessToken: string;
};

const ProfileContainer = ({ accessToken }: ProfileContainerProps) => {
  const pageIndex = 1;
  const pageSize = 10;

  const {
    data: profile,
    isLoading: isProfileLoading,
    isError: isProfileError,
  } = useProfile(accessToken);

  const {
    data: workExp,
    isLoading: isWorkExpLoading,
    isError: isWorkExpError,
  } = useWorkexp(accessToken, pageIndex, pageSize);

  const {
    data: projectData,
    isLoading: isProjectLoading,
    isError: isProjectError,
  } = useProject(accessToken, pageIndex, pageSize);
  const { data: skills, isLoading: isSkillloading, isError: isskillError } = useSkills(accessToken);

  if (!accessToken) return <p>Chưa đăng nhập.</p>;
  if (isProfileLoading || isWorkExpLoading || isProjectLoading || isSkillloading)
    return <p>Đang tải dữ liệu...</p>;
  if (
    isProfileError ||
    isWorkExpError ||
    isProjectError ||
    isskillError ||
    !skills ||
    !profile ||
    !workExp ||
    !projectData
  )
    return <p>Lỗi khi tải dữ liệu.</p>;

  return (
    <>
      <Navbar />

      <section id="introduction">
        <Introduction {...profile} />
      </section>

      <section id="about">
        <About {...profile} />
      </section>

      <section id="experience">
        <Experience items={workExp.data ?? []} />
      </section>
      <section id="skills">
        <Skills skillGroups={groupSkillsByPosition(skills)} />
      </section>

      <section id="projects">
        <Projects projects={projectData.data ?? []} />
      </section>

      <section id="contact">
        <Contact {...profile} />
      </section>
    </>
  );
};

export default ProfileContainer;
