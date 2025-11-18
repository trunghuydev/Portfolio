import React from 'react';
import { useAuthStore } from '@/Store/auth';
import { useProfile } from '@/Hook/usegetInform';
import { useWorkexp } from '@/Hook/usegetWorkexp';
import { useProject } from '@/Hook/usegetProject';
import { useSkills } from '@/Hook/usegetSkills';
import { useSendEmail } from '@/Hook/useSendEmail';
import { groupSkillsByPosition } from '@/Interface/TSkills';
import { EmailPayload } from '@/Interface/TEmail';
import CorporatePortfolio from '@/Components/Corporate/CorporatePortfolio';
import { useNavigate } from 'react-router-dom';

const CorporatePortfolioPage: React.FC = () => {
  const accessToken = useAuthStore((state) => state.accessToken);
  const userName = useAuthStore((state) => state.userName);
  const navigate = useNavigate();

  const pageIndex = 1;
  const pageSize = 10;

  const {
    data: profile,
    isLoading: isProfileLoading,
    isError: isProfileError,
  } = useProfile(accessToken || '');

  const {
    data: workExp,
    isLoading: isWorkExpLoading,
    isError: isWorkExpError,
  } = useWorkexp(accessToken || '', pageIndex, pageSize);

  const {
    data: projectData,
    isLoading: isProjectLoading,
    isError: isProjectError,
  } = useProject(accessToken || '', pageIndex, pageSize);

  const {
    data: skills,
    isLoading: isSkillLoading,
    isError: isSkillError,
  } = useSkills(accessToken || '');

  const sendEmailMutation = useSendEmail(accessToken || '');

  const handleSendEmail = async (data: EmailPayload) => {
    await sendEmailMutation.mutateAsync(data);
  };

  React.useEffect(() => {
    if (!accessToken) {
      navigate('/');
    }
  }, [accessToken, navigate]);

  if (!accessToken) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-corp-gray-600">Redirecting to login...</p>
      </div>
    );
  }

  if (isProfileLoading || isWorkExpLoading || isProjectLoading || isSkillLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-corp-gray-600">Loading portfolio data...</p>
      </div>
    );
  }

  if (
    isProfileError ||
    isWorkExpError ||
    isProjectError ||
    isSkillError ||
    !skills ||
    !profile ||
    !workExp ||
    !projectData
  ) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-600">Error loading portfolio data. Please try again later.</p>
      </div>
    );
  }

  return (
    <CorporatePortfolio
      profile={profile}
      workExp={workExp.data ?? []}
      projects={projectData.data ?? []}
      skillGroups={groupSkillsByPosition(skills)}
      onSendEmail={handleSendEmail}
    />
  );
};

export default CorporatePortfolioPage;
