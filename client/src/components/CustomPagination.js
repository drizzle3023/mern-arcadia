import React from "react";
import PropTypes from "prop-types";
import {
    Pagination, PaginationItem, PaginationLink,
} from "reactstrap";


export default class CustomPagination extends React.Component {
    constructor(props) {
        super();

        this.changePage = this.changePage.bind(this);

        this.state = {
            visiblePages: this.getVisiblePages(null, props.pages)
        };
    }

    static propTypes = {
        pages: PropTypes.number,
        page: PropTypes.number,
        PageButtonComponent: PropTypes.any,
        onPageChange: PropTypes.func,
        previousText: PropTypes.string,
        nextText: PropTypes.string
    };

    componentWillReceiveProps(nextProps) {
        if (this.props.pages !== nextProps.pages) {
            this.setState({
                visiblePages: this.getVisiblePages(null, nextProps.pages)
            });
        }

        this.changePage(nextProps.page + 1);
    }

    filterPages = (visiblePages, totalPages) => {
        return visiblePages.filter(page => page <= totalPages);
    };

    getVisiblePages = (page, total) => {
        if (total < 7) {
            return this.filterPages([1, 2, 3, 4, 5, 6], total);
        } else {
            if (page % 5 >= 0 && page > 4 && page + 2 < total) {
                return [1, page - 1, page, page + 1, total];
            } else if (page % 5 >= 0 && page > 4 && page + 2 >= total) {
                return [1, total - 3, total - 2, total - 1, total];
            } else {
                return [1, 2, 3, 4, 5, total];
            }
        }
    };

    changePage(page) {
        const activePage = this.props.page + 1;

        if (page === activePage) {
            return;
        }

        const visiblePages = this.getVisiblePages(page, this.props.pages);

        this.setState({
            visiblePages: this.filterPages(visiblePages, this.props.pages)
        });

        this.props.onPageChange(page - 1);
    }

    render() {
        const { visiblePages } = this.state;
        const activePage = this.props.page + 1;

        return (
            <Pagination className="d-inline-block" size="sm" listClassName="justify-content-center" aria-label="Page navigation example">

                <PaginationItem className={`${activePage === 1 && "disabled"}`}>
                    <PaginationLink
                        className={"prev"}
                        onClick={() => {
                            if (activePage === 1) return;
                            this.changePage(activePage - 1);
                        }}
                        disabled={activePage === 1}>
                        <i className="simple-icon-arrow-left" />
                    </PaginationLink>

                </PaginationItem>


                {visiblePages.map((page, index, array) => {
                    return (
                        <PaginationItem
                            key={page}
                            active={activePage === page ? true : false}
                        >
                            <PaginationLink
                                onClick={this.changePage.bind(null, page)}
                            >
                                {array[index - 1] + 2 < page ? `...${page}` : page}
                            </PaginationLink>

                        </PaginationItem>
                    );
                })}

                <PaginationItem className={`${activePage === this.props.pages && "disabled"}`}>
                    <PaginationLink
                        className={"next"}
                        onClick={() => {
                            if (activePage === this.props.pages) return;
                            this.changePage(activePage + 1);
                        }}
                        disabled={activePage === this.props.pages}>
                        <i className="simple-icon-arrow-right" />
                    </PaginationLink>

                </PaginationItem>

            </Pagination>
        );
    }
}
