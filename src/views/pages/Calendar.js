import React, { useEffect } from "react";
// nodejs library that concatenates classes
import classnames from "classnames";
// JavaScript library that creates a callendar with events
import { Calendar } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import interaction from "@fullcalendar/interaction";
// react component used to create sweet alerts

import ReactBSAlert from "react-bootstrap-sweetalert";
// reactstrap components
import {
  Button,
  ButtonGroup,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Modal,
  Container,
  Row,
  Col,
  Breadcrumb,
  BreadcrumbItem,
  Label,
  ModalBody,
} from "reactstrap";
// core components

// import { events as eventsVariables } from "variables/general.js";

import { ToastContainer, toast } from "react-toastify";

//React Datepicker
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

//Authentication
import { isAuthenticated } from "api/auth";

//Addevent and getEvent functions
import {
  addCalender,
  getCalender,
  updateEvent,
  deleteEvents,
} from "api/calender";

import "./Calender.css";

//import Ant Table
// import AntTable from "./tables/AntTable";
import { Table } from "ant-table-extensions";
import { SearchOutlined } from "@ant-design/icons";

let calendar;

function CalendarView() {
  const { user, token } = isAuthenticated();
  const [events, setEvents] = React.useState([]);
  const [alert, setAlert] = React.useState(null);
  const [modalAdd, setModalAdd] = React.useState(false);
  const [modalChange, setModalChange] = React.useState(false);
  const [startDate, setStartDate] = React.useState(new Date());
  const [endDate, setEndDate] = React.useState(new Date());
  const [radios, setRadios] = React.useState(null);
  const [eventId, setEventId] = React.useState(null);
  const [eventTitle, setEventTitle] = React.useState(null);
  const [eventDescription, setEventDescription] = React.useState(null);
  const [description, setDescription] = React.useState(null);
  const [assignTeachers, setAssignTeachers] = React.useState(null);
  // eslint-disable-next-line
  const [event, setEvent] = React.useState(null);
  const [currentDate, setCurrentDate] = React.useState(null);
  const calendarRef = React.useRef(null);
  const [checked, setChecked] = React.useState(false);

  const [editing, setEditing] = React.useState(false);
  const [eventList, setEventList] = React.useState([]);

  let permissions = [];
  useEffect(() => {
    if (user.role["Calendar"]) {
      permissions = user.role["Calendar"];
      console.log(permissions);
    }
  }, []);

  const createCalendar = () => {
    calendar = new Calendar(calendarRef.current, {
      plugins: [interaction, dayGridPlugin],
      initialView: "dayGridMonth",
      selectable: true,
      // editable: true,
      // events: events,
      headerToolbar: "",

      // Add new event
      select: (info) => {
        console.log("info", info);

        setModalAdd(true);
        setStartDate(startDate);
        setEndDate(endDate);
        setRadios("bg-info");
      },

      // Edit calendar event action
      eventClick: ({ event }) => {
        console.log("event", event);
        setEventId(event.id);
        setEventTitle(event.title);
        setDescription(event.extendedProps.description);
        setRadios("exams");
        setEvent(event);
        setModalChange(true);
      },
    });
    calendar.render();
    setCurrentDate(calendar.view.title);
  };

  const changeView = (newView) => {
    calendar.changeView(newView);
    setCurrentDate(calendar.view.title);
  };

  const handleSubmitEvent = async () => {
    var formData = new FormData();
    formData.set("name", eventTitle);
    formData.set("event_from", new Date(startDate));
    formData.set("event_to", new Date(endDate));
    formData.set("description", description);
    // formData.set("assignTeachers", assignTeachers)
    formData.set("event_type", radios);
    formData.set("school", user.school);

    // console.log("str", new Date(startDate));
    // console.log("end", new Date(endDate));
    try {
      await addCalender(user._id, token, formData);
      setModalAdd(false);
      toast.success("Event addedd successfully");
      setChecked(true);
    } catch (err) {
      toast.error(err);
    }
    setEvents(undefined);
    setStartDate(undefined);
    setEndDate(undefined);
    setRadios("bg-info");
    setEventTitle(undefined);
  };

  //Get Events
  useEffect(async () => {
    createCalendar();
    const { user, token } = isAuthenticated();
    const events = await getCalender(user._id, user.school, token);
    console.log("getevents", events);
    setEvents(events);
    events.map((events) => {
      return calendar.addEvent({
        title: events.name,
        start: events.event_from,
        end: events.event_to,
        className: events.event_type,
        description: events.description,
        id: events._id,
        // assignTeacher: assignTeachers,
      });
    });

    //Ant Table Data Source
    const data = [];
    events.map((events) => {
      data.push({
        key: events._id,
        event_name: events.name,
        start_date: events.event_from.split("T")[0],
        end_date: events.event_to.split("T")[0],
      });
    });
    setEventList(data);
    setChecked(false);
  }, [checked]);

  //Edit Events
  const changeEvent = async () => {
    const { user, token } = isAuthenticated();
    var formData = new FormData();
    formData.set("name", eventTitle);
    formData.set("event_from", new Date(startDate));
    formData.set("event_to", new Date(endDate));
    formData.set("description", description);
    // formData.set("assignTeachers", assignTeachers)
    formData.set("event_type", radios);
    formData.set("school", user.school);

    try {
      const updateEvents = await updateEvent(
        user._id,
        eventId,
        token,
        formData
      );
      setEvents(updateEvents);
      setChecked(true);
    } catch (err) {
      toast.error("Something went wrong!");
    }
    setModalChange(false);
    setRadios("bg-info");
    setEventTitle(undefined);
    setEventDescription(undefined);
    setEventId(undefined);
    setEvent(undefined);
  };

  //Delete Events Confirm Box
  const deleteEventSweetAlert = () => {
    setAlert(
      <ReactBSAlert
        warning
        style={{ display: "block", marginTop: "-100px" }}
        title="Are you sure?"
        onConfirm={() => {
          setAlert(false);
          setRadios("bg-info");
          setEventTitle(undefined);
          setEventDescription(undefined);
          setEventId(undefined);
        }}
        onCancel={() => deleteEvent()}
        confirmBtnCssClass="btn-secondary"
        cancelBtnBsStyle="danger"
        confirmBtnText="Cancel"
        cancelBtnText="Yes, delete it"
        showCancel
        btnSize=""
      >
        You won't be able to revert this!
      </ReactBSAlert>
    );
  };

  //Delete Events
  const deleteEvent = async () => {
    try {
      const { user, token } = isAuthenticated();
      const deleEvents = await deleteEvents(eventId, user._id, token);
      setEvent(undefined);
      setAlert(
        <ReactBSAlert
          success
          style={{ display: "block", marginTop: "-100px" }}
          title="Success"
          onConfirm={() => setAlert(null)}
          onCancel={() => setAlert(null)}
          confirmBtnBsStyle="primary"
          confirmBtnText="Ok"
          btnSize=""
        ></ReactBSAlert>
      );
      setEvents(deleEvents);
      setChecked(true);
    } catch (err) {
      toast.error("Something went wrong!");
    }
    setModalChange(false);
    setRadios("bg-info");
    setEventTitle(undefined);
    setEventDescription(undefined);
    setEventId(undefined);
    setEvent(undefined);
  };

  //Ant Table Column
  const columns = [
    {
      title: "Event Name",
      dataIndex: "event_name",
      width: 150,
      sorter: (a, b) => a.event_name > b.event_name,
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => {
        return (
          <>
            <Input
              autoFocus
              placeholder="Type text here"
              value={selectedKeys[0]}
              onChange={(e) => {
                setSelectedKeys(e.target.value ? [e.target.value] : []);
                confirm({ closeDropdown: false });
              }}
              onBlur={() => {
                confirm();
              }}
            ></Input>
          </>
        );
      },
      filterIcon: () => {
        return <SearchOutlined />;
      },
      onFilter: (value, record) => {
        return record.event_name.toLowerCase().includes(value.toLowerCase());
      },
    },
    {
      title: "Start Date",
      dataIndex: "start_date",
      width: 150,
      sorter: (a, b) => a.start_date > b.start_date,
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => {
        return (
          <>
            <Input
              autoFocus
              placeholder="Type text here"
              value={selectedKeys[0]}
              onChange={(e) => {
                setSelectedKeys(e.target.value ? [e.target.value] : []);
                confirm({ closeDropdown: false });
              }}
              onBlur={() => {
                confirm();
              }}
            ></Input>
          </>
        );
      },
      filterIcon: () => {
        return <SearchOutlined />;
      },
      onFilter: (value, record) => {
        return record.start_date.toLowerCase().includes(value.toLowerCase());
      },
    },
    {
      title: "End Date",
      dataIndex: "end_date",
      width: 150,
      sorter: (a, b) => a.end_date > b.end_date,
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => {
        return (
          <>
            <Input
              autoFocus
              placeholder="Type text here"
              value={selectedKeys[0]}
              onChange={(e) => {
                setSelectedKeys(e.target.value ? [e.target.value] : []);
                confirm({ closeDropdown: false });
              }}
              onBlur={() => {
                confirm();
              }}
            ></Input>
          </>
        );
      },
      filterIcon: () => {
        return <SearchOutlined />;
      },
      onFilter: (value, record) => {
        return record.end_date.toLowerCase().includes(value.toLowerCase());
      },
    },
  ];

  return (
    <>
      {alert}
      <Modal
        style={{ height: "75vh" }}
        isOpen={editing}
        toggle={() => setEditing(false)}
        size="lg"
        scrollable
      >
        <div className="modal-header">
          <h2 className="modal-title" id="modal-title-default">
            {editing ? "Event List" : ""}
          </h2>
          <button
            aria-label="Close"
            className="close"
            data-dismiss="modal"
            type="button"
            onClick={() => setEditing(false)}
          >
            <span aria-hidden={true}>×</span>
          </button>
        </div>
        <ModalBody>
          <Table columns={columns} dataSource={eventList} />
        </ModalBody>
      </Modal>
      <ToastContainer
        position="bottom-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <div className="header header-dark bg-info pb-6 content__title content__title--calendar">
        <Container fluid>
          <div className="header-body">
            <Row className="align-items-center py-4">
              <Col lg="6">
                <h6 className="fullcalendar-title h2 text-white d-inline-block mb-0 mr-1">
                  {currentDate}
                </h6>
                <Breadcrumb
                  className="d-none d-md-inline-block ml-lg-4"
                  listClassName="breadcrumb-links breadcrumb-dark"
                >
                  <BreadcrumbItem>
                    <a href="#pablo" onClick={(e) => e.preventDefault()}>
                      <i className="fas fa-home" />
                    </a>
                  </BreadcrumbItem>
                  <BreadcrumbItem>
                    <a href="#pablo" onClick={(e) => e.preventDefault()}>
                      Dashboard
                    </a>
                  </BreadcrumbItem>
                  <BreadcrumbItem aria-current="page" className="active">
                    Calendar
                  </BreadcrumbItem>
                </Breadcrumb>
              </Col>
              <Col className="mt-3 mt-md-0 text-md-right" lg="6">
                <Button
                  className="btn-neutral"
                  color="default"
                  onClick={() => setEditing(true)}
                  size="sm"
                >
                  View Events
                </Button>
                <Button
                  className="fullcalendar-btn-prev btn-neutral"
                  color="default"
                  onClick={() => {
                    calendar.next();
                  }}
                  size="sm"
                >
                  <i className="fas fa-angle-left" />
                </Button>
                <Button
                  className="fullcalendar-btn-next btn-neutral"
                  color="default"
                  onClick={() => {
                    calendar.prev();
                  }}
                  size="sm"
                >
                  <i className="fas fa-angle-right" />
                </Button>
                <Button
                  className="btn-neutral"
                  color="default"
                  data-calendar-view="basicYear"
                  onClick={() => changeView("dayGridYear")}
                  size="sm"
                >
                  Year
                </Button>
                <Button
                  className="btn-neutral"
                  color="default"
                  data-calendar-view="basicMonth"
                  onClick={() => changeView("dayGridMonth")}
                  size="sm"
                >
                  Month
                </Button>
                <Button
                  className="btn-neutral"
                  color="default"
                  data-calendar-view="basicWeek"
                  onClick={() => changeView("dayGridWeek")}
                  size="sm"
                >
                  Week
                </Button>
                <Button
                  className="btn-neutral"
                  color="default"
                  data-calendar-view="basicDay"
                  onClick={() => changeView("dayGridDay")}
                  size="sm"
                >
                  Day
                </Button>
              </Col>
            </Row>
          </div>
        </Container>
      </div>
      <Container className="mt--6 w-100" fluid>
        <Row>
          <div className="col">
            <Card className="card-calendar w-100">
              <CardHeader>
                <h5 className="h3 mb-0">Calendar</h5>
              </CardHeader>
              <CardBody className="p-0">
                <div
                  className="calendar"
                  data-toggle="calendar"
                  id="calendar"
                  ref={calendarRef}
                />
              </CardBody>
            </Card>
            {permissions && permissions.includes("add") && (
              <Modal
                isOpen={modalAdd}
                toggle={() => setModalAdd(false)}
                className="modal-dialog-centered modal-secondary"
              >
                <div className="modal-body">
                  <form className="new-event--form">
                    <FormGroup>
                      <label className="form-control-label">Event title</label>
                      <Input
                        className="form-control-alternative new-event--title"
                        placeholder="Event Title"
                        type="text"
                        onChange={(e) => setEventTitle(e.target.value)}
                        required
                      />
                      <Label
                        className="form-control-label"
                        htmlFor="example-date-input"
                      >
                        From
                      </Label>
                      <DatePicker
                        className="p-2 endDate"
                        showTimeSelect
                        dateFormat="yyyy MMMM, dd h:mm aa"
                        selected={startDate}
                        selectsStart
                        startDate={startDate}
                        onChange={(date) => setStartDate(date)}
                        strictParsing
                        value={startDate}
                        required
                      />
                      <Label
                        className="form-control-label"
                        htmlFor="example-date-input"
                      >
                        To
                      </Label>
                      <DatePicker
                        className="p-2 endDate"
                        showTimeSelect
                        dateFormat="yyyy MMMM, dd h:mm aa"
                        selected={endDate}
                        selectsStart
                        startDate={endDate}
                        onChange={(date) => setEndDate(date)}
                        strictParsing
                        value={endDate}
                        required
                      />
                    </FormGroup>
                    <FormGroup>
                      <Input
                        className="form-control-alternative new-event--title descrip"
                        id="exampleFormControlSelect3"
                        type="select"
                        onChange={(e) => setAssignTeachers(e.target.value)}
                        required
                      >
                        <option value="" disabled selected>
                          Assignteacher
                        </option>
                        <option>LKG</option>
                        <option>UKG</option>
                      </Input>
                    </FormGroup>
                    <FormGroup>
                      <textarea
                        className="form-control-alternative new-event--title w-100 descrip"
                        placeholder="Description"
                        type="text"
                        onChange={(e) => setDescription(e.target.value)}
                        required
                      />
                    </FormGroup>
                    <FormGroup className="mb-0">
                      <label className="form-control-label d-block mb-3">
                        Status color
                      </label>
                      <ButtonGroup
                        className="btn-group-toggle btn-group-colors event-tag"
                        data-toggle="buttons"
                      >
                        <Button
                          className={classnames("bg-info", {
                            active: radios === "bg-info",
                          })}
                          color=""
                          id="bg-info"
                          type="button"
                          onClick={() => setRadios("bg-info")}
                          value="bg-info"
                        />
                        <Button
                          className={classnames("bg-warning", {
                            active: radios === "bg-warning",
                          })}
                          color=""
                          id="bg-warning"
                          type="button"
                          onClick={() => setRadios("bg-warning")}
                          value="bg-warning"
                        />
                        <Button
                          className={classnames("bg-danger", {
                            active: radios === "bg-danger",
                          })}
                          color=""
                          id="bg-danger"
                          type="button"
                          onClick={() => setRadios("bg-danger")}
                          value="bg-danger"
                        />
                      </ButtonGroup>
                    </FormGroup>
                  </form>
                </div>
                <div className="modal-footer">
                  <Button
                    className="new-event--add"
                    color="primary"
                    type="button"
                    onClick={handleSubmitEvent}
                  >
                    Add event
                  </Button>
                  <Button
                    className="ml-auto"
                    color="link"
                    type="button"
                    onClick={() => setModalAdd(false)}
                  >
                    Close
                  </Button>
                </div>
              </Modal>
            )}

            {permissions && permissions.includes("edit") && (
              <Modal
                isOpen={modalChange}
                toggle={() => setModalChange(false)}
                className="modal-dialog-centered modal-secondary"
              >
                <div className="modal-body">
                  <Form className="edit-event--form">
                    <FormGroup>
                      <label className="form-control-label">Event title</label>
                      <Input
                        className="form-control-alternative edit-event--title"
                        placeholder="Event Title"
                        type="text"
                        defaultValue={eventTitle}
                        onChange={(e) => setEventTitle(e.target.value)}
                        required
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label
                        className="form-control-label"
                        htmlFor="example-date-input"
                      >
                        From
                      </Label>
                      <DatePicker
                        className="p-2 endDate"
                        showTimeSelect
                        dateFormat="yyyy MMMM, dd h:mm aa"
                        selected={startDate}
                        selectsStart
                        startDate={startDate}
                        onChange={(date) => setStartDate(date)}
                        strictParsing
                        value={startDate}
                        required
                      />
                      <Label
                        className="form-control-label"
                        htmlFor="example-date-input"
                      >
                        To
                      </Label>
                      <DatePicker
                        className="p-2 endDate"
                        showTimeSelect
                        dateFormat="yyyy MMMM, dd h:mm aa"
                        // dateFormat="'YYYY-MM-dd', h:mm"
                        selected={endDate}
                        selectsStart
                        startDate={endDate}
                        onChange={(date) => setEndDate(date)}
                        strictParsing
                        value={endDate}
                        required
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label
                        className="form-control-label"
                        htmlFor="example-date-input"
                      >
                        Assignteacher
                      </Label>
                      <Input
                        className="form-control-alternative new-event--title descrip"
                        id="exampleFormControlSelect3"
                        type="select"
                        onChange={(e) => setAssignTeachers(e.target.value)}
                        required
                      >
                        <option value="" disabled selected>
                          Assignteacher
                        </option>
                        <option>LKG</option>
                        <option>UKG</option>
                      </Input>
                    </FormGroup>
                    <FormGroup>
                      <label className="form-control-label">Description</label>
                      <Input
                        className="form-control-alternative edit-event--description textarea-autosize"
                        placeholder="Event Desctiption"
                        type="textarea"
                        defaultValue={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                      />
                      <i className="form-group--bar" />
                    </FormGroup>
                    <input className="edit-event--id" type="hidden" />
                    <FormGroup>
                      <label className="form-control-label d-block mb-3">
                        Status color
                      </label>
                      <ButtonGroup
                        className="btn-group-toggle btn-group-colors event-tag mb-0"
                        data-toggle="buttons"
                      >
                        <Button
                          className={classnames("bg-info", {
                            active: radios === "bg-info",
                          })}
                          color=""
                          id="bg-info"
                          type="button"
                          onClick={() => setRadios("bg-info")}
                          value="bg-info"
                        />
                        <Button
                          className={classnames("bg-warning", {
                            active: radios === "bg-warning",
                          })}
                          color=""
                          id="bg-warning"
                          type="button"
                          onClick={() => setRadios("bg-warning")}
                          value="bg-warning"
                        />
                        <Button
                          className={classnames("bg-danger", {
                            active: radios === "bg-danger",
                          })}
                          color=""
                          id="bg-danger"
                          type="button"
                          onClick={() => setRadios("bg-danger")}
                          value="vaccation"
                        />
                      </ButtonGroup>
                    </FormGroup>
                  </Form>
                </div>
                <div className="modal-footer">
                  <Button color="primary" onClick={changeEvent}>
                    Update
                  </Button>
                  <Button
                    color="danger"
                    onClick={() => {
                      setModalChange(false);
                      deleteEventSweetAlert();
                    }}
                  >
                    Delete
                  </Button>
                  <Button
                    className="ml-auto"
                    color="link"
                    onClick={() => setModalChange(false)}
                  >
                    Close
                  </Button>
                </div>
              </Modal>
            )}
          </div>
        </Row>
      </Container>
    </>
  );
}

export default CalendarView;
