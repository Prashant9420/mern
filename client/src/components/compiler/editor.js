import React, { useEffect, useState } from 'react';
import Output from './output';
import Editor from "@monaco-editor/react";
import 'reactjs-popup/dist/index.css';
import 'react-toastify/dist/ReactToastify.min.css';
import { toast } from 'react-toastify';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
// import Button from '@mui/material/Button';
const CodeEditor = (props) => {
    const [codeContent, setCodeContent] = useState("");
    const [input, setInput] = useState("");
    const [output, setOutput] = useState("");
    const [fileName, setFileName] = useState("");
    const [codeIndex, setCodeIndex] = useState('');
    const [savedFiles, setSavedFiles] = useState([]);
    const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
    // const [langNameMapper,setLNM]=useState({'python3':'Python','java':'Java','js':'JavaScript','cpp':'C++','csharp':'C#','go':'Go'}) 
    // var qs = require('qs');
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
      };
      const style2 = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        display:'flex',
        justifyContent:'space-between',
        p: 4,
      };
    const getFiles = async () => {
        const res = await fetch('https://compiler-mern-app.onrender.com/getfiles', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 'email': JSON.parse(localStorage.userData).email })
        })
        const data = await res.json();
        let filesObj = [];
        // console.log(data.files[0]);
        data.files.map((i) => {
            filesObj.push(i)
        })
        console.log(filesObj)
        setSavedFiles(filesObj);
    }

    // --under construction----------------------------------------------------------------

    const fileSaver = async () => {
        // setToSave(false);
        handleClose();
        let fileData = {
            codeContent, 'lang': props.pl, fileName, 'email': JSON.parse(localStorage.userData).email
        }
        console.log(fileData);
        const res = await fetch('https://compiler-mern-app.onrender.com/savefile', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(fileData)
        })
        const data = await res.json();
        console.log(data)
        if (res.status === 200) {
            toast("file Saved successfully!", {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                type: "success",
                theme: "colored",
            });
            getFiles();
        }

        else if (res.status === 400) {
            toast("something went wrong", {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                type: "error",
                theme: "colored",
            });
        }
        else {
            toast("Network Issue!", {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                type: "error",
                theme: "colored",
            });
        }
    }



    // --under construction----------------------------------------------------------------

    useEffect(() => {
        getFiles()
    }, [])
    const compiler = async () => {
        toast("compiling", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            type: "info",
            theme: "colored",
        });
        const url = 'https://online-code-compiler.p.rapidapi.com/v1/';
        console.log(props.pl);
        const options = {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'X-RapidAPI-Key': '90bd40ce10msh258b2cb26127467p11b466jsn48addbb5d8cf',
                'X-RapidAPI-Host': 'online-code-compiler.p.rapidapi.com'
            },
            body: JSON.stringify({
                language: props.pl,
                version: 'latest',
                code: codeContent,
                input: input
            })
        };

        try {
            const response = await fetch(url, options);
            const result = await response.json();
            setOutput(result.output)
        } catch (error) {
            console.error(error);
            setOutput("Error: Network issue..!!")
        }
    }
    const onChange = (newValue) => {
        setCodeContent(newValue);
    }
    const copyCode = () => {
        navigator.clipboard.writeText(codeContent);
    }
    const contentSetter = (event) => {
        setCodeIndex(event.target.value);
        console.log(event.target.value);
        if (event.target.value === 'noFile') {
            setCodeContent("");
            return;
        }
        // alert(langNameMapper[JSON.parse(localStorage.userData).files[0].language]);
        props.setPl(savedFiles[event.target.value].language)
        setCodeContent(savedFiles[event.target.value].fileContent);
    };
    return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center' }}>

            <div>
                <Button
                    onClick={() => compiler()}
                    variant="contained"
                    style={{ margin: '10px 10px' }}
                >Run</Button>
                <Button
                    onClick={() => copyCode()}
                    variant="contained"
                    style={{ margin: '10px 10px' }}
                >Copy Code</Button>
      <Button variant="contained" onClick={handleOpen}>Save File</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style2}>
            <TextField id="outlined-basic" label="File Name" variant="outlined" onChange={(e) => setFileName(e.target.value)} />
            <Button style={{ backgroundColor: 'yellowgreen'}} onClick={() => fileSaver()}>save</Button>
        </Box>
      </Modal>
    
                <Button
                    onClick={() => { setCodeContent(""); setCodeIndex('noFile') }}
                    variant="contained"
                    style={{ margin: '10px 10px' }}
                >New File</Button>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">My Files</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={codeIndex}
                        label="Age"
                        onChange={contentSetter}
                    >
                        <MenuItem value="noFile">No File</MenuItem>
                        {savedFiles.map((file, i) => <MenuItem value={i}>{file.fileName}</MenuItem>)}
                    </Select>
                </FormControl>
            </div>
            <div style={{display:'flex', width:'100%'}}>
            
            <Editor
                height='50vh'
                width='70vw'
                options={{
                    scrollBeyondLastLine: false,
                    fontSize: "30px"
                }}
                defaultLanguage="java"
                defaultValue="//enter your code here"
                value={codeContent}
                theme="vs-dark"
                onChange={onChange}
            />
            <div style={{display:'flex',flexDirection:'column',justifyContent:'space-around'}}>
            <textarea
                id=""
                cols="30"
                rows="9"
                style={{ marginLeft:'50px', border: '2px solid black', backgroundColor: '#121212', color: 'white', padding: '5px 5px', borderRadius: '10px' }}
                placeholder="enter inputs here..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
            />
            <Output outRes={output} /></div></div>
        </div>
    );
}

export default CodeEditor;