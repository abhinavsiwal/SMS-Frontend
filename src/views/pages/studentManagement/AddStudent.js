import React, { useEffect, useState } from "react";
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

import Loader from "components/Loader/Loader";
import { addStudent, isAuthenticateStudent } from "api/student";

import { Stepper, Step } from "react-form-stepper";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import Select from "react-select";
import { Country, State, City } from "country-state-city";

import "./style.css";
import { isAuthenticated } from "api/auth";

import { useSelector } from "react-redux";

import { allSessions } from "api/session";

import { useHistory } from "react-router-dom";

function AddStudent() {
  // Stepper form steps
  const [step, setStep] = useState(0);
  const { classes } = useSelector((state) => state.classReducer);
  const history = useHistory();
  const [sessions, setSessions] = useState([]);
  const [multivalues, setMultiValues] = useState("");
  const [connectFalse, setConnectFalse] = useState(false);

  const [studentData, setStudentData] = useState({
    photo: "",
    joining_date: "",
    firstname: "",
    lastname: "",
    date_of_birth: "",
    gender: "",
    aadhar_number: "",
    email: "",
    phone: "",
    alternate_phone: "",
    birth_place: "",
    caste: "",
    religion: "",
    bloodgroup: "",
    class: "",
    section: "",
    session: "",
    roll_number: "",
    previous_school: "",
    present_address: "",
    permanent_address: "",
    pincode: "",
    parent_address: "",
    parent_email: "",
    connected: null,
    connectedID: "",
    country: "",
    state: "",
    city: "",
    nationality: "",
    mother_tongue: "",
    contact_person_select: "",
    guardian_name: "",
    guardian_last_name: "",
    guardian_dob: "",
    guardian_email: "",
    guardian_address: "",
    guardian_blood_group: "",
    guardian_phone: "",
    // guardian_address: "",
    // guardian_permanent_address: "",
    guardian_pincode: "",
    guardian_nationality: "",
    guardian_mother_tongue: "",
    father_name: "",
    father_last_name: "",
    father_dob: "",
    father_blood_group: "",
    father_phone: "",
    // father_address: "",
    // father_permanent_address: "",
    father_pincode: "",
    father_nationality: "",
    father_mother_tongue: "",
    mother_name: "",
    mother_last_name: "",
    mother_dob: "",
    mother_blood_group: "",
    mother_phone: "",
    // mother_address: "",
    // mother_permanent_address: "",
    mother_pincode: "",
    mother_nationality: "",
    mother_mother_tongue: "",
  });
  const [loading, setLoading] = useState(false);
  // console.log("studentData", studentData);
  const [selectedClass, setSelectedClass] = useState({});

  const [formData] = useState(new FormData());

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

  React.useEffect(() => {
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

  //Taking StudentData
  const handleChange = (name) => (event) => {
    formData.set(name, event.target.value);
    setStudentData({ ...studentData, [name]: event.target.value });
    // console.log(name);
    if (name === "class") {
      // console.log("@@@@@@@@=>", event.target.value);
      // setSelectedClassId(event.target.value);
      let selectedClass = classes.find(
        (item) => item._id.toString() === event.target.value.toString()
      );
      // console.log(selectedClass);
      setSelectedClass(selectedClass);
    }
  };

  //Taking Image Value
  const handleFileChange = (name) => (event) => {
    formData.set(name, event.target.files[0]);
    // console.log("aa", event.target.files[0]);
    setStudentData({ ...studentData, [name]: event.target.files[0] });
  };

  //Delete Fields
  const handleDeleteFields = (name) => {
    setStudentData({ ...studentData, [name]: "" });
    formData.delete(name);
  };
  //Delete Fields Define
  const removeFields = (e) => {
    setMultiValues(e.value);
    if (e.value === "guardian") {
      // all parent fields must be deleted
      handleDeleteFields("father_name");
      handleDeleteFields("father_last_name");
      handleDeleteFields("father_dob");
      handleDeleteFields("father_blood_group");
      handleDeleteFields("father_phone");
      handleDeleteFields("father_address");
      handleDeleteFields("father_permanent_address");
      handleDeleteFields("father_pincode");
      handleDeleteFields("father_nationality");
      handleDeleteFields("father_mother_tongue");
      handleDeleteFields("mother_name");
      handleDeleteFields("mother_last_name");
      handleDeleteFields("mother_dob");
      handleDeleteFields("mother_blood_group");
      handleDeleteFields("mother_phone");
      handleDeleteFields("mother_address");
      handleDeleteFields("mother_permanent_address");
      handleDeleteFields("mother_pincode");
      handleDeleteFields("mother_nationality");
      handleDeleteFields("mother_mother_tongue");
    } else if (e.value === "parent") {
      // all guardian fields must be deleted
      handleDeleteFields("guardian_name");
      handleDeleteFields("guardian_last_name");
      handleDeleteFields("guardian_dob");
      handleDeleteFields("guardian_blood_group");
      handleDeleteFields("guardian_phone");
      handleDeleteFields("guardian_address");
      handleDeleteFields("guardian_permanent_address");
      handleDeleteFields("guardian_pincode");
      handleDeleteFields("guardian_nationality");
      handleDeleteFields("guardian_mother_tongue");
    }
    setStudentData({ ...studentData, contact_person_select: e });
  };

  // handling city state country change
  const handleCSCChange = (name) => (event) => {
    if (name === "country") {
      setCscd({ ...cscd, country: event, state: null, city: null });
    } else if (name === "state") {
      setCscd({ ...cscd, state: event, city: null });
    } else {
      setCscd({ ...cscd, city: event });
    }
    setStudentData({ ...studentData, [name]: event.name });
    formData.set(name, event.name);
    setStudentData({ ...studentData, [name]: event.name });
  };

  // Stepper next step change
  const handleFormChange = (e) => {
    e.preventDefault();
    setStep((step) => {
      return step + 1;
    });
    window.scrollTo(0, 0);
  };

  //Checking Parent or Gaurdian Email is Exist or Not
  const checkEmail = async () => {
    const { user, token } = isAuthenticated();

    const data = {
      type: multivalues,
      email:
        multivalues === "parent"
          ? studentData.parent_email
          : studentData.guardian_email,
    };
    try {
      const authenticate = await isAuthenticateStudent(user._id, token, data);
      // console.log("auth", authenticate);
      if (authenticate.err) {
        toast.error(authenticate.err);
      }
      if (authenticate.status === false) {
        toast.sucess("Email verified");
      } else {
        setConnectFalse(true);
        studentData.connectedID = authenticate.id;
        toast.success("You Can Connect the Student ");
      }
    } catch (err) {
      toast.error(err);
    }
  };

  //Final Form Submit
  const handleSubmitForm = async (e) => {
    e.preventDefault();
    const { user, token } = isAuthenticated();
    formData.set("school", user.school);

    try {
      setLoading(true);

      const addStudents = await addStudent(user._id, token, formData);
      // console.log("addStudent", addStudents);
      if (addStudents.err) {
        setLoading(false);
        return toast.error(addStudents.err);
      } else {
        toast.success("Student added successfully");
        setLoading(false);
        history.push("/admin/all-students");
      }
    } catch (err) {
      setLoading(false);
      toast.error("Something Went Wrong");
    }
  };

  //React-Multiselect
  const contactPersonsSelect = [
    {
      label: "Guardian",
      value: "guardian",
    },
    {
      label: "Parent",
      value: "parent",
    },
  ];

  // Country state city data
  const [cscd, setCscd] = useState({
    country: "",
    state: "",
    city: "",
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

  useEffect(() => {}, [cscd]);
  return (
    <>
      <SimpleHeader name="Add Student" parentName="Student Management" />
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
        {loading ? (
          <Loader />
        ) : (
          <Card className="mb-4 bg-transparent">
            <CardHeader className="Step_Header">
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
                    <Step label="Student Details" />
                    <Step label="Admission Details" />
                    <Step label="Address Details" />
                    <Step label="Contact Person Details" />
                  </Stepper>
                </Col>
              </Row>
            </CardHeader>
            {step === 0 && (
              <Form onSubmit={handleFormChange} className="mb-4">
                <CardBody>
                  <Row md="4" className="d-flex justify-content-center mb-4">
                    <Col md="8">
                      {studentData.photo.name && (
                        <h2>File {studentData.photo.name} is Selected</h2>
                      )}
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
                          accept="photo/*"
                          onChange={handleFileChange("photo")}
                          required
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
                    <Col>
                      <label
                        className="form-control-label"
                        htmlFor="example4cols2Input"
                      >
                        Session
                      </label>

                      <select
                        className="form-control"
                        required
                        onChange={handleChange("session")}
                      >
                        <option value="">Select Session</option>
                        {sessions &&
                          sessions.map((data) => {
                            return (
                              <option key={data._id} value={data._id}>
                                {data.name}
                              </option>
                            );
                          })}
                      </select>
                    </Col>
                  </Row>
                  <br />
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
                        value={studentData.joining_date}
                        required
                      />
                    </Col>
                    <Col md="4">
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
                        value={studentData.firstname}
                        required
                      />
                    </Col>
                    <Col md="4">
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
                        value={studentData.lastname}
                        required
                      />
                    </Col>
                  </Row>
                  <br />
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
                        value={studentData.date_of_birth}
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
                        required
                        value={studentData.gender}
                      >
                        <option value="" disabled>
                          Select Gender
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
                        Aadhar Card Number
                      </label>
                      <Input
                        id="example4cols2Input"
                        placeholder="Aadhar Card Number"
                        type="text"
                        // pattern="[1-9]{1}[0-9]{9}"
                        onChange={handleChange("aadhar_number")}
                        required
                        value={studentData.aadhar_number}
                      />
                    </Col>
                  </Row>
                  <Row className="mt-4">
                    <Col>
                      <label
                        className="form-control-label"
                        htmlFor="example4cols2Input"
                      >
                        Email
                      </label>
                      <Input
                        id="example4cols2Input"
                        placeholder="Email"
                        type="text"
                        onChange={handleChange("email")}
                        required
                        value={studentData.email}
                        pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                      />
                    </Col>
                    <Col>
                      <label
                        className="form-control-label"
                        htmlFor="example4cols2Input"
                      >
                        Phone Number
                      </label>
                      <Input
                        id="example4cols2Input"
                        placeholder="Phone Number"
                        type="text"
                        pattern="[1-9]{1}[0-9]{9}"
                        onChange={handleChange("phone")}
                        required
                        value={studentData.phone}
                      />
                    </Col>
                    <Col>
                      <label
                        className="form-control-label"
                        htmlFor="example4cols2Input"
                      >
                        Alternate Phone Number
                      </label>
                      <Input
                        id="example4cols2Input"
                        placeholder="Alternate Phone Number"
                        type="text"
                        pattern="[1-9]{1}[0-9]{9}"
                        onChange={handleChange("alternate_phone")}
                        required
                        value={studentData.alt_phone}
                      />
                    </Col>
                  </Row>
                  <Row className="mt-4">
                    <Col>
                      <label
                        className="form-control-label"
                        htmlFor="example4cols2Input"
                      >
                        Birth Place
                      </label>
                      <Input
                        id="example4cols2Input"
                        placeholder="Birth Place"
                        type="text"
                        onChange={handleChange("birth_place")}
                        required
                        value={studentData.birth_place}
                      />
                    </Col>
                    <Col>
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
                        required
                        value={studentData.caste}
                      />
                    </Col>
                    <Col>
                      <label
                        className="form-control-label"
                        htmlFor="exampleFormControlSelect3"
                      >
                        Religion
                      </label>
                      <Input
                        id="exampleFormControlSelect3"
                        type="text"
                        onChange={handleChange("religion")}
                        required
                        value={studentData.religion}
                        placeholder="Religion"
                      />
                    </Col>
                    <Col>
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
                        required
                        value={studentData.bloodgroup}
                      >
                        <option value="" disabled>
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
                  <Row className="mt-4">
                    <Col>
                      <label
                        className="form-control-label"
                        htmlFor="exampleFormControlSelect3"
                      >
                        Select Class
                      </label>
                      <Input
                        id="exampleFormControlSelect3"
                        type="select"
                        required
                        onChange={handleChange("class")}
                        value={studentData.class}
                      >
                        <option value="">Select Class</option>
                        {classes &&
                          classes.map((clas, index) => {
                            // setselectedClassIndex(index)
                            return (
                              <option value={clas._id} key={index}>
                                {clas.name}
                              </option>
                            );
                          })}
                      </Input>
                    </Col>
                    <Col>
                      <label
                        className="form-control-label"
                        htmlFor="exampleFormControlSelect3"
                      >
                        Select Section
                      </label>
                      <Input
                        id="exampleFormControlSelect3"
                        type="select"
                        required
                        onChange={handleChange("section")}
                        value={studentData.section}
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
                  </Row>
                  <Row className="mt-4">
                    <Col md="4">
                      <label
                        className="form-control-label"
                        htmlFor="example4cols2Input"
                      >
                        Roll Number
                      </label>
                      <Input
                        id="example4cols2Input"
                        placeholder="Roll Number"
                        type="number"
                        // onChange={() => {
                        //   setStudentData({ ...studentData, roll_number: "" });
                        // }}
                        onChange={handleChange("roll_number")}
                        required
                        value={studentData.roll_number}
                      />
                    </Col>
                    <Col>
                      <label
                        className="form-control-label"
                        htmlFor="example4cols2Input"
                      >
                        Previous School
                      </label>
                      <Input
                        id="example4cols2Input"
                        placeholder="Previous School"
                        type="text"
                        onChange={handleChange("previous_school")}
                        required
                        value={studentData.previous_school}
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
                    <Col>
                      <FormGroup>
                        <label
                          className="form-control-label"
                          htmlFor="example4cols3Input"
                        >
                          Present Address
                        </label>
                        <Input
                          id="example4cols3Input"
                          placeholder="Present Address"
                          type="text"
                          onChange={handleChange("present_address")}
                          required
                          value={studentData.present_address}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <FormGroup>
                        <label
                          className="form-control-label"
                          htmlFor="example4cols3Input"
                        >
                          Permanent Address
                        </label>
                        <Input
                          id="example4cols3Input"
                          placeholder="Permanent Address"
                          type="text"
                          onChange={handleChange("permanent_address")}
                          required
                          value={studentData.permanent_address}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row className="mb-4">
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
                        type="number"
                        onChange={handleChange("pincode")}
                        required
                        value={studentData.pincode}
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
                            ? updatedCities(
                                cscd.country.value,
                                cscd.state.value
                              )
                            : updatedCities(null, null)
                        }
                        required
                        value={cscd.city}
                        onChange={handleCSCChange("city")}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <label
                        className="form-control-label"
                        htmlFor="example4cols2Input"
                      >
                        Nationality
                      </label>
                      <Input
                        id="example4cols2Input"
                        placeholder="Nationality"
                        type="text"
                        onChange={handleChange("nationality")}
                        required
                        value={studentData.nationality}
                      />
                    </Col>
                    <Col>
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
                        required
                        value={studentData.mother_tongue}
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
              <>
                <CardBody>
                  <Row>
                    <Col align="center">
                      <div style={{ width: "300px" }}>
                        <label className="form-control-label">
                          Contact Person
                        </label>
                        <Select
                          defaultValue={studentData.contact_person_select}
                          options={contactPersonsSelect}
                          onChange={(e) => {
                            removeFields(e);
                          }}
                        />
                      </div>
                    </Col>
                  </Row>
                </CardBody>
                <Form onSubmit={handleSubmitForm} className="mb-4">
                  {studentData.contact_person_select.value === "parent" ? (
                    <>
                      <CardBody>
                        <Row>
                          <Col>
                            <FormGroup>
                              <label
                                className="form-control-label"
                                htmlFor="example4cols3Input"
                              >
                                Parent Address
                              </label>
                              <Input
                                id="example4cols3Input"
                                placeholder="Parent Address"
                                type="text"
                                onChange={handleChange("parent_address")}
                                required
                                value={studentData.parent_address}
                              />
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <FormGroup>
                              <label
                                className="form-control-label"
                                htmlFor="example4cols3Input"
                              >
                                Parent Email
                              </label>
                              <Input
                                id="example4cols3Input"
                                placeholder="Parent Address"
                                type="email"
                                onChange={handleChange("parent_email")}
                                required
                                value={studentData.parent_email}
                                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                              />
                            </FormGroup>
                          </Col>
                        </Row>
                        {connectFalse && (
                          <Row>
                            <Col>
                              <FormGroup>
                                <label
                                  className="form-control-label"
                                  htmlFor="example4cols3Input"
                                >
                                  Connected
                                </label>
                                <Input
                                  id="exampleFormControlSelect3"
                                  type="select"
                                  onChange={handleChange("connected")}
                                  required
                                  value={studentData.connected}
                                >
                                  <option disabled value="">
                                    Connect
                                  </option>
                                  <option value={true}>Yes</option>
                                  <option value={false}>No</option>
                                </Input>
                              </FormGroup>
                            </Col>
                          </Row>
                        )}
                        {studentData.connected === "true" && (
                          <Row>
                            <Col>
                              <FormGroup>
                                <label
                                  className="form-control-label"
                                  htmlFor="example4cols3Input"
                                >
                                  Connection
                                </label>
                                <Input
                                  id="example4cols3Input"
                                  placeholder="connection"
                                  type="text"
                                  onChange={handleChange("connectedID")}
                                  required
                                  disabled
                                  value={studentData.connectedID}
                                />
                              </FormGroup>
                            </Col>
                          </Row>
                        )}
                        <Row>
                          <Col>
                            <Button color="danger" onClick={checkEmail}>
                              Check
                            </Button>
                          </Col>
                        </Row>

                        <Row className="mb-4">
                          <Col align="center">
                            <h2>Father Details</h2>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <FormGroup>
                              <label
                                className="form-control-label"
                                htmlFor="example4cols3Input"
                              >
                                First Name
                              </label>
                              <Input
                                id="example4cols3Input"
                                placeholder="First Name"
                                type="text"
                                onChange={handleChange("father_name")}
                                required
                                value={studentData.father_name}
                              />
                            </FormGroup>
                          </Col>
                          <Col>
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
                                onChange={handleChange("father_last_name")}
                                required
                                value={studentData.father_last_name}
                              />
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row className="mb-4">
                          <Col>
                            <Label
                              className="form-control-label"
                              htmlFor="example-date-input"
                            >
                              DOB
                            </Label>
                            <Input
                              id="example-date-input"
                              type="date"
                              onChange={handleChange("father_dob")}
                              required
                              value={studentData.father_dob}
                            />
                          </Col>
                          <Col>
                            <label
                              className="form-control-label"
                              htmlFor="exampleFormControlSelect3"
                            >
                              Blood Group
                            </label>
                            <Input
                              id="exampleFormControlSelect3"
                              type="select"
                              onChange={handleChange("father_blood_group")}
                              required
                              value={studentData.father_blood_group}
                            >
                              <option value="" disabled>
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
                          <Col>
                            <label
                              className="form-control-label"
                              htmlFor="example4cols3Input"
                            >
                              Phone Number
                            </label>
                            <Input
                              id="example4cols3Input"
                              placeholder="Phone Number"
                              type="text"
                              pattern="[1-9]{1}[0-9]{9}"
                              onChange={handleChange("father_phone")}
                              required
                              value={studentData.father_phone}
                            />
                          </Col>
                        </Row>
                        <Row className="mb-4">
                          <Col>
                            <label
                              className="form-control-label"
                              htmlFor="example4cols2Input"
                            >
                              Pin Code
                            </label>
                            <Input
                              id="example4cols2Input"
                              placeholder="Pin Code"
                              type="number"
                              onChange={handleChange("father_pincode")}
                              required
                              value={studentData.father_pincode}
                            />
                          </Col>
                          <Col>
                            <label
                              className="form-control-label"
                              htmlFor="example4cols2Input"
                            >
                              Nationality
                            </label>
                            <Input
                              id="example4cols2Input"
                              placeholder="Nationality"
                              type="text"
                              onChange={handleChange("father_nationality")}
                              required
                              value={studentData.father_nationality}
                            />
                          </Col>
                          <Col>
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
                              onChange={handleChange("father_mother_tongue")}
                              required
                              value={studentData.father_mother_tongue}
                            />
                          </Col>
                        </Row>
                      </CardBody>
                      <CardBody>
                        <Row className="mb-4">
                          <Col align="center">
                            <h2>Mother Details</h2>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <FormGroup>
                              <label
                                className="form-control-label"
                                htmlFor="example4cols3Input"
                              >
                                First Name
                              </label>
                              <Input
                                id="example4cols3Input"
                                placeholder="First Name"
                                type="text"
                                onChange={handleChange("mother_name")}
                                required
                                value={studentData.mother_name}
                              />
                            </FormGroup>
                          </Col>
                          <Col>
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
                                onChange={handleChange("mother_last_name")}
                                required
                                value={studentData.mother_last_name}
                              />
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row className="mb-4">
                          <Col>
                            <Label
                              className="form-control-label"
                              htmlFor="example-date-input"
                            >
                              DOB
                            </Label>
                            <Input
                              id="example-date-input"
                              type="date"
                              onChange={handleChange("mother_dob")}
                              required
                              value={studentData.mother_dob}
                            />
                          </Col>
                          <Col>
                            <label
                              className="form-control-label"
                              htmlFor="exampleFormControlSelect3"
                            >
                              Blood Group
                            </label>
                            <Input
                              id="exampleFormControlSelect3"
                              type="select"
                              onChange={handleChange("mother_blood_group")}
                              required
                              value={studentData.mother_blood_group}
                            >
                              <option value="" disabled>
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
                          <Col>
                            <label
                              className="form-control-label"
                              htmlFor="example4cols3Input"
                            >
                              Phone Number
                            </label>
                            <Input
                              id="example4cols3Input"
                              placeholder="Phone Number"
                              type="text"
                              pattern="[1-9]{1}[0-9]{9}"
                              onChange={handleChange("mother_phone")}
                              required
                              value={studentData.mother_phone}
                            />
                          </Col>
                        </Row>
                        <Row className="mb-4">
                          <Col>
                            <label
                              className="form-control-label"
                              htmlFor="example4cols2Input"
                            >
                              Pin Code
                            </label>
                            <Input
                              id="example4cols2Input"
                              placeholder="Pin Code"
                              type="number"
                              onChange={handleChange("mother_pincode")}
                              required
                              value={studentData.mother_pincode}
                            />
                          </Col>
                          <Col>
                            <label
                              className="form-control-label"
                              htmlFor="example4cols2Input"
                            >
                              Nationality
                            </label>
                            <Input
                              id="example4cols2Input"
                              placeholder="Nationality"
                              type="text"
                              onChange={handleChange("mother_nationality")}
                              required
                              value={studentData.mother_nationality}
                            />
                          </Col>
                          <Col>
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
                              onChange={handleChange("mother_mother_tongue")}
                              required
                              value={studentData.mother_mother_tongue}
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
                          <Button
                            className="mr-4"
                            color="success"
                            type="submit"
                          >
                            Submit
                          </Button>
                        </Row>
                      </CardBody>
                    </>
                  ) : null}
                  {studentData.contact_person_select.value === "guardian" ? (
                    <>
                      <CardBody>
                        <Row>
                          <Col>
                            <FormGroup>
                              <label
                                className="form-control-label"
                                htmlFor="example4cols3Input"
                              >
                                Guardian Address
                              </label>
                              <Input
                                id="example4cols3Input"
                                placeholder="Guardian Address"
                                type="text"
                                onChange={handleChange("guardian_address")}
                                required
                                value={studentData.guardian_address}
                              />
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <FormGroup>
                              <label
                                className="form-control-label"
                                htmlFor="example4cols3Input"
                              >
                                Guardian Email
                              </label>
                              <Input
                                id="example4cols3Input"
                                placeholder="Guardian Address"
                                type="text"
                                onChange={handleChange("guardian_email")}
                                required
                                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                                value={studentData.guardian_email}
                              />
                            </FormGroup>
                          </Col>
                        </Row>
                        {connectFalse && (
                          <Row>
                            <Col>
                              <FormGroup>
                                <label
                                  className="form-control-label"
                                  htmlFor="example4cols3Input"
                                >
                                  Connected
                                </label>
                                <Input
                                  id="exampleFormControlSelect3"
                                  type="select"
                                  onChange={handleChange("connected")}
                                  required
                                  value={studentData.connected}
                                >
                                  <option disabled value="">
                                    Connect
                                  </option>
                                  <option value={true}>Yes</option>
                                  <option value={false}>No</option>
                                </Input>
                              </FormGroup>
                            </Col>
                          </Row>
                        )}
                        {studentData.connected === "true" && (
                          <Row>
                            <Col>
                              <FormGroup>
                                <label
                                  className="form-control-label"
                                  htmlFor="example4cols3Input"
                                >
                                  Connection
                                </label>
                                <Input
                                  id="example4cols3Input"
                                  placeholder="connection"
                                  type="text"
                                  onChange={handleChange("connectedID")}
                                  required
                                  disabled
                                  value={studentData.connectedID}
                                />
                              </FormGroup>
                            </Col>
                          </Row>
                        )}
                        <Row>
                          <Col>
                            <Button color="danger" onClick={checkEmail}>
                              Check
                            </Button>
                          </Col>
                        </Row>

                        <Row className="mb-4">
                          <Col align="center">
                            <h2>Guardian Details</h2>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <FormGroup>
                              <label
                                className="form-control-label"
                                htmlFor="example4cols3Input"
                              >
                                First Name
                              </label>
                              <Input
                                id="example4cols3Input"
                                placeholder="First Name"
                                type="text"
                                onChange={handleChange("guardian_name")}
                                required
                                value={studentData.guardian_name}
                              />
                            </FormGroup>
                          </Col>
                          <Col>
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
                                onChange={handleChange("guardian_last_name")}
                                required
                                value={studentData.guardian_last_name}
                              />
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row className="mb-4">
                          <Col>
                            <Label
                              className="form-control-label"
                              htmlFor="example-date-input"
                            >
                              DOB
                            </Label>
                            <Input
                              id="example-date-input"
                              type="date"
                              onChange={handleChange("guardian_dob")}
                              required
                              value={studentData.guardian_dob}
                            />
                          </Col>
                          <Col>
                            <label
                              className="form-control-label"
                              htmlFor="exampleFormControlSelect3"
                            >
                              Blood Group
                            </label>
                            <Input
                              id="exampleFormControlSelect3"
                              type="select"
                              onChange={handleChange("guardian_blood_group")}
                              required
                              value={studentData.guardian_blood_group}
                            >
                              <option value="" disabled>
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
                          <Col>
                            <label
                              className="form-control-label"
                              htmlFor="example4cols3Input"
                            >
                              Phone Number
                            </label>
                            <Input
                              id="example4cols3Input"
                              placeholder="Phone Number"
                              type="text"
                              pattern="[1-9]{1}[0-9]{9}"
                              onChange={handleChange("guardian_phone")}
                              required
                              value={studentData.guardian_phone}
                            />
                          </Col>
                        </Row>
                        <Row className="mb-4">
                          <Col>
                            <label
                              className="form-control-label"
                              htmlFor="example4cols2Input"
                            >
                              Pin Code
                            </label>
                            <Input
                              id="example4cols2Input"
                              placeholder="Pin Code"
                              type="number"
                              onChange={handleChange("guardian_pincode")}
                              required
                              value={studentData.guardian_pincode}
                            />
                          </Col>
                          <Col>
                            <label
                              className="form-control-label"
                              htmlFor="example4cols2Input"
                            >
                              Nationality
                            </label>
                            <Input
                              id="example4cols2Input"
                              placeholder="Nationality"
                              type="text"
                              onChange={handleChange("guardian_nationality")}
                              required
                              value={studentData.guardian_nationality}
                            />
                          </Col>
                          <Col>
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
                              onChange={handleChange("guardian_mother_tongue")}
                              required
                              value={studentData.guardian_mother_tongue}
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
                          <Button
                            className="mr-4"
                            color="success"
                            type="submit"
                          >
                            Submit
                          </Button>
                        </Row>
                      </CardBody>
                    </>
                  ) : null}
                </Form>
              </>
            )}
          </Card>
        )}
      </Container>
    </>
  );
}

export default AddStudent;
