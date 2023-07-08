import React from 'react'
import Header from './Header.js'
function Layout({children}) {
  return (
  <>
  <Header/>
  <main>
    {children}
  </main>
  </>
  )
}

export default Layout