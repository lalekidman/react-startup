import React from 'react'
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux'
import * as firebase from 'firebase'
import TextDisplay from '../../utils/TextDisplay'
import Fullscreen from "react-full-screen";
import {DEFAULT_IMAGE_LOGO, SCREEN_MAX, SCREEN_MIN, KYOO_BG} from '../../utils/constants'
import Logo from '../../images/Kyoo Logo.png'
import $ from 'jquery'
const GetItemList = (props) => {
  // const {min, max} = props
  const {currentServedQueue = {}, name = '', minCapacity = 0, maxCapacity = 0} = props || {}
  const {bookingNo = ''} = currentServedQueue
  return (
    <div className='row bookingList'>
      <div className='col-12'>
        {bookingNo ? <span className='bookingNo'>{bookingNo}</span> : <span className='bookingNo empty'>------</span>}<br/>
        {/* <span className='noOfSeats'>{checkCapacityLabel(minCapacity, maxCapacity)} Seats</span> */}
        <span className='noOfSeats'>{name}</span>
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
      displayedQueue: {},
      bookingList: [],
      adsList: [],
      isFull: false,
      indicators: [],
      adsImage: KYOO_BG
    }
    this.adsCounter = 0
  }
  componentWillMount () {
    const {id} = this.props.authentication.data
    const {itemList} = this.state
    const entityCol = this.db.collection('entity').doc(id)
    this.unsubscribe = entityCol.collection('queue').orderBy('createdAt').onSnapshot((snap) => {
      let allBookingNums = []
      const data = snap.docs
      const queueGroups = [[]]
      for (let x = 0; x < data.length; x++) {
        let QGLen = (queueGroups.length - 1)
        if (queueGroups[QGLen].length >= 4) {
          queueGroups.push([])
          QGLen++
        }
        queueGroups[QGLen].push(data[x])
      }
      this.setState({
        bookingList: queueGroups.map((queueGroup, ind) => {
          return (
            <div className={`carousel-item ${ind === 0 ? 'active': ''}`} key={ind}>
              <div className='queue-container'>
                {queueGroup.map((queues, index) => {
                  return <GetItemList key={index} {...queues.data()}/>
                })}
              </div>
            </div>
          )
        }),
        indicators: queueGroups.map((el, ind) => {
          return (
            <li data-target="#queue-group-list" data-slide-to={ind} key={ind} className={ind === 0? 'active' : ''}></li>
          )
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
    entityCol.onSnapshot((snap) => {
      const {displayedQueue = {}} = snap.data()
      this.setState({
        displayedQueue
      })
    })
  }
  componentDidMount() {
    window.setInterval(() => {
      this.handleAdsDisplay() 
    }, 5000)
    $('.carousel').carousel({
      interval: 2000
    })
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
    const {adsImage, bookingList, displayedQueue, indicators} = this.state
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
              <div id="queue-group-list" className="carousel slide" data-ride="carousel">
                <ol className="carousel-indicators">
                  {indicators}
                </ol>
                <div className="carousel-inner">
                  {bookingList}
                </div>
              </div>
              <div className='footer-logo'>
                <img src={Logo}/>
              </div>
            </div>
          </div>
          <div className='col-6'>
            <div className='right-panel'>
              <div className='full-screen-btn'>
                <button onClick={this.handleFullScreenButton} className='btn btn-primary max-screen-btn'><img src={SCREEN_MAX}/> Full Screen</button>
                <button onClick={this.exitFullscreen} className='min-screen-btn'><img src={SCREEN_MIN}/></button>
              </div>
              <img src={adsImage} className = 'adsImage'/>
              < div className='current-serving'>
                <span className='current-serving-title'>Current Serving</span>
                <span className='bookingNo'> {displayedQueue.bookingNo || '------'} </span>
                <span className='current-serving-footer'>{displayedQueue.queueGroupName || '------'}</span>
              </div>
            </div>
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