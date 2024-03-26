import React, { useState, useContext } from 'react';
import LoginInfoContext from '../Context/LoginContext'
import axios from "axios";
import { Document, Page, pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;


export default function Upload() {
    const [file, setFile] = useState(null);
    const [numPages, setNumPages] = useState(null);
    const [checkedPages, setCheckedPages] = useState({});
    const [pageArray, setPageArray] = useState([]);
    const [pdfUrl, setPdfUrl] = useState('');
    const { email, setEmail } = useContext(LoginInfoContext)


    const onFileChange = (e) => {
        setFile(e.target.files[0]);
        setPageArray([]);
        setPdfUrl('')
    }

    const onDocumentLoadSuccess = ({ numPages }) => {
        setNumPages(numPages);
    }

    const fileDetails = async () => {
        if (file == null) {
            alert("File not selected")
            return
        }
        const isEmptyPageArray = pageArray.length === 0;
        if (isEmptyPageArray) {
            alert("No page is selected")
            return
        }
        const formData = new FormData();

        formData.append("email", email)
        formData.append("file", file);
        formData.append("query", JSON.stringify(pageArray));

        try {
            const response = await axios.post("http://localhost:4000/upload", formData, {
                headers: { "Content-Type": "multipart/form-data" },
                responseType: 'arraybuffer',
            });
            const uint8Array = new Uint8Array(response.data);
            const blob = new Blob([uint8Array], { type: 'application/pdf' });
            const url = URL.createObjectURL(blob);
            setPdfUrl(url)
        } catch (error) {
            console.log("Error:", error);
        }
    };

    const toggleElementFromArray = (num) => {
        const index = pageArray.indexOf(num - 1);
        if (index !== -1) {
            setPageArray(prevArray => prevArray.filter(item => item !== num - 1));
        } else {
            setPageArray(prevArray => [...prevArray, num - 1]);
        }
    };

    const handleCheckboxChange = (pageNumber) => {
        setCheckedPages(prevState => ({
            ...prevState,
            [pageNumber]: !prevState[pageNumber]
        }));
        toggleElementFromArray(pageNumber)
    }

    const showPdf = (pdf) => {
        window.open(`${pdfUrl}`, "_blank", "noreferrer");
    };

    return (
        <>
            <div className="container custom_container">
                <input type="file" accept="application/pdf" onChange={onFileChange} />
                <button type="button" className="btn btn-secondary" onClick={fileDetails}>Upload</button>
                {pdfUrl && (
                    <>
                        <button type="button" className="btn btn-secondary" onClick={showPdf}>Show pdf</button>
                        <a className="link-opacity-75" href={pdfUrl} download>Download</a>
                    </>
                )}
                {file && (
                    <Document
                        file={file}
                        onLoadSuccess={onDocumentLoadSuccess}
                        renderMode="canvas"
                        className="pageBox"
                    >
                        {Array.from(
                            new Array(numPages),
                            (el, index) => (
                                <div className='pageElement' key={`page_${index + 1}`}>
                                    <Page
                                        pageNumber={index + 1}
                                        className="page"
                                        renderAnnotationLayer={false} renderTextLayer={false}
                                    />
                                    <input
                                        type="checkbox"
                                        className="btn-check"
                                        id={`page_${index + 1}`}
                                        autoComplete="off"
                                        checked={checkedPages[index + 1] || false}
                                        onChange={() => handleCheckboxChange(index + 1)}
                                    />
                                    <label
                                        className="btn btn-outline-primary"
                                        htmlFor={`page_${index + 1}`}
                                    >
                                        Checkbox {index + 1}
                                    </label>
                                </div>
                            ),
                        )}
                    </Document>
                )}
                <ul className="list-group list-group-horizontal">
                    {
                        pageArray.map((num) => (
                            <li key={num} className="list-group-item">Page {num+1}</li>
                        ))
                    }
                </ul>
            </div>
        </>
    );
}
