import React from 'react'
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux'
import * as firebase from 'firebase'
import TextDisplay from '../../utils/TextDisplay'
const GetItemList = (props) => {
  const {currentServedQueue = {}, name = ''} = props || {}
  const {bookingNo = ''} = currentServedQueue
  return (
    <div className='row queue-content'>
      <div className='col-8'>
        <span><TextDisplay label={name} /></span>
      </div>
      <div className='col-4'>
        <span><TextDisplay label={bookingNo} /></span>
      </div>
    </div>
  )
}
class Wrapper extends React.Component {
  constructor (props) {
    super (props)
    this.db = firebase.firestore()
    this.state = {
      itemList: []
    }
  }
  handleKeyDown = ({which}) => {
    if (which === 27) {
      // const element = document.body;
      // this.toggleFullScreen()
      // const requestMethod = element.requestFullScreen || element.webkitRequestFullScreen || element.mozRequestFullScreen || element.msRequestFullScreen;
      // if (requestMethod) { // Native full screen.
      //   // requestMethod()
      //   requestMethod.call(element);
      //   console.log('go here')
      // } else if (typeof window.ActiveXObject !== "undefined") { // Older IE.
      //     // var wscript = new window.ActiveXObject("WScript.Shell");
      //     // if (wscript !== null) {
      //     //     wscript.SendKeys("{F11}");
      //     // }
      // }
      // const rfs = el.requestFullScreen || el.webkitRequestFullScreen || el.mozRequestFullScreen|| el.msRequestFullScreen
      // if (rfs) {
      //   rfs()
      // }
      // console.e
      // this.rfs.call(this.el)
      // console.log('heheheh')
      // if (!(!window.screenTop && !window.screenY)) {
      //   this.props.history.push('/')
      // }
    }
  }
  toggleFullScreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen(); 
      }
    }
  }
  componentWillMount () {
    document.addEventListener('keydown', this.handleKeyDown.bind(this))
    const {id} = this.props.authentication.data
    this.db.collection('entity').doc(id).collection('queue').onSnapshot((snap) => {
      this.setState({
        itemList: snap.docs.map((el, ind) => {
          const data = el.data()
          return <GetItemList key={ind} {...data}/>
        })
      })
    })
  }
  componentDidMount () {
    console.log('document: ', document.fullscreenEnabled)
  }
  componentWillUnmount () {
    document.removeEventListener('keydown', this.handleKeyDown.bind(this))
  }
  render () {
    return (
      <div>
        <div className='container queue-full-screen'>
          <div className='row'>
            <div className='col-6'>
              <div className='queue-full-screen-header'>
                <h3>Queue List</h3>
              </div>
              <div className='queue-container'>
                <div className='row queue-header'>
                  <div className='col-6 queue-header-text'>
                    <span>Queue Group</span>
                  </div>
                  <div className='col-6 queue-header-text'>
                    <span>Current Serving Queue No</span>
                  </div>
                </div>
                  {this.state.itemList}
              </div>
            </div>
            <div className='col-6'>
            IMG IMG IMGIMG IMG IMGIMG IMG IMGIMG IMG IMGIMG IMG IMGIMG IMG IMGIMG IMG IMG
            IMG IMG IMGIMG IMG IMGIMG IMG IMGIMG IMG IMGIMG IMG IMGIMG IMG IMGIMG IMG IMG
            IMG IMG IMGIMG IMG IMGIMG IMG IMGIMG IMG IMGIMG IMG IMGIMG IMG IMGIMG IMG IMG
            IMG IMG IMGIMG IMG IMGIMG IMG IMGIMG IMG IMGIMG IMG IMGIMG IMG IMGIMG IMG IMG
            IMG IMG IMGIMG IMG IMGIMG IMG IMGIMG IMG IMGIMG IMG IMGIMG IMG IMGIMG IMG IMG
            IMG IMG IMGIMG IMG IMGIMG IMG IMGIMG IMG IMGIMG IMG IMGIMG IMG IMGIMG IMG IMG
            IMG IMG IMGIMG IMG IMGIMG IMG IMGIMG IMG IMGIMG IMG IMGIMG IMG IMGIMG IMG IMG
            IMG IMG IMGIMG IMG IMGIMG IMG IMGIMG IMG IMGIMG IMG IMGIMG IMG IMGIMG IMG IMG
            IMG IMG IMGIMG IMG IMGIMG IMG IMGIMG IMG IMGIMG IMG IMGIMG IMG IMGIMG IMG IMGIMG IMG IMGIMG IMG IMGIMG IMG IMGIMG IMG IMGIMG IMG IMGIMG IMG IMGIMG IMG IMG
            IMG IMG IMGIMG IMG IMGIMG IMG IMGIMG IMG IMGIMG IMG IMGIMG IMG IMGIMG IMG IMG
            IMG IMG IMGIMG IMG IMGIMG IMG IMGIMG IMG IMGIMG IMG IMGIMG IMG IMGIMG IMG IMG
            IMG IMG IMGIMG IMG IMGIMG IMG IMGIMG IMG IMGIMG IMG IMGIMG IMG IMGIMG IMG IMG
            IMG IMG IMGIMG IMG IMGIMG IMG IMGIMG IMG IMGIMG IMG IMGIMG IMG IMGIMG IMG IMG
            IMG IMG IMGIMG IMG IMGIMG IMG IMGIMG IMG IMGIMG IMG IMGIMG IMG IMGIMG IMG IMG
            IMG IMG IMGIMG IMG IMGIMG IMG IMGIMG IMG IMGIMG IMG IMGIMG IMG IMGIMG IMG IMGIMG IMG IMGIMG IMG IMGIMG IMG IMGIMG IMG IMGIMG IMG IMGIMG IMG IMGIMG IMG IMG
            IMG IMG IMGIMG IMG IMGIMG IMG IMGIMG IMG IMGIMG IMG IMGIMG IMG IMGIMG IMG IMG

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