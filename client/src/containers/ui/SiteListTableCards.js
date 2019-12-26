import React, { Component } from "react";
import { Card, CardBody, CardTitle } from "reactstrap";
import ReactTable from "react-table";
import { connect } from "react-redux";
import annyang from "annyang";
import { NavLink } from "react-router-dom";

import IntlMessages from "../../helpers/IntlMessages";
import CustomPagination from "../../components/CustomPagination";
import { getSiteList } from "../../redux/actions";

const dataTableColumns = [
  {
    Header: "Site Code",
    accessor: "siteCode",
    Cell: props => <p className="list-item-heading">{props.value}</p>
  },
  {
    Header: "Site Name",
    accessor: "siteName",
    Cell: props => <p className="text-muted">{props.value}</p>
  },
  {
    Header: "Latitude",
    accessor: "latitude",
    Cell: props => <p className="text-muted">{props.value}</p>
  },
  {
    Header: "Longitude",
    accessor: "longitude",
    Cell: props => <p className="text-muted">{props.value}</p>
  },
  {
    Header: "City",
    accessor: "city",
    Cell: props => <p className="text-muted">{props.value}</p>
  },
  {
    Header: "State",
    accessor: "state",
    Cell: props => <p className="text-muted">{props.value}</p>
  },
  {
    Header: "Zip",
    accessor: "zip",
    Cell: props => <p className="text-muted">{props.value}</p>
  },
  {
    Header: "County",
    accessor: "county",
    Cell: props => <p className="text-muted">{props.value}</p>
  },
  {
    Header: "Actions",
    accessor: "_id",
    Cell: props => <NavLink to={`/app/site/site-detail/` + props.value} className="white">
      <div className={"glyph-icon simple-icon-eye"} title="View Site" />
  </NavLink>
  },
];

class SiteListTableCard extends Component {

  constructor() {
    super();

    this.state = {
      data: [],
      loading: false,
      page: 0
    }
  }

  componentDidMount() {

    if (annyang) {

      const commands = {
        'show me *term': (term) => {
          console.log('annyang: ' + term);
          this.props.getSiteList({
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
    annyang.abort();
  }

  render() {

    const data = this.props.data.items;
    const filter = this.props.data.filter;

    return (
      <Card className="mb-4">
        <CardBody>
          <CardTitle>
            <IntlMessages id="table.site-list" />
          </CardTitle>
          <div>
          To search something, please say "Show me ..." . To show all data, please say "Show me all". Search Text : {filter}
          </div>
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
              this.props.getSiteList({
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
    data: state.siteAudit.siteList.data === undefined ? { items: [], totalCount: 0 } : state.siteAudit.siteList.data
  });
};

export default connect(
  mapStateToProps,
  { getSiteList }
)(SiteListTableCard);