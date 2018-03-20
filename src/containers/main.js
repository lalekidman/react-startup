import React from 'react'
import TopNavigation from './topNavigation'
import LeftNavigation from './leftNavigation'
import Router from './router'
export default (props) => {
  return (
    <div>
      <TopNavigation />
      {/* <LeftNavigation /> */}
      <div className='container'>
        <Router {...props} />
      </div>
    </div>
  )
}
