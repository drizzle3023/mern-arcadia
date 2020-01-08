import React, { Component, Fragment } from "react";
import { Row } from "reactstrap";

import { Colxx, Separator } from "../../../components/common/CustomBootstrap";
import Breadcrumb from "../../../containers/navs/Breadcrumb";
import EntityListTableCard from "../../../containers/ui/EntityListTableCards";

export default class EntityList extends Component {

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
                        <Breadcrumb heading="menu.entity-list" match={this.props.match} />
                        <Separator className="mb-5" />
                    </Colxx>
                </Row>
                <Row>
                    <Colxx xxs="12">
                        <EntityListTableCard />
                    </Colxx>
                </Row>
            </Fragment >
        )
    }
}
