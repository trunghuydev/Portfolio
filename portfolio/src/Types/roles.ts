export const Role = {
  ADMIN: 'ADMIN',
  VIEWER: 'VIEWER'
} as const;

export type Role = typeof Role[keyof typeof Role];
