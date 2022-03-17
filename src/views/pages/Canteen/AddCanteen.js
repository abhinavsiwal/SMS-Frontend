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
} from "reactstrap";

//React Datepicker
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

//css
import "./Styles.css";

// core components
import SimpleHeader from "components/Headers/SimpleHeader.js";
import TextArea from "antd/lib/input/TextArea";

// import moment Library
import moment from "moment";

//React-Select
import Select from "react-select";

import {canteenAdd} from '../../../api/canteen/index'

function AddCanteen() {
  const [startDate, setStartDate] = React.useState(new Date());
  const startDuration = moment(startDate).format("LT");
  console.log("start", startDuration);
  const [endDate, setEndDate] = React.useState(new Date());
  const endDuration = moment(endDate).format("LT");
  console.log("end", endDuration);

  const [addCanteen, setAddCanteen] = React.useState({
    canteenName: "",
  });
  console.log("addCanteen", addCanteen);

  const [addMenu, setAddMenu] = React.useState({
    image: "",
    items: "",
    addCanteen: "",
    description: "",
    prize: "",
    publish: "",
  });
  console.log("addMenu", addMenu);

  const roleOptions = [
    { value: "0", label: "Shyamlal" },
    { value: "1", label: "Ramlal" },
  ];

  //Values of addCanteen
  const handleChangeCanteen = (name) => (event) => {
    // formData.set(name, event.target.value);
    setAddCanteen({ ...addCanteen, [name]: event.target.value });
  };

  const handleSubjectChange = (e) => {
    var value = [];
    for (var i = 0, l = e.length; i < l; i++) {
      value.push(e[i].value);
    }
    // formData.set("subject", JSON.stringify(value));
  };

  const addCanteenHandler=async()=>{
    try {
      const data = await canteenAdd();
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  }

  //values of addMenu
  const handleChangeMenu = (name) => (event) => {
    // formData.set(name, event.target.value);
    setAddMenu({ ...addMenu, [name]: event.target.value });
  };

  //Value for image
  const handleFileChange = (name) => (event) => {
    // formData.set(name, event.target.files[0]);
    setAddMenu({ ...addMenu, [name]: event.target.files[0].name });
  };

  return (
    <>
      <SimpleHeader name="Canteen" parentName="Add Canteen" />
      <Container className="mt--6" fluid>
        <Row>
          <Col lg="4">
            <div className="card-wrapper">
              <Card>
                <CardHeader>
                  <h3>Add Canteen</h3>
                </CardHeader>
                <Form className="mb-4">
                  <CardBody>
                    <Row>
                      <Col>
                        <Label
                          className="form-control-label"
                          htmlFor="example4cols2Input"
                        >
                          Canteen Name
                        </Label>
                        <Input
                          id="example4cols2Input"
                          placeholder="Class"
                          type="text"
                          onChange={handleChangeCanteen("canteenName")}
                          value={addCanteen.canteenName}
                          required
                        />
                      </Col>
                    </Row>
                    <Row className="mt-4">
                      <Col>
                        <Label
                          className="form-control-label"
                          htmlFor="xample-date-input"
                        >
                          Select Staff Member
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
                    <Row className="mt-4 float-right">
                      <Col>
                        <Button color="primary" type="submit">
                          Add
                        </Button>
                      </Col>
                    </Row>
                  </CardBody>
                </Form>
              </Card>
            </div>
          </Col>

          <Col lg="8">
            <div className="card-wrapper">
              <Card>
                <CardHeader>
                  <h3>Add Menu</h3>
                </CardHeader>
                <Form className="mb-4">
                  <CardBody>
                    <Row md="4" className="d-flex justify-content-center mb-4">
                      <Col md="8">
                        <label
                          className="form-control-label"
                          htmlFor="example3cols2Input"
                        >
                          Upload Image
                        </label>
                        <div className="custom-file">
                          <input
                            className="custom-file-input"
                            id="customFileLang"
                            lang="en"
                            type="file"
                            onChange={handleFileChange("image")}
                            accept="image/*"
                          />
                          <label
                            className="custom-file-label"
                            htmlFor="customFileLang"
                          >
                            Select file
                          </label>
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="6">
                        <Label
                          className="form-control-label"
                          htmlFor="example4cols2Input"
                        >
                          Items Name
                        </Label>
                        <Input
                          id="example4cols2Input"
                          placeholder="Class"
                          type="text"
                          onChange={handleChangeMenu("items")}
                          value={addMenu.items}
                          required
                        />
                      </Col>
                      <Col md="6">
                        <Label
                          className="form-control-label"
                          htmlFor="exampleFormControlSelect3"
                        >
                          Add Canteen
                        </Label>
                        <Input
                          id="exampleFormControlSelect3"
                          type="select"
                          onChange={handleChangeMenu("addCanteen")}
                          value={addMenu.addCanteen}
                          required
                        >
                          <option value="" disabled selected>
                            Add Canteen
                          </option>
                          <option>Sam</option>
                          <option>David</option>
                          <option>Sam</option>
                          <option>David</option>
                          <option>Sam</option>
                          <option>David</option>
                        </Input>
                      </Col>
                    </Row>
                    <Row className="mt-4">
                      <Col md="6">
                        <Label
                          className="form-control-label"
                          htmlFor="example4cols2Input"
                        >
                          Prize
                        </Label>
                        <Input
                          id="example4cols2Input"
                          placeholder="Class"
                          type="Number"
                          onChange={handleChangeMenu("prize")}
                          value={addMenu.prize}
                          required
                        />
                      </Col>
                      <Col md="6">
                        <Label
                          className="form-control-label"
                          htmlFor="exampleFormControlSelect3"
                        >
                          Publish
                        </Label>
                        <Input
                          id="exampleFormControlSelect3"
                          type="select"
                          onChange={handleChangeMenu("publish")}
                          value={addMenu.publish}
                          required
                        >
                          <option value="" disabled selected>
                            Publish
                          </option>
                          <option>Yes</option>
                          <option>No</option>
                        </Input>
                      </Col>
                    </Row>
                    <Row className="mt-4">
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
                          required
                        />
                      </Col>
                      <Col md="6">
                        <Label
                          className="form-control-label"
                          htmlFor="example4cols2Input"
                        >
                          Description
                        </Label>
                        <TextArea
                          id="example4cols2Input"
                          placeholder="Class"
                          type="Number"
                          onChange={handleChangeMenu("description")}
                          value={addMenu.description}
                        />
                      </Col>
                    </Row>
                    <Row className="mt-4 float-right">
                      <Col>
                        <Button color="primary" type="submit">
                          Add Menu
                        </Button>
                      </Col>
                    </Row>
                  </CardBody>
                </Form>
              </Card>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default AddCanteen;
