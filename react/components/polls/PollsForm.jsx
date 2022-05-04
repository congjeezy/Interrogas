import React, { useState, useEffect } from "react";
import { Row, Col, Card, Button, Modal } from 'react-bootstrap';
import { Formik, Form, Field, ErrorMessage } from "formik";
import { insertSchema, updateSchema } from "./pollsSchema";
import * as pollsService from '../../services/pollsService';
import fileService from '../../services/filesService';
import PollsDataExtractor from "./PollsDataExtractor";
import debug from "sabio-debug"
import PropTypes from "prop-types";
import { Success, Error, TimedSucc } from './pollsSwal';

function PollsForm(props) {
  const _logger = debug.extend("polls");

  const localModalInsertShow = props.isInsertModalShown;
  const onLocalModalInsertClose = () => {props.modalInsertClose()};
  const localModalUpdateShow = props.isUpdateModalShown;
  const onLocalModalUpdateClose = () => {props.modalUpdateClose()};
  const onLocalUpdateTable = (payload) => {props.updateTable(payload)};

  //mutated state from onEdit from PollsPage
  const updateData = props.updateData;

  const [initialPollData, setInitialPollData] = useState({
    pollsterId: "",
    methodTypeId: "",
    dateTaken: "",
    datePublished: "",
    cost: "",
    referenceId: "",
    objective: "",
    electionYear: "",
    pollContentId: "",
    pollMethodTypes:[],
    pollster: [],
  });

  const [updateFormData, setUpdateFormData] = useState({
    pollId: "",
    pollsterId: "",
    methodTypeId: "",
    dateTaken: "",
    datePublished: "",
    cost: "",
    referenceId: "",
    objective: "",
    electionYear: "",
    pollContentId: "",
  });

  const [file, setFile] = useState();

  useEffect(() => {
    pollsService.getPollMethods().then(onGetPollMethodsSuccess).catch(onGetPollMethodsError);
    pollsService.getPollsters().then(onGetPollsterSuccess).catch(onGetPollsterError);

    if (updateData.pollster?.id > 0){
      setUpdateFormData((prevState) => {
        let update = { ...prevState };
        let dateTakenConvert = updateData.dateTaken.toString().slice(0,10);
        let datePublishedConvert = updateData.datePublished.toString().slice(0,10);

        update.pollId = updateData.id;
        update.pollsterId = updateData.pollster.id;
        update.methodTypeId = updateData.methodType.id;
        update.dateTaken = dateTakenConvert;
        update.datePublished = datePublishedConvert;
        update.cost = updateData.cost;
        update.referenceId = updateData.referenceId;
        update.objective = updateData.objective;
        update.electionYear = updateData.electionYear;
        update.pollContentId = updateData.pollContentId;
        return update;
      });
    };
  },[updateData]);

  const checkPollsters = (extractedPollster) => {
    _logger(extractedPollster);
    let pollsterId = '';
    initialPollData.pollster.forEach((element) => {
        if (extractedPollster.toLowerCase().includes(element.name.toLowerCase())) {
            pollsterId = element.id;
        }
    });
    return pollsterId;
  };

  const toDateFormat = (dateString) => {
    let dateArr = dateString.split('/');
    let dateStr = '';
    for (let i = dateArr.length - 1; i >= 0; i--) {
        const element = dateArr[i];
        dateStr += '-' + element;
    }
    return dateStr.replace('-', '');
};

  const onLocalRetrieveData = (data) => {
    _logger("DATA", data);
    const extractData = data.response.data.item;
    setFile(data.file);
    
    setInitialPollData((prevState) => {
      let pd = { ...prevState };
      pd.objective = extractData.objective;
      pd.cost = extractData.cost.replace(',', '').replace('$', '');
      pd.pollsterId = checkPollsters(extractData.pollsterName);
      pd.datePublished = toDateFormat(extractData.publicationDate);
      return pd;
    });
  };

  const onUploadSuccess = (response) => {
    _logger("file Uploaded!", response.data.items[0].url);
    Success("File Uploaded!");
  };
  const onUploadError = (error) => {
    _logger(error);
    Error("File Failed to Upload!", error);
  };

  const onSubmitSuccess = () => {
    if(file) {
      const formData = new FormData();
      formData.append('files', file);
      fileService.upload(formData).then(onUploadSuccess).catch(onUploadError);
    };
    onLocalModalInsertClose();
    TimedSucc("Poll Added!", "Successfully added a Poll!");
  };

  const onSubmitError = (error) => Error("Adding a Poll Failed!", `${error}`);

  const handleInsert = (formData) => {
    _logger("handleSubmit", formData);
    pollsService.add(formData).then(onSubmitSuccess).catch(onSubmitError);
  };

  const onUpdateSuccess = (poll) =>{
    //will force re-render of updated table row
    onLocalUpdateTable(poll.payload);
    onLocalModalUpdateClose();
    TimedSucc("Updated!", "Successfully updated Poll!");
  };

  const onUpdateError = (error) => Error("Update Failed!", `${error}`);

  const onUpdate = (id, payload) => {
    pollsService.update(id, payload).then(onUpdateSuccess).catch(onUpdateError);
  };

  const handleUpdate = (formData) => {
    _logger("handleUpdate", updateFormData.pollId, formData);
    onUpdate(updateFormData.pollId, formData);
  };
  
  const onGetPollMethodsSuccess = (response) => {
    setInitialPollData((prevState) => {
      const copy = { ...prevState };
      copy.pollMethodTypes = response.data.item.PollMethodTypes;
      return copy;
    });
  };

  const onGetPollMethodsError = (error) => {
    _logger(error);
  };

  const onGetPollsterSuccess = (response) => {
    setInitialPollData((prevState) => {
      const copy = { ...prevState };
      copy.pollster = response.data.item.Pollsters;
      return copy;
    });
  };

  const onGetPollsterError = (error) => {
    _logger(error);
  };

  const mapFormSelects = (option) => <option value={option.id} key={`dropDownSelect_${option.id}`}>{option.name}</option>;

  const insertForm = (
    <Modal
      show={localModalInsertShow}
      onHide={onLocalModalInsertClose}
      backdrop="static"
      keyboard={false}
      size="lg"
    >
    <Modal.Header closeButton>
      <Modal.Title className="w-100 text-center">Insert Poll</Modal.Title>  
    </Modal.Header>
    <Modal.Body>

    <PollsDataExtractor
      retrieveData={onLocalRetrieveData}
    />

      <Card>
        <Card.Body>
          <Row className="justify-content-center">
            <Col md={6}>
              <Formik
                enableReinitialize={true}
                initialValues={initialPollData}
                validationSchema={insertSchema}
                onSubmit={handleInsert}
                >
                <Form>                   
                  <div className="form-group mb-3 justify-content-center">
                    <label htmlFor="pollesterId">
                      Pollster
                    </label>
                    <Field 
                      component="select"
                      id="pollsterId"
                      name="pollsterId"
                      className="form-control"
                    >
                      <option value="0">Please select a pollster</option>
                      {initialPollData?.pollster.map(mapFormSelects)}
                    </Field>
                    <ErrorMessage name="pollsterId" component="div" className="has-error" />
                  </div>

                  <div className="form-group mb-3 justify-content-center">
                    <label htmlFor="pollContentId">
                      PollContentId
                    </label>
                    <Field 
                      type="text"
                      id="pollContentId"
                      name="pollContentId"
                      className="form-control"/>
                    <ErrorMessage name="pollContentId" component="div" className="has-error" />
                  </div>

                  <div className="form-group mb-3 justify-content-center">
                    <label htmlFor="referenceId">
                      ReferenceId
                    </label>
                    <Field 
                      type="text"
                      id="referenceId"
                      name="referenceId"
                      className="form-control"/>
                    <ErrorMessage name="referenceId" component="div" className="has-error" />
                  </div>

                  <div className="form-group mb-3">
                    <label htmlFor="methodTypeId">
                    Select Polling Method
                    </label>
                    <Field
                      component="select" 
                      id="methodTypeId"
                      name="methodTypeId"
                      className="form-control"
                    >
                      <option value="0">Please select a polling method</option>
                      {initialPollData?.pollMethodTypes.map(mapFormSelects)}

                    </Field>
                    <ErrorMessage name="methodTypeId" component="div" className="has-error" />                
                  </div>

                  <Row className="form-group mb-3 justify-content">
                    <Col lg={6}>
                      <label htmlFor="dateTaken">
                        DateTaken
                      </label>
                      <Field 
                        type="date"
                        id="dateTaken"
                        name="dateTaken"
                        className="form-control"/>
                      <ErrorMessage name="dateTaken" component="div" className="has-error" />
                    </Col>
                    <Col lg={6}>
                      <label htmlFor="datePublished">
                        DatePublished
                      </label>
                      <Field 
                        type="date"
                        id="datePublished"
                        name="datePublished"
                        className="form-control"/>
                      <ErrorMessage name="datePublished" component="div" className="has-error" /> 
                    </Col>                                      
                  </Row>

                  <Row>
                    <Col lg={6}>
                      <div className="form-group mb-3">
                        <label htmlFor="cost">
                          Cost
                        </label>
                        <Field 
                          type="text"
                          id="cost"
                          name="cost"
                          className="form-control"/>
                        <ErrorMessage name="cost" component="div" className="has-error" />
                      </div>
                    </Col>
                    <Col lg={6}>
                      <div className="form-group mb-3 justify-content-center">
                        <label htmlFor="electionYear">
                          ElectionYear
                        </label>
                        <Field 
                          type="text"
                          id="electionYear"
                          name="electionYear"
                          className="form-control"/>
                        <ErrorMessage name="electionYear" component="div" className="has-error" />
                      </div>
                    </Col>
                  </Row>

                  <div className="form-group mb-3 justify-content-center">
                    <label htmlFor="objective">
                      Objective
                    </label>
                    <Field
                      component="textarea" 
                      type="text"
                      rows="5"
                      id="objective"
                      name="objective"
                      className="form-control"/>
                    <ErrorMessage name="objective" component="div" className="has-error" />
                  </div>

                  <div className="mb-0 d-grid text-center">
                    <Button variant="primary" type="submit">
                        <i className="mdi"></i> {'Submit Poll'}
                    </Button>
                  </div>
                </Form>
              </Formik>
            </Col>
          </Row>
        </Card.Body>
      </Card>

    </Modal.Body>
      <Modal.Footer 
        className="justify-content-center">
        <Button 
        variant="secondary"
        onClick={onLocalModalInsertClose}
      >
        Close
        </Button>
      </Modal.Footer>
    </Modal>
  );

  const updateForm = (
    <Modal
      show={localModalUpdateShow}
      onHide={onLocalModalUpdateClose}
      backdrop="static"
      keyboard={false}
      size="lg"
    >
      <Modal.Header closeButton>
        <Modal.Title className="w-100 text-center">Update Poll-Id#: {updateFormData.pollId}</Modal.Title>  
      </Modal.Header>
      <Modal.Body>

        <Card>
          <Card.Body>
            <Row className="justify-content-center">
              <Col md={6}>
                <Formik
                  enableReinitialize={true}
                  initialValues={updateFormData}
                  validationSchema={updateSchema}
                  onSubmit={handleUpdate}>
                  <Form>                    

                    <div className="form-group mb-3 justify-content-center">
                      <label htmlFor="pollesterId">
                        Pollster
                      </label>
                      <Field 
                        component="select"
                        id="pollsterId"
                        name="pollsterId"
                        className="form-control"
                      >
                        <option value="0">Please select a pollster</option>
                        {initialPollData?.pollster.map(mapFormSelects)}
                      </Field>
                      <ErrorMessage name="pollsterId" component="div" className="has-error" />
                    </div>

                    <div className="form-group mb-3 justify-content-center">
                      <label htmlFor="pollContentId">
                        PollContentId
                      </label>
                      <Field 
                        type="text"
                        id="pollContentId"
                        name="pollContentId"
                        className="form-control"/>
                      <ErrorMessage name="pollContentId" component="div" className="has-error" />
                    </div>

                    <div className="form-group mb-3 justify-content-center">
                      <label htmlFor="referenceId">
                        ReferenceId
                      </label>
                      <Field 
                        type="number"
                        id="referenceId"
                        name="referenceId"
                        className="form-control"/>
                      <ErrorMessage name="referenceId" component="div" className="has-error" />
                    </div>

                    <div className="form-group mb-3">
                      <label htmlFor="methodTypeId">
                      Select Polling Method
                      </label>
                      <Field
                        component="select" 
                        id="methodTypeId"
                        name="methodTypeId"
                        className="form-control"
                      >
                        <option value="0">Please select a polling method</option>
                        {initialPollData?.pollMethodTypes.map(mapFormSelects)}
                      </Field>
                      <ErrorMessage name="methodTypeId" component="div" className="has-error" />                
                    </div>

                    <Row className="form-group mb-3 justify-content">
                      <Col lg={6}>
                        <label htmlFor="dateTaken">
                          DateTaken
                        </label>
                        <Field 
                          type="date"
                          id="dateTaken"
                          name="dateTaken"
                          className="form-control"/>
                        <ErrorMessage name="dateTaken" component="div" className="has-error" />
                      </Col>
                      <Col lg={6}>
                        <label htmlFor="datePublished">
                          DatePublished
                        </label>
                        <Field 
                          type="date"
                          id="datePublished"
                          name="datePublished"
                          className="form-control"/>
                        <ErrorMessage name="datePublished" component="div" className="has-error" /> 
                      </Col>                                      
                    </Row>

                    <Row>
                      <Col lg={6}>
                        <div className="form-group mb-3">
                          <label htmlFor="cost">
                            Cost
                          </label>
                          <Field 
                            type="text"
                            id="cost"
                            name="cost"
                            className="form-control"/>
                          <ErrorMessage name="cost" component="div" className="has-error" />
                        </div>
                      </Col>
                      <Col lg={6}>
                        <div className="form-group mb-3 justify-content-center">
                          <label htmlFor="electionYear">
                            ElectionYear
                          </label>
                          <Field 
                            type="text"
                            id="electionYear"
                            name="electionYear"
                            className="form-control"/>
                          <ErrorMessage name="electionYear" component="div" className="has-error" />
                        </div>
                      </Col>
                    </Row>

                    <div className="form-group mb-3 justify-content-center">
                      <label htmlFor="objective">
                        Objective
                      </label>
                      <Field
                        component="textarea" 
                        type="text"
                        rows="5"
                        id="objective"
                        name="objective"
                        className="form-control"/>
                      <ErrorMessage name="objective" component="div" className="has-error" />
                    </div>

                    <div className="mb-0 d-grid text-center">
                      <Button variant="primary" type="submit">
                          <i className="mdi"></i> {'Update Poll'}
                      </Button>
                    </div>
                    
                  </Form>
                </Formik>
              </Col>
            </Row>
          </Card.Body>
        </Card>

      </Modal.Body>
        <Modal.Footer 
          className="justify-content-center">
          <Button 
            variant="secondary"
            onClick={onLocalModalUpdateClose}
          >
            Close
          </Button>
        </Modal.Footer>
    </Modal>
  );

  return (
    <>
      {insertForm}
      {updateForm}
    </>
  );
};

PollsForm.propTypes = {
  isInsertModalShown: PropTypes.bool.isRequired,
  modalInsertClose: PropTypes.func.isRequired,
  isUpdateModalShown: PropTypes.bool.isRequired,
  modalUpdateClose: PropTypes.func.isRequired,
  updateTable: PropTypes.func.isRequired,
  updateData: PropTypes.shape({}) || PropTypes.shape(
    PropTypes.objectOf(PropTypes.number, PropTypes.string),
    PropTypes.objectOf(PropTypes.number, PropTypes.string),
    PropTypes.string,
    PropTypes.string,
    PropTypes.string,
    PropTypes.number,
    PropTypes.number,
    PropTypes.number,
    PropTypes.number,
    PropTypes.number,
  ),
};

export default PollsForm;