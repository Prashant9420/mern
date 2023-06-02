import React, { useEffect, useState } from 'react';
import Editor from './editor';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import style from './Home.module.css';
const Home = () => {
  const [lang, setLang] = useState("");
  const setLanguage = (e) => {
    setLang(e.target.value);
  }
  return (
    <div style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
      <FormControl fullWidth 
      // style={{width:'20vw',margin:'20px 10px'}}
      className={style.select}
      >
        <InputLabel id="demo-simple-select-label">Select Language</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={lang}
          label="Select Language"
          onChange={setLanguage}
        >
          <MenuItem value="python3">Python</MenuItem>
          <MenuItem value="java">Java</MenuItem>
          <MenuItem value="js">JavaScript</MenuItem>
          <MenuItem value="cpp">C++</MenuItem>
          <MenuItem value="csharp">C#</MenuItem>
          <MenuItem value="go">Go</MenuItem>
        </Select>
      </FormControl>
      <Editor pl={lang} setPl={setLang}/>
    </div>
  )
}

export default Home;