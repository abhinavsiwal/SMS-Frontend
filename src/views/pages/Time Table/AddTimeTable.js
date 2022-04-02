import React, { useState } from "react";

//import react-strap
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Form,
  Label,
  Input,
  Button,
  CardHeader,
  Table,
  Modal,
  ModalBody,
} from "reactstrap";
import PermissionsGate from "routeGuard/PermissionGate";

//import CSS
import "./TimeTable.css";

//React-select
import Select from "react-select";

// core components
import SimpleHeader from "components/Headers/SimpleHeader.js";

//React Datepicker
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// import moment Library
import moment from "moment";
import { SCOPES } from "routeGuard/permission-maps";

//import Class Api
import { allClass } from "api/class";
import { createTimeTable } from "../../../api/Time Table";
import { isAuthenticated } from "api/auth";

//Import ToastContainer
import { ToastContainer, toast } from "react-toastify";
import { allSessions } from "api/session";
import { allStaffs } from "api/staff";
import { allSubjects } from "api/subjects";

import { Popconfirm } from "antd";

function AddTimeTable() {
  const [timeTableData, setTimeTableData] = React.useState({
    class: null,
    section: null,
    session: null,
    prd: "",
    subjects: "",
    teachers: "",
    selectMode: "",
    link: "",
  });
  const [startDate, setStartDate] = React.useState(new Date());
  const startDuration = moment(startDate).format("LT");
  const [endDate, setEndDate] = React.useState(new Date());
  const endDuration = moment(endDate).format("LT");
  const [startTimeRecises, setStartTimeRecises] = React.useState(new Date());
  const startTime = moment(startTimeRecises).format("LT");
  const [endTimeRecises, setEndTimeRecises] = React.useState(new Date());
  const endTime = moment(endTimeRecises).format("LT");
  const [classess, setClassess] = React.useState([]);
  const [sessions, setSessions] = React.useState([]);
  const [subject, setSubject] = React.useState([]);
  const [teacherList, setTeacherList] = React.useState([]);
  const [selectMultipleDays, setSelectMultipleDays] = React.useState();
  const [checked, setChecked] = React.useState(false);
  const [editing, setEditing] = React.useState(false);
  const [day, setDays] = React.useState("");
  const [index, setIndex] = React.useState();
  const [formData] = React.useState(new FormData());
  const [lecturer, setLectures] = React.useState({});
  console.log("lecturer", lecturer);
  const [lect, setLect] = React.useState({
    Monday: [],
    Tuesday: [],
    Wednesday: [],
    Thursday: [],
    Friday: [],
    Saturday: [],
  });

  const [file, setFile] = useState();

  const fileReader = new FileReader();

  const handleOnChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    if (file) {
      fileReader.onload = function (event) {
        const csvOutput = event.target.result;
      };

      fileReader.readAsText(file);
    }
  };

  React.useEffect(async () => {
    getClass();
    getSession();
    getSubject();
    getStaff();
    const getLectures = localStorage.getItem("lecture");
    const parsedLectures = JSON.parse(getLectures);
    setLectures(parsedLectures);
  }, [checked]);

  const roleOptions = [
    { value: "Monday", label: "Monday" },
    { value: "Tuesday", label: "Tuesday" },
    { value: "Wednesday", label: "Wednesday" },
    { value: "Thursday", label: "Thursday" },
    { value: "Friday", label: "Friday" },
    { value: "Saturday", label: "Saturday" },
  ];

  const handleChange = (name) => (event) => {
    // formData.set(name, event.target.value);
    setTimeTableData({ ...timeTableData, [name]: event.target.value });
  };

  //Taking Values from react-select
  const handleSubjectChange = (e) => {
    var value = [];
    for (var i = 0, l = e.length; i < l; i++) {
      value.push(e[i].value);
    }
    setSelectMultipleDays(value);
  };

  //Getting Class data
  const getClass = async () => {
    const { user, token } = isAuthenticated();
    try {
      const classes = await allClass(user._id, user.school, token);
      if (classes.err) {
        return toast.error(classes.err);
      } else {
        setClassess(classes);
      }
    } catch (err) {
      toast.error("Something Went Wrong!");
    }
  };

  //Getting Session data
  const getSession = async () => {
    const { user, token } = isAuthenticated();
    try {
      const session = await allSessions(user._id, user.school, token);
      if (session.err) {
        return toast.error(session.err);
      } else {
        setSessions(session);
      }
    } catch (err) {
      toast.error("Something Went Wrong!");
    }
  };

  //Getting Subject data
  const getSubject = async () => {
    const { user, token } = isAuthenticated();
    try {
      const subject = await allSubjects(user._id, user.school, token);
      console.log("subject", subject);
      if (subject.err) {
        return toast.error(subject.err);
      } else {
        setSubject(subject);
      }
    } catch (err) {
      toast.error("Something Went Wrong!");
    }
  };

  const getStaff = async () => {
    try {
      const { user, token } = isAuthenticated();
      // const payload = { school: user.school };

      const teachers = await allStaffs(user.school, user._id);
      console.log("teachers", teachers);
      if (teachers.err) {
        return toast.error(teachers.err);
      }
      setTeacherList(teachers);
    } catch (err) {
      toast.error("Something Went Wrong!");
    }
  };

  //Onclick Add Data into The Table
  const handleData = async (e) => {
    e.preventDefault();
    // const data = [];
    // data.push(lect);
    let data = {};
    data = lect;

    //Create Data Object
    let lectDays = {
      name: timeTableData.prd,
      time: startDuration + " - " + endDuration,
      teacher: timeTableData.teachers,
      subject: timeTableData.subjects,
      type: timeTableData.selectMode,
      lunch: startTime + " - " + endTime,
    };
    if (lectDays.type === "Online") {
      lectDays.link = timeTableData.link;
    }

    //Checking Values
    selectMultipleDays.map((days) => {
      if (days === "Monday") {
        lect.Monday.push(lectDays);
      }
      if (days === "Tuesday") {
        lect.Tuesday.push(lectDays);
      }
      if (days === "Wednesday") {
        lect.Wednesday.push(lectDays);
      }
      if (days === "Thursday") {
        lect.Thursday.push(lectDays);
      }
      if (days === "Friday") {
        lect.Friday.push(lectDays);
      }
      if (days === "Saturday") {
        lect.Saturday.push(lectDays);
      }
      localStorage.setItem("lecture", JSON.stringify(data));
    });
    if (checked === true) {
      setChecked(false);
    } else {
      setChecked(true);
    }

    // if (lectDays.type === "Online") {
    //   lectDays.link = timeTableData.link;
    // }

    // for (let key in selectMultipleDays) {
    //   lectures[selectMultipleDays[key]] = [lectDays];
    // }

    // console.log("lecture", lectures);
    // let arr = array;
    // arr.push(lectures);
    // setArray(arr);
  };

  //Create Table
  const handleSubmitData = async () => {
    const { user, token } = isAuthenticated();
    formData.set("class", timeTableData.class);
    formData.set("section", timeTableData.section);
    formData.set("session", timeTableData.session);
    formData.set("school", user.school);
    formData.set("lecture", JSON.stringify(lecturer));

    try {
      const resp = await createTimeTable(user._id, token, formData);
      console.log("resp", resp);
      if (resp.err) {
        return toast.error(resp.err);
      }
      toast.success("TimeTable Addedd Successfully");
    } catch (err) {
      toast.error("Something Went Wrong");
    }
  };

  //Delete Data From The Table
  const deleteHandler = (days, index) => {
    console.log("index", days, index);
    let day = days;

    if (day === "Monday") {
      lecturer.Monday.splice(index, 1);
      localStorage.setItem("lecture", JSON.stringify(lecturer));
    } else if (day === "Tuesday") {
      lecturer.Tuesday.splice(index, 1);
      localStorage.setItem("lecture", JSON.stringify(lecturer));
    } else if (day === "Wednesday") {
      lecturer.Wednesday.splice(index, 1);
      localStorage.setItem("lecture", JSON.stringify(lecturer));
    } else if (day == "Thursday") {
      lecturer.Thursday.splice(index, 1);
      localStorage.setItem("lecture", JSON.stringify(lecturer));
    } else if (day === "Friday") {
      lecturer.Friday.splice(index, 1);
      localStorage.setItem("lecture", JSON.stringify(lecturer));
    } else if (day === "Saturday") {
      lecturer.Saturday.splice(index, 1);
      localStorage.setItem("lecture", JSON.stringify(lecturer));
    }
    if (checked === true) {
      setChecked(false);
    } else {
      setChecked(true);
    }
  };

  //Edit handler
  const editHandler = (days, index) => {
    setEditing(true);
    setDays(days);
    setIndex(index);
  };
  const editTimeTable = (e) => {
    e.preventDefault();
    let data = {};
    data = lecturer;

    //Create Data Object
    let lectDays = {
      name: timeTableData.prd,
      time: startDuration + " - " + endDuration,
      teacher: timeTableData.teachers,
      subject: timeTableData.subjects,
      type: timeTableData.selectMode,
      lunch: startTime + " - " + endTime,
    };
    if (lectDays.type === "Online") {
      lectDays.link = timeTableData.link;
    }

    //Checking Values
    console.log(index);
    if (day === "Monday") {
      lecturer.Monday[index] = lectDays;
      localStorage.setItem("lecture", JSON.stringify(data));
    } else if (day === "Tuesday") {
      lecturer.Tuesday[index] = lectDays;
      localStorage.setItem("lecture", JSON.stringify(data));
    } else if (day === "Wednesday") {
      lecturer.Wednesday[index] = lectDays;
      localStorage.setItem("lecture", JSON.stringify(data));
    } else if (day == "Thursday") {
      lecturer.Thursday[index] = lectDays;
      localStorage.setItem("lecture", JSON.stringify(data));
    } else if (day === "Friday") {
      lecturer.Friday[index] = lectDays;
      localStorage.setItem("lecture", JSON.stringify(data));
    } else if (day === "Saturday") {
      lecturer.Saturday[index] = lectDays;
      localStorage.setItem("lecture", JSON.stringify(data));
    }
    setEditing(false);
    if (checked === true) {
      setChecked(false);
    } else {
      setChecked(true);
    }
  };

  return (
    <div>
      <Modal
        className="modal-dialog-centered"
        isOpen={editing}
        toggle={() => setEditing(false)}
        size="lg"
      >
        <div className="modal-header">
          <h2 className="modal-title" id="modal-title-default">
            {editing ? "Edit Form" : "Create Form"}
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
          <>
            <Form onSubmit={editTimeTable}>
              <Row className="m-4">
                <Col md="12">
                  <Label
                    className="form-control-label"
                    htmlFor="xample-date-input"
                  >
                    Add Lecture
                  </Label>
                  <Input
                    id="example4cols3Input"
                    type="text"
                    onChange={handleChange("prd")}
                    value={timeTableData.prd}
                    placeholder="Add Periods"
                    required
                  ></Input>
                </Col>
              </Row>
              <Row className="m-4">
                <Col md="2">
                  <Label
                    className="form-control-label"
                    htmlFor="xample-date-input"
                  ></Label>
                  <p className="form-control-label" htmlFor="xample-date-input">
                    Lecture Time
                  </p>
                </Col>
                <Col md="2">
                  <Label
                    className="form-control-label"
                    htmlFor="xample-date-input"
                  >
                    From
                  </Label>
                  <DatePicker
                    id="exampleFormControlSelect3"
                    className="Period-Time"
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    showTimeSelect
                    showTimeSelectOnly
                    timeIntervals={15}
                    timeCaption="Time"
                    dateFormat="h:mm aa"
                  />
                </Col>
                <Col md="2">
                  <Label
                    className="form-control-label"
                    htmlFor="example-date-input"
                  >
                    To
                  </Label>
                  <DatePicker
                    id="exampleFormControlSelect3"
                    className="Period-Time"
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
                    showTimeSelect
                    showTimeSelectOnly
                    timeIntervals={15}
                    timeCaption="Time"
                    dateFormat="h:mm aa"
                  />
                </Col>

                <Col md="2">
                  <Label
                    className="form-control-label"
                    htmlFor="xample-date-input"
                  ></Label>
                  <p className="form-control-label" htmlFor="xample-date-input">
                    Recises Time
                  </p>
                </Col>
                <Col md="2">
                  <Label
                    className="form-control-label"
                    htmlFor="xample-date-input"
                  >
                    From
                  </Label>
                  <DatePicker
                    id="exampleFormControlSelect3"
                    className="Period-Time"
                    selected={startTimeRecises}
                    onChange={(date) => setStartTimeRecises(date)}
                    showTimeSelect
                    showTimeSelectOnly
                    timeIntervals={15}
                    timeCaption="Time"
                    dateFormat="h:mm aa"
                  />
                </Col>
                <Col md="2">
                  <Label
                    className="form-control-label"
                    htmlFor="example-date-input"
                  >
                    To
                  </Label>
                  <DatePicker
                    id="exampleFormControlSelect3"
                    className="Period-Time"
                    selected={endTimeRecises}
                    onChange={(date) => setEndTimeRecises(date)}
                    showTimeSelect
                    showTimeSelectOnly
                    timeIntervals={15}
                    timeCaption="Time"
                    dateFormat="h:mm aa"
                  />
                </Col>
              </Row>

              <Row className="d-flex justify-content-center mb-4 m-4">
                <Col md="3">
                  <Label
                    className="form-control-label"
                    htmlFor="xample-date-input"
                  >
                    Subjects
                  </Label>
                  <Input
                    id="exampleFormControlSelect3"
                    type="select"
                    onChange={handleChange("subjects")}
                    value={timeTableData.subjects}
                    required
                  >
                    <option value="" disabled selected>
                      Subjects
                    </option>
                    <option>Physics</option>
                    <option>Chemistry</option>
                    <option>Maths</option>
                    <option>Hindi</option>
                  </Input>
                </Col>
                <Col md="3">
                  <Label
                    className="form-control-label"
                    htmlFor="xample-date-input"
                  >
                    Teachers
                  </Label>
                  <Input
                    id="exampleFormControlSelect3"
                    type="select"
                    onChange={handleChange("teachers")}
                    value={timeTableData.teachers}
                    required
                  >
                    <option value="" disabled selected>
                      Teacher
                    </option>
                    {teacherList.map((teachers) => {
                      return (
                        <option value={teachers._id}>
                          {teachers.firstname}
                        </option>
                      );
                    })}
                    {/* <option>David</option>
                    <option>Sam</option>
                    <option>Mike</option>
                    <option>Jordan</option> */}
                  </Input>
                </Col>

                <Col md="3">
                  <Label
                    className="form-control-label"
                    htmlFor="xample-date-input"
                  >
                    Select Mode
                  </Label>
                  <Input
                    id="exampleFormControlSelect3"
                    type="select"
                    onChange={handleChange("selectMode")}
                    value={timeTableData.selectMode}
                    required
                  >
                    <option value="" disabled selected>
                      Select Mode
                    </option>
                    <option>Offline</option>
                    <option>Online</option>
                  </Input>
                </Col>
                {timeTableData.selectMode === "Online" && (
                  <Col md="3">
                    <Label
                      className="form-control-label"
                      htmlFor="xample-date-input"
                    >
                      Link
                    </Label>
                    <Input
                      id="exampleFormControlSelect3"
                      type="text"
                      onChange={handleChange("link")}
                      value={timeTableData.link}
                      placeholder="Enter Link here"
                      required
                    ></Input>
                  </Col>
                )}
              </Row>
              <Row className="d-flex justify-content-between">
                <div>
                  <Button color="primary" type="submit">
                    Add
                  </Button>
                </div>
              </Row>
            </Form>
          </>
        </ModalBody>
      </Modal>

      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <SimpleHeader name="Student" parentName="Time Table" />
      <PermissionsGate scopes={[SCOPES.canCreate]}>
        <Container className="mt--6 shadow-lg" fluid>
          <Form onSubmit={handleData}>
            <Card>
              <CardBody>
                <Row className="">
                  <Col className="d-flex justify-content-center mt-2">
                    <form>
                      <input
                        type={"file"}
                        id={"csvFileInput"}
                        accept={".csv"}
                        onChange={handleOnChange}
                      />

                      <Button
                        onClick={(e) => {
                          handleOnSubmit(e);
                        }}
                        color="primary"
                      >
                        IMPORT CSV
                      </Button>
                    </form>
                  </Col>
                </Row>
                <Row className="m-4">
                  <Col md="4">
                    <Label
                      className="form-control-label"
                      htmlFor="xample-date-input"
                    >
                      Select Class
                    </Label>
                    <Input
                      id="example4cols3Input"
                      type="select"
                      onChange={handleChange("class")}
                      value={timeTableData.class}
                      required
                    >
                      <option value="" disabled selected>
                        Select Class
                      </option>
                      {classess.map((clas) => {
                        return (
                          <option key={clas._id} value={clas._id}>
                            {clas.name}
                          </option>
                        );
                      })}
                    </Input>
                  </Col>
                  <Col md="4">
                    <Label
                      className="form-control-label"
                      htmlFor="xample-date-input"
                    >
                      Select Section
                    </Label>
                    <Input
                      id="example4cols3Input"
                      type="select"
                      onChange={handleChange("section")}
                      value={timeTableData.section}
                      required
                      placeholder="Add Periods"
                    >
                      <option value="" disabled selected>
                        Select Section
                      </option>
                      {classess.map((sections) => {
                        return sections.section.map((sec) => {
                          return (
                            <option value={sec._id} key={sec._id}>
                              {sec.name}
                            </option>
                          );
                        });
                      })}
                    </Input>
                  </Col>
                  <Col md="4">
                    <Label
                      className="form-control-label"
                      htmlFor="xample-date-input"
                    >
                      Select Session
                    </Label>
                    <Input
                      id="example4cols3Input"
                      type="select"
                      onChange={handleChange("session")}
                      value={timeTableData.session}
                      required
                      placeholder="Add Periods"
                    >
                      <option value="" disabled selected>
                        Select Session
                      </option>
                      {sessions.map((session) => {
                        return (
                          <option value={session._id} key={session._id}>
                            {session.name}
                          </option>
                        );
                      })}
                    </Input>
                  </Col>
                </Row>

                {timeTableData.class !== null &&
                  timeTableData.section !== null &&
                  timeTableData.session !== null && (
                    <>
                      <Row className="m-4">
                        <Col md="6">
                          <Label
                            className="form-control-label"
                            htmlFor="xample-date-input"
                          >
                            Select Days
                          </Label>
                          <Select
                            isMulti
                            name="colors"
                            options={roleOptions}
                            onChange={handleSubjectChange}
                            className="basic-multi-select"
                            classNamePrefix="select"
                            required
                          />
                        </Col>
                        <Col md="6">
                          <Label
                            className="form-control-label"
                            htmlFor="xample-date-input"
                          >
                            Add Lecture
                          </Label>
                          <Input
                            id="example4cols3Input"
                            type="text"
                            onChange={handleChange("prd")}
                            value={timeTableData.prd}
                            placeholder="Add Periods"
                            required
                          ></Input>
                        </Col>
                      </Row>
                      <Row className="m-4">
                        <Col md="2">
                          <Label
                            className="form-control-label"
                            htmlFor="xample-date-input"
                          ></Label>
                          <p
                            className="form-control-label"
                            htmlFor="xample-date-input"
                          >
                            Lecture Time
                          </p>
                        </Col>
                        <Col md="2">
                          <Label
                            className="form-control-label"
                            htmlFor="xample-date-input"
                          >
                            From
                          </Label>
                          <DatePicker
                            id="exampleFormControlSelect3"
                            className="Period-Time"
                            selected={startDate}
                            onChange={(date) => setStartDate(date)}
                            showTimeSelect
                            showTimeSelectOnly
                            timeIntervals={15}
                            timeCaption="Time"
                            dateFormat="h:mm aa"
                          />
                        </Col>
                        <Col md="2">
                          <Label
                            className="form-control-label"
                            htmlFor="example-date-input"
                          >
                            To
                          </Label>
                          <DatePicker
                            id="exampleFormControlSelect3"
                            className="Period-Time"
                            selected={endDate}
                            onChange={(date) => setEndDate(date)}
                            showTimeSelect
                            showTimeSelectOnly
                            timeIntervals={15}
                            timeCaption="Time"
                            dateFormat="h:mm aa"
                          />
                        </Col>

                        <Col md="2">
                          <Label
                            className="form-control-label"
                            htmlFor="xample-date-input"
                          ></Label>
                          <p
                            className="form-control-label"
                            htmlFor="xample-date-input"
                          >
                            Recises Time
                          </p>
                        </Col>
                        <Col md="2">
                          <Label
                            className="form-control-label"
                            htmlFor="xample-date-input"
                          >
                            From
                          </Label>
                          <DatePicker
                            id="exampleFormControlSelect3"
                            className="Period-Time"
                            selected={startTimeRecises}
                            onChange={(date) => setStartTimeRecises(date)}
                            showTimeSelect
                            showTimeSelectOnly
                            timeIntervals={15}
                            timeCaption="Time"
                            dateFormat="h:mm aa"
                          />
                        </Col>
                        <Col md="2">
                          <Label
                            className="form-control-label"
                            htmlFor="example-date-input"
                          >
                            To
                          </Label>
                          <DatePicker
                            id="exampleFormControlSelect3"
                            className="Period-Time"
                            selected={endTimeRecises}
                            onChange={(date) => setEndTimeRecises(date)}
                            showTimeSelect
                            showTimeSelectOnly
                            timeIntervals={15}
                            timeCaption="Time"
                            dateFormat="h:mm aa"
                          />
                        </Col>
                      </Row>

                      <Row className="d-flex justify-content-center mb-4 m-4">
                        <Col md="3">
                          <Label
                            className="form-control-label"
                            htmlFor="xample-date-input"
                          >
                            Subjects
                          </Label>
                          <Input
                            id="exampleFormControlSelect3"
                            type="select"
                            onChange={handleChange("subjects")}
                            value={timeTableData.subjects}
                            required
                          >
                            <option value="" disabled selected>
                              Subjects
                            </option>
                            <option>Physics</option>
                            <option>Chemistry</option>
                            <option>Maths</option>
                            <option>Hindi</option>
                          </Input>
                        </Col>
                        <Col md="3">
                          <Label
                            className="form-control-label"
                            htmlFor="xample-date-input"
                          >
                            Teachers
                          </Label>
                          <Input
                            id="exampleFormControlSelect3"
                            type="select"
                            onChange={handleChange("teachers")}
                            value={timeTableData.teachers}
                            required
                          >
                            <option value="" disabled selected>
                              Teacher
                            </option>
                            {teacherList.map((teachers) => {
                              return (
                                <option value={teachers._id}>
                                  {teachers.firstname}
                                </option>
                              );
                            })}
                          </Input>
                        </Col>

                        <Col md="3">
                          <Label
                            className="form-control-label"
                            htmlFor="xample-date-input"
                          >
                            Select Mode
                          </Label>
                          <Input
                            id="exampleFormControlSelect3"
                            type="select"
                            onChange={handleChange("selectMode")}
                            value={timeTableData.selectMode}
                            required
                          >
                            <option value="" disabled selected>
                              Select Mode
                            </option>
                            <option>Offline</option>
                            <option>Online</option>
                          </Input>
                        </Col>
                        {timeTableData.selectMode === "Online" && (
                          <Col md="3">
                            <Label
                              className="form-control-label"
                              htmlFor="xample-date-input"
                            >
                              Link
                            </Label>
                            <Input
                              id="exampleFormControlSelect3"
                              type="text"
                              onChange={handleChange("link")}
                              value={timeTableData.link}
                              placeholder="Enter Link here"
                              required
                            ></Input>
                          </Col>
                        )}
                      </Row>
                      <Row className="d-flex justify-content-between">
                        <div>
                          <Button color="primary" type="submit">
                            Add
                          </Button>
                        </div>
                        <div>
                          <Button color="primary" onClick={handleSubmitData}>
                            Submit
                          </Button>
                        </div>
                      </Row>
                    </>
                  )}
              </CardBody>
            </Card>
          </Form>
        </Container>
      </PermissionsGate>
      <Container className="mt--0 shadow-lg table-responsive" fluid>
        <Card>
          <CardHeader>Time Table</CardHeader>
          <CardBody>
            <Table bordered>
              <thead>
                <tr>
                  {lecturer === null ? (
                    <h3>Empty</h3>
                  ) : (
                    <>
                      {Object.keys(lecturer).map((day, index) => {
                        return (
                          <>
                            <th key={index}>{day}</th>
                          </>
                        );
                      })}
                    </>
                  )}
                </tr>
              </thead>
              <>
                <tbody>
                  <tr>
                    <td>
                      <>
                        {lecturer.Monday &&
                          lecturer.Monday.map((Monday, index) => {
                            return (
                              <h3>
                                <br />
                                Name:{Monday.name}
                                <br /> Time:{Monday.time}
                                <br /> Subject:{Monday.subject}
                                <br /> Mode: {Monday.type}
                                <br /> Teacher: {Monday.teacher}
                                <br /> Lunch: {Monday.lunch}
                                {Monday.link &&
                                  lecturer.Monday.map((link) => {
                                    return (
                                      <>
                                        <br /> Link:{link.link}
                                      </>
                                    );
                                  })}
                                <br />
                                <Button
                                  className="btn-sm pull-right"
                                  color="primary"
                                  type="button"
                                  onClick={() => editHandler("Monday", index)}
                                >
                                  <i className="fas fa-edit" />
                                </Button>
                                <Button
                                  className="btn-sm pull-right"
                                  color="danger"
                                  type="button"
                                >
                                  <Popconfirm
                                    title="Sure to delete?"
                                    onConfirm={() =>
                                      deleteHandler("Monday", index)
                                    }
                                  >
                                    <i className="fas fa-trash" />
                                  </Popconfirm>
                                </Button>
                                <hr />
                              </h3>
                            );
                          })}
                      </>
                    </td>
                    <td>
                      <>
                        {lecturer.Tuesday &&
                          lecturer.Tuesday.map((Tuesday, index) => {
                            return (
                              <h3>
                                <br />
                                Name:{Tuesday.name}
                                <br /> Time:{Tuesday.time}
                                <br /> Subject:{Tuesday.subject}
                                <br /> Mode: {Tuesday.type}
                                <br /> Teacher: {Tuesday.teacher}
                                <br /> Lunch: {Tuesday.lunch}
                                {Tuesday.link &&
                                  lecturer.Tuesday.map((link) => {
                                    return (
                                      <>
                                        <br /> Link:{link.link}
                                      </>
                                    );
                                  })}
                                <br />
                                <Button
                                  className="btn-sm pull-right"
                                  color="primary"
                                  type="button"
                                  onClick={() => editHandler("Tuesday", index)}
                                >
                                  <i className="fas fa-edit" />
                                </Button>
                                <Button
                                  className="btn-sm pull-right"
                                  color="danger"
                                  type="button"
                                >
                                  <Popconfirm
                                    title="Sure to delete?"
                                    onConfirm={() =>
                                      deleteHandler("Tuesday", index)
                                    }
                                  >
                                    <i className="fas fa-trash" />
                                  </Popconfirm>
                                </Button>
                                <hr />
                              </h3>
                            );
                          })}
                      </>
                    </td>
                    <td>
                      <>
                        {lecturer.Wednesday &&
                          lecturer.Wednesday.map((Wednesday, index) => {
                            return (
                              <h3>
                                <br />
                                Name:{Wednesday.name}
                                <br /> Time:{Wednesday.time}
                                <br /> Subject:{Wednesday.subject}
                                <br /> Mode: {Wednesday.type}
                                <br /> Teacher: {Wednesday.teacher}
                                <br /> Lunch: {Wednesday.lunch}
                                {Wednesday.link &&
                                  lecturer.Wednesday.map((link) => {
                                    return (
                                      <>
                                        <br /> Link:{link.link}
                                      </>
                                    );
                                  })}
                                <br />
                                <Button
                                  className="btn-sm pull-right"
                                  color="primary"
                                  type="button"
                                  onClick={() =>
                                    editHandler("Wednesday", index)
                                  }
                                >
                                  <i className="fas fa-edit" />
                                </Button>
                                <Button
                                  className="btn-sm pull-right"
                                  color="danger"
                                  type="button"
                                >
                                  <Popconfirm
                                    title="Sure to delete?"
                                    onConfirm={() =>
                                      deleteHandler("Wednesday", index)
                                    }
                                  >
                                    <i className="fas fa-trash" />
                                  </Popconfirm>
                                </Button>
                                <hr />
                              </h3>
                            );
                          })}
                      </>
                    </td>
                    <td>
                      <>
                        {lecturer.Thursday &&
                          lecturer.Thursday.map((Thursday, index) => {
                            return (
                              <h3>
                                <br />
                                Name:{Thursday.name}
                                <br /> Time:{Thursday.time}
                                <br /> Subject:{Thursday.subject}
                                <br /> Mode: {Thursday.type}
                                <br /> Teacher: {Thursday.teacher}
                                <br /> Lunch: {Thursday.lunch}
                                {Thursday.link &&
                                  lecturer.Thursday.map((link) => {
                                    return (
                                      <>
                                        <br /> Link:{link.link}
                                      </>
                                    );
                                  })}
                                <br />
                                <Button
                                  className="btn-sm pull-right"
                                  color="primary"
                                  type="button"
                                  onClick={() => editHandler("Thursday", index)}
                                >
                                  <i className="fas fa-edit" />
                                </Button>
                                <Button
                                  className="btn-sm pull-right"
                                  color="danger"
                                  type="button"
                                >
                                  <Popconfirm
                                    title="Sure to delete?"
                                    onConfirm={() =>
                                      deleteHandler("Thursday", index)
                                    }
                                  >
                                    <i className="fas fa-trash" />
                                  </Popconfirm>
                                </Button>
                                <hr />
                              </h3>
                            );
                          })}
                      </>
                    </td>
                    <td>
                      <>
                        {lecturer.Friday &&
                          lecturer.Friday.map((Friday, index) => {
                            return (
                              <h3>
                                <br />
                                Name:{Friday.name}
                                <br /> Time:{Friday.time}
                                <br /> Subject:{Friday.subject}
                                <br /> Mode: {Friday.type}
                                <br /> Teacher: {Friday.teacher}
                                <hr />
                                <br /> Lunch: {Friday.lunch}
                                {Friday.link &&
                                  lecturer.Friday.map((link) => {
                                    return (
                                      <>
                                        <br /> Link:{link.link}
                                      </>
                                    );
                                  })}
                                <br />
                                <Button
                                  className="btn-sm pull-right"
                                  color="danger"
                                  type="button"
                                >
                                  <Button
                                    className="btn-sm pull-right"
                                    color="primary"
                                    type="button"
                                    onClick={() => editHandler("Friday", index)}
                                  >
                                    <i className="fas fa-edit" />
                                  </Button>
                                  <Popconfirm
                                    title="Sure to delete?"
                                    onConfirm={() =>
                                      deleteHandler("Friday", index)
                                    }
                                  >
                                    <i className="fas fa-trash" />
                                  </Popconfirm>
                                </Button>
                              </h3>
                            );
                          })}
                      </>
                    </td>
                    <td>
                      <>
                        {lecturer.Saturday &&
                          lecturer.Saturday.map((Saturday, index) => {
                            return (
                              <h3>
                                <br />
                                Name:{Saturday.name}
                                <br /> Time:{Saturday.time}
                                <br /> Subject:{Saturday.subject}
                                <br /> Mode: {Saturday.type}
                                <br /> Teacher: {Saturday.teacher}
                                <br /> Lunch: {Saturday.lunch}
                                {Saturday.link &&
                                  lecturer.Saturday.map((link) => {
                                    return (
                                      <>
                                        <br /> Link:{link.link}
                                      </>
                                    );
                                  })}
                                <br />
                                <Button
                                  className="btn-sm pull-right"
                                  color="primary"
                                  type="button"
                                  onClick={() => editHandler("Saturday", index)}
                                >
                                  <i className="fas fa-edit" />
                                </Button>
                                <Button
                                  className="btn-sm pull-right"
                                  color="danger"
                                  type="button"
                                >
                                  <Popconfirm
                                    title="Sure to delete?"
                                    onConfirm={() =>
                                      deleteHandler("Saturday", index)
                                    }
                                  >
                                    <i className="fas fa-trash" />
                                  </Popconfirm>
                                </Button>
                                <hr />
                              </h3>
                            );
                          })}
                      </>
                    </td>
                  </tr>
                </tbody>
              </>

              {/* {array.map((arr, index) => {
                return (
                  <tbody>
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{Object.keys(arr).map((days) => days + ", ")}</td>
                      <td>{arr[Object.keys(arr)[0]][0].name}</td>
                      <td>{arr[Object.keys(arr)[0]][0].time}</td>
                      <td>{arr[Object.keys(arr)[0]][0].subject}</td>
                      <td>{arr[Object.keys(arr)[0]][0].type}</td>
                      <td>{arr[Object.keys(arr)[0]][0].teacher}</td>
                      <td>
                        {" "}
                        <Button
                          className="btn-sm pull-right"
                          color="danger"
                          type="button"
                        >
                          <Popconfirm
                            title="Sure to delete?"
                            onConfirm={() => deleteHandler(index)}
                          >
                            <i className="fas fa-trash" />
                          </Popconfirm>
                        </Button>
                      </td>
                    </tr>
                  </tbody>
                );
              })} */}
            </Table>
          </CardBody>
        </Card>
      </Container>
    </div>
  );
}

export default AddTimeTable;
