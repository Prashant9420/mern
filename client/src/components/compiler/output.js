import React, { useEffect, useState } from 'react'

const Output = (props) => {
  return (
    <div>
      <textarea
        name="editor"
        placeholder="your output here..."
        value={props.outRes}
        cols="30"
        style={{marginLeft:'50px', border:'2px solid black',backgroundColor:'#121212',color:'white',padding:'5px 5px',borderRadius:'10px'}}
        rows="9"
      />
    </div>
  )
}

export default Output;