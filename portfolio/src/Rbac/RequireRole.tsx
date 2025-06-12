import { useAuth } from '@/Context/AuthContext';
import { Role } from '@/Types/roles';
import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  allowedRoles: Role[];
};

export const RequireRole = ({ children, allowedRoles }: Props) => {
  const { user } = useAuth();

  if (!allowedRoles.includes(user.role)) {
    return null;
  }

  return <>{children}</>;
};
