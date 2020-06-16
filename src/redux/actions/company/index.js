import {
  requestCompanyBySiret,
  requestRegisterCompany,
} from "../../../utils/endpoints";
import { SHOW_NOTIFICATION } from "../../actionTypes/globalActionTypes";

export const fetchBySiret = (siret) => async (dispatch) => {
  try {
    const res = await requestCompanyBySiret(siret);
    if (res.status !== 200) {
      throw new Error("Siret not found !");
    }
    return res.data;
  } catch (e) {
    dispatch({
      type: SHOW_NOTIFICATION,
      payload: {
        message: "Entreprise non trouvée pour ce numéro de SIRET.",
        type: "info",
      },
    });
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
  try {
    const res = await requestRegisterCompany(payload);
    if (res.status !== 201) {
      throw new Error();
    }
    dispatch({
      type: SHOW_NOTIFICATION,
      payload: {
        message:
          "Votre compte a bien été enregistré. Veuillez valider votre inscription depuis l'email reçu ( " +
          values.email +
          " ).",
        type: "success",
        time: 20000,
      },
    });
    return res.data;
  } catch (e) {
    dispatch({
      type: SHOW_NOTIFICATION,
      payload: {
        message: "Impossible d'enregistrer ce compte déjà existant.",
        type: "error",
      },
    });
    return false;
  }
};
