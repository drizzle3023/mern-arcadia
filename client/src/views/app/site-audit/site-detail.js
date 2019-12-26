import React, { Component, Fragment } from "react";
import { Row } from "reactstrap";
import { connect } from "react-redux";

import { getSiteDetail, getWeather, getLand } from "../../../redux/actions";
import IntlMessages from "../../../helpers/IntlMessages";
import { Colxx, Separator } from "../../../components/common/CustomBootstrap";
import Breadcrumb from "../../../containers/navs/Breadcrumb";

class SiteDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false
        };
    }

    componentDidMount() {

        this.props.getSiteDetail({
            _id: this.props.match.params._id
        });

        this.props.getWeather({
            _id: this.props.match.params._id
        });

        this.props.getLand({
            _id: this.props.match.params._id
        });
    }

    render() {

        const { siteDetail } = this.props;
        const { weather } = this.props;
        const { land } = this.props;

        return (
            <Fragment>
                <Row>
                    <Colxx xxs="12">
                        <Breadcrumb heading="menu.site-detail" match={this.props.match} />
                        <Separator className="mb-5" />
                    </Colxx>
                </Row>
                <Row>
                    <Colxx xxs="12" className="mb-4">
                        <p><IntlMessages id="menu.site-detail" /></p>
                        <div style={{ marginBottom: "10px" }}>
                            <b>Site Data</b>
                            {
                                (siteDetail === undefined || siteDetail === null) ? (
                                    <div> Loading... </div>
                                ) : (
                                        <table>
                                            <tbody>
                                                <tr>
                                                    <td style={{ width: "50%" }}><b>Site Code: </b>{siteDetail.siteCode}</td>
                                                    <td style={{ width: "50%" }}><b>Site Name: </b>{siteDetail.siteName}</td>
                                                </tr>
                                                <tr>
                                                    <td style={{ width: "50%" }}><b>Latitude: </b>{siteDetail.latitude}</td>
                                                    <td style={{ width: "50%" }}><b>Longitude: </b>{siteDetail.longitude}</td>
                                                </tr>
                                                <tr>
                                                    <td style={{ width: "50%" }}><b>City: </b>{siteDetail.city}</td>
                                                    <td style={{ width: "50%" }}><b>State: </b>{siteDetail.state}</td>
                                                </tr>
                                                <tr>
                                                    <td style={{ width: "50%" }}><b>Zip: </b>{siteDetail.zip}</td>
                                                    <td style={{ width: "50%" }}><b>County: </b>{siteDetail.county}</td>
                                                </tr>
                                                <tr>
                                                    <td style={{ width: "50%" }}><b>Type: </b>{siteDetail.type}</td>
                                                    <td style={{ width: "50%" }}><b>Height: </b>{siteDetail.height}</td>
                                                </tr>
                                                <tr>
                                                    <td style={{ width: "50%" }}><b>MTA: </b>{siteDetail.mta}</td>
                                                    <td style={{ width: "50%" }}><b>BTA: </b>{siteDetail.bta}</td>
                                                </tr>
                                                <tr>
                                                    <td style={{ width: "50%" }}><b>Contact: </b>{siteDetail.contact}</td>
                                                    <td style={{ width: "50%" }}><b>Phone: </b>{siteDetail.phone}</td>
                                                </tr>
                                                <tr>
                                                    <td style={{ width: "50%" }}><b>Email: </b>{siteDetail.email}</td>
                                                    <td style={{ width: "50%" }}><b>RSM: </b>{siteDetail.rsm}</td>
                                                </tr>
                                                <tr>
                                                    <td style={{ width: "50%" }}><b>RSM Email: </b>{siteDetail.rsmEmail}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    )
                            }
                        </div>

                        <div style={{ marginBottom: "10px" }}>
                            <b>Weather Data</b>
                            {
                                (weather === undefined || weather === null) ? (
                                    <div> Loading... </div>
                                ) : (
                                        <div>
                                            <b>Weather: </b> {weather.weatherText} <img src={"/assets/img/weather-icons/" + weather.weatherIcon + "-s.png"} />
                                            <b style={{ marginLeft: "60px" }}>Metric: </b> {weather.weatherMetric}
                                            <b style={{ marginLeft: "60px" }}>Imperial: </b> {weather.weatherImperial}
                                        </div>
                                    )
                            }
                        </div>

                        <div>
                            <b>Land Data</b>
                            {
                                (land === undefined) ? (
                                    <div> Loading... </div>
                                ) : ((land === null) ? (<div> Error </div>) :
                                    (
                                        <div>
                                            <b style={{ marginLeft: "30px" }}>Parcel</b>
                                            <table style={{ marginLeft: "60px", width: "80%" }}>
                                                <tbody>
                                                    <tr>
                                                        <td style={{ width: "50%" }}><b>APN Original: </b> {land.parcelAPNOriginal}</td>
                                                        <td style={{ width: "50%" }}><b>FIPS Code: </b> {land.parcelFIPSCode}</td>
                                                    </tr>
                                                    <tr>
                                                        <td style={{ width: "50%" }}><b>County Land Use Code: </b> {land.parcelCountyLandUseCode}</td>
                                                        <td style={{ width: "50%" }}><b>County Land Use Description: </b> {land.parcelCountyLandUseDesc}</td>
                                                    </tr>
                                                    <tr>
                                                        <td style={{ width: "50%" }}><b>Tax Account Number: </b> {land.parcelTaxAccountNumber}</td>
                                                        <td style={{ width: "50%" }}><b>Legal Description: </b> {land.parcelLegalDesc}</td>
                                                    </tr>
                                                </tbody>
                                            </table>

                                            <b style={{ marginLeft: "30px" }}>Taxes</b>
                                            <table style={{ marginLeft: "60px", width: "80%" }}>
                                                <tbody>
                                                    <tr>
                                                        <td style={{ width: "50%" }}><b>Amount: </b> {land.taxesAmount}</td>
                                                        <td style={{ width: "50%" }}><b>Exemptions: </b> {land.taxesExemptions}</td>
                                                    </tr>
                                                </tbody>
                                            </table>

                                            <b style={{ marginLeft: "30px" }}>Assessments</b>
                                            <table style={{ marginLeft: "60px", width: "80%" }}>
                                                <tbody>
                                                    <tr>
                                                        <td style={{ width: "50%" }}><b>Year: </b> {land.assessmentsYear}</td>
                                                        <td style={{ width: "50%" }}><b>Land Value: </b> {land.assessmentsLandValue}</td>
                                                    </tr>
                                                    <tr>
                                                        <td style={{ width: "50%" }}><b>Improvement Value: </b> {land.assessmentsImprovementValue}</td>
                                                        <td style={{ width: "50%" }}><b>Total Value: </b> {land.assessmentsTotalValue}</td>
                                                    </tr>
                                                </tbody>
                                            </table>

                                            <b style={{ marginLeft: "30px" }}>Owner</b>
                                            <table style={{ marginLeft: "60px", width: "80%" }}>
                                                <tbody>
                                                    <tr>
                                                        <td style={{ width: "50%" }}><b>Name: </b> {land.ownerName}</td>
                                                        <td style={{ width: "50%" }}><b>SecondName: </b> {land.ownerSecondName}</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    ))
                            }
                        </div>
                    </Colxx>
                </Row>
            </Fragment >
        )
    }
}

const mapStateToProps = state => {
    console.log(state);
    return ({
        siteDetail: state.siteAudit.siteDetail,
        weather: state.siteAudit.weather,
        land: state.siteAudit.land
    });
};

export default connect(
    mapStateToProps,
    {
        getSiteDetail, getWeather, getLand
    }
)(SiteDetail);
