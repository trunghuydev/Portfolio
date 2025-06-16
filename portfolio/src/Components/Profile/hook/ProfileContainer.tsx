import { useProfile } from '@/Hook/usegetInform';
import { useWorkexp } from '@/Hook/usegetWorkexp';
import { useProject } from '@/Hook/usegetProject';

import Introduction from '../Introsuction';
import About from '../About';
import Experience from '../Experience';
import Projects from '../Project';
import Navbar from '@/Components/Header/Header';

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

  if (!accessToken) return <p>Chưa đăng nhập.</p>;
  if (isProfileLoading || isWorkExpLoading || isProjectLoading) return <p>Đang tải dữ liệu...</p>;
  if (isProfileError || isWorkExpError || isProjectError || !profile || !workExp || !projectData)
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

      <section id="projects">
        <Projects projects={projectData.data ?? []} />
      </section>
    </>
  );
};

export default ProfileContainer;
