import React, { useEffect, useState } from "react";

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
  Modal,
  ModalHeader,
  ModalBody,
  CardHeader,
} from "reactstrap";

// import { Table } from "ant-table-extensions";
import { Table } from "antd";
import { postAttendance, searchAttendance } from "api/attendance";
import "./Attendance.css";

//Loader
// import Loader from "../../../components/Loader/Loader";

// core components
import SimpleHeader from "components/Headers/SimpleHeader.js";
import { useSelector } from "react-redux";
//import moment from moment for Date
import moment from "moment";
import { getAttendence } from "api/attendance";
import { allStudents } from "api/student";
import { isAuthenticated } from "api/auth";
import { sendRequestWithJson, sendRequest } from "api/api";
import { toast, ToastContainer } from "react-toastify";
import { fetchingAttendanceError } from "constants/errors";
import { addAttendanceError } from "constants/errors";
import { addAttendanceSuccess } from "constants/success";
import { allSessions } from "api/session";

function Attendance() {
  //start and end date of month
  const { user, token } = isAuthenticated();
  const startOfMonth = moment().startOf("month").format("YYYY-MM-DD");
  const endOfMonth = moment().endOf("month").format("YYYY-MM-DD");
  const endOfDayOfMonths = moment().endOf("month").format("DD");
  const [selectedClassIndex, setselectedClassIndex] = useState(0);
  const [attendance, setAttendance] = React.useState({
    dateFrom: startOfMonth,
    dateTo: endOfMonth,
    name: "",
    studentId: "",
    selectClass: "",
    selectSection: "",
  });
  const { classes } = useSelector((state) => state.classReducer);
  const [attendanceData, setAttendanceData] = useState([]);
  const [attendanceData1, setattendanceData1] = useState({});
  const [viewAttendance, setViewAttendance] = useState(false);
  const [allAttendance, setAllAttendance] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [selectedClassId, setSelectedClassId] = useState("");
  const [selectSessionId, setSelectSessionId] = useState("");
  // const [sections, setSections] = useState({})
  const [selectedClass, setSelectedClass] = useState({});
  // console.log("attendance", attendance);
  // console.log(classes);
  const [addAttendance, setAddAttendance] = useState([]);
  // const [loading, setLoading] = React.useState(true);
  const [attendanceStatus, setAttendanceStatus] = useState([]);
  const [atd, setAtd] = React.useState({});
  const [columns, setColumns] = useState([]);
  const [students1, setStudents1] = useState([]);
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

  // console.log("atd", atd);
  let permissions = [];
  useEffect(() => {
    console.log(user);
    if (user.role["Attendance"]) {
      permissions = user.role["Attendance"];
      console.log(permissions);
    }
    getSession();
  }, []);

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

  //modal window for addAttendance
  const [modal, setModal] = React.useState(false);
  const toggle = () => setModal(!modal);

  const handleChange = (name) => (event) => {
    // formData.set(name, event.target.value);
    setAttendance({
      ...attendance,
      [name]: event.target.value,
    });
    // console.log(name);
    if (name === "selectClass") {
      console.log("@@@@@@@@=>", event.target.value);

      let selectedClass = classes.find(
        (item) => item._id.toString() === event.target.value.toString()
      );
      console.log(selectedClass);
      setSelectedClass(selectedClass);
    }
  };

  useEffect(() => {
    let columns1 = [
      {
        title: "#",
        width: 50,
        dataIndex: "hash",
        key: "hash",
        fixed: "left",
      },
      {
        title: "Name",
        width: 50,
        dataIndex: "name",
        key: "name",
        fixed: "left",
      },
    ];
    setColumns(columns1);
    getAllStudents();
  }, []);

  useEffect(() => {
    setAttendance({ ...attendance, atd });
  }, [atd]);
  let tableData = [];
  const getAllStudents = async () => {
    const payload = { school: user.school };
    const res = await allStudents(
      user.school,
      user._id,
      token,
      JSON.stringify(payload)
    );
    //Data of ant Table
    // console.log(res);

    for (let i = 0; i < res.length; i++) {
      // console.log(res[i]._id);

      tableData.push({
        key: res[i]._id,
        hash: `${i + 1}`,
        name: res[i].firstname,
      });
    }
    setAttendanceData(tableData);
  };
  //Columns of ant Table

  // useEffect(() => {
  //   console.log(attendanceData1.workingDay);
  //   for (let i = 1; i <= attendanceData1.workingDay; i++) {
  //     columns.push({
  //       key: i,
  //       title: i,
  //       width: 110,
  //       dataIndex: "status",
  //     });
  //   }
  // }, [attendanceData]);

  useEffect(() => {
    getAllAttendance();
  }, []);

  const getAllAttendance = async () => {
    try {
      const data = await getAttendence(user.school, user._id);
      console.log(data);
      // setAllAttendance(data);

      const tableData = [];
      for (let i = 0; i < data.length; i++) {
        let date = data[i].date.slice(8, 10);
        for (let j = 0; j < endOfDayOfMonths; j++) {
          if (date.toString() === j.toString()) {
            tableData.push({
              key: j,
              status: data.attendance_status,
            });
          }
        }
      }
    } catch (err) {
      console.log(err);
      toast.error(fetchingAttendanceError);
    }
  };

  const submitAttendance = (studentId) => async (event) => {
    console.log(studentId);
    console.log(event.target.value);
    console.log(attendance);
    let today = new Date();
    let day = today.getDate();
    let month = today.getMonth() + 1;
    let year = today.getFullYear();

    let date = year + "-" + month + "-" + day;
    let sessionId1;
    sessions.map((data) => {
      if (data.status === "current") {
        // formData.set("session", data._id);
        sessionId1=data._id
      }
    });
    let attendance1 = {
      attendance_status: event.target.value,
      date,
      session: sessionId1,
      class: attendance.selectClass,
      section: attendance.selectSection,
      school: user.school,
      student: studentId,
    };

    setAddAttendance([...addAttendance, attendance1]);
  };

  const submitHandler = async () => {
    console.log(addAttendance);
    let formData = new FormData();
    formData.set("attendance", JSON.stringify(addAttendance));
    try {
      const data = await postAttendance(user._id, formData);
      console.log(data);
      toast.success(addAttendanceSuccess);
      setModal(false)
    } catch (err) {
      console.log(err);
      toast.error(addAttendanceError);
    }
  };

  const searchHandler = async () => {
    console.log(attendance);
    const formData = new FormData();
    formData.set("classId", attendance.selectClass);
    formData.set("sectionId", attendance.selectSection);
    let data1 = {
      class: attendance.selectClass,
      section: attendance.selectSection,
      start_date: attendance.dateFrom,
      end_date: attendance.dateTo,
    };
    try {
      const data = await searchAttendance(user._id, user.school, data1);
      console.log(data);
      setattendanceData1(data);
      // delete data.workingDay;
      // delete data.classTeacher;

      setViewAttendance(true);
      console.log(data.studentDatas);
      let students = [];
      for (const key in data.studentDatas) {
        console.log(`${key}: ${data.studentDatas[key]}`);
        console.log(key);
        let obj = {};
        obj[key] = data.studentDatas[key];
        console.log(obj);
        students.push(obj);
      }
      console.log(students);
      setStudents1(students);
    } catch (err) {
      console.log(err);
    }
  };

  // const attendanceValueChangeHandler = (value) => {};

  return (
    <div>
      <SimpleHeader name="Student" parentName="Attendance" />
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
      {/* {permissions && permissions.includes("add") && ( */}
      <Container className="mt--6 shadow-lg" fluid>
        <Form>
          <Card>
            <CardBody>
              <Row>
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
              <Row md="4" className="d-flex justify-content-center mb-4">
                <Col md="3">
                  <Label
                    className="form-control-label"
                    htmlFor="xample-date-input"
                  >
                    From
                  </Label>
                  <Input
                    className="form-control-sm"
                    id="example-date-input"
                    type="date"
                    onChange={handleChange("dateFrom")}
                    value={attendance.dateFrom}
                    required
                  />
                </Col>
                <Col md="3">
                  <Label
                    className="form-control-label"
                    htmlFor="example-date-input"
                  >
                    To
                  </Label>
                  <Input
                    className="form-control-sm"
                    id="example-date-input"
                    type="date"
                    onChange={handleChange("dateTo")}
                    value={attendance.dateTo}
                  />
                </Col>
                {/* </Row> */}
                {/* <Row className="d-flex justify-content-center mb-4"> */}
                <Col md="3">
                  <Label
                    className="form-control-label"
                    htmlFor="xample-date-input"
                  >
                    Name
                  </Label>
                  <Input
                    className="form-control-sm"
                    id="example4cols2Input"
                    placeholder="Name"
                    onChange={handleChange("name")}
                    value={attendance.name}
                    type="text"
                    required
                  />
                </Col>
                <Col md="3">
                  <Label
                    className="form-control-label"
                    htmlFor="xample-date-input"
                  >
                    StudentID
                  </Label>
                  <Input
                    className="form-control-sm"
                    id="example4cols2Input"
                    placeholder="StudentID"
                    type="text"
                    onChange={handleChange("studentId")}
                    value={attendance.studentId}
                    required
                  />
                </Col>
                <Col md="3">
                  <Label
                    className="form-control-label"
                    htmlFor="xample-date-input"
                  >
                    Select Class
                  </Label>
                  <Input
                    className="form-control-sm"
                    id="exampleFormControlSelect3"
                    type="select"
                    onChange={handleChange("selectClass")}
                    value={attendance.selectClass}
                    required
                  >
                    <option value="">Select Class</option>
                    {classes &&
                      classes.map((clas, index) => {
                        // setselectedClassIndex(index)
                        // console.log(clas);
                        return (
                          <option value={clas._id} key={index}>
                            {clas.name}
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
                    Select Section
                  </Label>
                  <Input
                    className="form-control-sm"
                    id="exampleFormControlSelect3"
                    type="select"
                    onChange={handleChange("selectSection")}
                    value={attendance.selectSection}
                    required
                  >
                    <option value="">Select Section</option>
                    {selectedClass.section &&
                      selectedClass.section.map((section) => {
                        // console.log(section.name);
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
              
                <Col className="mt-4">
                  <Button color="primary" onClick={searchHandler}>
                    Search
                  </Button>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Form>
      </Container>
      {/* )} */}
      {viewAttendance && (
        <Container className="mt--0 shadow-lg table-responsive" fluid>
          <Row>
            <Col>
              <Card>
                <CardHeader>
                  <div className="w-100">
                    <div className="row">
                      <div className="col-sm">
                        <h3 className="start-end">
                          {startOfMonth} - {endOfMonth}
                        </h3>
                      </div>
                      <div className="col-sm Student-Attendance-Icons">
                        <p
                          className="ni ni-single-02"
                          style={{ background: "green", color: "white" }}
                        ></p>
                        <span className="tags"> - Present</span>
                        <p
                          className="ni ni-single-02"
                          style={{
                            background: "rgb(201, 3, 3)",
                            color: "white",
                          }}
                        ></p>
                        <span> - Absent</span>
                        <p
                          className="ni ni-single-02"
                          style={{
                            background: "rgb(243, 243, 71)",
                            color: "white",
                          }}
                        ></p>
                        <span> - Leave</span>
                      </div>
                      {/* {permissions && permissions.includes("edit") && ( */}
                      <div className="col-sm">
                        <Button
                          className="attendance-button"
                          onClick={toggle}
                          color="primary"
                        >
                          Add Attendance
                        </Button>
                      </div>
                      {/* )} */}
                    </div>
                  </div>
                </CardHeader>
                <CardBody>
                  {/* <Table
                    columns={columns}
                    dataSource={attendanceData}
                    scroll={{ x: 1300, y: 600 }}
                  /> */}

                  <table>
                    <tr>
                      <th>#</th>
                      <th>Name</th>
                      {attendanceData1.workingDay.map((day) => {
                        return <th key={day}>{day}</th>;
                      })}
                    </tr>
                    {students1.map((student, index) => {
                      console.log(student);
                      return (
                        <>
                          <tr key={index} >
                            <td>{index + 1}</td>
                            <td>{Object.keys(student)}</td>
                            {student[Object.keys(student)].map((status,index)=>{
                              console.log(status,index);
                              return(
                                <td key={index} >{status}</td>
                              )
                            })}
                          </tr>
                        </>
                      );
                    })}
                  </table>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Modal
            backdrop="static"
            size="xl"
            scrollable
            isOpen={modal}
            toggle={toggle}
            className="custom-modal-style"
          >
            <ModalHeader isClose={modal} toggle={toggle}>
              Add Attendance
            </ModalHeader>
            <ModalBody className="modal-body">
              <div>
                {attendanceData.map((student, index) => {
                  // console.log(student);
                  return (
                    <>
                      <div className="d-flex justify-content-between studentAttendance">
                        <div>
                          <p key={student.key}>{student.name}</p>
                        </div>
                        <div>
                          <input
                            type="radio"
                            onChange={submitAttendance(student.key)}
                            value="P"
                            checked={atd.present}
                            name={index}
                          />
                          Present
                        </div>
                        <div>
                          <input
                            type="radio"
                            onChange={submitAttendance(student.key)}
                            value="A"
                            name={index}
                          />{" "}
                          Absent
                        </div>
                        <div>
                          <input
                            type="radio"
                            name={index}
                            value="HF"
                            onChange={submitAttendance(student.key)}
                          />{" "}
                          Half Day
                        </div>
                        <div>
                          <input
                            type="radio"
                            value="L"
                            name={index}
                            onChange={submitAttendance(student.key)}
                          />{" "}
                          Leave
                        </div>
                      </div>
                    </>
                  );
                })}
                <div className="col-sm">
                  <Button
                    className="attendance-button"
                    onClick={submitHandler}
                    color="primary"
                  >
                    Submit
                  </Button>
                </div>
              </div>
            </ModalBody>
          </Modal>
        </Container>
      )}
    </div>
  );
}

export default Attendance;
