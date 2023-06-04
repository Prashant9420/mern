import React, { useEffect, useState } from 'react';
import Output from './output';
import Editor from "@monaco-editor/react";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import 'react-toastify/dist/ReactToastify.min.css';
import { toast } from 'react-toastify';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Select, { SelectChangeEvent } from '@mui/material/Select';
// import MenuItem from '@mui/material/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
// import Button from '@mui/material/Button';
const CodeEditor = (props) => {
    const [codeContent, setCodeContent] = useState("");
    const [input, setInput] = useState("");
    const [output, setOutput] = useState("");
    const [fileName, setFileName] = useState("");
    const [codeIndex, setCodeIndex] = useState('');

    const [toSave, setToSave] = useState(false);
    const [savedFiles, setSavedFiles] = useState([]);
    // const [langNameMapper,setLNM]=useState({'python3':'Python','java':'Java','js':'JavaScript','cpp':'C++','csharp':'C#','go':'Go'}) 
    // var qs = require('qs');

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
        setToSave(false);
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
        setOutput("loading...")
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
                <Popup trigger={<Button
                    variant="contained"
                    style={{ margin: '10px 10px' }}
                >Save File</Button>}>
                    <div style={{ display:'flex'}}>
                    <TextField id="outlined-basic" label="File Name" variant="outlined" onChange={(e) => setFileName(e.target.value)} />
                <Button style={{ backgroundColor: 'yellowgreen'}} onClick={() => fileSaver()}>save</Button></div>
                </Popup>
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

            <Editor
                height='50vh'
                width='95vw'
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
            <textarea
                id=""
                cols="30"
                rows="5"
                style={{ width: '80vw', border: '2px solid black', margin: '5px 0px', backgroundColor: '#121212', color: 'white', padding: '5px 5px', borderRadius: '10px' }}
                placeholder="enter inputs here..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
            />
            <Output outRes={output} />
        </div>
    );
}

export default CodeEditor;