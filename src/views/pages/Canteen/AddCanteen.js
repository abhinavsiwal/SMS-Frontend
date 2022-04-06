import React, { useState, useEffect } from "react";

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
import { isAuthenticated } from "api/auth";
//css
import "./Styles.css";

// core components
import SimpleHeader from "components/Headers/SimpleHeader.js";
import TextArea from "antd/lib/input/TextArea";

// import moment Library
import moment from "moment";
import { allStaffs } from "api/staff";
//React-Select
import Select from "react-select";

import { canteenAdd, allCanteens, menuAdd } from "../../../api/canteen/index";
import { toast, ToastContainer } from "react-toastify";
import { fetchingStaffFailed } from "constants/errors";
import { fetchingCanteenError } from "constants/errors";
import { addCanteenError } from "constants/errors";

import FixRequiredSelect from "../../../components/FixRequiredSelect";
import BaseSelect from "react-select";

function AddCanteen() {
  const [startDate, setStartDate] = React.useState(new Date());
  const startDuration = moment(startDate).format("LT");
  console.log("start", startDuration);
  const [endDate, setEndDate] = React.useState(new Date());
  const endDuration = moment(endDate).format("LT");
  const [allStaff, setAllStaff] = useState([]);
  const { user } = isAuthenticated();
  const [roleOptions, setRoleOptions] = useState([]);
  const [canteenName, setCanteenName] = useState("");
  const [allCanteen, setAllCanteen] = useState([]);
  const [checked, setChecked] = useState(false);
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

  let permissions = [];
  useEffect(() => {
    if (user.role["Canteen Management"]) {
      permissions = user.role["Canteen Management"];
      console.log(permissions);
    }
  }, []);

  const getAllStaffs = async () => {
    try {
      const res = await allStaffs(user.school, user._id);
      console.log(res);
      let canteenStaff = res.find((staff) => staff.assign_role === "canteen");
      setAllStaff(canteenStaff);
      let options = [];
      for (let i = 0; i < res.length; i++) {
        options.push({ value: res[i]._id, label: res[i].firstname });
      }
      console.log(options);
      setRoleOptions(options);
    } catch (err) {
      console.log(err);
      toast.error(fetchingStaffFailed);
    }
  };

  const getAllCanteens = async () => {
    try {
      let data = await allCanteens(user._id, user.school);
      console.log(data);
      setAllCanteen(data);
    } catch (err) {
      console.log(err);
      toast.error(fetchingCanteenError);
    }
  };

  useEffect(() => {
    getAllStaffs();
    // console.log(allStaff);
  }, []);

  // console.log(roleOptions);
  // console.log("end", endDuration);

  useEffect(() => {
    getAllCanteens();
  }, [checked]);

  const [addCanteen, setAddCanteen] = React.useState({
    canteenName: "",
  });
  console.log("addCanteen", addCanteen);
  const [selectedCanteenId, setSelectedCanteenId] = useState("");
  console.log(selectedCanteenId);
  const [addMenu, setAddMenu] = React.useState({
    image: "",
    items: "",
    description: "",
    price: "",
    publish: "",
  });
  console.log("addMenu", addMenu);

  const addCanteenFormData = new FormData();

  //Values of Staff
  const handleStaffChange = (e) => {
    var value = [];
    for (var i = 0, l = e.length; i < l; i++) {
      value.push(e[i].value);
    }
    console.log(value);
    addCanteenFormData.set("staff", JSON.stringify(value));
  };

  //Add Canteen
  const addCanteenHandler = async (e) => {
    e.preventDefault();
    addCanteenFormData.set("name", canteenName);
    addCanteenFormData.set("school", user.school);
    try {
      const data = await canteenAdd(user._id, addCanteenFormData);
      console.log(data);
      if (data.err) {
        return toast.error(data.err);
      } else {
        setCanteenName("");
        toast.success("Canteen Added Successfully");
        setChecked(!checked);
      }
    } catch (err) {
      toast.error(addCanteenError);
    }
  };

  //values of addMenu
  const handleChangeMenu = (name) => (event) => {
    setAddMenu({ ...addMenu, [name]: event.target.value });
  };

  //Value for image
  const handleFileChange = (name) => (event) => {
    setAddMenu({ ...addMenu, [name]: event.target.files[0].name });
  };

  //AddMenu
  const addMenuHandler = async (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.set("school", user.school);
    formData.set("item", addMenu.items);
    formData.set("image", addMenu.image);
    formData.set("description", addMenu.description);
    formData.set("start_time", startDuration);
    formData.set("end_time", endDuration);
    formData.set("price", addMenu.price);
    formData.set("publish", addMenu.publish);
    formData.set("canteen", selectedCanteenId);

    try {
      let data = await menuAdd(user._id, formData);
      if (data.err) {
        return toast.error(data.err);
      }
      toast.success("Menu Added Successfully");
      setAddMenu({
        image: "",
        items: "",
        description: "",
        price: "",
        publish: "",
      });
    } catch (err) {
      toast.error(addCanteenError);
    }
  };

  const Select = (props) => (
    <FixRequiredSelect
      {...props}
      SelectComponent={BaseSelect}
      options={props.options}
    />
  );

  return (
    <>
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
      <SimpleHeader name="Canteen" parentName="Add Canteen" />
      <Container className="mt--6" fluid>
        <Row>
          <Col lg="4">
            <div className="card-wrapper">
              <Card>
                <CardHeader>
                  <h3>Add Canteen</h3>
                </CardHeader>
                <Row>
                  <Col className="d-flex justify-content-center mt-3 ">
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
                <Form className="mb-4" onSubmit={addCanteenHandler}>
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
                          onChange={(e) => setCanteenName(e.target.value)}
                          value={canteenName}
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
                          onChange={handleStaffChange}
                          className="basic-multi-select"
                          classNamePrefix="select"
                          required
                        />
                      </Col>
                    </Row>
                    <Row className="mt-4">
                      <Col style={{display:"flex",justifyContent:"center",width:"100%"}} >
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
                <Form className="mb-4" onSubmit={addMenuHandler}>
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
                          placeholder="Name"
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
                          onChange={(e) => setSelectedCanteenId(e.target.value)}
                          value={addMenu.addCanteen}
                          required
                        >
                          <option disabled value="" selected>
                            Select Canteen
                          </option>
                          {allCanteen.map((canteen) => {
                            return (
                              <option
                                key={canteen._id}
                                value={canteen._id}
                                selected
                              >
                                {canteen.name}
                              </option>
                            );
                          })}
                        </Input>
                      </Col>
                    </Row>
                    <Row className="mt-4">
                      <Col md="6">
                        <Label
                          className="form-control-label"
                          htmlFor="example4cols2Input"
                        >
                          Price
                        </Label>
                        <Input
                          id="example4cols2Input"
                          placeholder="Price"
                          type="Number"
                          onChange={handleChangeMenu("price")}
                          value={addMenu.price}
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
                          placeholder="Description"
                          type="Number"
                          onChange={handleChangeMenu("description")}
                          value={addMenu.description}
                        />
                      </Col>
                    </Row>
                    <Row className="mt-4">
                      <Col style={{display:"flex",justifyContent:"center",width:"100%"}}>
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
