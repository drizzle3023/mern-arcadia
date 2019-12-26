import React, { Component, Fragment } from "react";
import { Row, Button } from "reactstrap";
import { FilePicker } from 'react-file-picker'
import { connect } from "react-redux";

import { uploadCSV } from "../../../redux/actions";
import IntlMessages from "../../../helpers/IntlMessages";
import { Colxx, Separator } from "../../../components/common/CustomBootstrap";
import Breadcrumb from "../../../containers/navs/Breadcrumb";

class ImportSiteFromCSV extends Component {

    constructor(props) {
        super(props);

        this.onChange = this.onChange.bind(this);
    }

    onChange = file => {

        const data = new FormData();
        data.append('file', file);
        this.props.uploadCSV(data);
        console.log(file);

    }


    render() {
        return (
            <Fragment>
                <Row>
                    <Colxx xxs="12">
                        <Breadcrumb heading="menu.import-from-csv" match={this.props.match} />
                        <Separator className="mb-5" />
                    </Colxx>
                </Row>
                <Row>
                    <Colxx xxs="12" className="mb-4">
                        <p><IntlMessages id="menu.import-from-csv" /></p>

                        <FilePicker
                            extensions={['csv']}
                            onChange={FileObject => this.onChange(FileObject)}
                            maxSize={2097152}
                        >
                            <Button color="primary" className="mb-2">
                                <IntlMessages id="button.import-from-csv" />
                            </Button>
                        </FilePicker>

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
)(ImportSiteFromCSV);

