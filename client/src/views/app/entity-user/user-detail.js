import React, { Component, Fragment } from "react";
import { Row } from "reactstrap";
import { connect } from "react-redux";

import { getUserDetail} from "../../../redux/actions";
import IntlMessages from "../../../helpers/IntlMessages";
import { Colxx, Separator } from "../../../components/common/CustomBootstrap";
import Breadcrumb from "../../../containers/navs/Breadcrumb";

class UserDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false
        };
    }

    componentDidMount() {

        console.log(this.props.match.params._id);

        this.props.getUserDetail({
            _id: this.props.match.params._id
        });
    }

    render() {

        const { userDetail } = this.props;

        console.log(userDetail);

        return (
            <Fragment>
                <Row>
                    <Colxx xxs="12">
                        <Breadcrumb heading="menu.user-detail" match={this.props.match} />
                        <Separator className="mb-5" />
                    </Colxx>
                </Row>
                <Row>
                    <Colxx xxs="12" className="mb-4">
                        <p><IntlMessages id="menu.user-detail" /></p>
                        <div style={{ marginBottom: "10px" }}>
                            {
                                (Object.keys(userDetail).length === 0) ? (
                                    <div> Loading... </div>
                                ) : (
                                        <table>
                                            <tbody>
                                                <tr>
                                                    <td style={{ width: "50%" }}><b>User Name: </b>{userDetail.userName}</td>
                                                </tr>
                                                <tr>
                                                    <td style={{ width: "50%" }}><b>User Email: </b>{userDetail.userEmail}</td>
                                                </tr>
                                                <tr>
                                                    <td style={{ width: "50%" }}><b>User Password: </b>{userDetail.userPassword}</td>
                                                </tr>
                                                <tr>
                                                    <td style={{ width: "50%" }}><b>User Phone Number: </b>{userDetail.userPhoneNumber}</td>
                                                </tr>
                                                <tr>
                                                    <td style={{ width: "50%" }}><b>Entity Name: </b>{userDetail.entity.entityName}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    )
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
        userDetail: state.entityUser.userDetail
    });
};

export default connect(
    mapStateToProps,
    {
        getUserDetail
    }
)(UserDetail);
