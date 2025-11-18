import React from 'react';
import { useParams } from 'react-router-dom';
import { usePublicProfile } from '@/Hook/usePublicProfile';
import { usePublicWorkexp } from '@/Hook/usePublicWorkexp';
import { usePublicProjects } from '@/Hook/usePublicProjects';
import { usePublicSkills } from '@/Hook/usePublicSkills';
import { useSendEmail } from '@/Hook/useSendEmail';
import { groupSkillsByPosition } from '@/Interface/TSkills';
import { EmailPayload } from '@/Interface/TEmail';
import CorporatePortfolio from '@/Components/Corporate/CorporatePortfolio';

const PublicPortfolio: React.FC = () => {
  const { username } = useParams<{ username: string }>();

  if (!username) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-600">Username is required</p>
      </div>
    );
  }

  const pageIndex = 1;
  const pageSize = 10;

  const {
    data: profile,
    isLoading: isProfileLoading,
    isError: isProfileError,
  } = usePublicProfile(username);

  const {
    data: workExp,
    isLoading: isWorkExpLoading,
    isError: isWorkExpError,
  } = usePublicWorkexp(username, pageIndex, pageSize);

  const {
    data: projectData,
    isLoading: isProjectLoading,
    isError: isProjectError,
  } = usePublicProjects(username, pageIndex, pageSize);

  const {
    data: skills,
    isLoading: isSkillLoading,
    isError: isSkillError,
  } = usePublicSkills(username);

  const sendEmailMutation = useSendEmail();

  const handleSendEmail = async (data: EmailPayload) => {
    await sendEmailMutation.mutateAsync(data);
  };

  if (isProfileLoading || isWorkExpLoading || isProjectLoading || isSkillLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-corp-gray-600">Loading portfolio data...</p>
      </div>
    );
  }

  if (isProfileError) {
    const error = isProfileError as any;
    if (error?.response?.status === 404) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-red-600">Portfolio not found</p>
        </div>
      );
    }
    if (error?.response?.status === 403) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-red-600">This portfolio is private</p>
        </div>
      );
    }
  }

  if (
    isWorkExpError ||
    isProjectError ||
    isSkillError ||
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

  const skillGroups = skills ? groupSkillsByPosition(skills) : [];

  return (
    <CorporatePortfolio
      profile={profile}
      workExp={workExp.data ?? []}
      projects={projectData.data ?? []}
      skillGroups={skillGroups}
      onSendEmail={handleSendEmail}
    />
  );
};

export default PublicPortfolio;

