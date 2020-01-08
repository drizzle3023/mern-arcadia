import React, { Component, Fragment } from "react";
import { Row, Card, CardBody, FormGroup, Label, Button } from "reactstrap";
import { Formik, Form, Field } from "formik";
import { connect } from "react-redux";
import  { Redirect} from 'react-router-dom'

import { createEntity } from "../../../redux/actions";
import IntlMessages from "../../../helpers/IntlMessages";
import { Colxx, Separator } from "../../../components/common/CustomBootstrap";
import Breadcrumb from "../../../containers/navs/Breadcrumb";
import { NotificationManager } from "../../../components/common/react-notifications";

const btnStyle = {
  margin: '10px'
};

class EntityCreate extends Component {

    constructor(props) {
        
        super(props);
        this.state = {
            loading: false,
            redirect: false
        };

        this.onCancelClicked = this.onCancelClicked.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {

    }

    componentDidUpdate(prevProps){

        console.log("componentDidUpdate");

        if (this.props.entityCreate !== prevProps.entityCreate){
            if (this.props.entityCreate.data === null){
                this.createNotification("success");
                this.setState({redirect: true});
            } else {
                this.createNotification("error");
            }
        }
    }

    handleSubmit(values) {

        console.log(values);

        this.props.createEntity({
            entityName: values.name,
            entityEmail: values.email,
            entityAddress: values.address
        });
    }

    validateEmail(value) {

        let error;
        if (!value) {
            error = "Please enter your email address";
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
            error = "Invalid email address";
        }
        return error;
    }

    validateName(value) {

        let error;
        if (!value) {
            error = "Please enter your name";
        } else if (value.length < 2) {
            error = "Value must be longer than 2 characters";
        }
        return error;
    }

    validateAddress(value) {

        let error;
        if (!value) {
            error = "Please enter address";
        } else if (value.length < 5) {
            error = "Value must be longer than 5 characters";
        }
        return error;
    }

    onCancelClicked() {

        this.setState({ redirect: true });
    }

    /* Show notification after action */
    createNotification = (type, className) => {

        let cName = className || "";

        switch (type) {

          case "success":
            NotificationManager.success(
              "Adding action succeeded.",
              "Success",
              3000,
              null,
              null,
              cName
            );
            break;
          case "error":
            NotificationManager.error(
              "Adding action failed.",
              "Error",
              5000,
              null,
              null,
              cName
            );
            break;
          default:
            NotificationManager.info("Info message");
            break;
          }
    }

    render() {

        const { redirect } = this.state;

        if (redirect) {
            return <Redirect to='/app/entity/entity-list' />
        }

        return (
            <Fragment>
                <Row>
                    <Colxx xxs="12">
                        <Breadcrumb heading="menu.entity-create" match={this.props.match} />
                        <Separator className="mb-5" />
                    </Colxx>
                </Row>
                <Row>
                    <Colxx xs="12" className="mb-3">
                        <h5 className="mb-4">
                        <p><IntlMessages id="menu.entity-create" /></p>
                        </h5>

                        <Row className="mb-4">
                            <Colxx xxs="12">
                              <Card>
                                <CardBody>
                                  <Formik
                                    initialValues={{
                                      name: "",
                                      email: "",
                                      address: ""
                                    }}
                                    onSubmit={this.handleSubmit}>
                                    {({ errors, touched }) => (
                                      <Form className="av-tooltip tooltip-label-right">
                                        <FormGroup>
                                          <Label>Name</Label>
                                          <Field
                                            className="form-control"
                                            name="name"
                                            validate={this.validateName}
                                          />
                                          {errors.name && touched.name && (
                                            <div className="invalid-feedback d-block">
                                              {errors.name}
                                            </div>
                                          )}
                                        </FormGroup>
                                        <FormGroup>
                                          <Label>Email</Label>
                                          <Field
                                            className="form-control"
                                            name="email"
                                            validate={this.validateEmail}
                                          />
                                          {errors.email && touched.email && (
                                            <div className="invalid-feedback d-block">
                                              {errors.email}
                                            </div>
                                          )}
                                        </FormGroup>
                                        <FormGroup>
                                          <Label>Address</Label>
                                          <Field
                                            className="form-control"
                                            name="address"
                                            validate={this.validateAddress}
                                          />
                                          {errors.address && touched.address && (
                                            <div className="invalid-feedback d-block">
                                              {errors.address}
                                            </div>
                                          )}
                                        </FormGroup>
                                        <Row>
                                        <Colxx xxs="12" align = "center">

                                            <Button color="primary" type="submit" style = {btnStyle}>
                                              Submit
                                            </Button>

                                            <Button color="light" onClick = {this.onCancelClicked}>
                                              Cancel
                                            </Button>
                                        </Colxx>
                                        </Row>
                                      </Form>
                                    )}
                                  </Formik>
                                </CardBody>
                              </Card>
                            </Colxx>
                        </Row>

                    </Colxx>
                </Row>
                
            </Fragment >
        )
    }
}


const mapStateToProps = state => {
    console.log(state);
    return ({
        entityCreate: state.entityUser.entityCreate
    });
};

export default connect(
    mapStateToProps,
    {
        createEntity
    }
)(EntityCreate);
