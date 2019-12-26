import React, { Component } from "react";
import { Card, CardBody, Form, FormGroup, Input, Label } from "reactstrap";
import IntlMessages from "../../helpers/IntlMessages";
import { Wizard, Steps, Step } from 'react-albus';
import { injectIntl } from 'react-intl';
import { BottomNavigation } from "../../components/wizard/BottomNavigation";
import { TopNavigation } from "../../components/wizard/TopNavigation";

class CreateSiteWizard extends Component {
    constructor(props) {
        super(props);
        this.onClickNext = this.onClickNext.bind(this);
        this.onClickPrev = this.onClickPrev.bind(this);
        this.topNavClick = this.topNavClick.bind(this);
        this.state = {
            bottomNavHidden: false,
            topNavDisabled: false,

            name: "",
            email: "",
            password: "",
        }
    }

    topNavClick(stepItem, push) {
        if (this.state.topNavDisabled) {
            return;
        }
        push(stepItem.id);
    }

    onClickNext(goToNext, steps, step) {
        step.isDone = true;
        if (steps.length - 2 <= steps.indexOf(step)) {
            this.setState({ bottomNavHidden: true, topNavDisabled: true });
        }
        if (steps.length - 1 <= steps.indexOf(step)) {
            return;
        }
        goToNext();
    }

    onClickPrev(goToPrev, steps, step) {
        if (steps.indexOf(step) <= 0) {
            return;
        }
        goToPrev();
    }

    onChange = e => this.setState({ [e.target.name]: e.target.value });

    render() {

        const { messages } = this.props.intl;

        return (
            <Card>
                <CardBody className="wizard wizard-default">
                    <Wizard>
                        <TopNavigation className="justify-content-center" disableNav={false} topNavClick={this.topNavClick} />
                        <Steps>
                            <Step id="step1" name={messages["wizard.create-site.step-name-1"]} >
                                <div className="wizard-basic-step">
                                    <h5>{messages["wizard.create-site.step-desc-1"]}</h5>
                                    <Form>
                                        <FormGroup>
                                            <Label>
                                                <IntlMessages id="forms.name" />
                                            </Label>
                                            <Input type="text" name="name" placeholder={messages["forms.name"]} value={this.state.name} onChange={this.onChange} />
                                        </FormGroup>
                                    </Form>
                                </div>
                            </Step>
                            <Step id="step2" name={messages["wizard.create-site.step-name-2"]} >
                                <div className="wizard-basic-step">
                                    <h5>{messages["wizard.create-site.step-desc-2"]}</h5>
                                    <Form>
                                        <FormGroup>
                                            <Label>
                                                <IntlMessages id="forms.email" />
                                            </Label>
                                            <Input type="email" name="email" placeholder={messages["forms.email"]} value={this.state.email} onChange={(e) => { this.setState({ email: e.target.value }) }} />
                                        </FormGroup>
                                    </Form>
                                </div>

                            </Step>
                            <Step id="step3" name={messages["wizard.create-site.step-name-3"]} >

                                <div className="wizard-basic-step">
                                    <h5>{messages["wizard.create-site.step-desc-3"]}</h5>
                                    <Form>
                                        <FormGroup>
                                            <Label>
                                                <IntlMessages id="forms.password" />
                                            </Label>
                                            <Input type="password" name="password" placeholder={messages["forms.password"]} value={this.state.password} onChange={(e) => { this.setState({ password: e.target.value }) }} />
                                        </FormGroup>
                                    </Form>
                                </div>

                            </Step>

                            <Step id="step4" name={messages["wizard.create-site.step-name-4"]} >
                                <div className="wizard-basic-step">
                                    <h5>{messages["wizard.create-site.step-desc-4"]}</h5>
                                </div>
                            </Step>

                            <Step id="step5" name={messages["wizard.create-site.step-name-5"]} >
                                <div className="wizard-basic-step">
                                    <h5>{messages["wizard.create-site.step-desc-5"]}</h5>
                                </div>
                            </Step>

                            <Step id="step6" name={messages["wizard.create-site.step-name-6"]} >
                                <div className="wizard-basic-step">
                                    <h5>{messages["wizard.create-site.step-desc-6"]}</h5>
                                </div>
                            </Step>

                            <Step id="step7" name={messages["wizard.create-site.step-name-7"]} >
                                <div className="wizard-basic-step">
                                    <h5>{messages["wizard.create-site.step-desc-7"]}</h5>
                                </div>
                            </Step>

                            <Step id="step8" name={messages["wizard.create-site.step-name-8"]} >
                                <div className="wizard-basic-step">
                                    <h5>{messages["wizard.create-site.step-desc-8"]}</h5>
                                </div>
                            </Step>

                            <Step id="step9" name={messages["wizard.create-site.step-name-9"]} >
                                <div className="wizard-basic-step">
                                    <h5>{messages["wizard.create-site.step-desc-9"]}</h5>
                                </div>
                            </Step>

                            <Step id="step10" hideTopNav={true}>
                                <div className="wizard-basic-step text-center">
                                    <h2 className="mb-2"><IntlMessages id="wizard.content-thanks" /></h2>
                                    <p><IntlMessages id="wizard.registered" /></p>
                                </div>
                            </Step>
                        </Steps>
                        <BottomNavigation onClickNext={this.onClickNext} onClickPrev={this.onClickPrev} className={"justify-content-center " + (this.state.bottomNavHidden && "invisible")} prevLabel={messages["wizard.prev"]} nextLabel={messages["wizard.next"]} />
                    </Wizard>
                </CardBody>
            </Card>

        );
    }
}
export default injectIntl(CreateSiteWizard)
