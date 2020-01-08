import React, { Component, Fragment } from "react";
import { Row, Card, CardBody, FormGroup, Label, Button } from "reactstrap";
import { Formik, Form, Field } from "formik";
import { connect } from "react-redux";
import  { Redirect} from 'react-router-dom'
import Select from "react-select";
import validator from "validator";

import { getUserDetail, updateUser, getEntityListNoFilter } from "../../../redux/actions";
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

class UserEdit extends Component {

    constructor(props) {
        
        super(props);
        this.state = {
            loading: false,
            redirect: false,
            selectedOptionLabelTop: ""
        };

        this.onCancelClicked = this.onCancelClicked.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {

        console.log("componentDidMount");

        this.props.getEntityListNoFilter({});

        this.props.getUserDetail({
            _id: this.props.match.params._id
        });
    }

    componentDidUpdate(prevProps){

        if (this.props !== prevProps){

            console.log("componentDidUpdate");

            if (this.props.userUpdate !== prevProps.userUpdate){
                if (this.props.userUpdate.data === null){
                    this.createNotification("success");
                    this.setState({redirect: true});
                } else {
                    this.createNotification("error");
                }
            } else {

                this.setState({selectedOptionLabelTop : this.props.userDetail.entity === undefined ? "" 
                    : { label: this.props.userDetail.entity.entityName, value: this.props.userDetail.entity._id}});
            }
        }
    }

    handleSubmit(values) {

        console.log(values);

        this.props.updateUser({
            _id: this.props.match.params._id,
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

    validateName(value) {

        let error;
        if (!value) {
            error = "Please enter your name";
        } else if (value.length < 2) {
            error = "Value must be longer than 2 characters";
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

    handleChangeLabelTop = selectedOptionLabelTop => {
        this.setState({ selectedOptionLabelTop });
    };


    onCancelClicked() {

        this.setState({ redirect: true });
    }

    /* Show notification after action */
    createNotification = (type, className) => {

        let cName = className || "";

        switch (type) {

          case "success":
            NotificationManager.success(
              "Updating action succeeded.",
              "Success",
              3000,
              null,
              null,
              cName
            );
            break;
          case "error":
            NotificationManager.error(
              "Updating action failed.",
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

        console.log("render_function");
        console.log(this.props);

        const { entityList } = this.props;
        const { userDetail } = this.props;
        const { redirect } = this.state;

        selectData = [];
        for (let i = 0; i < entityList.totalCount; i ++){
            let val = {label:entityList.items[i].entityName, value: entityList.items[i]._id};

            selectData.push(val);
        }

        console.log(selectData);

        if (redirect) {
            return <Redirect to='/app/entity/user-list' />
        }
        return (
            <Fragment>
                <Row>
                    <Colxx xxs="12">
                        <Breadcrumb heading="menu.user-edit" match={this.props.match} />
                        <Separator className="mb-5" />
                    </Colxx>
                </Row>
                <Row>
                    <Colxx xs="12" className="mb-3">
                        <h5 className="mb-4">
                        <p><IntlMessages id="menu.user-edit" /></p>
                        </h5>

                        <Row className="mb-4">
                            <Colxx xxs="12">
                              <Card>
                                <CardBody>
                                {
                                    (Object.keys(userDetail).length === 0) ? (
                                        <div> Loading... </div>
                                    ) : (
                                          <Formik
                                            initialValues={{
                                              name: userDetail.userName,
                                              email: userDetail.userEmail,
                                              phone: userDetail.userPhoneNumber === undefined ? "" : userDetail.userPhoneNumber,
                                              password: userDetail.userPassword === undefined ? "" : userDetail.userPassword
                                            }}
                                            enableReinitialize prop
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
                                      )
                                }
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
        userDetail: state.entityUser.userDetail,
        userUpdate: state.entityUser.userUpdate,
        entityList: state.entityUser.entityListNoFilter.data === undefined ? { items: [], totalCount: 0 } : state.entityUser.entityListNoFilter.data
    });
};

export default connect(
    mapStateToProps,
    {
        getUserDetail,
        updateUser,
        getEntityListNoFilter
    }
)(UserEdit);
