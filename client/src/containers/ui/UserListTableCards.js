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
import { getUserList, deleteUser } from "../../redux/actions";
import { NotificationManager } from "../../components/common/react-notifications";

class UserListTableCard extends Component {

  constructor() {
    super();

    this.state = {
      data: [],
      loading: false,
      page: 0,
      redirect: false,
      modal: false,
      selectedUser: ""
    }

    this.onAddClicked = this.onAddClicked.bind(this);
  }

  savedTerm = "";

  componentDidMount() {

    if (annyang) {

      const commands = {
        'show me *term': (term) => {
          this.savedTerm = term;
          console.log('annyang: ' + term);
          this.props.getUserList({
            pageNumber: this.props.data.pageNumber,
            pageSize: this.props.data.pageSize,
            filter: term
          });
        }
      };

      annyang.addCommands(commands);
      annyang.debug(true);
      annyang.start();

    }
  }

  componentWillMount() {

    console.log("componentWillMount");
    annyang.abort();
  }

  componentDidUpdate(prevProps){

    console.log("componentDidUpdate");
    console.log(this.props);
    console.log(prevProps);
    console.log(this.savedTerm);

    if (this.props.userDelete !== prevProps.userDelete){

        if (this.props.userDelete.data === null){
            this.createNotification("success");
            this.props.getUserList({
              pageNumber: this.props.data.pageNumber,
              pageSize: this.props.data.pageSize,
              filter: this.savedTerm
            });
        } else {
            this.createNotification("error");
        }
    }
  }

  onAddClicked() {

      console.log("Add Clicked...");
      this.setState({ redirect: true });
  }

  onDelClicked() {

      console.log("Delete Clicked...");
      console.log(this.state.selectedUser);

      this.props.deleteUser({
          userId: this.state.selectedUser
      });

      this.setState(prevState => ({
        modal: !prevState.modal
      }))
  }

  toggle = (value) => {

    this.setState(prevState => ({
      modal: !prevState.modal,
      selectedUser: value
    }));

  };

  createNotification = (type, className) => {

    let cName = className || "";

    switch (type) {

      case "success":
        NotificationManager.success(
          "Delete action succeeded.",
          "Success",
          3000,
          null,
          null,
          cName
        );
        break;
      case "error":
        NotificationManager.error(
          "Delete action failed.",
          "Error",
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

    console.log(this.props.data.items);

    const data = this.props.data.items;
    const filter = this.props.data.filter;
    const { redirect } = this.state;

    const dataTableColumns = [
      {
        Header: "User Name",
        accessor: "userName",
        Cell: props => <p className="list-item-heading">{props.value}</p>
      },
      {
        Header: "User Email",
        accessor: "userEmail",
        Cell: props => <p className="list-item-heading">{props.value}</p>
      },
      {
        Header: "Entity",
        accessor: "entity.entityName",
        Cell: props => <p className="list-item-heading">{props.value}</p>
      },
      {
        Header: "Phone Number",
        accessor: "userPhoneNumber",
        Cell: props => <p className="list-item-heading">{props.value}</p>
      },
      {
        Header: "View",
        accessor: "_id",
        Cell: props => <NavLink to={`/app/entity/user-detail/` + props.value} className="white">
          <div className={"glyph-icon simple-icon-eye"} title="View User" />
      </NavLink>
      },
      {
        Header: "Edit",
        accessor: "_id",
        Cell: props => <NavLink to={`/app/entity/user-edit/` + props.value} className="white">
          <div className={"glyph-icon simple-icon-pencil"} title="Edit User" />
      </NavLink>
      },
      {
        Header: "Delete",
        accessor: "_id",
        Cell: props => <Button onClick = {this.toggle.bind(this, props.value)}>
          <div className={"glyph-icon simple-icon-close"} title="Delete User" />
      </Button>
      },
    ];

    if (redirect) {
        return <Redirect to='/app/entity/user-create' />
    }

    return (
      <Card className="mb-4">
        <CardBody>
          <CardTitle>
            <IntlMessages id="table.user-list" />
          </CardTitle>
          <Button color = "primary" onClick = {this.onAddClicked}>
            <i className = "iconsminds-add"/>
            <IntlMessages id="common.add" />
          </Button>
          <div>
          To search something, please say "Show me ..." . To show all data, please say "Show me all". Search Text : {filter}
          </div>
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
              this.props.getUserList({
                pageNumber: state.page,
                pageSize: state.pageSize,
                filter: filter
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
    data: state.entityUser.userList.data === undefined ? { items: [], totalCount: 0 } : state.entityUser.userList.data,
    userDelete: state.entityUser.userDelete
  });
};

export default connect(
  mapStateToProps,
  { getUserList,
    deleteUser }
)(UserListTableCard);