import React,{useState} from "react";

import {
  Container,
  Card,
  CardBody,
  CardHeader,
  Table,
  Button,
  Row,
  Col,
  Input,
  Label,
  Form,
  Modal,
  ModalBody,
} from "reactstrap";

// core components
import SimpleHeader from "components/Headers/SimpleHeader.js";

//Import ToastContainer
import { ToastContainer, toast } from "react-toastify";

import { isAuthenticated } from "api/auth";
import {
  deleteTimeTable,
  getTimeTable,
  getSingleTimeTable,
  updateTimeTable,
} from "../../../api/Time Table";

import UpdateTimeTable from "./UpdateTimeTable";

import { Popconfirm } from "antd";

import { allClass } from "api/class";
import { allSessions } from "api/session";
import { allStaffs } from "api/staff";

// import moment Library
import moment from "moment";

//React Datepicker
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function ViewTimeTable() {
  const [lecturer, setLectures] = React.useState({});
  console.log("lecturer", lecturer);
  const [startDate, setStartDate] = React.useState(new Date());
  const startDuration = moment(startDate).format("LT");
  const [endDate, setEndDate] = React.useState(new Date());
  const endDuration = moment(endDate).format("LT");
  const [startTimeRecises, setStartTimeRecises] = React.useState(new Date());
  const startTime = moment(startTimeRecises).format("LT");
  const [endTimeRecises, setEndTimeRecises] = React.useState(new Date());
  const endTime = moment(endTimeRecises).format("LT");
  const [index, setIndex] = React.useState();
  const [day, setDays] = React.useState("");
  const [timeTableID, setTimeTableID] = React.useState("");
  const [checked, setChecked] = React.useState(false);
  const [editing, setEditing] = React.useState(false);
  const [edit, setEdit] = React.useState();
  const [classess, setClassess] = React.useState([]);
  const [sessions, setSessions] = React.useState([]);
  const [teacherList, setTeacherList] = React.useState([]);
  const [formData] = React.useState(new FormData());
  const [timeTableData, setTimeTableData] = React.useState({
    class: null,
    section: null,
    session: "",
    prd: "",
    subjects: "",
    teachers: "",
    selectMode: "",
    link: "",
  });
  const [selectedClass, setSelectedClass] = useState({});
  console.log("lecturer", lecturer);

  React.useEffect(() => {
    getClass();
    getSession();
    getStaff();
  }, [checked]);

  //Taking TimeTable Value
  const handleChange = (name) => (event) => {
    // formData.set(name, event.target.value);
  
    setTimeTableData({ ...timeTableData, [name]: event.target.value });
    if (name === "class") {
      console.log("@@@@@@@@=>", event.target.value);
    
      let selectedClass = classess.find((item) => item._id.toString() === event.target.value.toString());
      console.log(selectedClass);
      setSelectedClass(selectedClass);
    }
  };

  //Get Staff Data
  const getStaff = async () => {
    try {
      const { user, token } = isAuthenticated();
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

  //Get Class Data
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

  //Get Session Data
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

  //Get Single Timetable
  const getOneTimeTable = async (e) => {
    e.preventDefault();
    const { user, token } = isAuthenticated();
    let row = {
      class: timeTableData.class,
      section: timeTableData.section,
    };
    try {
      const timeTable = await getSingleTimeTable(
        user.school,
        user._id,
        token,
        row
      );
      if (timeTable.err) {
        return toast.error(timeTable.err);
      }
      setLectures(timeTable.lecture);
      setTimeTableID(timeTable._id);
    } catch (err) {
      console.log(err);
      toast.error("Something Went Wrong!");
    }
  };

  //Delete Data From The Table
  const deleteHandler = async (days, index) => {
    const { user, token } = isAuthenticated();
    let data = {};
    data = lecturer;
    console.log("data", data);
    let day = days;

    if (day === "Monday") {
      lecturer.Monday.splice(index, 1);
      formData.set("lecture", JSON.stringify(data));
    } else if (day === "Tuesday") {
      lecturer.Tuesday.splice(index, 1);
      formData.set("lecture", JSON.stringify(data));
    } else if (day === "Wednesday") {
      lecturer.Wednesday.splice(index, 1);
      formData.set("lecture", JSON.stringify(data));
    } else if (day == "Thursday") {
      lecturer.Thursday.splice(index, 1);
      formData.set("lecture", JSON.stringify(data));
    } else if (day === "Friday") {
      lecturer.Friday.splice(index, 1);
      formData.set("lecture", JSON.stringify(data));
    } else if (day === "Saturday") {
      lecturer.Saturday.splice(index, 1);
      formData.set("lecture", JSON.stringify(data));
    }
    try {
      const updateTable = await updateTimeTable(
        timeTableID,
        user._id,
        token,
        formData
      );
      console.log("updateTable", updateTable);
      if (updateTable.err) {
        return toast.error(updateTable.err);
      } else {
        toast.success("TimeTable Deleted Successfully");
        // setEditing(false);
        if (checked === true) {
          setChecked(false);
        } else {
          setChecked(true);
        }
      }
    } catch (err) {
      toast.error("Something Went Wrong!");
    }
  };

  //Edit handler
  const editHandler = (days, index) => {
    setEditing(true);
    setDays(days);
    setIndex(index);
  };
  const editTimeTable = async (e) => {
    e.preventDefault();
    const { user, token } = isAuthenticated();
    let data = {};
    data = lecturer;
    console.log("data", data);

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
      formData.set("lecture", JSON.stringify(data));
    } else if (day === "Tuesday") {
      lecturer.Tuesday[index] = lectDays;
      formData.set("lecture", JSON.stringify(data));
    } else if (day === "Wednesday") {
      lecturer.Wednesday[index] = lectDays;
      formData.set("lecture", JSON.stringify(data));
    } else if (day == "Thursday") {
      lecturer.Thursday[index] = lectDays;
      formData.set("lecture", JSON.stringify(data));
    } else if (day === "Friday") {
      lecturer.Friday[index] = lectDays;
      formData.set("lecture", JSON.stringify(data));
    } else if (day === "Saturday") {
      lecturer.Saturday[index] = lectDays;
      formData.set("lecture", JSON.stringify(data));
    }

    try {
      const updateTable = await updateTimeTable(
        timeTableID,
        user._id,
        token,
        formData
      );
      console.log("updateTable", updateTable);
      if (updateTable.err) {
        return toast.error(updateTable.err);
      } else {
        toast.success("TimeTable updated Successfully");
        setEditing(false);
        if (checked === true) {
          setChecked(false);
        } else {
          setChecked(true);
        }
      }
    } catch (err) {
      toast.error("Something Went Wrong!");
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
                <Col md="3">
                  <Label
                    className="form-control-label"
                    htmlFor="xample-date-input"
                  ></Label>
                  <p className="form-control-label" htmlFor="xample-date-input">
                    Lecture Time
                  </p>
                </Col>
                <Col md="3">
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
                <Col md="3">
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
              </Row>
              <Row className="m-4">
                <Col md="3">
                  <Label
                    className="form-control-label"
                    htmlFor="xample-date-input"
                  ></Label>
                  <p className="form-control-label" htmlFor="xample-date-input">
                    Recises Time
                  </p>
                </Col>
                <Col md="3">
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
                <Col md="3">
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

      <SimpleHeader name="TimeTable" parentName="View TimeTable" />
      <Container className="mt--5 shadow-lg table-responsive" fluid>
        <Card>
          <CardBody>
            <Form onSubmit={getOneTimeTable}>
              <Row className="m-4">
                <Col md="6">
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
                <Col md="6">
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
                    <option value="">
                      Select Section
                    </option>
                    {selectedClass.section &&
                      selectedClass.section.map((section) => {
                        console.log(section.name);
                        return (
                          <option
                            value={section._id}
                            key={section._id}
                            selected
                          >
                            {section.name}
                          </option>
                        );
                      })}
                  </Input>
                </Col>
              </Row>
              <Row className="ml-4">
                <Col>
                  <Button type="submit" color="primary">
                    View
                  </Button>
                </Col>
              </Row>
            </Form>
          </CardBody>
        </Card>
        {timeTableData.class !== null && timeTableData.section !== null && (
          <Card  >
            <CardHeader  >Time Table</CardHeader>
            <CardBody>
              <Table bordered>
                <thead  >
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
                  <tbody style={{width:"100%",overflowX:"auto"}} >
                    <tr>
                      <td  >
                        <>
                          {lecturer &&
                            lecturer.Monday &&
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
                                    className="btn-sm pull-right mt-3"
                                    color="primary"
                                    type="button"
                                    onClick={() => editHandler("Monday", index)}
                                  >
                                    <i className="fas fa-edit" />
                                  </Button>
                                  <Button
                                    className="btn-sm pull-right mt-3 "
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
                          {lecturer &&
                            lecturer.Tuesday &&
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
                                  <br className="mx-2" />
                                  <Button
                                    className="btn-sm pull-right mt-3"
                                    color="primary"
                                    type="button"
                                    onClick={() =>
                                      editHandler("Tuesday", index)
                                    }
                                    
                                  >
                                    <i className="fas fa-edit" />
                                  </Button>
                                  <Button
                                    className="btn-sm pull-right mt-3"
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
                          {lecturer &&
                            lecturer.Wednesday &&
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
                                    className="btn-sm pull-right mt-3"
                                    color="primary"
                                    type="button"
                                    onClick={() =>
                                      editHandler("Wednesday", index)
                                    }
                                  >
                                    <i className="fas fa-edit" />
                                  </Button>
                                  <Button
                                    className="btn-sm pull-right mt-3"
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
                          {lecturer &&
                            lecturer.Thursday &&
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
                                    className="btn-sm pull-right mt-3 "
                                    color="primary"
                                    type="button"
                                    onClick={() =>
                                      editHandler("Thursday", index)
                                    }
                                  >
                                    <i className="fas fa-edit" />
                                  </Button>
                                  <Button
                                    className="btn-sm pull-right mt-3 "  
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
                          {lecturer &&
                            lecturer.Friday &&
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
                                      onClick={() =>
                                        editHandler("Friday", index)
                                      }
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
                          {lecturer &&
                            lecturer.Saturday &&
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
                                    className="btn-sm pull-right mt-3 "
                                    color="primary"
                                    type="button"
                                    onClick={() =>
                                      editHandler("Saturday", index)
                                    }
                                  >
                                    <i className="fas fa-edit" />
                                  </Button>
                                  <Button
                                    className="btn-sm pull-right mt-3 "
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
              </Table>
            </CardBody>
          </Card>
        )}
      </Container>
    </div>
  );
}

export default ViewTimeTable;
