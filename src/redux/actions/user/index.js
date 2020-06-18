import {
  requestUpdateUserPassword,
  requestUserValidate,
} from "../../../utils/endpoints";
import {SHOW_NOTIFICATION} from "../../actionTypes/globalActionTypes";

export const validateUser = (userId, confirmationToken) => async (dispatch) => {
  try {
    const res = await requestUserValidate(userId, { confirmationToken });
    if (res.status !== 204) {
      throw new Error();
    }
    return true;
  } catch (e) {
    return false;
  }
};

export const updateUserPassword = (
  userId,
  resetPasswordToken,
  password
) => async (dispatch) => {
  try {
    const res = await requestUpdateUserPassword(userId, {
      resetPasswordToken,
      password,
    });
    if (res.status !== 204) {
      throw new Error();
    }
    dispatch({
      type: SHOW_NOTIFICATION,
      payload: {
        message: "Votre mot de passe a bien été pris en compte.",
        type: "success",
      },
    });
    return true;
  } catch (e) {
    dispatch({
      type: SHOW_NOTIFICATION,
      payload: {
        message: "Votre mot de passe n'a pas pu être innitialisé.",
        type: "error",
      },
    });
    return false;
  }
};
