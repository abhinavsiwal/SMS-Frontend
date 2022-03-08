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
import { postAttendance } from "api/attendance";
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

function Attendance() {
  //start and end date of month
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
  console.log("attendance", attendance);
  console.log(classes);

  // const [loading, setLoading] = React.useState(true);

  const [atd, setAtd] = React.useState({});
  console.log("atd", atd);

  //modal window for addAttendance
  const [modal, setModal] = React.useState(false);
  const toggle = () => setModal(!modal);

  const handleChange = (name) => (event) => {
    // formData.set(name, event.target.value);
    setAttendance({
      ...attendance,
      [name]: event.target.value,
    });
    console.log(name);
    if (name === "selectClass") {
      console.log("@@@@@@@@=>", event.target.value);
      for (let i = 0; i < classes.length; i++) {
        if (classes[i].name === event.target.value) {
          console.log("#######");
          setselectedClassIndex(i);
        }
      }
    }
  };

  useEffect(() => {
    getAllStudents();
  }, []);

  useEffect(() => {
    setAttendance({ ...attendance, atd });
  }, [atd]);

  const getAllStudents = async () => {
    const { user, token } = isAuthenticated();
    const payload = { school: user.school };
    const res = await allStudents(
      user.school,
      user._id,
      token,
      JSON.stringify(payload)
    );
    //Data of ant Table
    console.log(res);
    for (let i = 0; i < res.length; i++) {
      console.log(res[i].firstname);
      setAttendanceData([
        ...attendanceData,
        { key: i, hash: `${i}`, name: res[i].firstname },
      ]);
    }
  };
  //Columns of ant Table
  const columns = [
    {
      title: "#",
      width: 50,
      dataIndex: "hash",
      key: "hash",
      fixed: "left",
    },
    {
      title: "Name",
      width: 100,
      dataIndex: "name",
      key: "name",
      fixed: "left",
    },
  ];

  for (let i = 1; i <= endOfDayOfMonths; i++) {
    columns.push({
      key: i,
      title: i,
      width: 110,
    });
  }

  useEffect(() => {
    getAllAttendance();
  }, []);

  const { user } = isAuthenticated();
  const getAllAttendance = async () => {
    const data = await getAttendence(user.school, user._id);
    console.log(data);
  };

  const postAttendance = async () => {
    const data = await postAttendance(user._id, attendanceData);
    console.log(data);
  };

  const submitHandler = async () => {
    const { user, token } = isAuthenticated();
    const payload = { school: user.school };

    let attData = {
      attendance: atd,
      classId: classes[selectedClassIndex].name,
      sectionId: classes[selectedClassIndex].section._id,
      year: 2022,
      schoolId: user.school,
    };


    try {
      const data = await postAttendance(user._id, attData);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
    
  };

  return (
    <div>
      <SimpleHeader name="Student" parentName="Attendance" />
      <Container className="mt--6 shadow-lg" fluid>
        <Form>
          <Card>
            <CardBody>
              <Row md="4" className="d-flex justify-content-center mb-4">
                <Col md="6">
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
                <Col md="6">
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
              </Row>
              <Row className="d-flex justify-content-center mb-4">
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
                    {classes &&
                      classes.map((clas, index) => {
                        // setselectedClassIndex(index)
                        return (
                          <option value={clas.name} key={index}>
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
                    {classes[selectedClassIndex] &&
                      classes[selectedClassIndex].section.map((section) => {
                        console.log(section);
                        return (
                          <option value={section} disabled selected>
                            {section}
                          </option>
                        );
                      })}
                  </Input>
                </Col>
                <Col className="mt-4">
                  <Button color="primary">Search</Button>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Form>
      </Container>
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
                        style={{ background: "rgb(201, 3, 3)", color: "white" }}
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
                    <div className="col-sm">
                      <Button
                        className="attendance-button"
                        onClick={toggle}
                        color="primary"
                      >
                        Add Attendance
                      </Button>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardBody>
                <Table
                  columns={columns}
                  dataSource={attendanceData}
                  scroll={{ x: 1300, y: 600 }}
                />
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Modal
          backdrop="static"
          size="xl"
          scrollable={true}
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
                return (
                  <>
                    <div className="d-flex justify-content-between studentAttendance">
                      <div>
                        <p key={student.key}>{student.name}</p>
                      </div>
                      <div>
                        <input
                          type="radio"
                          onChange={(e) =>
                            setAtd({
                              ...atd,
                              [index]: e.target.value,
                            })
                          }
                          value="present"
                          checked={atd.present}
                          name={index}
                        />
                        Present
                      </div>
                      <div>
                        <input
                          type="radio"
                          onChange={(e) =>
                            setAtd({
                              ...atd,
                              [index]: e.target.value,
                            })
                          }
                          value="absent"
                          name={index}
                        />{" "}
                        Absent
                      </div>
                      <div>
                        <input
                          type="radio"
                          name={index}
                          value="halfday"
                          onChange={(e) =>
                            setAtd({
                              ...atd,
                              [index]: e.target.value,
                            })
                          }
                        />{" "}
                        Half Day
                      </div>
                      <div>
                        <input
                          type="radio"
                          value="leave"
                          name={index}
                          onChange={(e) =>
                            setAtd({
                              ...atd,
                              [index]: e.target.value,
                            })
                          }
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
    </div>
  );
}

export default Attendance;
