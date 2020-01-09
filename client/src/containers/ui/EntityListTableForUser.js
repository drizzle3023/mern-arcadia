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
import { getEntityList, deleteEntity, selectEntityForUserList } from "../../redux/actions";
import { NotificationManager } from "../../components/common/react-notifications";

class EntityListTableForUser extends Component {

  constructor() {
    super();

    this.state = {
      data: [],
      loading: false,
      page: 0,
      modal: false,
      selectedEntity: "",
      selected: null
    }

  }

  savedTerm = "";

  componentDidMount() {

  }

  componentWillMount() {

  }

  componentDidUpdate(prevProps){

  }

  onEntityClick(e, t, rowInfo){

    console.log("entity_clicked");
    console.log(rowInfo.original._id);

    this.props.selectEntityForUserList({
      entityId: rowInfo.original._id
    });

  };

  render() {

    const data = this.props.data.items;
    const filter = this.props.data.filter;

    const dataTableColumns = [
      {
        Header: "Entity Name",
        accessor: "entityName",
        Cell: props => <p className="list-item-heading">{props.value}</p>
      }
    ];

    return (
      <Card className="mb-4">
        <CardBody>
          <CardTitle>
            <IntlMessages id="table.entity-list" />
          </CardTitle>    
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

              console.log("onFetchData");
              console.log(state);

              this.props.getEntityList({
                pageNumber: state.page,
                pageSize: state.pageSize,
                filter: filter,
                sort: state.sorted
              });
            }}
            getTrProps={(state, rowInfo) => {
              if (rowInfo && rowInfo.row) {
                return {
                  onClick: (e, t) => {
                    this.onEntityClick(e, t, rowInfo);
                  }
                }
              }else{
                return {}
              }
            }}
          />
        </CardBody>
      </Card>
    );
  }
};

const mapStateToProps = state => {
  return ({
    data: state.entityUser.entityList.data === undefined ? { items: [], totalCount: 0 } : state.entityUser.entityList.data
  });
};

export default connect(
  mapStateToProps,
  { getEntityList,
    selectEntityForUserList}
)(EntityListTableForUser);