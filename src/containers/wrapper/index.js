import React from 'react'
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux'
import * as firebase from 'firebase'
import TextDisplay from '../../utils/TextDisplay'
import Fullscreen from "react-full-screen";
import {DEFAULT_IMAGE_LOGO, SCREEN_MAX, SCREEN_MIN, KYOO_BG} from '../../utils/constants'
const GetItemList = (props) => {
  const {min, max, bookingNo} = props
  // const {currentServedQueue = {}, name = '', minCapacity = 0, maxCapacity = 0} = props || {}
  // const {bookingNo = ''} = currentServedQueue
  return (
    <div className='row bookingList'>
      <div className='col-12'>
        {bookingNo ? <span className='bookingNo'>{bookingNo}</span> : <span className='bookingNo empty'>------</span>}<br/>
        <span className='noOfSeats'>{checkCapacityLabel(min, max)} Seats</span>
      </div>
    </div>
  )
}
const checkCapacityLabel = (min, max) => {
  return min >= 10 ? '10+' : `${min}-${max}`
}
class Wrapper extends React.Component {
  constructor (props) {
    super (props)
    this.db = firebase.firestore()
    // console.log('props: ', props.authentication)
    // this.authData = props.authentication
    this.unsubscribe = {}
    this.state = {
      itemList: [
        {
          last: false,
          min: 1,
          max: 2,
          bookingNo: ''
        },
        {
          last: false,
          min: 3,
          max: 6,
          bookingNo: ''
        },
        {
          last: false,
          min: 6,
          max: 10,
          bookingNo: ''
        },
        {
          last: true,
          min: 10,
          max: 11,
          bookingNo: ''
        }
      ],
      bookingList: [],
      adsList: [],
      isFull: false,
      adsImage: KYOO_BG
    }
    this.adsCounter = 0
  }
  componentWillMount () {
    const {id} = this.props.authentication.data
    const {itemList} = this.state
    const entityCol = this.db.collection('entity').doc(id)
    this.unsubscribe = entityCol.collection('queue').onSnapshot((snap) => {
      let allBookingNums = []
      const data = snap.docs.map(el => (el.data()))
      this.setState({
        bookingList: itemList.map((item, ind) => {
          const bookings = data.filter((el, ind) => {
            const {noOfSeats = 0} = el.currentServedQueue || {}
            return ((item.min <= noOfSeats && item.max >= noOfSeats) || (item.last && noOfSeats >= item.min))
          }).map(el => {
            const {bookingNo = '', createdAt = 0} = el.currentServedQueue || {}
            return {bookingNo, createdAt}
          })
          Object.assign(item, {bookingNo: bookings.length >= 1 ? bookings.sort((el1, el2) => (el2.createdAt - el1.createdAt))[0].bookingNo : '' })
          return <GetItemList key={ind} {...item}/>
        })
      })
    })
    entityCol.collection('ads').onSnapshot((snap) => {
      this.setState({
        adsList: snap.docs.map(el => (el.data().avatarUrl))
      }, () => {
        this.handleAdsDisplay()
      })
    })
  }
  componentDidMount() {
    window.setInterval(() => {
      this.handleAdsDisplay() 
    }, 5000)
  }
  componentWillUnmount () {
    this.unsubscribe()
    console.log('Unsubscribe')
  }
  handleAdsDisplay (state) {
    const {adsList} = state || this.state
    const len = adsList.length
    if (len) {
      if (this.adsCounter <= (len - 1)) {
        this.setState({
          adsImage: adsList[this.adsCounter]
        })
        this.adsCounter++
      } else {
        this.adsCounter = 0
      }
    }
  }
  handleFullScreenButton = () => {
    const elt = document.getElementById('wrapper')
    if (elt.requestFullscreen) {
      elt.requestFullscreen();
    } else if (elt.msRequestFullscreen) {
      elt.msRequestFullscreen();
    } else if (elt.mozRequestFullScreen) {
      elt.mozRequestFullScreen();
    } else if (elt.webkitRequestFullscreen) {
      elt.webkitRequestFullscreen();
    } else {
      console.error("Fullscreen not available");
    }
  }
  exitFullscreen = () => {
    if(document.exitFullscreen) {
      document.exitFullscreen();
    } else if(document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if(document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
  }

  render () {
    const {avatarURL, name} = this.props.authentication.data
    const {adsImage, bookingList} = this.state
    return (
      <div>
        <div className='row' id = 'wrapper'>
          <div className='col-6'>
            <div className='left-panel' >
              <div className='business-details'>
                <div className='row'>
                  <div className='col-2'>
                    <img src={avatarURL || DEFAULT_IMAGE_LOGO} />
                  </div>
                  <div className='col-10'>
                    <span className='business-name'>{name}</span> <br />
                    <span className='serving-label'>Now Serving queue number: </span>
                  </div>
                </div>
              </div>
              <div className='queue-container'>
                  {bookingList}
              </div>
            </div>
          </div>
          <div className='col-6 right-panel'>
            <div className='full-screen-btn'>
              <button onClick={this.handleFullScreenButton} className='btn btn-primary max-screen-btn'><img src={SCREEN_MAX}/> Full Screen</button>
              <button onClick={this.exitFullscreen} className='min-screen-btn'><img src={SCREEN_MIN}/></button>
            </div>
            <img src={adsImage} className = 'adsImage'/>
          </div>
        </div>
      </div>
    )
  }
}
const mapStateToProps = ({authentication}) => {
  return {
    authentication
  }
}
const mapDispatchToProps = (dispatcher) => {
  return bindActionCreators({}, dispatcher)
}
export default connect(mapStateToProps, mapDispatchToProps)(Wrapper)