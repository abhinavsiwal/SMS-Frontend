import React from "react";

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
  // Modal,
  // ModalHeader,
  // ModalBody,
  // CardHeader,
} from "reactstrap";

//css
import "./TimeTable.css";

//React-select
import Select from "react-select";

// core components
import SimpleHeader from "components/Headers/SimpleHeader.js";

//antTabel
// import { Table } from "antd";

//React Datepicker
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import moment from "moment";

function TimeTable() {
  const [timeTableData, setTimeTableData] = React.useState({
    subjects: "",
    teachers: "",
    selectMode: "",
    periods: "",
  });
  console.log("timetable", timeTableData);
  const [startDate, setStartDate] = React.useState(new Date());
  const startDuration = moment(startDate).format("LT");
  const [endDate, setEndDate] = React.useState(new Date());
  const endDuration = moment(endDate).format("LT");
  const [days, setDays] = React.useState([]);

  const roleOptions = [
    { value: "0", label: "Monday" },
    { value: "1", label: "Tuesday" },
    { value: "2", label: "Wednesday" },
    { value: "3", label: "Thursday" },
    { value: "4", label: "Friday" },
    { value: "5", label: "Saturday" },
  ];

  const handleChange = (name) => (event) => {
    // formData.set(name, event.target.value);
    setTimeTableData({ ...timeTableData, [name]: event.target.value });
  };

  const handleSubjectChange = (e) => {
    var value = [];
    for (var i = 0, l = e.length; i < l; i++) {
      value.push(e[i].value);
    }
    // formData.set("subject", JSON.stringify(value));
    setDays(value);
  };

  const [timePeriod, setTimePeriod] = React.useState([
    [
      "Not Selected Yet",
      "Not Selected Yet",
      "Not Selected Yet",
      "Lunch",
      "Not Selected Yet",
      "Not Selected Yet",
      "Not Selected Yet",
      "Not Selected Yet",
    ],
    [
      "Not Selected Yet",
      "Not Selected Yet",
      "Not Selected Yet",
      "Lunch",
      "Not Selected Yet",
      "Not Selected Yet",
      "Not Selected Yet",
      "Not Selected Yet",
    ],
    [
      "Not Selected Yet",
      "Not Selected Yet",
      "Not Selected Yet",
      "Lunch",
      "Not Selected Yet",
      "Not Selected Yet",
      "Not Selected Yet",
      "Not Selected Yet",
    ],
    [
      "Not Selected Yet",
      "Not Selected Yet",
      "Not Selected Yet",
      "Lunch",
      "Not Selected Yet",
      "Not Selected Yet",
      "Not Selected Yet",
      "Not Selected Yet",
    ],
    [
      "Not Selected Yet",
      "Not Selected Yet",
      "Not Selected Yet",
      "Lunch",
      "Not Selected Yet",
      "Not Selected Yet",
      "Not Selected Yet",
      "Not Selected Yet",
    ],
    [
      "Not Selected Yet",
      "Not Selected Yet",
      "Not Selected Yet",
      "Lunch",
      "Not Selected Yet",
      "Not Selected Yet",
      "Not Selected Yet",
      "Not Selected Yet",
    ],
    // [
    //   "Days",
    //   "period1",
    //   "period2",
    //   "period3",
    //   "LUNCH",
    //   "period4",
    //   "period5",
    //   "period6",
    //   "period7",
    // ],
    // [
    //   "Mon",
    //   "Not Selected Yet",
    //   "Not Selected Yet",
    //   "Not Selected Yet",
    //   "",
    //   "Not Selected Yet",
    //   "Not Selected Yet",
    //   "Not Selected Yet",
    //   "Not Selected Yet",
    // ],
    // [
    //   "Tue",
    //   "Not Selected Yet",
    //   "Not Selected Yet",
    //   "Not Selected Yet",
    //   "",
    //   "Not Selected Yet",
    //   "Not Selected Yet",
    //   "Not Selected Yet",
    //   "Not Selected Yet",
    // ],
    // [
    //   "Wed",
    //   "Not Selected Yet",
    //   "Not Selected Yet",
    //   "Not Selected Yet",
    //   "",
    //   "Not Selected Yet",
    //   "Not Selected Yet",
    //   "Not Selected Yet",
    //   "Not Selected Yet",
    // ],
    // [
    //   "Thu",
    //   "Not Selected Yet",
    //   "Not Selected Yet",
    //   "Not Selected Yet",
    //   "",
    //   "Not Selected Yet",
    //   "Not Selected Yet",
    //   "Not Selected Yet",
    //   "Not Selected Yet",
    // ],
    // [
    //   "Fri",
    //   "Not Selected Yet",
    //   "Not Selected Yet",
    //   "Not Selected Yet",
    //   "",
    //   "Not Selected Yet",
    //   "Not Selected Yet",
    //   "Not Selected Yet",
    //   "Not Selected Yet",
    // ],
    // [
    //   "Sat",
    //   "Not Selected Yet",
    //   "Not Selected Yet",
    //   "Not Selected Yet",
    //   "",
    //   "Not Selected Yet",
    //   "Not Selected Yet",
    //   "Not Selected Yet",
    //   "Not Selected Yet",
    // ],
  ]);

  const handleData = () => {
    for (var i = 0; i < days.length; i++) {
      let row = i;
      let column = parseInt(timeTableData.periods);
      let copy = [...timePeriod];
      copy[row][
        column
      ] = `${startDuration} - ${endDuration} Subject: ${timeTableData.subjects} Teacher: ${timeTableData.teachers} `;
      // startDuration + "-" + endDuration + "<br/>" + timeTableData.subjects;
      setTimePeriod(copy);
    }
  };

  return (
    <div>
      <SimpleHeader name="Student" parentName="Time Table" />
      <Container className="mt--6 shadow-lg" fluid>
        <Form>
          <Card>
            <CardBody>
              <Row md="4" className="d-flex justify-content-center mb-4">
                <Col md="3">
                  <Label
                    className="form-control-label"
                    htmlFor="xample-date-input"
                  >
                    From
                  </Label>
                  <DatePicker
                    className="form-control-sm"
                    id="exampleFormControlSelect3"
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
                    className="form-control-sm"
                    id="exampleFormControlSelect3"
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
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
              </Row>
              <Row className="d-flex justify-content-center mb-4">
                <Col md="3">
                  <Label
                    className="form-control-label"
                    htmlFor="xample-date-input"
                  >
                    Subjects
                  </Label>
                  <Input
                    className="form-control-sm"
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
                    className="form-control-sm"
                    id="exampleFormControlSelect3"
                    type="select"
                    onChange={handleChange("teachers")}
                    value={timeTableData.teachers}
                    required
                  >
                    <option value="" disabled selected>
                      Teacher
                    </option>
                    <option>Karmanshu</option>
                    <option>Ayushi</option>
                    <option>Sanjay</option>
                    <option>Kulseep</option>
                  </Input>
                </Col>
                <Col md="3">
                  <Label
                    className="form-control-label"
                    htmlFor="xample-date-input"
                  >
                    Periods
                  </Label>
                  <Input
                    className="form-control-sm"
                    id="exampleFormControlSelect3"
                    type="select"
                    onChange={handleChange("periods")}
                    value={timeTableData.periods}
                    required
                  >
                    <option value="" disabled selected>
                      Periods
                    </option>
                    <option value="0">Period1</option>
                    <option value="1">Period2</option>
                    <option value="2">Period3</option>
                    <option value="3">Period4</option>
                    <option value="4">Period5</option>
                    <option value="5">Period6</option>
                    <option value="6">Period7</option>
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
                    className="form-control-sm"
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
                <Col className="mt-4">
                  <Button color="primary" onClick={handleData}>
                    Add
                  </Button>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Form>
      </Container>
      <Container className="mt--0 shadow-lg table-responsive" fluid>
        <Card>
          <CardHeader>Time Table</CardHeader>
          <CardBody>
            <Table bordered>
              <thead>
                <tr>
                  <th>Days</th>
                  <th>Period1</th>
                  <th>Period2</th>
                  <th>Period3</th>
                  <th>Lunch</th>
                  <th>Period4</th>
                  <th>Period5</th>
                  <th>Period6</th>
                  <th>Period7</th>
                </tr>
              </thead>
              <tbody>
                {/* {timePeriod.map((item1, index1) => {
                  return (
                    <tr>
                      {item1.map((item2, index2) => {
                        if (index1 === 0 || index2 === 0)
                          return <th>{item2}</th>;
                        else return <td>{item2}</td>;
                      })}
                    </tr>
                  );
                })} */}
                <tr className="Time-Table-Badge">
                  <th scope="row">Mon</th>
                  <td key="1" id="11">
                    <div>{timePeriod[0][0]}</div>
                  </td>
                  <td key="2" id="12">
                    <div>{timePeriod[0][1]}</div>
                  </td>
                  <td key="3" id="13">
                    <div>{timePeriod[0][2]}</div>
                  </td>
                  <td key="4" id="14">
                    <div>{timePeriod[0][3]}</div>
                  </td>
                  <td key="5" id="15">
                    <div>{timePeriod[0][4]}</div>
                  </td>
                  <td key="6" id="16">
                    <div>{timePeriod[0][5]}</div>
                  </td>
                  <td key="7" id="17">
                    <div>{timePeriod[0][6]}</div>
                  </td>
                  <td key="7" id="17">
                    <div>{timePeriod[0][7]}</div>
                  </td>
                </tr>
                <tr>
                  <th scope="row">Tue</th>
                  <td key="8" id="21">
                    <div>{timePeriod[1][0]}</div>
                  </td>
                  <td key="9" id="22">
                    <div>{timePeriod[1][1]}</div>
                  </td>
                  <td key="10" id="23">
                    <div>{timePeriod[1][2]}</div>
                  </td>
                  <td key="11" id="24">
                    <div>{timePeriod[1][3]}</div>
                  </td>
                  <td key="12" id="25">
                    <div>{timePeriod[1][4]}</div>
                  </td>
                  <td key="13" id="26">
                    <div>{timePeriod[1][5]}</div>
                  </td>
                  <td key="14" id="27">
                    <div>{timePeriod[1][6]}</div>
                  </td>
                  <td key="7" id="17">
                    <div>{timePeriod[1][7]}</div>
                  </td>
                </tr>
                <tr>
                  <th scope="row">Wed</th>
                  <td key="15" id="31">
                    <div>{timePeriod[2][0]}</div>
                  </td>
                  <td key="16" id="32">
                    <div>{timePeriod[2][1]}</div>
                  </td>
                  <td key="17" id="33">
                    <div>{timePeriod[2][2]}</div>
                  </td>
                  <td key="18" id="34">
                    <div>{timePeriod[2][3]}</div>
                  </td>
                  <td key="19" id="35">
                    <div>{timePeriod[2][4]}</div>
                  </td>
                  <td key="20" id="36">
                    {timePeriod[2][5]}
                  </td>
                  <td key="21" id="37">
                    {timePeriod[2][6]}
                  </td>
                  <td key="7" id="17">
                    {timePeriod[2][7]}
                  </td>
                </tr>
                <tr>
                  <th scope="row">Thurs</th>
                  <td key="21" id="41">
                    {timePeriod[3][0]}
                  </td>
                  <td key="22" id="42">
                    {timePeriod[3][1]}
                  </td>
                  <td key="23" id="43">
                    {timePeriod[3][2]}
                  </td>
                  <td key="24" id="44">
                    {timePeriod[3][3]}
                  </td>
                  <td key="25" id="45">
                    {timePeriod[3][4]}
                  </td>
                  <td key="26" id="46">
                    {timePeriod[3][5]}
                  </td>
                  <td key="27" id="47">
                    {timePeriod[3][6]}
                  </td>
                  <td key="7" id="17">
                    {timePeriod[3][7]}
                  </td>
                </tr>
                <tr>
                  <th scope="row">Fri</th>
                  <td key="28" id="51">
                    {timePeriod[4][0]}
                  </td>
                  <td key="29" id="52">
                    {timePeriod[4][1]}
                  </td>
                  <td key="30" id="53">
                    {timePeriod[4][2]}
                  </td>
                  <td key="31" id="54">
                    {timePeriod[4][3]}
                  </td>
                  <td key="32" id="55">
                    {timePeriod[4][4]}
                  </td>
                  <td key="33" id="56">
                    {timePeriod[4][5]}
                  </td>
                  <td key="34" id="57">
                    {timePeriod[4][6]}
                  </td>
                  <td key="7" id="17">
                    {timePeriod[4][7]}
                  </td>
                </tr>
                <tr>
                  <th scope="row">Sat</th>
                  <td key="35" id="61">
                    {timePeriod[5][0]}
                  </td>
                  <td key="36" id="62">
                    {timePeriod[5][1]}
                  </td>
                  <td key="37" id="63">
                    {timePeriod[5][2]}
                  </td>
                  <td key="38" id="64">
                    {timePeriod[5][3]}
                  </td>
                  <td key="39" id="65">
                    {timePeriod[5][4]}
                  </td>
                  <td key="40" id="66">
                    {timePeriod[5][5]}
                  </td>
                  <td key="41" id="67">
                    {timePeriod[5][6]}
                  </td>
                  <td key="7" id="17">
                    {timePeriod[5][7]}
                  </td>
                </tr>
              </tbody>
            </Table>
          </CardBody>
        </Card>
      </Container>
    </div>
  );
}

export default TimeTable;
