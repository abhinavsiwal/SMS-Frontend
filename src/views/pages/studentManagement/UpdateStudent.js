// reactstrap components
import React, { useEffect, useState, useCallback } from "react";
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
import Loader from "components/Loader/Loader";
import SimpleHeader from "components/Headers/SimpleHeader.js";
import { useSelector, useDispatch } from "react-redux";
import { updateStudent, allStudents } from "api/student";
import { setStudentEditing } from "store/reducers/student";

import { Stepper, Step } from "react-form-stepper";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import Select from "react-select";
import { Country, State, City } from "country-state-city";

import "./style.css";
import { isAuthenticated } from "api/auth";
import { allClass } from "api/class";
import { useHistory, useParams } from "react-router-dom";
// import { allStudents } from "api/student";
import {
  CountryDropdown,
  RegionDropdown,
  CountryRegionData,
} from "react-country-region-selector";

function UpdateStudent({ studentDetails }) {
  // Stepper form steps
  const [classList, setClassList] = useState([]);
  console.log(studentDetails);
  const history = useHistory();
  const params = useParams();
  const [step, setStep] = useState(0);
  const dispatch = useDispatch();
  //   const [student, setStudent] = useState({});
  const { studentEditing } = useSelector((state) => state.studentReducer);
  const [students, setStudents] = useState([]);
  const [student, setStudent] = useState({
    _id: studentDetails._id,
    image: studentDetails.image,
    joining_date: studentDetails.joining_date,
    firstname: studentDetails.firstname,
    lastname: studentDetails.lastname,
    date_of_birth: studentDetails.date_of_birth,
    gender: studentDetails.gender,
    aadhar_number: studentDetails.aadhar_number,
    email: studentDetails.email,
    phone: studentDetails.phone,
    alternate_phone: studentDetails.alternate_phone,
    birth_place: studentDetails.birth_place,
    caste: studentDetails.caste,
    religion: studentDetails.religion,
    bloodgroup: studentDetails.bloodgroup,
    class: studentDetails.class._id,
    section: studentDetails.section._id,
    session: studentDetails.session,
    roll_number: studentDetails.roll_number,
    previous_school: studentDetails.previous_school,
    present_address: studentDetails.present_address,
    permanent_address: studentDetails.permanent_address,
    pincode: studentDetails.pincode,
    country: studentDetails.country,
    state: studentDetails.state,
    city: studentDetails.city,
    nationality: studentDetails.nationality,
    mother_tongue: studentDetails.mother_tongue,
    guardian_name: studentDetails.guardian_name,
    guardian_last_name: studentDetails.guardian_last_name,
    guardian_dob: studentDetails.guardian_dob,
    guardian_blood_group: studentDetails.guardian_blood_group,
    guardian_phone: studentDetails.guardian_phone,
    guardian_address: studentDetails.guardian_address,
    guardian_permanent_address: studentDetails.guardian_permanent_address,
    guardian_pincode: studentDetails.guardian_pincode,
    guardian_nationality: studentDetails.guardian_nationality,
    guardian_mother_tongue: studentDetails.guardian_mother_tongue,
    father_name: studentDetails.father_name,
    father_last_name: studentDetails.father_last_name,
    father_dob: studentDetails.father_dob,
    father_blood_group: studentDetails.father_blood_group,
    father_phone: studentDetails.father_phone,
    father_address: studentDetails.father_address,
    father_permanent_address: studentDetails.father_permanent_address,
    father_pincode: studentDetails.father_pincode,
    father_nationality: studentDetails.father_nationality,
    father_mother_tongue: studentDetails.father_mother_tongue,
    mother_name: studentDetails.mother_name,
    mother_last_name: studentDetails.mother_last_name,
    mother_dob: studentDetails.mother_dob,
    mother_blood_group: studentDetails.mother_blood_group,
    mother_phone: studentDetails.mother_phone,
    mother_address: studentDetails.mother_address,
    mother_permanent_address: studentDetails.mother_permanent_address,
    mother_pincode: studentDetails.mother_pincode,
    mother_nationality: studentDetails.mother_nationality,
    mother_mother_tongue: studentDetails.mother_mother_tongue,
  });
  const { user, token } = isAuthenticated();
  const [country, setCountry] = useState(studentDetails.country);
  const [state, setState] = useState(studentDetails.state);


  


  const [selectedClass, setSelectedClass] = useState({});
  useEffect(() => {
    getAllClasses();
  }, []);

  const getAllClasses = async () => {
    try {
      setLoading(true);
      const classess = await allClass(user._id, user.school, token);
      // console.log("classes", classess);
      if (classess.err) {
        setLoading(false);
        return toast.error(classess.err);
      }
      setClassList(classess);
      let selectedClass1 = classess.find(
        (item) => item._id.toString() === student.class.toString()
      );
      setSelectedClass(selectedClass1);
      // setLoading(true);
      // toast.success(fetchingClassSuccess)
      setLoading(false);
    } catch (err) {
      toast.error("Fetching Classes Failed");
    }
  };

  // const [formData] = useState(new FormData());
  const [loading, setLoading] = useState(false);
  const formData = new FormData();

  const handleChange = (name) => (event) => {
    formData.set(name, event.target.value);
    setStudent({ ...student, [name]: event.target.value });

    if (name === "class") {
      // console.log("@@@@@@@@=>", event.target.value);
      // setSelectedClassId(event.target.value);
      let selectedClass = classList.find(
        (item) => item._id.toString() === event.target.value.toString()
      );
      // console.log(selectedClass);
      setSelectedClass(selectedClass);
    }
  };

  const handleFileChange = (name) => (event) => {
    formData.set(name, event.target.files[0]);
    setStudent({ ...student, [name]: event.target.files[0].name });
  };

  const handleDeleteFields = (name) => {
    setStudent({ ...student, [name]: "" });
    formData.delete(name);
  };

  const removeFields = (e) => {
    if (student.guardian_name.length !== 0) {
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
    } else if (student.father_name || student.mother_name) {
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
    // setStudentData({ ...studentData, contact_person_select: e });
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
    // dispatch(setStudent({ ...studentData, [name]: event.name }));
    formData.set(name, event.name);
    // dispatch(setStudent({ ...studentData, [name]: event.name }));
  };

  // Stepper next step change
  const handleFormChange = useCallback((e) => {
    e.preventDefault();
    // console.log(studentData);
    setStep((step) => {
      return step + 1;
    });
    window.scrollTo(0, 0);
  }, []);

  //   const handleFormChange =

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    formData.set("school", user.school);
    formData.set("country",country)
    formData.set("state",state)

    try {
      setLoading(true);
      await updateStudent(student._id, user._id, formData);
      toast.success("Student updated successfully");
      dispatch(setStudentEditing(false));
      setLoading(false);
      history.push("/admin/all-students");
    } catch (err) {
      toast.error("Something Went Wrong");
      setLoading(false);
    }
  };

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
    country: student.country,
    state: student.country,
    city: student.city,
  });
  //   console.log(cscd);
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

const cancelHandler = ()=>{
  window.location.reload();
}


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
            <CardHeader>
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
                          accept="image/*"
                          onChange={handleFileChange("image")}
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
                        value={student.joining_date.slice(0, 10)}
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
                          value={student.firstname}
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
                          value={student.lastname}
                          required
                        />
                      </FormGroup>
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
                        value={student.date_of_birth.slice(0, 10)}
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
                        value={student.gender}
                      >
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
                        type="number"
                        onChange={handleChange("aadhar_number")}
                        required
                        value={student.aadhar_number}
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
                        value={student.email}
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
                        type="number"
                        onChange={handleChange("phone")}
                        required
                        value={student.phone}
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
                        type="number"
                        onChange={handleChange("alternate_phone")}
                        value={student.alternate_phone}
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
                        value={student.birth_place}
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
                        value={student.caste}
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
                        value={student.religion}
                      ></Input>
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
                        value={student.bloodgroup}
                      >
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
                  <Button onClick={cancelHandler} color="danger" >Cancel</Button>
                    <Button color="primary" onClick={handleFormChange}>
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
                        Class
                      </label>
                      <Input
                        id="exampleFormControlSelect3"
                        type="select"
                        required
                        value={student.class}
                        onChange={handleChange("class")}
                      >
                        <option value="">Select Class</option>
                        {classList &&
                          classList.map((item, index) => {
                            return (
                              <option key={index} value={item._id}>
                                {item.name}
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
                        Section
                      </label>
                      <Input
                        id="exampleFormControlSelect3"
                        type="select"
                        required
                        value={student.section}
                        onChange={handleChange("section")}
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
                    {/* <Col>
                      <label
                        className="form-control-label"
                        htmlFor="exampleFormControlSelect3"
                      >
                        Session
                      </label>
                      <Input
                        id="exampleFormControlSelect3"
                        type="select"
                        required
                        value={student.session}
                      >
                        <option>A+</option>
                        <option>A-</option>
                        <option>B+</option>
                        <option>B-</option>
                        <option>O+</option>
                        <option>O-</option>
                        <option>AB+</option>
                        <option>AB-</option>
                      </Input>
                    </Col> */}
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
                        onChange={() => {
                          setStudent({ ...student, roll_number: 12 });
                        }}
                        required
                        value={student.roll_number}
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
                        value={student.previous_school}
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
                    <div>
                    <Button onClick={cancelHandler} color="danger" >Cancel</Button>
                    <Button className="mr-4" color="primary" type="submit">
                      Next
                    </Button>
                    </div>
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
                          value={student.present_address}
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
                          value={student.permanent_address}
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
                        value={student.pincode}
                      />
                    </Col>
                    <Col md="3">
                      <label
                        className="form-control-label"
                        htmlFor="exampleFormControlSelect3"
                      >
                        Country
                      </label>
                      <CountryDropdown
                        value={country}
                        onChange={(val) => setCountry(val)}
                        classes="stateInput"
                      />
                    </Col>
                    <Col md="3">
                      <label
                        className="form-control-label"
                        htmlFor="exampleFormControlSelect3"
                      >
                        State
                      </label>
                      <RegionDropdown
                        country={country}
                        value={state}
                        onChange={(val) => setState(val)}
                        classes="stateInput"
                      />
                    </Col>
                    <Col md="3">
                      <label
                        className="form-control-label"
                        htmlFor="exampleFormControlSelect3"
                      >
                        City
                      </label>
                      <Input
                        id="example4cols2Input"
                        placeholder="City"
                        type="text"
                        onChange={handleChange("city")}
                        required
                        value={student.city}
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
                        value={student.nationality}
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
                        value={student.mother_tongue}
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
                    <div>
                    <Button onClick={cancelHandler} color="danger" >Cancel</Button>
                    <Button className="mr-4" color="primary" type="submit">
                      Next
                    </Button>
                    </div>
                  </Row>
                </CardBody>
              </Form>
            )}
            {step === 3 && (
              <>
                <Form onSubmit={handleSubmitForm} className="mb-4">
                  {( student.father_name && student.father_name ||
                    student.mother_name) && (
                    <>
                      <CardBody>
                        <Row>
                          <Col md="6" >
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
                                value={student.parent_address}
                              />
                            </FormGroup>
                          </Col>
                          <Col md="6" >
                          <FormGroup>
                              <label
                                className="form-control-label"
                                htmlFor="example4cols3Input"
                              >
                                Parent Email
                              </label>
                              <Input
                                id="example4cols3Input"
                                placeholder="Parent Email"
                                type="text"
                                onChange={handleChange("parent_email")}
                                required
                                value={student.parent_email}
                              />
                            </FormGroup>
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
                                value={student.father_name}
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
                                value={student.father_last_name}
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
                              value={student.father_dob}
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
                              value={student.father_blood_group}
                            >
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
                              type="number"
                              onChange={handleChange("father_phone")}
                              required
                              value={student.father_phone}
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
                              value={student.father_pincode}
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
                              value={student.father_nationality}
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
                              value={student.father_mother_tongue}
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
                                value={student.mother_name}
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
                                value={student.mother_last_name}
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
                              value={student.mother_dob}
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
                              value={student.mother_blood_group}
                            >
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
                              type="number"
                              onChange={handleChange("mother_phone")}
                              required
                              value={student.mother_phone}
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
                              value={student.mother_pincode}
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
                              value={student.mother_nationality}
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
                              value={student.mother_mother_tongue}
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
                  )}
                  {student.guardian_name && (
                    <>
                      <CardBody>
                        <Row className="mb-4">
                          <Col align="center">
                            <h2>Guardian Details</h2>
                          </Col>
                        </Row>
                        <Row>
                          <Col md="6" >
                          <FormGroup>
                              <label
                                className="form-control-label"
                                htmlFor="example4cols3Input"
                              >
                                Guardian Address
                              </label>
                              <Input
                                id="example4cols3Input"
                                placeholder="Parent Address"
                                type="text"
                                onChange={handleChange("guardian_address")}
                                required
                                value={student.guardian_address}
                              />
                            </FormGroup>
                          </Col>
                          <Col md="6" >
                          <FormGroup>
                              <label
                                className="form-control-label"
                                htmlFor="example4cols3Input"
                              >
                                Guardian Email
                              </label>
                              <Input
                                id="example4cols3Input"
                                placeholder="Parent Email"
                                type="text"
                                onChange={handleChange("guardian_email")}
                                required
                                value={student.parent_email}
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
                               Name
                              </label>
                              <Input
                                id="example4cols3Input"
                                placeholder="First Name"
                                type="text"
                                onChange={handleChange("guardian_name")}
                                required
                                value={student.guardian_name}
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
                              value={student.guardian_dob}
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
                              value={student.guardian_blood_group}
                            >
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
                              type="number"
                              onChange={handleChange("guardian_phone")}
                              required
                              value={student.guardian_phone}
                            />
                          </Col>
                        </Row>
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
                                onChange={handleChange("guardian_address")}
                                required
                                value={student.guardian_address}
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
                                onChange={handleChange(
                                  "guardian_permanent_address"
                                )}
                                required
                                value={student.permanent_address}
                              />
                            </FormGroup>
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
                              value={student.guardian_pincode}
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
                              value={student.guardian_nationality}
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
                              value={student.guardian_mother_tongue}
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
                          <div>
                            <Button onClick={cancelHandler} color="danger" >Cancel</Button>
                          <Button
                            className="mr-4"
                            color="success"
                            type="submit"
                            >
                            Submit
                          </Button>
                            </div>
                        </Row>
                      </CardBody>
                    </>
                  )}
                </Form>
              </>
            )}
          </Card>
        )}
      </Container>
    </>
  );
}

export default UpdateStudent;
