import React from 'react'
import '../CSS/HomePage.scss'

function Home_banner() {
  return (
    <div>
<div className='home_banner_bg'>
    <div className="overlay"></div>
<div className="bnner_text">
    <p className='bg_text1'>
    NEW COLLECTION
    </p>
    <h1 className='home_page_header'>
    Be different in your own way!
    </h1>
    <h2 className='home_page_subheader'>
    Find your unique style.
    </h2>
    <button>
    Shop Collection
    </button>
</div>
</div>
    </div>
  )
}

export default Home_banner