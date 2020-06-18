import React from "react";
import {
  Button,
  Card,
  CardBody,
  CardGroup,
  Col,
  Container,
  Form,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  NavbarBrand,
  Row,
} from "reactstrap";
import { Field, reduxForm } from "redux-form";
import Input from "../../../components/Input/FiledInput";
import { formSelector } from "../../../redux/selectors/selectors";
import { Link, Redirect, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateUserPassword } from "../../../redux/actions/user";

const InitPassword = ({ invalid, pristine }) => {
  const { userId, resetPasswordToken } = useParams();
  const dispatch = useDispatch();
  const form = useSelector(formSelector);

  let values;
  if (form?.password?.init?.values !== undefined) {
    values = form?.password?.init?.values;
  }

  const [stepValidity, setStepValidity] = React.useState(false);
  const [redirect, setRedirect] = React.useState(false);

  React.useEffect(() => {
    const same = values?.password === values?.confirmPassword;
    setStepValidity(!invalid && !pristine && values);
    // eslint-disable-next-line
  }, [invalid, pristine, values]);

  const [passwordType, setPasswordType] = React.useState({
    password: "password",
    confirmPassword: "password",
  });

  const handleClickInputGroupText = React.useCallback(
    (e) => {
      e.preventDefault();
      const type = e.currentTarget.getAttribute("data-type");
      console.log(type);
      setPasswordType({
        ...passwordType,
        [type]: passwordType[type] === "password" ? "text" : "password",
      });
    },
    [passwordType, setPasswordType]
  );

  const handleSubmit = React.useCallback(
    async (e) => {
      e.preventDefault();

      const bool = await dispatch(
        updateUserPassword(userId, resetPasswordToken, values?.password)
      );
      if (bool) {
        setRedirect(true);
      }
    },
    [dispatch, values, userId, resetPasswordToken, setRedirect]
  );

  if (redirect) {
    return <Redirect to="/" />;
  }

  return (
    <div className="app flex-row align-items-center">
      <Container>
        <Row className="justify-content-center">
          <Col md="8">
            <CardGroup>
              <Card className="p-4">
                <CardBody>
                  <h1>Changement de votre mot de passe</h1>
                  <p className="text-muted"></p>
                  <form onSubmit={handleSubmit}>
                    <Field
                      type={passwordType.password}
                      id="password"
                      name="password"
                      placeholder="Mot de passe"
                      component={Input}
                      inputGroupText={
                        <InputGroupText
                          data-type="password"
                          onClick={handleClickInputGroupText}
                        >
                          <i className="fa fa-eye" />
                        </InputGroupText>
                      }
                      label=""
                    />
                    <Field
                      type={passwordType.confirmPassword}
                      id="confirmPassword"
                      name="confirmPassword"
                      placeholder="Confirmation du mot de passe"
                      component={Input}
                      inputGroupText={
                        <InputGroupText
                          data-type="confirmPassword"
                          onClick={handleClickInputGroupText}
                        >
                          <i className="fa fa-eye" />
                        </InputGroupText>
                      }
                      label=""
                    />
                    <Button
                      type="submit"
                      disabled={!stepValidity}
                      color="primary"
                    >
                      Enregistrer
                    </Button>
                  </form>
                </CardBody>
              </Card>
            </CardGroup>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default reduxForm({
  form: "password.init",
  getFormState: formSelector,
  destroyOnUnmount: false,
})(InitPassword);
