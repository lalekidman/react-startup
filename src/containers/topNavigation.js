import React from 'react'
import {Link} from 'react-router-dom'
import {IMAGE_LOGO, LOGOUT} from '../utils/constants'
export default () => {
  return (
    <nav className='navbar navbar-expand-lg navbar-light'>
      <div className='container'>
        <Link to='/' className='navbar-brand'><img className='image-logo' src={IMAGE_LOGO}/></Link>
        <button className='navbar-toggler' type='button' data-toggle='collapse' data-target='#navbarSupportedContent' aria-controls='navbarSupportedContent' aria-expanded='false' aria-label='Toggle navigation'>
          <span className='navbar-toggler-icon' />
        </button>

          <ul className="nav justify-content-end">
            <li className="nav-item">
              <Link className="nav-link logout-botton" to='/logout'>Logout <img className = '' src={LOGOUT}/></Link>
            </li>
          </ul>
      </div>
    </nav>
  )
}
