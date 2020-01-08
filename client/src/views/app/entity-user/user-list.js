import React, { Component, Fragment } from "react";
import { Row } from "reactstrap";

import { Colxx, Separator } from "../../../components/common/CustomBootstrap";
import Breadcrumb from "../../../containers/navs/Breadcrumb";
import UserListTableCard from "../../../containers/ui/UserListTableCards";

export default class UserList extends Component {

    constructor(props) {
        super(props);

    }

    render() {
        return (
            <Fragment>
                <Row>
                    <Colxx xxs="12">
                        <Breadcrumb heading="menu.user-list" match={this.props.match} />
                        <Separator className="mb-5" />
                    </Colxx>
                </Row>
                <Row>
                    <Colxx xxs="12">
                        <UserListTableCard />
                    </Colxx>
                </Row>
            </Fragment >
        )
    }
}
