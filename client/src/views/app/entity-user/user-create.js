import React, { Component, Fragment } from "react";
import { Row, Card, CardBody, FormGroup, Label, Button } from "reactstrap";
import { Formik, Form, Field } from "formik";
import { connect } from "react-redux";
import  { Redirect} from 'react-router-dom'
import Select from "react-select";
import validator from "validator";

import { createUser, getEntityListNoFilter } from "../../../redux/actions";
import IntlMessages from "../../../helpers/IntlMessages";
import { Colxx, Separator } from "../../../components/common/CustomBootstrap";
import CustomSelectInput from "../../../components/common/CustomSelectInput";
import Breadcrumb from "../../../containers/navs/Breadcrumb";
import { NotificationManager } from "../../../components/common/react-notifications";

const btnStyle = {
  margin: '10px'
};

var selectData = [
];

class UserCreate extends Component {

    constructor(props) {
        
        super(props);
        
        this.state = {
            loading: false,
            redirect: false,
            selectedOptionLabelOver: "",
            selectedOptionLabelTop: ""
        };

        this.onCancelClicked = this.onCancelClicked.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {

        this.props.getEntityListNoFilter({});
    }

    componentDidUpdate(prevProps){

        console.log("componentDidUpdate");

        if (this.props.userCreate !== prevProps.userCreate){
            if (this.props.userCreate.data === null){
                this.createNotification("success");
                this.setState({redirect: true});
            } else {
                this.createNotification("error");
            }
        }
    }

    handleSubmit(values) {

        console.log(values);
        console.log(this.state.selectedOptionLabelTop.value);

        this.props.createUser({
            userName: values.name,
            userEmail: values.email,
            entity: this.state.selectedOptionLabelTop.value,
            userPassword: values.password,
            userPhoneNumber: values.phone
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

    validatePhoneNumber(value) {

        let error;
        if (!value) {
            error = "Please enter your phone number";
        } else if (!validator.isMobilePhone(value)) {
            error = "Invalid phone number";
        }
        return error;
    }

    validatePassword(value) {

        let error;
        if (!value) {
            error = "Please enter your password";
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

    handleChangeLabelOver = selectedOptionLabelOver => {
        this.setState({ selectedOptionLabelOver });
    }

    handleChangeLabelTop = selectedOptionLabelTop => {
        this.setState({ selectedOptionLabelTop });
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

        const { entityList } = this.props;
        const { redirect } = this.state;

        console.log(entityList.items);
        selectData = [];
        for (let i = 0; i < entityList.totalCount; i ++){
            let val = {label:entityList.items[i].entityName, value: entityList.items[i]._id};

            selectData.push(val);
        }

        if (redirect) {
            return <Redirect to='/app/entity/user-list' />
        }

        return (
            <Fragment>
                <Row>
                    <Colxx xxs="12">
                        <Breadcrumb heading="menu.user-create" match={this.props.match} />
                        <Separator className="mb-5" />
                    </Colxx>
                </Row>
                <Row>
                    <Colxx xs="12" className="mb-3">
                        <h5 className="mb-4">
                        <p><IntlMessages id="menu.user-create" /></p>
                        </h5>

                        <Row className="mb-4">
                            <Colxx xxs="12">
                              <Card>
                                <CardBody>
                                  <Formik
                                    initialValues={{
                                      name: "",
                                      email: "",
                                      password: "",
                                      phone: ""
                                    }}
                                    onSubmit={this.handleSubmit}>
                                    {({ errors, touched }) => (
                                      <Form className="av-tooltip tooltip-label-right">
                                        <FormGroup>
                                            <Label>
                                              <IntlMessages id="forms.name" />
                                            </Label>
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
                                            <Label>
                                              <IntlMessages id="forms.email" />
                                            </Label>
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
                                            <Label>
                                              <IntlMessages id="forms.password" />
                                            </Label>
                                            <Field
                                              className="form-control"
                                              name="password"
                                              type="password"
                                              validate={this.validatePassword}
                                              autoComplete="new-password"
                                            />
                                            {errors.password && touched.password ? (
                                              <div className="invalid-feedback d-block">
                                                {errors.password}
                                              </div>
                                            ) : null}
                                          </FormGroup>
                                          <FormGroup>
                                            <Label>
                                              <IntlMessages id="forms.phone-number" />
                                            </Label>
                                          <Field
                                            className="form-control"
                                            name="phone"
                                            validate={this.validatePhoneNumber}
                                          />
                                          {errors.phone && touched.phone && (
                                            <div className="invalid-feedback d-block">
                                              {errors.phone}
                                            </div>
                                          )}
                                        </FormGroup>
                                        <FormGroup>
                                            <Label>Entity</Label>
                                            <Select
                                              components={{ Input: CustomSelectInput }}
                                              className="react-select"
                                              classNamePrefix="react-select"
                                              name="entity"
                                              value={this.state.selectedOptionLabelTop}
                                              onChange={this.handleChangeLabelTop}
                                              options={selectData}
                                              placeholder=""
                                            />
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
        userCreate: state.entityUser.userCreate,
        entityList: state.entityUser.entityListNoFilter.data === undefined ? { items: [], totalCount: 0 } : state.entityUser.entityListNoFilter.data
    });
};

export default connect(
    mapStateToProps,
    {
        createUser,
        getEntityListNoFilter
    }
)(UserCreate);
