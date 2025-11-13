export type Certificate = {
  id: string;
  certificate_name: string;
  user_id: string;
};

export type CertificateCreatePayload = {
  certificate_name: string;
};

export type CertificateUpdatePayload = {
  certificate_name: string;
};

export type CertificateResponse = {
  message?: string;
  id?: string;
  certificate_name?: string;
};

