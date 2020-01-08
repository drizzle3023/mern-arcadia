import React, { Component, Fragment } from "react";
import { Row } from "reactstrap";
import { connect } from "react-redux";

import { getEntityDetail} from "../../../redux/actions";
import IntlMessages from "../../../helpers/IntlMessages";
import { Colxx, Separator } from "../../../components/common/CustomBootstrap";
import Breadcrumb from "../../../containers/navs/Breadcrumb";

class EntityDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false
        };
    }

    componentDidMount() {

        console.log(this.props.match.params._id);

        this.props.getEntityDetail({
            _id: this.props.match.params._id
        });
    }

    render() {

        const { entityDetail } = this.props;

        return (
            <Fragment>
                <Row>
                    <Colxx xxs="12">
                        <Breadcrumb heading="menu.entity-detail" match={this.props.match} />
                        <Separator className="mb-5" />
                    </Colxx>
                </Row>
                <Row>
                    <Colxx xxs="12" className="mb-4">
                        <p><IntlMessages id="menu.entity-detail" /></p>
                        <div style={{ marginBottom: "10px" }}>
                            {
                                (Object.keys(entityDetail).length === 0) ? (
                                    <div> Loading... </div>
                                ) : (
                                        <table>
                                            <tbody>
                                                <tr>
                                                    <td style={{ width: "50%" }}><b>Entity Name: </b>{entityDetail.entityName}</td>
                                                </tr>
                                                <tr>
                                                    <td style={{ width: "50%" }}><b>Entity Email: </b>{entityDetail.entityEmail}</td>
                                                </tr>
                                                <tr>
                                                    <td style={{ width: "50%" }}><b>Entity Address: </b>{entityDetail.entityAddress}</td>
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
        entityDetail: state.entityUser.entityDetail
    });
};

export default connect(
    mapStateToProps,
    {
        getEntityDetail
    }
)(EntityDetail);
