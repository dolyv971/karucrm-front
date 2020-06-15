import API from "./api";

export const requestCompanyBySiret = (siret) =>
  API.get(`/companies/${siret}/siret`);

export const requestRegisterCompany = (values) =>
  API.post(`/companies/register`, values);
