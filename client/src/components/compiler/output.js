import React, { useEffect, useState } from 'react'
import styles from './output.module.css'
const Output = (props) => {
  return (
    <div>
      <textarea
        name="editor"
        placeholder="your output here..."
        value={props.outRes}
        cols="30"
        className={styles.output}
        rows="9"
      />
    </div>
  )
}

export default Output;