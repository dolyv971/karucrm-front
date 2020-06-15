import React from "react";
import { Field, reduxForm } from "redux-form";
import Input from "../../components/Input/FiledInput";
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
import { fetchBySiret, registerCompany } from "../../redux/actions/company";
import { formSelector } from "../../redux/selectors/selectors";

const validate = (values) => {
  console.log(values);
  const errors = {};
  if (!values.firstname) {
    errors.firstname = "Veuillez renseigner votre nom";
  }
  if (!values.lastname) {
    errors.lastname = "Veuillez renseigner votre prénom";
  }
  if (
    !values.email ||
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
  ) {
    errors.email = "Veuillez renseigner une adresse email valide";
  }
  return errors;
};
const Register = ({ initialize, pristine, submitting, invalid }) => {
  const dispatch = useDispatch();
  const [siretValid, setSiretValid] = React.useState(false);
  const form = useSelector(formSelector);

  let values;
  if (form?.register?.values !== undefined) {
    values = form.register.values;
  }

  const handleSubmit = React.useCallback(
    async (e) => {
      e.preventDefault();
      if (siretValid) {
        const data = await dispatch(registerCompany(values));
        console.log(data);
      } else {
        const data = await dispatch(fetchBySiret(values.siret));
        if (data !== false) {
          setSiretValid(true);
          initialize({ ...data });
        }
      }
    },
    [setSiretValid, values, siretValid]
  );

  const handleSiretChange = React.useCallback(() => {
    initialize({});
    setSiretValid(false);
  }, []);

  const disabled = React.useCallback(() => {
    if (!siretValid) {
      return false;
    } else if (siretValid && invalid) {
      return true;
    } else {
      return false;
    }
  },[]);

  return (
    <div className="app flex-row align-items-center">
      <Container>
        <Row className="justify-content-center">
          <Col md="9" lg="7" xl="6">
            <Card className="mx-4">
              <CardBody className="p-4">
                <form onSubmit={handleSubmit}>
                  <FormGroup>
                    <h1 className="text-center">Inscription</h1>
                    <p className="text-muted">
                      Créer votre compte en renseignant votre numéro de SIRET.
                    </p>
                  </FormGroup>
                  <FormGroup>
                    <h3>Votre société</h3>
                  </FormGroup>
                  <FormGroup>
                    <Field
                      type="text"
                      component={Input}
                      placeholder="Siret"
                      name="siret"
                      onChange={handleSiretChange}
                    />
                  </FormGroup>
                  {siretValid && (
                    <>
                      <FormGroup>
                        <label>Raison sociale :</label>
                        <Field
                          type="text"
                          component={Input}
                          readOnly
                          name="name"
                        />
                      </FormGroup>
                      <FormGroup>
                        <label>Adresse :</label>
                        <Field
                          type="text"
                          readOnly
                          component={Input}
                          name="address"
                        />
                      </FormGroup>
                      <FormGroup>
                        <Field
                          type="text"
                          readOnly
                          component={Input}
                          name="additionalAddress"
                        />
                      </FormGroup>
                      <FormGroup>
                        <Row>
                          <Col md={6}>
                            <label>Code postal :</label>
                            <Field
                              type="text"
                              readOnly
                              component={Input}
                              name="zipCode"
                            />
                          </Col>
                          <Col md={6}>
                            <label>Ville :</label>
                            <Field
                              type="text"
                              readOnly
                              component={Input}
                              name="city"
                            />
                          </Col>
                        </Row>
                      </FormGroup>
                      <FormGroup>
                        <h3>Votre compte Admin</h3>
                      </FormGroup>
                      <FormGroup>
                        <Row>
                          <Col md={6}>
                            <label>Nom :</label>
                            <Field
                              type="text"
                              component={Input}
                              name="firstname"
                            />
                          </Col>
                          <Col md={6}>
                            <label>Prénom :</label>
                            <Field
                              type="text"
                              component={Input}
                              name="lastname"
                            />
                          </Col>
                        </Row>
                      </FormGroup>
                      <FormGroup>
                        <Row>
                          <Col md={12}>
                            <label>Email :</label>
                            <Field
                              type="email"
                              component={Input}
                              name="email"
                            />
                          </Col>
                        </Row>
                      </FormGroup>
                    </>
                  )}
                  <Button
                    type="submit"
                    color="success"
                    block
                    disabled={disabled()}
                  >
                    {siretValid ? "Enregister" : "Chercher"}
                  </Button>
                </form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default reduxForm({
  // a unique name for the form
  form: "register",
  getFormState: formSelector,
  destroyOnUnmount: false,
  validate,
})(Register);
