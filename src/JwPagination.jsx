import React from 'react';
import PropTypes from 'prop-types';
import paginate from 'jw-paginate';

const propTypes = {
    items: PropTypes.array.isRequired,
    onChangePage: PropTypes.func.isRequired,
    initialPage: PropTypes.number,
    pageSize: PropTypes.number,
    labels: PropTypes.object,
    styles: PropTypes.object,
    disableDefaultStyles: PropTypes.bool
}

const defaultProps = {
    initialPage: 1,
    pageSize: 10,
    labels: {
        first: 'First',
        last: 'Last',
        previous: 'Previous',
        next: 'Next'
    }
}

class JwPagination extends React.Component {
    constructor(props) {
        super(props);
        this.state = { pager: {} };
        this.styles = {};

        if (!props.disableDefaultStyles) {
            this.styles = {
                ul: {
                    margin: 0,
                    padding: 0,
                    display: 'inline-block'
                },
                li: {
                    listStyle: 'none',
                    display: 'inline',
                    textAlign: 'center'
                },
                a: {
                    cursor: 'pointer',
                    padding: '6px 12px',
                    display: 'block',
                    float: 'left'
                }
            }
        }

        // merge custom styles with default styles
        if (props.styles) {
            this.styles = {
                ul: { ...this.styles.ul, ...props.styles.ul },
                li: { ...this.styles.li, ...props.styles.li },
                a: { ...this.styles.a, ...props.styles.a }
            };
        }
    }

    componentWillMount() {
        // set page if items array isn't empty
        if (this.props.items && this.props.items.length) {
            this.setPage(this.props.initialPage);
        }
    }

    componentDidUpdate(prevProps, prevState) {
        // reset page if items array has changed
        if (this.props.items !== prevProps.items) {
            this.setPage(this.props.initialPage);
        }
    }

    setPage(page) {
        var { items, pageSize } = this.props;
        var pager = this.state.pager;

        // get new pager object for specified page
        pager = paginate(items.length, page, pageSize);

        // get new page of items from items array
        var pageOfItems = items.slice(pager.startIndex, pager.endIndex + 1);

        // update state
        this.setState({ pager: pager });

        // call change page function in parent component
        this.props.onChangePage(pageOfItems);
    }

    render() {
        var pager = this.state.pager;
        var labels = this.props.labels;
        var styles = this.styles;

        if (!pager.pages || pager.pages.length <= 1) {
            // don't display pager if there is only 1 page
            return null;
        }

        return (
            <ul className="pagination" style={styles.ul}>
                <li className={`first ${pager.currentPage === 1 ? 'disabled' : ''}`} style={styles.li}>
                    <a onClick={() => this.setPage(1)} style={styles.a}>{labels.first}</a>
                </li>
                <li className={`previous ${pager.currentPage === 1 ? 'disabled' : ''}`} style={styles.li}>
                    <a onClick={() => this.setPage(pager.currentPage - 1)} style={styles.a}>{labels.previous}</a>
                </li>
                {pager.pages.map((page, index) =>
                    <li key={index} className={`page-number ${pager.currentPage === page ? 'active' : ''}`} style={styles.li}>
                        <a onClick={() => this.setPage(page)} style={styles.a}>{page}</a>
                    </li>
                )}
                <li className={`next ${pager.currentPage === pager.totalPages ? 'disabled' : ''}`} style={styles.li}>
                    <a onClick={() => this.setPage(pager.currentPage + 1)} style={styles.a}>{labels.next}</a>
                </li>
                <li className={`last ${pager.currentPage === pager.totalPages ? 'disabled' : ''}`} style={styles.li}>
                    <a onClick={() => this.setPage(pager.totalPages)} style={styles.a}>{labels.last}</a>
                </li>
            </ul>
        );
    }
}

JwPagination.propTypes = propTypes;
JwPagination.defaultProps = defaultProps;
export default JwPagination;
