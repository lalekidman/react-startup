import React from 'react'
import PropTypes from 'prop-types'
import queryString from 'query-string'
class CPagination extends React.Component {
  constructor (props) {
    super(props)
    const query = queryString.parse(props.location.search)
    const DEFAULT_DISPLAY_NUMBER = 10
    const DEFAULT_PAGE_NUMBER = !isNaN(query.pn) ? parseInt(query.pn) : 1
    const DEFAULT_LIST_NUMBER = 10
    const DEFAULT_GAP_NUMBER = 4
    const displayNumber = props.displayNumber || DEFAULT_DISPLAY_NUMBER
    const listNumber = props.listNumber || DEFAULT_LIST_NUMBER
    let pageNumber = props.pageNumber || DEFAULT_PAGE_NUMBER
    let lastPage = Math.ceil(listNumber / displayNumber)
    if (lastPage < 1) {
      lastPage = 1
    } else if (lastPage < pageNumber) {
      pageNumber = lastPage
    }
    this.state = {
      number: props.numberRange || DEFAULT_GAP_NUMBER,
      pageNumber,
      displayNumber,
      listNumber,
      lastPage: this.getLastPage(listNumber, displayNumber)
    }
  }
  getLastPage (listNumber, displayNumber) {
    const lastPage = Math.ceil(listNumber / displayNumber)
    return (lastPage < 1) ? 1 : lastPage
  }
  handleClick = (x) => {
    const {search, pathname} = this.props.location
    const {lastPage, displayNumber} = this.state
    if (lastPage >= x) {
      const query = queryString.parse(search)
      const {pageNumber} = this.state
      this.props.history.push(`${pathname}?pn=${x}`)
      this.setState({
        pageNumber: parseInt(x)
      })
      this.props.handleChange(x, displayNumber)
    }
  }
  componentWillReceiveProps (newProps) {
    if (newProps.displayNumber !== this.state.displayNumber) {
      const {displayNumber, lastPage, pageNumber} = this.initializeData(newProps)
      this.setState({
        displayNumber,
        lastPage,
        pageNumber
      })
    }
    if (newProps.listNumber !== this.state.listNumber) {
      this.setState({
        listNumber: newProps.listNumber
      })
    }
  }
  initializeData = (newProps) => {
    let {pageNumber} = this.state
    let lastPage = this.getLastPage(newProps.listNumber, newProps.displayNumber)
    if (lastPage < 1) {
      lastPage = 1
    } else if (lastPage < pageNumber) {
      pageNumber = lastPage
    }
    const num = (pageNumber - 1)
    const startAt = num > 0 ? num * newProps.displayNumber : 1
    this.props.handleChange(startAt, newProps.displayNumber)
    return {startAt, displayNumber: newProps.displayNumber, lastPage, pageNumber}
  }
  componentDidMount () {
    this.initializeData(this.props)
  }
  lists () {
    const {pageNumber, displayNumber, lastPage, number} = this.state
    const data = []
    if (lastPage !== 1) {
      if (pageNumber > 1) {
        data.push(<li className="page-item" key={'Previous'}><a className="page-link" onClick={this.handleClick.bind(this, (pageNumber - 1))}>Previous</a></li>)
        const p1 = pageNumber - number
        for (let x = p1 > 0 ? p1 : 1; x < pageNumber; x++) {
          data.push(<li key={x} className="page-item" onClick={this.handleClick.bind(this, x)}><a className="page-link">{x}</a></li>)
        }
      } else {
        data.push(<li className="page-item" key={'Previous'}><a disabled={true} className="page-link disabled">Previous</a></li>)
      }
      data.push(<li key={pageNumber} className="page-item active"><a className="page-link">{pageNumber}</a></li>)
      for (let x = (pageNumber + 1); x <= lastPage; x++) {
        data.push(<li key = {x} className="page-item" onClick={this.handleClick.bind(this, x)}><a className="page-link">{x}</a></li>)
        if (x >= (pageNumber + number)) {
          break;
        }
      }
      if (pageNumber === lastPage) {
        data.push(<li className="page-item" key={'Next'}><a className="page-link disabled" disabled={true}>Next</a></li>)
      } else {
        data.push(<li className="page-item" key={'Next'}><a className="page-link" onClick={this.handleClick.bind(this, (pageNumber + 1))}>Next</a></li>)
      }
    } else {
      data.push(<li className="page-item" key={'Previous'}><a disabled={true} className="page-link disabled">Previous</a></li>)
      data.push(<li key={pageNumber} className="page-item active"><a className="page-link">{pageNumber}</a></li>)
      data.push(<li className="page-item" key={'Next'}><a disabled={true} className="page-link disabled">Next</a></li>)
    }
    return data
  }
  render () {
    return (
      <div className="row justify-content-between">
          <div className="col">
            <span>
              Show { this.state.displayNumber <= this.state.listNumber ? this.state.displayNumber : this.state.listNumber} out of {this.state.listNumber} results
            </span>
          </div>
          <div className="col">
            <nav aria-label="Page navigation example">
              <ul className="pagination">
                {this.lists()}
              </ul>
            </nav>
          </div>
      </div>
      
    )
  }
}
CPagination.propTypes = {
  handleChange: PropTypes.func.isRequired,
  pageNumber: PropTypes.number,
  listNumber: PropTypes.number,
  displayNumber: PropTypes.number
}
export default CPagination