import React, { Component, Fragment } from "react";
import { Row } from "reactstrap";
import { connect } from "react-redux";

import { uploadCSV } from "../../../redux/actions";
import IntlMessages from "../../../helpers/IntlMessages";
import { Colxx, Separator } from "../../../components/common/CustomBootstrap";
import Breadcrumb from "../../../containers/navs/Breadcrumb";
import CreateSiteWizard from "../../../containers/ui/CreateSiteWizard";

class CreateSite extends Component {

    constructor(props) {
        super(props);

    }

    render() {
        return (
            <Fragment>
                <Row>
                    <Colxx xxs="12">
                        <Breadcrumb heading="menu.create-site" match={this.props.match} />
                        <Separator className="mb-5" />
                    </Colxx>
                </Row>
                <Row>
                    <Colxx xxs="12" className="mb-5">
                        <CreateSiteWizard />
                    </Colxx>
                </Row>
            </Fragment >
        )
    }
}

export default connect(
    null,
    {
        uploadCSV
    }
)(CreateSite);

