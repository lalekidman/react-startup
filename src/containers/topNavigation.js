import React from 'react'
import {Link} from 'react-router-dom'
// import adminLogo from '../images/admin-logo.png'
// import adminLogoDark from '../images/admin-logo-dark.png'
// import adminText from '../images/admin-text.png'
// import adminTextDark from '../images/admin-text-dark.png'
// import UserImage from '../images/users/varun.jpg'
export default () => {
  return (
    <nav className='navbar navbar-expand-lg navbar-light bg-light'>
      <div className='container'>
        <Link to='/' className='navbar-brand'>Dashboard</Link>
        <button className='navbar-toggler' type='button' data-toggle='collapse' data-target='#navbarSupportedContent' aria-controls='navbarSupportedContent' aria-expanded='false' aria-label='Toggle navigation'>
          <span className='navbar-toggler-icon' />
        </button>

        <div className='collapse navbar-collapse' id='navbarSupportedContent'>
          <ul className='navbar-nav mr-auto'>
            <li className='nav-item active'>
              <Link to='/users' className='nav-link'> <span className='sr-only'>(current)</span> Users</Link>
            </li>
            <li className='nav-item'>
              <Link to='/company' className='nav-link'>Company</Link>
            </li>
            <li className='nav-item'>
              <Link to='/login' className='nav-link'>Login</Link>
            </li>
          </ul>
          {/* <form className='form-inline my-2 my-lg-0'>
            <input className='form-control mr-sm-2' type='search' placeholder='Search' aria-label='Search' />
            <button className='btn btn-outline-success my-2 my-sm-0' type='submit'>Search</button>
          </form> */}
        </div>
      </div>
    </nav>
  )
}
