import React, { Component } from "react";
import { 
    Card, 
    CardBody, 
    CardTitle, 
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter } from "reactstrap";
import ReactTable from "react-table";
import { connect } from "react-redux";
import annyang from "annyang";
import { NavLink } from "react-router-dom";
import  { Redirect} from 'react-router-dom'

import IntlMessages from "../../helpers/IntlMessages";
import CustomPagination from "../../components/CustomPagination";
import { getEntityList, deleteEntity } from "../../redux/actions";
import { NotificationManager } from "../../components/common/react-notifications";

class EntityListTableCard extends Component {

  constructor() {
    super();

    this.state = {
      data: [],
      loading: false,
      page: 0,
      modal: false,
      redirect: false,
      selectedEntity: ""
    }

    this.onAddClicked = this.onAddClicked.bind(this);
  }

  savedTerm = "";

  componentDidMount() {
  }

  componentWillMount() {
  }

  componentDidUpdate(prevProps){

    if (this.props.entityDelete !== prevProps.entityDelete){

        if (this.props.entityDelete.data === "success"){
            this.createNotification("success", "Delete action succeeded.");
            this.props.getEntityList({
              pageNumber: this.props.data.pageNumber,
              pageSize: this.props.data.pageSize,
              filter: this.savedTerm,
              sort: this.props.data.sort
            });
        } else if (this.props.entityDelete.data === "error"){

            this.createNotification("error", "Delete action failed.");
        } else {
            this.createNotification("warning", this.props.entityDelete.data);
        }
    }
  }

  onAddClicked() {

      this.setState({ redirect: true });
  }

  onDelClicked(value) {

      console.log("Delete Clicked...");

      this.props.deleteEntity({
          entityId: this.state.selectedEntity
      });

      this.setState(prevState => ({
        modal: !prevState.modal
      }))
  }

  toggle = (value) => {

    this.setState(prevState => ({
      modal: !prevState.modal,
      selectedEntity: value
    }));

  };

  createNotification = (type, message) => {

    let cName = "";

    switch (type) {

      case "success":
        NotificationManager.success(
          message,
          "Success",
          3000,
          null,
          null,
          cName
        );
        break;
      case "error":
        NotificationManager.error(
          message,
          "Error",
          5000,
          null,
          null,
          cName
        );
        break;
      case "warning":
        NotificationManager.warning(
          message,
          "Warning",
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
  };

  render() {

    const data = this.props.data.items;
    const filter = this.props.data.filter;

    const { redirect } = this.state;

    const dataTableColumns = [
      {
        Header: "Entity Name",
        accessor: "entityName",
        Cell: props => <p className="list-item-heading">{props.value}</p>
      },
      {
        Header: "Entity Email",
        accessor: "entityEmail",
        Cell: props => <p className="list-item-heading">{props.value}</p>
      },
      {
        Header: "Entity Address",
        accessor: "entityAddress",
        Cell: props => <p className="list-item-heading">{props.value}</p>
      },
      {
        Header: "View",
        accessor: "_id",
        Cell: props => <NavLink to={`/app/entity/entity-detail/` + props.value} className="white">
          <div className={"glyph-icon simple-icon-eye"} title="View Entity" />
      </NavLink>
      },
      {
        Header: "Edit",
        accessor: "_id",
        Cell: props => <NavLink to={`/app/entity/entity-edit/` + props.value} className="white">
          <div className={"glyph-icon simple-icon-pencil"} title="Edit Entity" />
      </NavLink>
      },
      {
        Header: "Delete",
        accessor: "_id",
        Cell: props => <Button onClick = {this.toggle.bind(this, props.value)}>
          <div className={"glyph-icon simple-icon-close"} title="Delete Entity" />
      </Button>
      },
    ];

    if (redirect) {
        return <Redirect to='/app/entity/entity-create' />
    }

    return (
      <Card className="mb-4">
        <CardBody>
          <CardTitle>
            <IntlMessages id="table.entity-list" />
          </CardTitle>
          <Button color = "primary" onClick = {this.onAddClicked}>
            <i className = "iconsminds-add"/>
            Add
          </Button>
          <Modal isOpen={this.state.modal} toggle={this.toggle}>
            <ModalBody align = "center">
              <IntlMessages id="common.confirm-delete" />
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={this.onDelClicked.bind(this)}>
                <IntlMessages id="common.yes" />
              </Button>{" "}
              <Button color="secondary" onClick={this.toggle}>
                <IntlMessages id="common.no" />
              </Button>
            </ModalFooter>
          </Modal>          
          <ReactTable
            data={data}
            pages={Math.ceil(this.props.data.totalCount / this.props.data.pageSize)}
            columns={dataTableColumns}
            defaultPageSize={10}
            showPageJump={true}
            PaginationComponent={CustomPagination}
            showPageSizeOptions={true}
            loading={this.state.loading}
            manual
            onFetchData={(state, instance) => {

              this.props.getEntityList({
                pageNumber: state.page,
                pageSize: state.pageSize,
                filter: filter,
                sort: state.sorted
              });
            }}
          />
        </CardBody>
      </Card>
    );
  }
};

const mapStateToProps = state => {
  return ({
    data: state.entityUser.entityList.data === undefined ? { items: [], totalCount: 0 } : state.entityUser.entityList.data,
    entityDelete: state.entityUser.entityDelete,
  });
};

export default connect(
  mapStateToProps,
  { getEntityList,
    deleteEntity }
)(EntityListTableCard);