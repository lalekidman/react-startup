import React from 'react'
import PrivateRoute from '../utils/PrivateRouter'
import {Switch, withRouter} from 'react-router-dom'
import Toast from '../utils/Toast'
import {bindActionCreators} from 'react'
import {connect} from 'react-redux'
class Wrapper extends React.Component {
  render () {
    return (
      <div>
        <Switch>
          {/* <PrivateRoute path='/login' exact component={LoginForm} needAuthed={false} isAuthed={false} redirectTo={'/'} />
          <PrivateRoute path='/' component={Main} needAuthed={false} isAuthed={false} redirectTo={'/login'} /> */}
        </Switch>
        <Toast />
      </div>
    )
  }
}
// const mapStateToProps = () => {
//   return {
    
//   }
// }
// const mapDispatchToProps = (dispatch) => {
//   return bindActionCreators({
//   }, dispatch)
// }
export default Wrapper
// export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Wrapper))
