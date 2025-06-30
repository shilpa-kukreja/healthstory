

import React from 'react'

const CommonHeadline = ({ title, subtitle }) => {
     return (
          <>

               <div className="common_headline ">

                    <div className="container">
                         <span className='common_subtitle'>{subtitle}</span>
                         
                         <h2 className='common_title'>{title}</h2>

                    </div>

               </div>

          </>
     )
}

export default CommonHeadline