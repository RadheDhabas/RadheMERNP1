import React from 'react'

function SearchProduct() {
 
  return (
    <div className='header_search'> 
      <form role="search" onSubmit={()=>{}}>
        <input type="search"
          placeholder="Search"
          aria-label="Search"  
          autoFocus = {(window.innerWidth<768)?true:false}
         
          
        />
        <button className="header_search_btn" type="submit" >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="#404040" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_1979_425)">
              <path d="M10.2739 9.0366C10.9629 8.09581 11.3749 6.94023 11.3749 5.68749C11.3749 2.55152 8.82343 0 5.68746 0C2.55149 0 0 2.55152 0 5.68749C0 8.82346 2.55152 11.375 5.68749 11.375C6.94023 11.375 8.09592 10.9628 9.03671 10.2739L12.7627 13.9999L14 12.7626C14 12.7626 10.2739 9.0366 10.2739 9.0366ZM5.68749 9.62497C3.51623 9.62497 1.75001 7.85875 1.75001 5.68749C1.75001 3.51623 3.51623 1.75001 5.68749 1.75001C7.85875 1.75001 9.62497 3.51623 9.62497 5.68749C9.62497 7.85875 7.85872 9.62497 5.68749 9.62497Z" fill="#657A84" />
            </g>
            <defs>
              <clipPath id="clip0_1979_425">
                <rect width="14" height="14" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </button>
      </form>
    </div>
  )
}

export default SearchProduct