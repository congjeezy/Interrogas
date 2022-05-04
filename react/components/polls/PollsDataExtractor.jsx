import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Formik, Form, Field } from 'formik';
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';
import filesService from '../../services/filesService';
import '../account/userAuth.css';
import { Success, Error } from './pollsSwal';
import debug from 'sabio-debug';

function PollsDataExtractor(props) {
    const _logger = debug.extend('PollDataExtractor');
    const [initial] = useState({ file: '' });
    const [file, setCurrentFile] = useState('');
    const [pages, setPages] = useState({ total: 1 });

    useEffect(() => {
        if (file) {
            const pdfData = new FormData();
            pdfData.append('files', file);
            filesService.extract(pdfData).then(onExtractSuccess).catch(onExtractError);
        }
    }, [file]);

    const onExtractError = (response) => {
        const errorResponse = response.response.data.errors;
        Error('PDF data could not be extracted', errorResponse);
        props.retrieveData({ errorResponse, file });
    };

    const onExtractSuccess = (response) => {
        Success('Successfully extracted data');
        _logger(response);
        props.retrieveData({ response, file });
    };

    const handleFile = (e) => {
        const targetFile = e.target.files[0];
        if (targetFile) {
            if (targetFile.type === 'application/pdf') {
                _logger('target file', targetFile);
                setCurrentFile(targetFile);
            } else {
                Error('Invalid File Type');
            }
        } else {
            resetValues();
        }
    };

    const resetValues = () => {
        _logger('no file');
        setCurrentFile('');
        setPages((prevState) => {
            let newPages = { ...prevState };
            newPages.total = 1;
            return newPages;
        });
    };

    return (
        <React.Fragment>
            <div>
                <Formik initialValues={initial} enableReinitialize={true}>
                    <Form onChange={handleFile}>
                        <label className="form-label mx-2">Upload PDF (optional)</label>
                        <Field type="file" name={'file'}></Field>
                    </Form>
                </Formik>
                <Document file={file} className="mx-2 my-1 error" error={'Must upload a PDF file'}>
                    <Page pageNumber={pages.total} />
                </Document>
            </div>
        </React.Fragment>
    );
}

PollsDataExtractor.propTypes = {
    retrieveData: PropTypes.func,
};

export default PollsDataExtractor;
