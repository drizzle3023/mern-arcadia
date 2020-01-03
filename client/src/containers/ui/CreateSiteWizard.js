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
        const { siteID, latitude, longitude, e911Address, buildingOwner, keyComboInfo } = this.state;

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
                                                <IntlMessages id="forms.Date" />
                                            </Label>
                                            <Label>

                                            </Label>
                                        </FormGroup>
                                        <FormGroup>
                                            <Label>
                                                <IntlMessages id="forms.Site ID" />
                                            </Label>
                                            <Input type="text" name="name" placeholder={messages["forms.Site ID"]} value={siteID} onChange={this.onChange} />
                                        </FormGroup>
                                        <FormGroup>
                                            <Label>
                                                <IntlMessages id="forms.Site Location" />
                                            </Label>
                                            <Input type="text" name="name" placeholder={messages["forms.Site Location"]} value={siteID} onChange={this.onChange} />
                                        </FormGroup>
                                        <FormGroup>
                                            <Label>
                                                <IntlMessages id="forms.E911 Address" />
                                            </Label>
                                            <Input type="text" name="name" placeholder={messages["forms.E911 Address"]} value={siteID} onChange={this.onChange} />
                                        </FormGroup>
                                        <FormGroup>
                                            <Label>
                                                <IntlMessages id="forms.Building Owner" />
                                            </Label>
                                            <Input type="text" name="name" placeholder={messages["forms.Building Owner"]} value={siteID} onChange={this.onChange} />
                                        </FormGroup>
                                        <FormGroup>
                                            <Label>
                                                <IntlMessages id="forms.Key / Combo Info" />
                                            </Label>
                                            <Input type="text" name="name" placeholder={messages["forms.Key / Combo Info"]} value={siteID} onChange={this.onChange} />
                                        </FormGroup>
                                        <FormGroup>
                                            <Label>
                                                <IntlMessages id="forms.Name of Auditor" />
                                            </Label>
                                            <Input type="text" name="name" placeholder={messages["forms.Name of Auditor"]} value={siteID} onChange={this.onChange} />
                                        </FormGroup>
                                        <FormGroup>
                                            <Label>
                                                <IntlMessages id="forms.Time Arrived" />
                                            </Label>
                                            <Input type="time" name="name" placeholder={messages["forms.Time Arrived"]} value={siteID} onChange={this.onChange} />
                                        </FormGroup>
                                        <FormGroup>
                                            <Label>
                                                <IntlMessages id="forms.Time Check In" />
                                            </Label>
                                            <Input type="time" name="name" placeholder={messages["forms.Time Check In"]} value={siteID} onChange={this.onChange} />
                                        </FormGroup>
                                        <FormGroup>
                                            <Label>
                                                <IntlMessages id="forms.Time Complete" />
                                            </Label>
                                            <Input type="time" name="name" placeholder={messages["forms.Time Complete"]} value={siteID} onChange={this.onChange} />
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
                                                <IntlMessages id="forms.Building Jurisdiction" />
                                            </Label>
                                            <Input type="email" name="email" placeholder={messages["forms.Building Jurisdiction"]} value={this.state.email} onChange={(e) => { this.setState({ email: e.target.value }) }} />
                                        </FormGroup>
                                        <FormGroup>
                                            <Label>
                                                <IntlMessages id="forms.Permitted Antenna Attachment" />
                                            </Label>
                                            <Input type="text" name="name" placeholder={messages["forms.Permitted Antenna Attachment"]} value={siteID} onChange={this.onChange} />
                                        </FormGroup>
                                        <FormGroup>
                                            <Label>
                                                <IntlMessages id="forms.Maximum Height Above Building Envelope" />
                                            </Label>
                                            <Input type="text" name="name" placeholder={messages["forms.Maximum Height Above Building Envelope"]} value={siteID} onChange={this.onChange} />
                                        </FormGroup>
                                        <FormGroup>
                                            <Label>
                                                <IntlMessages id="forms.Setback Requirement From Building Edge" />
                                            </Label>
                                            <Input type="text" name="name" placeholder={messages["forms.Setback Requirement From Building Edge"]} value={siteID} onChange={this.onChange} />
                                        </FormGroup>
                                        <FormGroup>
                                            <Label>
                                                <IntlMessages id="forms.Existing Penthouse Dimensions" />
                                            </Label>
                                            <Input type="text" name="name" placeholder={messages["forms.Existing Penthouse Dimensions"]} value={siteID} onChange={this.onChange} />
                                        </FormGroup>
                                        <FormGroup>
                                            <Label>
                                                <IntlMessages id="forms.Permitted Equipment Locations" />
                                            </Label>
                                            <Input type="text" name="name" placeholder={messages["forms.Permitted Equipment Locations"]} value={siteID} onChange={this.onChange} />
                                        </FormGroup>
                                        <FormGroup>
                                            <Label>
                                                <IntlMessages id="forms.Dimensions of Proposed Equipment Location" />
                                            </Label>
                                            <Input type="text" name="name" placeholder={messages["forms.Dimensions of Proposed Equipment Location"]} value={siteID} onChange={this.onChange} />
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
                                                <IntlMessages id="forms.Building Use Identified" />
                                            </Label>
                                            <Input type="text" name="name" placeholder={messages["forms.Building Use Identified"]} value={siteID} onChange={this.onChange} />
                                        </FormGroup>
                                        <FormGroup>
                                            <Label>
                                                <IntlMessages id="forms.GPS Coordinates of building provided" />
                                            </Label>
                                            <Input type="text" name="name" placeholder={messages["forms.GPS Coordinates of building provided"]} value={siteID} onChange={this.onChange} />
                                        </FormGroup>
                                        <FormGroup>
                                            <Label>
                                                <IntlMessages id="forms.General site orientation/directionality photos provided" />
                                            </Label>
                                            <Input type="text" name="name" placeholder={messages["forms.General site orientation/directionality photos provided"]} value={siteID} onChange={this.onChange} />
                                        </FormGroup>
                                        <FormGroup>
                                            <Label>
                                                <IntlMessages id="forms.Age of building indicates potential hazardous materials present" />
                                            </Label>
                                            <Input type="text" name="name" placeholder={messages["forms.Age of building indicates potential hazardous materials present"]} value={siteID} onChange={this.onChange} />
                                        </FormGroup>
                                        <FormGroup>
                                            <Label>
                                                <IntlMessages id="forms.All required permites obtained?" />
                                            </Label>
                                            <Input type="text" name="name" placeholder={messages["forms.All required permites obtained?"]} value={siteID} onChange={this.onChange} />
                                        </FormGroup>
                                        <FormGroup>
                                            <Label>
                                                <IntlMessages id="forms.Construction Vehicle Parking Available" />
                                            </Label>
                                            <Input type="text" name="name" placeholder={messages["forms.Construction Vehicle Parking Available"]} value={siteID} onChange={this.onChange} />
                                        </FormGroup>
                                        <FormGroup>
                                            <Label>
                                                <IntlMessages id="forms.Street Level Staging Area available" />
                                            </Label>
                                            <Input type="text" name="name" placeholder={messages["forms.Street Level Staging Area available"]} value={siteID} onChange={this.onChange} />
                                        </FormGroup>
                                        <FormGroup>
                                            <Label>
                                                <IntlMessages id="forms.Sufficient area for crane set up and lifting" />
                                            </Label>
                                            <Input type="text" name="name" placeholder={messages["forms.Sufficient area for crane set up and lifting"]} value={siteID} onChange={this.onChange} />
                                        </FormGroup>
                                        <FormGroup>
                                            <Label>
                                                <IntlMessages id="forms.Loading dock" />
                                            </Label>
                                            <Input type="text" name="name" placeholder={messages["forms.Loading dock"]} value={siteID} onChange={this.onChange} />
                                        </FormGroup>
                                        <FormGroup>
                                            <Label>
                                                <IntlMessages id="forms.Special Building Access Requirements" />
                                            </Label>
                                            <Input type="text" name="name" placeholder={messages["forms.Special Building Access Requirements"]} value={siteID} onChange={this.onChange} />
                                        </FormGroup>
                                        <FormGroup>
                                            <Label>
                                                <IntlMessages id="forms.Special Access hours" />
                                            </Label>
                                            <Input type="text" name="name" placeholder={messages["forms.Special Access hours"]} value={siteID} onChange={this.onChange} />
                                        </FormGroup>
                                        <FormGroup>
                                            <Label>
                                                <IntlMessages id="forms.Special traffic flows i.e. one way ETC." />
                                            </Label>
                                            <Input type="text" name="name" placeholder={messages["forms.Special traffic flows i.e. one way ETC."]} value={siteID} onChange={this.onChange} />
                                        </FormGroup>
                                        <FormGroup>
                                            <Label>
                                                <IntlMessages id="forms.Typical traffic flow" />
                                            </Label>
                                            <Input type="text" name="name" placeholder={messages["forms.Typical traffic flow"]} value={siteID} onChange={this.onChange} />
                                        </FormGroup>
                                        <FormGroup>
                                            <Label>
                                                <IntlMessages id="forms.Roof Access via:" />
                                            </Label>
                                            <Input type="text" name="name" placeholder={messages["forms.Roof Access via:"]} value={siteID} onChange={this.onChange} />
                                        </FormGroup>
                                        <FormGroup>
                                            <Label>
                                                <IntlMessages id="forms.Easy Transition to Roof from access means" />
                                            </Label>
                                            <Input type="text" name="name" placeholder={messages["forms.Easy Transition to Roof from access means"]} value={siteID} onChange={this.onChange} />
                                        </FormGroup>
                                    </Form>
                                </div>

                            </Step>
                            <Step id="step4" name={messages["wizard.create-site.step-name-4"]} >
                                <div className="wizard-basic-step">
                                    <h5>{messages["wizard.create-site.step-desc-4"]}</h5>
                                    <Form>
                                        <FormGroup>
                                            <Label>
                                                <IntlMessages id="forms.Overall first impression of roof" />
                                            </Label>
                                            <Input type="text" name="name" placeholder={messages["forms.Overall first impression of roof"]} value={siteID} onChange={this.onChange} />
                                        </FormGroup>
                                        <FormGroup>
                                            <Label>
                                                <IntlMessages id="forms.Type of roof" />
                                            </Label>
                                            <Input type="text" name="name" placeholder={messages["forms.Type of roof"]} value={siteID} onChange={this.onChange} />
                                        </FormGroup>
                                        <FormGroup>
                                            <Label>
                                                <IntlMessages id="forms.Obstructions on roof" />
                                            </Label>
                                            <Input type="text" name="name" placeholder={messages["forms.Obstructions on roof"]} value={siteID} onChange={this.onChange} />
                                        </FormGroup>
                                        <FormGroup>
                                            <Label>
                                                <IntlMessages id="forms.Special/restricted walk areas" />
                                            </Label>
                                            <Input type="text" name="name" placeholder={messages["forms.Special/restricted walk areas"]} value={siteID} onChange={this.onChange} />
                                        </FormGroup>
                                        <FormGroup>
                                            <Label>
                                                <IntlMessages id="forms.Location of electrical service panel (Per Bldg. Owner)" />
                                            </Label>
                                            <Input type="text" name="name" placeholder={messages["forms.Location of electrical service panel (Per Bldg. Owner)"]} value={siteID} onChange={this.onChange} />
                                        </FormGroup>
                                        <FormGroup>
                                            <Label>
                                                <IntlMessages id="forms.Existing, usable Chase way to roof" />
                                            </Label>
                                            <Input type="text" name="name" placeholder={messages["forms.Existing, usable Chase way to roof"]} value={siteID} onChange={this.onChange} />
                                        </FormGroup>
                                        <FormGroup>
                                            <Label>
                                                <IntlMessages id="forms.Parapet wall" />
                                            </Label>
                                            <Input type="text" name="name" placeholder={messages["forms.Parapet wall"]} value={siteID} onChange={this.onChange} />
                                        </FormGroup>
                                        <FormGroup>
                                            <Label>
                                                <IntlMessages id="forms.Overhead lines" />
                                            </Label>
                                            <Input type="text" name="name" placeholder={messages["forms.Overhead lines"]} value={siteID} onChange={this.onChange} />
                                        </FormGroup>
                                        <FormGroup>
                                            <Label>
                                                <IntlMessages id="forms.Edge of roof stealthed" />
                                            </Label>
                                            <Input type="text" name="name" placeholder={messages["forms.Edge of roof stealthed"]} value={siteID} onChange={this.onChange} />
                                        </FormGroup>
                                        <FormGroup>
                                            <Label>
                                                <IntlMessages id="forms.Special conditions for Sectors" />
                                            </Label>
                                            <Input type="text" name="name" placeholder={messages["forms.Special conditions for Sectors"]} value={siteID} onChange={this.onChange} />
                                        </FormGroup>
                                        <FormGroup>
                                            <Label>
                                                <IntlMessages id="forms.Match existing antennas" />
                                            </Label>
                                            <Input type="text" name="name" placeholder={messages["forms.Match existing antennas"]} value={siteID} onChange={this.onChange} />
                                        </FormGroup>
                                        <FormGroup>
                                            <Label>
                                                <IntlMessages id="forms.Additional structures on roof (i.e. Cupola, etc.)" />
                                            </Label>
                                            <Input type="text" name="name" placeholder={messages["forms.Additional structures on roof (i.e. Cupola, etc.)"]} value={siteID} onChange={this.onChange} />
                                        </FormGroup>
                                        <FormGroup>
                                            <Label>
                                                <IntlMessages id="forms.Rooftop Material storage available" />
                                            </Label>
                                            <Input type="text" name="name" placeholder={messages["forms.Rooftop Material storage available"]} value={siteID} onChange={this.onChange} />
                                        </FormGroup>
                                        <FormGroup>
                                            <Label>
                                                <IntlMessages id="forms.Occupied floor directly below" />
                                            </Label>
                                            <Input type="text" name="name" placeholder={messages["forms.Occupied floor directly below"]} value={siteID} onChange={this.onChange} />
                                        </FormGroup>
                                        <FormGroup>
                                            <Label>
                                                <IntlMessages id="forms.Opening to roof through" />
                                            </Label>
                                            <Input type="text" name="name" placeholder={messages["forms.Opening to roof through"]} value={siteID} onChange={this.onChange} />
                                        </FormGroup>
                                        <FormGroup>
                                            <Label>
                                                <IntlMessages id="forms.Tanant access to roof" />
                                            </Label>
                                            <Input type="text" name="name" placeholder={messages["forms.Tanant access to roof"]} value={siteID} onChange={this.onChange} />
                                        </FormGroup>
                                        <FormGroup>
                                            <Label>
                                                <IntlMessages id="forms.Any other observations that could potentially halt or slow the installation of the tower and/or antennas on this location" />
                                            </Label>
                                            <Input type="text" name="name" placeholder={messages["forms.Any other observations that could potentially halt or slow the installation of the tower and/or antennas on this location"]} value={siteID} onChange={this.onChange} />
                                        </FormGroup>
                                        <FormGroup>
                                            <Label>
                                                <IntlMessages id="forms.RF Energy present on roof" />
                                            </Label>
                                            <Input type="text" name="name" placeholder={messages["forms.RF Energy present on roof"]} value={siteID} onChange={this.onChange} />
                                        </FormGroup>
                                    </Form>
                                </div>
                            </Step>
                            <Step id="step5" name={messages["wizard.create-site.step-name-5"]} >
                                <div className="wizard-basic-step">
                                    <h5>{messages["wizard.create-site.step-desc-5"]}</h5>
                                    <Form>
                                        <FormGroup>
                                            <Label>
                                                <IntlMessages id='forms.Existing Unprotected Openings (>2") in anywhere on Roof' />
                                            </Label>
                                            <Input type="text" name="name" placeholder={messages['forms.Existing Unprotected Openings (>2") in anywhere on Roof']} value={siteID} onChange={this.onChange} />
                                        </FormGroup>
                                        <FormGroup>
                                            <Label>
                                                <IntlMessages id="forms.Existing Unprotected Wall Openings anywhere on Roof" />
                                            </Label>
                                            <Input type="text" name="name" placeholder={messages["forms.Existing Unprotected Wall Openings anywhere on Roof"]} value={siteID} onChange={this.onChange} />
                                        </FormGroup>
                                        <FormGroup>
                                            <Label>
                                                <IntlMessages id="forms.Existing Handrails" />
                                            </Label>
                                            <Input type="text" name="name" placeholder={messages["forms.Existing Handrails"]} value={siteID} onChange={this.onChange} />
                                        </FormGroup>
                                    </Form>
                                </div>
                            </Step>
                            <Step id="step6" name={messages["wizard.create-site.step-name-6"]} >
                                <div className="wizard-basic-step">
                                    <h5>{messages["wizard.create-site.step-desc-6"]}</h5>
                                    <Form>
                                        <FormGroup>
                                            <Label>
                                                <IntlMessages id="forms.Condition of Existing Ladders" />
                                            </Label>
                                            <Input type="text" name="name" placeholder={messages["forms.Condition of Existing Ladders"]} value={siteID} onChange={this.onChange} />
                                        </FormGroup>
                                        <FormGroup>
                                            <Label>
                                                <IntlMessages id="forms.Condition of Existing Stairs" />
                                            </Label>
                                            <Input type="text" name="name" placeholder={messages["forms.Condition of Existing Stairs"]} value={siteID} onChange={this.onChange} />
                                        </FormGroup>
                                        <FormGroup>
                                            <Label>
                                                <IntlMessages id="forms.Condition of Existing Walkways" />
                                            </Label>
                                            <Input type="text" name="name" placeholder={messages["forms.Condition of Existing Walkways"]} value={siteID} onChange={this.onChange} />
                                        </FormGroup>
                                        <FormGroup>
                                            <Label>
                                                <IntlMessages id="forms.Condition of Existing Elevators" />
                                            </Label>
                                            <Input type="text" name="name" placeholder={messages["forms.Condition of Existing Elevators"]} value={siteID} onChange={this.onChange} />
                                        </FormGroup>
                                    </Form>
                                </div>
                            </Step>
                            <Step id="step7" name={messages["wizard.create-site.step-name-7"]} >
                                <div className="wizard-basic-step">
                                    <h5>{messages["wizard.create-site.step-desc-7"]}</h5>
                                    <Form>
                                    <FormGroup>
                                            <Label>
                                                <IntlMessages id="forms.Existing Trip Hazards" />
                                            </Label>
                                            <Input type="text" name="name" placeholder={messages["forms.Existing Trip Hazards"]} value={siteID} onChange={this.onChange} />
                                        </FormGroup>
                                        <FormGroup>
                                            <Label>
                                                <IntlMessages id="forms.Access/egress areas are maintained" />
                                            </Label>
                                            <Input type="text" name="name" placeholder={messages["forms.Access/egress areas are maintained"]} value={siteID} onChange={this.onChange} />
                                        </FormGroup>
                                        <FormGroup>
                                            <Label>
                                                <IntlMessages id="forms.Flammable materials stored on Roof" />
                                            </Label>
                                            <Input type="text" name="name" placeholder={messages["forms.Flammable materials stored on Roof"]} value={siteID} onChange={this.onChange} />
                                        </FormGroup>
                                        <FormGroup>
                                            <Label>
                                                <IntlMessages id="forms.Excessive Trash/Debris on Roof" />
                                            </Label>
                                            <Input type="text" name="name" placeholder={messages["forms.Excessive Trash/Debris on Roof"]} value={siteID} onChange={this.onChange} />
                                        </FormGroup>
                                        <FormGroup>
                                            <Label>
                                                <IntlMessages id="forms.Standing water or obvious water holding areas" />
                                            </Label>
                                            <Input type="text" name="name" placeholder={messages["forms.Standing water or obvious water holding areas"]} value={siteID} onChange={this.onChange} />
                                        </FormGroup>
                                    </Form>
                                </div>
                            </Step>
                            <Step id="step8" name={messages["wizard.create-site.step-name-8"]} >
                                <div className="wizard-basic-step">
                                    <h5>{messages["wizard.create-site.step-desc-8"]}</h5>
                                    <Form>
                                    <FormGroup>
                                            <Label>
                                                <IntlMessages id="forms.Power Provider" />
                                            </Label>
                                            <Input type="text" name="name" placeholder={messages["forms.Power Provider"]} value={siteID} onChange={this.onChange} />
                                        </FormGroup>
                                        <FormGroup>
                                            <Label>
                                                <IntlMessages id="forms.What type of service?" />
                                            </Label>
                                            <Input type="text" name="name" placeholder={messages["forms.What type of service?"]} value={siteID} onChange={this.onChange} />
                                        </FormGroup>
                                        <FormGroup>
                                            <Label>
                                                <IntlMessages id="forms.Power despoit needed?" />
                                            </Label>
                                            <Input type="text" name="name" placeholder={messages["forms.Power despoit needed?"]} value={siteID} onChange={this.onChange} />
                                        </FormGroup>
                                        <FormGroup>
                                            <Label>
                                                <IntlMessages id="forms.Contact/number/email" />
                                            </Label>
                                            <Input type="text" name="name" placeholder={messages["forms.Contact/number/email"]} value={siteID} onChange={this.onChange} />
                                        </FormGroup>
                                        <FormGroup>
                                            <Label>
                                                <IntlMessages id="forms.New/Existing/Single/3 phase" />
                                            </Label>
                                            <Input type="text" name="name" placeholder={messages["forms.New/Existing/Single/3 phase"]} value={siteID} onChange={this.onChange} />
                                        </FormGroup>
                                        <FormGroup>
                                            <Label>
                                                <IntlMessages id="forms.Special CX requirements reguarding power" />
                                            </Label>
                                            <Input type="text" name="name" placeholder={messages["forms.Special CX requirements reguarding power"]} value={siteID} onChange={this.onChange} />
                                        </FormGroup>
                                        <FormGroup>
                                            <Label>
                                                <IntlMessages id="forms.Conduit size requirements" />
                                            </Label>
                                            <Input type="text" name="name" placeholder={messages["forms.Conduit size requirements"]} value={siteID} onChange={this.onChange} />
                                        </FormGroup>
                                        <FormGroup>
                                            <Label>
                                                <IntlMessages id="forms.Conductor size requirement (Req. 220AMP, 120/240V, single phase 3 wire service)" />
                                            </Label>
                                            <Input type="text" name="name" placeholder={messages["forms.Conductor size requirement (Req. 220AMP, 120/240V, single phase 3 wire service)"]} value={siteID} onChange={this.onChange} />
                                        </FormGroup>
                                        <FormGroup>
                                            <Label>
                                                <IntlMessages id="forms.Step down transformer required?" />
                                            </Label>
                                            <Input type="text" name="name" placeholder={messages["forms.Step down transformer required?"]} value={siteID} onChange={this.onChange} />
                                        </FormGroup>
                                        <FormGroup>
                                            <Label>
                                                <IntlMessages id="forms.Power company information/site specific requirements" />
                                            </Label>
                                            <Input type="text" name="name" placeholder={messages["forms.Power company information/site specific requirements"]} value={siteID} onChange={this.onChange} />
                                        </FormGroup>
                                        <FormGroup>
                                            <Label>
                                                <IntlMessages id="forms.New meter base required?" />
                                            </Label>
                                            <Input type="text" name="name" placeholder={messages["forms.New meter base required?"]} value={siteID} onChange={this.onChange} />
                                        </FormGroup>
                                        <FormGroup>
                                            <Label>
                                                <IntlMessages id="forms.Photos of avail chases" />
                                            </Label>
                                            <Input type="text" name="name" placeholder={messages["forms.Photos of avail chases"]} value={siteID} onChange={this.onChange} />
                                        </FormGroup>
                                        <FormGroup>
                                            <Label>
                                                <IntlMessages id="forms.Second base utility pole req?" />
                                            </Label>
                                            <Input type="text" name="name" placeholder={messages["forms.DSecond base utility pole req?ate"]} value={siteID} onChange={this.onChange} />
                                        </FormGroup>
                                        <FormGroup>
                                            <Label>
                                                <IntlMessages id="forms.Directional boring required?" />
                                            </Label>
                                            <Input type="text" name="name" placeholder={messages["forms.Directional boring required?"]} value={siteID} onChange={this.onChange} />
                                        </FormGroup>
                                        <FormGroup>
                                            <Label>
                                                <IntlMessages id="forms.Location of power company bore pits identified?" />
                                            </Label>
                                            <Input type="text" name="name" placeholder={messages["forms.Location of power company bore pits identified?"]} value={siteID} onChange={this.onChange} />
                                        </FormGroup>
                                        <FormGroup>
                                            <Label>
                                                <IntlMessages id="forms.Additional easement required?" />
                                            </Label>
                                            <Input type="text" name="name" placeholder={messages["forms.Additional easement required?"]} value={siteID} onChange={this.onChange} />
                                        </FormGroup>
                                        <FormGroup>
                                            <Label>
                                                <IntlMessages id="forms.Location of secondary pole" />
                                            </Label>
                                            <Input type="text" name="name" placeholder={messages["forms.Location of secondary pole"]} value={siteID} onChange={this.onChange} />
                                        </FormGroup>
                                    </Form>
                                </div>
                            </Step>
                            <Step id="step9" name={messages["wizard.create-site.step-name-9"]} >
                                <div className="wizard-basic-step">
                                    <h5>{messages["wizard.create-site.step-desc-9"]}</h5>
                                    <Form>
                                        <FormGroup>
                                            <Label>
                                                <IntlMessages id="forms.Fiber provider: contact name, number, email" />
                                            </Label>
                                            <Input type="text" name="name" placeholder={messages["forms.Fiber provider: contact name, number, email"]} value={siteID} onChange={this.onChange} />
                                        </FormGroup>
                                        <FormGroup>
                                            <Label>
                                                <IntlMessages id="forms.Type of service fiber/mw, new exisiting, dark/lit/dim" />
                                            </Label>
                                            <Input type="text" name="name" placeholder={messages["forms.Type of service fiber/mw, new exisiting, dark/lit/dim"]} value={siteID} onChange={this.onChange} />
                                        </FormGroup>
                                        <FormGroup>
                                            <Label>
                                                <IntlMessages id="forms.New service riser/shaft required?" />
                                            </Label>
                                            <Input type="text" name="name" placeholder={messages["forms.New service riser/shaft required?"]} value={siteID} onChange={this.onChange} />
                                        </FormGroup>
                                        <FormGroup>
                                            <Label>
                                                <IntlMessages id="forms.Fiber slice point" />
                                            </Label>
                                            <Input type="text" name="name" placeholder={messages["forms.Fiber slice point"]} value={siteID} onChange={this.onChange} />
                                        </FormGroup>
                                        <FormGroup>
                                            <Label>
                                                <IntlMessages id="forms.Dmark photo" />
                                            </Label>
                                            <Input type="text" name="name" placeholder={messages["forms.Dmark photo"]} value={siteID} onChange={this.onChange} />
                                        </FormGroup>
                                        <FormGroup>
                                            <Label>
                                                <IntlMessages id="forms.Transpot provider information/site specific requirements" />
                                            </Label>
                                            <Input type="text" name="name" placeholder={messages["forms.Transpot provider information/site specific requirements"]} value={siteID} onChange={this.onChange} />
                                        </FormGroup>
                                        <FormGroup>
                                            <Label>
                                                <IntlMessages id="forms.HH photo" />
                                            </Label>
                                            <Input type="text" name="name" placeholder={messages["forms.HH photo"]} value={siteID} onChange={this.onChange} />
                                        </FormGroup>
                                        <FormGroup>
                                            <Label>
                                                <IntlMessages id="forms.Secondary fiber pole location" />
                                            </Label>
                                            <Input type="text" name="name" placeholder={messages["forms.Secondary fiber pole location"]} value={siteID} onChange={this.onChange} />
                                        </FormGroup>
                                        <FormGroup>
                                            <Label>
                                                <IntlMessages id="forms.Fiber company site walk: contact name, number, email" />
                                            </Label>
                                            <Input type="text" name="name" placeholder={messages["forms.Fiber company site walk: contact name, number, email"]} value={siteID} onChange={this.onChange} />
                                        </FormGroup>
                                        <FormGroup>
                                            <Label>
                                                <IntlMessages id="forms.Fiber account: contact name, number, email" />
                                            </Label>
                                            <Input type="text" name="name" placeholder={messages["forms.Fiber account: contact name, number, email"]} value={siteID} onChange={this.onChange} />
                                        </FormGroup>
                                        <FormGroup>
                                            <Label>
                                                <IntlMessages id="forms.Location of fiber bore pits identified" />
                                            </Label>
                                            <Input type="text" name="name" placeholder={messages["forms.Location of fiber bore pits identified"]} value={siteID} onChange={this.onChange} />
                                        </FormGroup>
                                        <FormGroup>
                                            <Label>
                                                <IntlMessages id="forms.New easment required?" />
                                            </Label>
                                            <Input type="text" name="name" placeholder={messages["forms.New easment required?"]} value={siteID} onChange={this.onChange} />
                                        </FormGroup>
                                        <FormGroup>
                                            <Label>
                                                <IntlMessages id="forms.Identify fiber path" />
                                            </Label>
                                            <Input type="text" name="name" placeholder={messages["forms.Identify fiber path"]} value={siteID} onChange={this.onChange} />
                                        </FormGroup>
                                        <FormGroup>
                                            <Label>
                                                <IntlMessages id="forms.New arial service required? Y/N" />
                                            </Label>
                                            <Input type="text" name="name" placeholder={messages["forms.New arial service required? Y/N"]} value={siteID} onChange={this.onChange} />
                                        </FormGroup>
                                        <FormGroup>
                                            <Label>
                                                <IntlMessages id="forms.Directional boring required? Y/N" />
                                            </Label>
                                            <Input type="text" name="name" placeholder={messages["forms.Directional boring required? Y/N"]} value={siteID} onChange={this.onChange} />
                                        </FormGroup>
                                        <FormGroup>
                                            <Label>
                                                <IntlMessages id="forms.Time to complete transport to Dmark" />
                                            </Label>
                                            <Input type="text" name="name" placeholder={messages["forms.Time to complete transport to Dmark"]} value={siteID} onChange={this.onChange} />
                                        </FormGroup>
                                        <FormGroup>
                                            <Label>
                                                <IntlMessages id="forms.Additional pole needed? Y/N" />
                                            </Label>
                                            <Input type="text" name="name" placeholder={messages["forms.Additional pole needed? Y/N"]} value={siteID} onChange={this.onChange} />
                                        </FormGroup>
                                        <FormGroup>
                                            <Label>
                                                <IntlMessages id="forms.Conduit size required" />
                                            </Label>
                                            <Input type="text" name="name" placeholder={messages["forms.Conduit size required"]} value={siteID} onChange={this.onChange} />
                                        </FormGroup>
                                        <FormGroup>
                                            <Label>
                                                <IntlMessages id="forms.Connector type required: APC/UPC" />
                                            </Label>
                                            <Input type="text" name="name" placeholder={messages["forms.Connector type required: APC/UPC"]} value={siteID} onChange={this.onChange} />
                                        </FormGroup>
                                        <FormGroup>
                                            <Label>
                                                <IntlMessages id="forms.Pull string required?" />
                                            </Label>
                                            <Input type="text" name="name" placeholder={messages["forms.Pull string required?"]} value={siteID} onChange={this.onChange} />
                                        </FormGroup>
                                        <FormGroup>
                                            <Label>
                                                <IntlMessages id="forms.Permits required?" />
                                            </Label>
                                            <Input type="text" name="name" placeholder={messages["forms.Permits required?"]} value={siteID} onChange={this.onChange} />
                                        </FormGroup>
                                    </Form>
                                </div>
                            </Step>
                            <Step id="step10" hideTopNav={true}>
                                <div className="wizard-basic-step text-center">
                                    <h2 className="mb-2">Thanks.</h2>
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
