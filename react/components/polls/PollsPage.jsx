import React, { useState, useEffect } from "react";
import { Row, Col, Card, Button, Form } from 'react-bootstrap';
import Pagination from 'rc-pagination';
import "rc-pagination/assets/index.css";
import locale from "rc-pagination/lib/locale/en_US";
import Swal from "sweetalert2";
import { TimedErrorToast, TimedSucc, Error } from './pollsSwal';
import { listAll, listByQuery, deleteById } from '../../services/pollsService';
import debug from "sabio-debug"
import PollsForm from "./PollsForm";
import PollsTable from "./PollsTable";

function PollsPage() {

  const _logger = debug.extend("polls");

  const [showInsertForm, setShowInsertForm] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);

  const handleInsertClose = () => setShowInsertForm(false);
  const handleInsertShow = () => setShowInsertForm(true);
  const handleUpdateClose = () => setShowUpdateForm(false);
  const handleUpdateShow = () => setShowUpdateForm(true);

  const [pageData, setPageData] = useState({
    pollDataArr: [],
    tableRowContent: [],
  });

  const [updateFormData, setUpdateFormData] = useState({});
  const [deleteTableData, setDeleteTableData] = useState({});

  const [pagination, setPaginate] = useState({
    current: 1,
    pageSize: 5,
    totalCount: 0,
  });

  const [searchForm, setSearchForm] = useState({
    query: "",
    isSearching: false,
  });
  
  useEffect(() => {
    listAll(pagination.current - 1, pagination.pageSize)
    .then(onListAllSuccess)
    .catch(onListAllError);
  }, [pagination.current, updateFormData, deleteTableData]);

  const mapTable = (aPoll) => {

    // dates as words
    let dateTakenConvert = new Date(aPoll.dateTaken).toDateString();
    let datePublishedConvert = new Date(aPoll.datePublished).toDateString();

    return (
      <tr key={`poll_${aPoll.id}`}>
        <td>{aPoll.id}</td>
        <td>{aPoll.pollster.name}</td>
        <td>{aPoll.electionYear}</td>
        {/* aPoll.pollContentId will need to be renamed once reference table is created/updated */}
        {/* <td>{aPoll.pollContentId}</td>  */}{/* removed for now by request of Hector */}
        <td>{aPoll.methodType.name}</td>
        <td>{dateTakenConvert}</td>
        <td>{datePublishedConvert}</td>
        <td>{aPoll.cost}</td>
        {/* aPoll.referenceId will need to be renamed once reference table is created/updated */}
        <td>{aPoll.referenceId}</td>
        <td>{aPoll.objective}</td>
        <td>
          <Row className="justify-content-center">
            <Col className="d-flex">
              <Button onClick={onEdit} size="sm" data-poll={JSON.stringify(aPoll)} className="action-icon ms-1 me-1">
                {' '}
                <i className="mdi mdi-square-edit-outline" ></i>
              </Button>
              <Button variant="danger" onClick={onDelete} size="sm" data-poll={JSON.stringify(aPoll)} className="action-icon me-1">
                {' '}
                <i className="mdi mdi-delete"></i>
              </Button>
            </Col>
          </Row>
        </td>
      </tr> 
    );
  };

  const onSearchFormChange = (e) => {
    const { name, value } = e.target;
    _logger(name, value);

    if(value.length === 0){
      listAll(pagination.current - 1, pagination.pageSize)
      .then(onListAllSuccess)
      .catch(onListAllError);
    };

    setSearchForm((prevState) => {
      const copy = { ...prevState };
      copy[name] = value;
      copy.isSearching = true;
      return copy;
    });
  };

  const onListByQuerySuccess = (pollData) => {
    let pollArr = pollData.data.item.pagedItems;

    setPageData((prevState) => {
      const newPageData = {...prevState};
      newPageData.pollDataArr = pollArr;
      newPageData.tableRowContent = pollArr.map(mapTable);
      return newPageData;
    });

    setPaginate((prevState) => {
      let newPage = { ...prevState };
      newPage.totalCount = pollData.data.item.totalCount;
      return newPage;
    });

    setSearchForm((prevState) => {
      const copy = { ...prevState };
      copy.isSearching = false;
      return copy;
    });
  };

  const onListByQueryError = (error) => {
    _logger(error);
    TimedErrorToast("Not Found!", "Your search query was not found!");
  };

  const onSearch = (e) => {
    e.preventDefault();

    listByQuery(searchForm.query, 0, 5)
      .then(onListByQuerySuccess)
      .catch(onListByQueryError);
  };

  const onEdit = (e) => {
    let pollObj = JSON.parse(e.currentTarget.dataset.poll);
    setUpdateFormData(pollObj);
    _logger("PROPTYPES HERE", pollObj);
    handleUpdateShow();
  };

  const updateTableRow  = (updatedPoll) => {
    setPageData((prevState) => {
      const pd = { ...prevState }; 
      const getTableRowById = pd.pollDataArr.findIndex(poll => poll.id === updateFormData.id);

      if (getTableRowById >= 0) {
        pd.pollDataArr[getTableRowById] = updatedPoll;
        pd.tableRowContent = pd.pollDataArr.map(mapTable);
      };
      return pd;
    });
    //will force re-render using useEffect dependency array
    setUpdateFormData({});
  };

  const onDeleteSuccess = (response, idToDelete) => {
    setPageData((prevState) => {
      const pd = { ...prevState };
      const getTableRowById = pd.pollDataArr.findIndex(poll => poll.id === idToDelete);

      if (getTableRowById >= 0) {
        pd.pollDataArr.splice(getTableRowById, 1);
        pd.tableRowContent = pd.pollDataArr.map(mapTable);
      };
      return pd;
      });
    //will force re-render using useEffect dependency array
    setDeleteTableData({});
    TimedSucc("Deleted!", "Successfully Deleted Poll!");
  };

  const onDeleteError = (error) => Error("Delete Failed!", `${error}`);

  const onDelete = (e) => {
    let pollObj = JSON.parse(e.currentTarget.dataset.poll);
    setDeleteTableData(pollObj);
    
    Swal.fire({
      title: "Are you sure?",
      text: "Are you sure that you want to delete this?",
      icon: "warning",
      showCancelButton: true,
      focusCancel: true,
    }).then((willDelete) => {
      if(willDelete.isConfirmed) {
        deleteById(pollObj.id).then(onDeleteSuccess).catch(onDeleteError);
      } else if(willDelete.dismiss === Swal.DismissReason.cancel) {
        Swal.fire("Delete Cancelled!");
      };
    });
  };

  const onListAllSuccess = (pollData) => {
    let pollArr = pollData.data.item.pagedItems;

    setPageData((prevState) => {
      const newPageData = {...prevState};
      newPageData.pollDataArr = pollArr;
      newPageData.tableRowContent = pollArr.map(mapTable);
      return newPageData;
    });

    setPaginate((prevState) => {
      let newPage = { ...prevState };
      newPage.totalCount = pollData.data.item.totalCount;
      return newPage;
    });
  };

  const onListAllError = (error) => {
    _logger(error);
    Error("Page failed to load data!", `${error}`);
  };

  const onPaginate = (page) => {
    setPaginate((prevState) => {
      let tableData = { ...prevState };
      tableData.current = page;
      return tableData;
    });
  };

  return (
    <>
      <Col xs={12} className="my-4">
        <Card>
          <Card.Body>
            <Row>
              <Col className="display-flex">
                <Button 
                  className="btn btn-danger mb-2"
                  onClick={handleInsertShow}
                >
                  <i className="mdi mdi-plus-circle me-2"></i> Add Poll
                </Button>
              </Col>

              <Col>
                <Form className="d-flex">
                  <input
                    type="text"
                    className="form-control w-50"
                    id="search"
                    name="query"
                    placeholder="Search..."
                    onChange={onSearchFormChange}
                    value={searchForm.query}
                  />
                  <Button 
                    variant="secondary" 
                    className="ms-1" 
                    id="search" 
                    type="submit" 
                    onClick={onSearch}
                  >
                    Search
                  </Button>
                </Form>
              </Col>

              <PollsTable
                tableData={pageData}
              />

              <Pagination
                onChange={onPaginate}
                current={pagination.current}
                pageSize={pagination.pageSize}
                total={pagination.totalCount}
                locale={locale}
                className="text-center"
              />
            </Row>
          </Card.Body>
        </Card>
      </Col>
      
      <PollsForm 
        isInsertModalShown={showInsertForm}
        modalInsertClose={handleInsertClose}
        isUpdateModalShown={showUpdateForm}
        modalUpdateClose={handleUpdateClose}
        updateData={updateFormData}
        updateTable={updateTableRow}
      />
    </>
  );
};
export default React.memo(PollsPage);
