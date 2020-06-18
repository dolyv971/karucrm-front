import API from "./api";

export const requestCompanyBySiret = (siret) =>
  API.get(`/companies/${siret}/siret`);

export const requestRegisterCompany = (values) =>
  API.post(`/companies/register`, values);

export const requestUserValidate = (userId, values) =>
  API.patch(`/users/${userId}/validation`, values);

export const requestUpdateUserPassword = (userId, values) =>
  API.patch(`/users/${userId}/update-password`, values);
