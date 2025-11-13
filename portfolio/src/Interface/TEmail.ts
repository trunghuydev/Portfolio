export type EmailPayload = {
  name: string;
  email: string;
  message: string;
  subject?: string;
};

export type EmailResponse = {
  message: string;
};

