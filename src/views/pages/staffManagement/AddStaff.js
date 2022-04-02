import React, { useEffect, useState } from "react";

//import reactstrap
import {
  Card,
  CardHeader,
  CardBody,
  Label,
  FormGroup,
  Input,
  Container,
  Row,
  Col,
  Button,
  Form,
} from "reactstrap";

// core components
import SimpleHeader from "components/Headers/SimpleHeader.js";

import { Stepper, Step } from "react-form-stepper";

import Select from "react-select";
import { Country, State, City } from "country-state-city";

//import CSS file here
import "./style.css";

import { ToastContainer, toast } from "react-toastify";

// import { isAuthenticated } from "api/auth";
import { addStaff } from "api/staff";
import { isAuthenticated } from "api/auth";
import { getDepartment } from "api/department";
import { allSubjects } from "api/subjects";
import { getAllRoles } from "api/rolesAndPermission";
import { addStudentError } from "constants/errors";
import { fetchingSubjectError } from "constants/errors";
import { fetchingDepartmentError } from "constants/errors";
import { allSessions } from "api/session";

import FixRequiredSelect from "../../../components/FixRequiredSelect";
import BaseSelect from "react-select";

import { useHistory } from "react-router-dom";

function AddStaff() {
  const [step, setStep] = useState(0);
  const { user } = isAuthenticated();
  const [staffData, setStaffData] = useState({
    image: "",
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    alternate_phone: "",
    date_of_birth: "",
    gender: "",
    birth_place: "",
    caste: "",
    religion: "",
    mother_tongue: "",
    bloodgroup: "",
    joining_date: "",
    present_address: "",
    permanent_address: "",
    state: "",
    city: "",
    country: "",
    pincode: "",
    contact_person_name: "",
    contact_person_relation: "",
    contact_person_phone: "",
    contact_person_address: "",
    contact_person_state: "",
    contact_person_city: "",
    contact_person_country: "",
    contact_person_pincode: "",
    assign_role: null,
    job: "",
    salary: "",
    qualification: "",
    department: "",
    subject: "",
  });
  const history = useHistory();
  const [allRoles, setAllRoles] = useState([]);
  console.log("staff", staffData);
  const [sessions, setSessions] = useState([]);
  const [selectSessionId, setSelectSessionId] = useState("");
  const [formData] = useState(new FormData());
  const [departments, setDeparments] = useState([]);
  const [a, setA] = useState([]);
  const [file, setFile] = useState();
  const fileReader = new FileReader();

  useEffect(() => {
    getAllRolesHandler();
    getSession();
  }, []);

  const getAllRolesHandler = async () => {
    console.log(user);
    try {
      const data = await getAllRoles(user._id, user.school);
      console.log(data);
      setAllRoles(data);
      setStaffData({ ...staffData, assign_role: data[0].name });
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (name) => (event) => {
    formData.set(name, event.target.value);
    setStaffData({ ...staffData, [name]: event.target.value });
  };

  const handleFileChange = (name) => (event) => {
    formData.set(name, event.target.files[0]);
    setStaffData({ ...staffData, [name]: event.target.files[0] });
  };

  //react-select
  const handleSubjectChange = (e) => {
    var value = [];
    console.log("val", value);
    for (var i = 0, l = e.length; i < l; i++) {
      value.push(e[i].value);
    }
    formData.set("subject", JSON.stringify(value));
  };

  // handle Country state city data change
  const handleCSCChange = (name) => (event) => {
    if (name === "country") {
      setCscd({ ...cscd, country: event, state: null, city: null });
    } else if (name === "state") {
      setCscd({ ...cscd, state: event, city: null });
    } else {
      setCscd({ ...cscd, city: event });
    }
    setStaffData({ ...staffData, [name]: event.name });
    formData.set(name, event.name);
    setStaffData({ ...staffData, [name]: event.name });
  };

  // handle contact person Country state city data change
  const handlecpCSCChange = (name) => (event) => {
    if (name === "contact_person_country") {
      setcpCscd({
        ...cpcscd,
        contact_person_country: event,
        contact_person_state: null,
        contact_person_city: null,
      });
    } else if (name === "contact_person_state") {
      setcpCscd({
        ...cpcscd,
        contact_person_state: event,
        contact_person_city: null,
      });
    } else {
      setcpCscd({ ...cpcscd, contact_person_city: event });
    }
    setStaffData({ ...staffData, [name]: event.name });
    formData.set(name, event.name);
    setStaffData({ ...staffData, [name]: event.name });
  };

  // Stepper next step change
  const handleFormChange = (e) => {
    e.preventDefault();
    setStep((step) => {
      return step + 1;
    });
    window.scrollTo(0, 0);
  };

  //Submiting Form Data
  const handleSubmitForm = async (e) => {
    e.preventDefault();
    const { user, token } = isAuthenticated();
    formData.set("school", user.school);
    formData.set("session", selectSessionId);
    try {
      const resp = await addStaff(user._id, token, formData);
      if (resp.err) {
        return toast.error(resp.err);
      } else {
        toast.success("Staff Added successfully");
        history.push("/admin/all-staffs");
      }
    } catch (err) {
      toast.error(addStudentError);
    }
  };

  // Country state city data
  const [cscd, setCscd] = useState({
    country: "",
    state: "",
    city: "",
  });

  // contact person country state city data
  const [cpcscd, setcpCscd] = useState({
    contact_person_country: "",
    contact_person_state: "",
    contact_person_city: "",
  });

  const countries = Country.getAllCountries();

  const updatedCountries = countries.map((country) => ({
    label: country.name,
    value: country.isoCode,
    ...country,
  }));
  const updatedStates = (countryId) =>
    State.getStatesOfCountry(countryId).map((state) => ({
      label: state.name,
      value: state.isoCode,
      ...state,
    }));
  const updatedCities = (countryId, stateId) =>
    City.getCitiesOfState(countryId, stateId).map((city) => ({
      label: city.name,
      value: city.stateCode,
      ...city,
    }));

  useEffect(() => {}, [cscd, cpcscd]);

  //Get Subject data
  useEffect(async () => {
    if (step === 3) {
      await Departments();
      const { user, token } = isAuthenticated();
      try {
        const Subjects = await allSubjects(user._id, user.school, token);
        console.log("sub", Subjects);
        var list = [];
        console.log("subject", Subjects);
        Subjects.map(async (sub) => {
          list.push({
            value: sub.name,
            label: sub.name,
          });
        });
        if (Subjects.err) {
          return toast.error(fetchingSubjectError);
        }
        setA(list);
      } catch (err) {
        toast.error("Something Went Wrong!");
      }
    }
  }, [step]);

  //Get deparment data
  async function Departments() {
    const { user, token } = isAuthenticated();
    try {
      const dept = await getDepartment(user.school, user._id, token);
      if (dept.err) {
        return toast.error(dept.err);
      }
      console.log("dept", dept);
      setDeparments(dept);
    } catch (err) {
      toast.error(fetchingDepartmentError);
      console.log(err);
    }
  }

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

  const Select = (props) => (
    <FixRequiredSelect
      {...props}
      SelectComponent={BaseSelect}
      options={props.options}
    />
  );

  return (
    <>
      <SimpleHeader name="Add Staff" parentName="Staff Management" />
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
      <Container className="mt--6 shadow-lg" fluid>
        <Card className="mb-4 bg-transparent">
          <CardHeader className="Step_Header">
            <Row>
              <Col className="d-flex justify-content-center">
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
            <Row className="d-flex justify-content-center">
              <Col md="10">
                <Stepper
                  activeStep={step}
                  styleConfig={{
                    activeBgColor: "#e56813",
                    completedBgColor: "#1cdc23",
                    size: "3em",
                  }}
                >
                  <Step label="Staff Member Details" />
                  <Step label="Residential Details" />
                  <Step label="Contact Details" />
                  <Step label="Occupational Details" />
                </Stepper>
              </Col>
            </Row>
          </CardHeader>
          {step === 0 && (
            <Form onSubmit={handleFormChange} className="mb-4">
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
                        required
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
                  <Col md="4">
                    <Label
                      className="form-control-label"
                      htmlFor="example-date-input"
                    >
                      Date of Joining
                    </Label>
                    <Input
                      id="example-date-input"
                      type="date"
                      onChange={handleChange("joining_date")}
                      value={staffData.joining_date}
                      required
                    />
                  </Col>
                  <Col md="4">
                    <FormGroup>
                      <label
                        className="form-control-label"
                        htmlFor="example4cols2Input"
                      >
                        First Name
                      </label>
                      <Input
                        id="example4cols2Input"
                        placeholder="First Name"
                        type="text"
                        onChange={handleChange("firstname")}
                        value={staffData.firstname}
                        required
                      />
                    </FormGroup>
                  </Col>
                  <Col md="4">
                    <FormGroup>
                      <label
                        className="form-control-label"
                        htmlFor="example4cols3Input"
                      >
                        Last Name
                      </label>
                      <Input
                        id="example4cols3Input"
                        placeholder="Last Name"
                        type="text"
                        onChange={handleChange("lastname")}
                        value={staffData.lastname}
                        required
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <label
                      className="form-control-label"
                      htmlFor="example4cols2Input"
                    >
                      Select Session
                    </label>
                    <Input
                      id="example4cols3Input"
                      type="select"
                      onChange={(e) => setSelectSessionId(e.target.value)}
                      value={selectSessionId}
                      required
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
                <Row>
                  <Col md="4">
                    <Label
                      className="form-control-label"
                      htmlFor="example-date-input"
                    >
                      DOB
                    </Label>
                    <Input
                      id="example-date-input"
                      type="date"
                      onChange={handleChange("date_of_birth")}
                      value={staffData.date_of_birth}
                      required
                    />
                  </Col>
                  <Col md="4">
                    <label
                      className="form-control-label"
                      htmlFor="exampleFormControlSelect3"
                    >
                      Gender
                    </label>
                    <Input
                      id="exampleFormControlSelect3"
                      type="select"
                      onChange={handleChange("gender")}
                      value={staffData.gender}
                      required
                    >
                      <option value="" disabled selected>
                        Gender
                      </option>
                      <option>Male</option>
                      <option>Female</option>
                    </Input>
                  </Col>
                  <Col md="4">
                    <label
                      className="form-control-label"
                      htmlFor="example4cols2Input"
                    >
                      Email
                    </label>
                    <Input
                      id="example4cols2Input"
                      placeholder="Email"
                      onChange={handleChange("email")}
                      value={staffData.email}
                      type="email"
                      required
                    />
                  </Col>
                </Row>
                <Row className="mt-4">
                  <Col md="4">
                    <label
                      className="form-control-label"
                      htmlFor="example4cols2Input"
                    >
                      Contact Number
                    </label>
                    <Input
                      id="example4cols2Input"
                      placeholder="Contact Number"
                      type="text"
                      onChange={handleChange("phone")}
                      pattern="[1-9]{1}[0-9]{9}"
                      value={staffData.phone}
                      required
                    />
                  </Col>
                  <Col md="4">
                    <label
                      className="form-control-label"
                      htmlFor="example4cols2Input"
                    >
                      Alternate Contact Number
                    </label>
                    <Input
                      id="example4cols2Input"
                      placeholder="Alternate Contact Number"
                      onChange={handleChange("alternate_phone")}
                      value={staffData.alternate_phone}
                      type="text"
                      pattern="[1-9]{1}[0-9]{9}"
                      required
                    />
                  </Col>
                  <Col md="4">
                    <label
                      className="form-control-label"
                      htmlFor="exampleFormControlSelect3"
                    >
                      Blood Group
                    </label>
                    <Input
                      id="exampleFormControlSelect3"
                      type="select"
                      onChange={handleChange("bloodgroup")}
                      value={staffData.bloodgroup}
                      required
                    >
                      <option value="" disabled selected>
                        Blood Group
                      </option>
                      <option>A+</option>
                      <option>A-</option>
                      <option>B+</option>
                      <option>B-</option>
                      <option>O+</option>
                      <option>O-</option>
                      <option>AB+</option>
                      <option>AB-</option>
                    </Input>
                  </Col>
                </Row>
                <Row className="mt-4">
                  <Col md="3">
                    <label
                      className="form-control-label"
                      htmlFor="example4cols2Input"
                    >
                      Birth Place
                    </label>
                    <Input
                      id="example4cols2Input"
                      placeholder="Birth Place"
                      onChange={handleChange("birth_place")}
                      value={staffData.birth_place}
                      type="text"
                      required
                    />
                  </Col>
                  <Col md="3">
                    <label
                      className="form-control-label"
                      htmlFor="example4cols2Input"
                    >
                      Caste
                    </label>
                    <Input
                      id="example4cols2Input"
                      placeholder="Caste"
                      type="text"
                      onChange={handleChange("caste")}
                      value={staffData.caste}
                      required
                    />
                  </Col>
                  <Col md="3">
                    <label
                      className="form-control-label"
                      htmlFor="example4cols2Input"
                    >
                      Religion
                    </label>
                    <Input
                      id="example4cols2Input"
                      placeholder="Religion"
                      type="text"
                      onChange={handleChange("religion")}
                      value={staffData.religion}
                      required
                    />
                  </Col>
                  <Col md="3">
                    <label
                      className="form-control-label"
                      htmlFor="example4cols2Input"
                    >
                      Mother Tongue
                    </label>
                    <Input
                      id="example4cols2Input"
                      placeholder="Mother Tongue"
                      type="text"
                      onChange={handleChange("mother_tongue")}
                      value={staffData.mother_tongue}
                      required
                    />
                  </Col>
                </Row>
                <Row className="mt-4 float-right mr-4">
                  <Button color="primary" type="submit">
                    Next
                  </Button>
                </Row>
              </CardBody>
            </Form>
          )}
          {step === 1 && (
            <Form onSubmit={handleFormChange} className="mb-4">
              <CardBody>
                <Row className="mb-4">
                  <Col>
                    <label
                      className="form-control-label"
                      htmlFor="example4cols2Input"
                    >
                      Present Address
                    </label>
                    <Input
                      id="example4cols2Input"
                      placeholder="Present Address"
                      type="text"
                      onChange={handleChange("present_address")}
                      value={staffData.present_address}
                      required
                    />
                  </Col>
                </Row>
                <Row className="mb-4">
                  <Col>
                    <label
                      className="form-control-label"
                      htmlFor="example4cols2Input"
                    >
                      Permanent Address
                    </label>
                    <Input
                      id="example4cols2Input"
                      placeholder="Permanent Address"
                      onChange={handleChange("permanent_address")}
                      value={staffData.permanent_address}
                      type="text"
                      required
                    />
                  </Col>
                </Row>
                <Row className="mt-4">
                  <Col md="3">
                    <label
                      className="form-control-label"
                      htmlFor="example4cols2Input"
                    >
                      Pin Code
                    </label>
                    <Input
                      id="example4cols2Input"
                      placeholder="Pin Code"
                      onChange={handleChange("pincode")}
                      value={staffData.pincode}
                      type="number"
                      required
                    />
                  </Col>
                  <Col md="3">
                    <label
                      className="form-control-label"
                      htmlFor="exampleFormControlSelect3"
                    >
                      Country
                    </label>
                    <Select
                      id="country"
                      name="country"
                      label="country"
                      options={updatedCountries}
                      required
                      value={cscd.country}
                      onChange={handleCSCChange("country")}
                    />
                  </Col>
                  <Col md="3">
                    <label
                      className="form-control-label"
                      htmlFor="exampleFormControlSelect3"
                    >
                      State
                    </label>
                    <Select
                      id="state"
                      name="state"
                      label="state"
                      options={updatedStates(
                        cscd.country ? cscd.country.isoCode : null
                      )}
                      required
                      value={cscd.state}
                      onChange={handleCSCChange("state")}
                    />
                  </Col>
                  <Col md="3">
                    <label
                      className="form-control-label"
                      htmlFor="exampleFormControlSelect3"
                    >
                      City
                    </label>
                    <Select
                      id="city"
                      name="city"
                      label="city"
                      options={
                        cscd.state
                          ? updatedCities(cscd.country.value, cscd.state.value)
                          : updatedCities(null, null)
                      }
                      required
                      value={cscd.city}
                      onChange={handleCSCChange("city")}
                    />
                  </Col>
                </Row>
                <Row className="mt-4 d-flex justify-content-between">
                  <Button
                    className="ml-4"
                    color="primary"
                    type="button"
                    onClick={() => {
                      setStep((step) => {
                        return step - 1;
                      });
                      window.scrollTo(0, 0);
                    }}
                  >
                    Previous
                  </Button>
                  <Button className="mr-4" color="primary" type="submit">
                    Next
                  </Button>
                </Row>
              </CardBody>
            </Form>
          )}
          {step === 2 && (
            <Form onSubmit={handleFormChange} className="mb-4">
              <CardBody>
                <Row>
                  <Col md="4">
                    <label
                      className="form-control-label"
                      htmlFor="example4cols1Input"
                    >
                      Contact Person Name
                    </label>
                    <Input
                      id="example4cols1Input"
                      placeholder="Name"
                      type="text"
                      onChange={handleChange("contact_person_name")}
                      value={staffData.contact_person_name}
                      required
                    />
                  </Col>
                  <Col md="4">
                    <FormGroup>
                      <label
                        className="form-control-label"
                        htmlFor="example4cols2Input"
                      >
                        Relation
                      </label>
                      <Input
                        id="example4cols2Input"
                        placeholder="Relation"
                        type="text"
                        onChange={handleChange("contact_person_relation")}
                        value={staffData.contact_person_relation}
                        required
                      />
                    </FormGroup>
                  </Col>
                  <Col md="4">
                    <FormGroup>
                      <label
                        className="form-control-label"
                        htmlFor="example4cols3Input"
                      >
                        Contact Number
                      </label>
                      <Input
                        id="example4cols3Input"
                        placeholder="Contact Number"
                        onChange={handleChange("contact_person_phone")}
                        value={staffData.contact_person_phone}
                        type="text"
                        pattern="[1-9]{1}[0-9]{9}"
                        required
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md="8">
                    <label
                      className="form-control-label"
                      htmlFor="example4cols2Input"
                    >
                      Address
                    </label>
                    <Input
                      id="example4cols2Input"
                      placeholder="Address"
                      type="text"
                      onChange={handleChange("contact_person_address")}
                      value={staffData.contact_person_address}
                      required
                    />
                  </Col>
                  <Col md="4">
                    <label
                      className="form-control-label"
                      htmlFor="example4cols2Input"
                    >
                      Pin Number
                    </label>
                    <Input
                      id="example4cols2Input"
                      placeholder="Pin Number"
                      type="number"
                      onChange={handleChange("contact_person_pincode")}
                      value={staffData.contact_person_pincode}
                      required
                    />
                  </Col>
                </Row>
                <Row className="mt-4">
                  {/* Change variable here */}
                  <Col md="4">
                    <label
                      className="form-control-label"
                      htmlFor="exampleFormControlSelect3"
                    >
                      Country
                    </label>
                    <Select
                      id="country"
                      name="country"
                      label="country"
                      options={updatedCountries}
                      required
                      value={cpcscd.contact_person_country}
                      onChange={handlecpCSCChange("contact_person_country")}
                    />
                  </Col>
                  <Col md="4">
                    <label
                      className="form-control-label"
                      htmlFor="exampleFormControlSelect3"
                    >
                      State
                    </label>
                    <Select
                      id="state"
                      name="state"
                      label="state"
                      options={updatedStates(
                        cpcscd.contact_person_country
                          ? cpcscd.contact_person_country.isoCode
                          : null
                      )}
                      required
                      value={cpcscd.contact_person_state}
                      onChange={handlecpCSCChange("contact_person_state")}
                    />
                  </Col>
                  <Col md="4">
                    <label
                      className="form-control-label"
                      htmlFor="exampleFormControlSelect3"
                    >
                      City
                    </label>
                    <Select
                      id="city"
                      name="city"
                      label="city"
                      options={
                        cpcscd.contact_person_state
                          ? updatedCities(
                              cpcscd.contact_person_country.value,
                              cpcscd.contact_person_state.value
                            )
                          : updatedCities(null, null)
                      }
                      required
                      value={cpcscd.contact_person_city}
                      onChange={handlecpCSCChange("contact_person_city")}
                    />
                  </Col>
                </Row>
                <Row className="mt-4 d-flex justify-content-between">
                  <Button
                    className="ml-4"
                    color="primary"
                    type="button"
                    onClick={() => {
                      setStep((step) => {
                        return step - 1;
                      });
                      window.scrollTo(0, 0);
                    }}
                  >
                    Previous
                  </Button>
                  <Button className="mr-4" color="primary" type="submit">
                    Next
                  </Button>
                </Row>
              </CardBody>
            </Form>
          )}
          {step === 3 && (
            <Form onSubmit={handleSubmitForm} className="mb-4">
              <CardBody>
                <Row>
                  <Col md="4">
                    <FormGroup>
                      <label
                        className="form-control-label"
                        htmlFor="example4cols2Input"
                      >
                        Role
                      </label>
                      <Input
                        id="exampleFormControlSelect3"
                        type="select"
                        onChange={handleChange("assign_role")}
                        value={staffData.assign_role}
                        required
                      >
                        <option value="" disabled selected>
                          Select Role
                        </option>
                        {allRoles &&
                          allRoles.map((role) => {
                            return (
                              <option key={role._id} value={role._id}>
                                {role.name}
                              </option>
                            );
                          })}
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col md="4">
                    <FormGroup>
                      <label
                        className="form-control-label"
                        htmlFor="example4cols3Input"
                      >
                        Job Name
                      </label>
                      <Input
                        id="example4cols3Input"
                        placeholder="Job Name"
                        type="text"
                        onChange={handleChange("job")}
                        value={staffData.job}
                        required
                      />
                    </FormGroup>
                  </Col>
                  <Col md="4">
                    <label
                      className="form-control-label"
                      htmlFor="example4cols2Input"
                    >
                      Salary
                    </label>
                    <Input
                      id="example4cols2Input"
                      placeholder="Salary"
                      type="number"
                      onChange={handleChange("salary")}
                      value={staffData.salary}
                      required
                    />
                  </Col>
                </Row>
                {staffData.assign_role !== "Canteen" ? (
                  <Row>
                    <Col md="4">
                      <label
                        className="form-control-label"
                        htmlFor="example4cols2Input"
                      >
                        Department
                      </label>
                      <Input
                        id="exampleFormControlSelect3"
                        type="select"
                        onChange={handleChange("department")}
                        value={staffData.department}
                        required
                      >
                        <option value="" disabled selected>
                          Department
                        </option>
                        {departments.map((departments) => (
                          <option value={departments._id}>
                            {departments.name}
                          </option>
                        ))}
                      </Input>
                    </Col>
                    <Col md="4">
                      <label
                        className="form-control-label"
                        htmlFor="example4cols2Input"
                      >
                        Subject
                      </label>

                      <Select
                        isMulti
                        name="colors"
                        options={a}
                        onChange={handleSubjectChange}
                        className="basic-multi-select"
                        classNamePrefix="select"
                        required
                      />
                    </Col>
                    <Col>
                      <label
                        className="form-control-label"
                        htmlFor="example4cols2Input"
                      >
                        Highest Qualification
                      </label>
                      <Input
                        id="example4cols2Input"
                        placeholder="Highest Qualification"
                        onChange={handleChange("qualification")}
                        value={staffData.qualification}
                        type="text"
                        required
                      />
                    </Col>
                  </Row>
                ) : null}

                <Row className="mt-4 d-flex justify-content-between">
                  <Button
                    className="ml-4"
                    color="primary"
                    type="button"
                    onClick={() => {
                      setStep((step) => {
                        return step - 1;
                      });
                      window.scrollTo(0, 0);
                    }}
                  >
                    Previous
                  </Button>
                  <Button className="mr-4" color="success" type="submit">
                    Submit
                  </Button>
                </Row>
              </CardBody>
            </Form>
          )}
        </Card>
      </Container>
    </>
  );
}

export default AddStaff;
