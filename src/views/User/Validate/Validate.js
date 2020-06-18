import React from "react";
import { Field, reduxForm } from "redux-form";
import { NotificationManager } from "react-notifications";
import { Redirect, useParams } from "react-router-dom";
import {
  FormGroup,
  Button,
  Card,
  CardBody,
  Col,
  Container,
  Row,
} from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { validateUser } from "../../../redux/actions/user";

const UserValidate = () => {
  const [type, setType] = React.useState(null);
  const [message, setMessage] = React.useState(null);

  const { userId, confirmationToken } = useParams();
  const dispatch = useDispatch();

  const validate = React.useCallback(async () => {
    if (userId !== null && confirmationToken !== null) {
      const bool = await dispatch(validateUser(userId, confirmationToken));
      if (bool) {
        setType("success");
        setMessage(
          "Votre compte a bien été validé. Vous allez recevoir un email d'innititialisation de votre mot de passe."
        );
      } else {
        setType("danger");
        setMessage("Impossible de valider ce compte.");
      }
    } else {
      setType("error");
      setMessage("Impossible de valider ce compte.");
    }
  }, [dispatch, userId, confirmationToken, setMessage, setType]);

  React.useEffect(() => {
    validate();
  }, []);

  return (
    <div className="app flex-row align-items-center">
      <Container>
        <Row className="justify-content-center">
          <Col md="12">
            {type !== null && (
              <div className={`text-center alert alert-${type}`}>{message}</div>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default UserValidate;
