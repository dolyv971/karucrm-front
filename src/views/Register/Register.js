import React from "react";
import { Field, reduxForm } from "redux-form";
import {
  FormGroup,
  Button,
  Card,
  CardBody,
  CardFooter,
  Col,
  Container,
  Form,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row,
} from "reactstrap";
import { useDispatch } from "react-redux";
import {fetchBySiret} from "../../redux/actions/company";

const Register = () => {
  const dispatch = useDispatch();
  const [siretValid, setSiretValid] = React.useState(false);
  const handleSubmit = React.useCallback(
    async (e) => {
      e.preventDefault();
      const bool = await dispatch(fetchBySiret());
      setSiretValid(bool);
    },
    [setSiretValid]
  );
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
                          name="companyName"
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
                          name="addressComplement"
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
                            <Field type="text" component={Input} name="email" />
                          </Col>
                        </Row>
                      </FormGroup>
                    </>
                  )}
                  <Button type="submit" color="success" block>
                    Chercher
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
})(Register);
