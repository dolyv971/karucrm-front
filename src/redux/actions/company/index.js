import { requestCompanyBySiret,requestRegisterCompany } from "../../../utils/endpoints";

export const fetchBySiret = (siret) => async (dispatch) => {
  const res = await requestCompanyBySiret(siret);
  try {
    if (res.status !== 200) {
      throw new Error("Siret not found !");
    }
    return res.data;
  } catch (e) {
    return false;
  }
};

export const registerCompany = (values) => async (dispatch) => {
  const payload = {
    siret: values.siret,
    siren: "800444499",
    name: values.name,
    persons: [
      {
        lastname: values.lastname,
        firstname: values.firstname,
        email: values.email,
        users: [
          {
            lastname: values.lastname,
            firstname: values.firstname,
            email: values.email,
          },
        ],
      },
    ],
    addresses: [
      {
        address: values.address,
        additionalAddress: values.additionalAddress,
        zipCode: values.zipCode,
        city: values.city,
      },
    ],
  };
  const res = await requestRegisterCompany(payload);
  try {
    if (res.status !== 201) {
      throw new Error();
    }
    return res.data;
  } catch (e) {
    return false;
  }
};
