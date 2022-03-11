
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
import { setStaffEditing } from "store/reducers/staff";
import { Stepper, Step } from "react-form-stepper";
import { useSelector,useDispatch } from "react-redux";
import Select from "react-select";
import { Country, State, City } from "country-state-city";

import "./style.css";

import { ToastContainer, toast } from "react-toastify";

import { updateStaff } from "api/staff";
import { isAuthenticated } from "api/auth";
import { getDepartment } from "api/department";
import { allSubjects } from "api/subjects";

function UpdateStaff({staffDetails}) {
  const [step, setStep] = useState(0);
const dispatch = useDispatch();
  const [staffData, setStaffData] = useState({
      _id:staffDetails._id,
    image: staffDetails.image,
    firstname: staffDetails.firstname,
    lastname: staffDetails.lastname,
    email: staffDetails.email,
    phone: staffDetails.phone,
    alternate_phone: staffDetails.alternate_phone,
    date_of_birth: staffDetails.date_of_birth,
    gender: staffDetails.gender,
    birth_place: staffDetails.birth_place,
    caste: staffDetails.caste,
    religion: staffDetails.religion,
    mother_tongue: staffDetails.mother_tongue,
    bloodgroup: staffDetails.bloodgroup,
    joining_date: staffDetails.joining_date,
    present_address: staffDetails.present_address,
    permanent_address: staffDetails.permanent_address,
    state: staffDetails.state,
    city: staffDetails.city,
    country: staffDetails.country,
    pincode: staffDetails.pincode,
    contact_person_name: staffDetails.contact_person_name,
    contact_person_relation: staffDetails.contact_person_relation,
    contact_person_phone: staffDetails.contact_person_phone,
    contact_person_address: staffDetails.contact_person_address,
    contact_person_state: staffDetails.contact_person_state,
    contact_person_city: staffDetails.contact_person_city,
    contact_person_country: staffDetails.contact_person_country,
    contact_person_pincode: staffDetails.contact_person_pincode,
    assign_role: staffDetails.assign_role,
    job: staffDetails.job,
    salary: staffDetails.salary,
    qualification: staffDetails.qualification,
    department: staffDetails.department,
    subject: staffDetails.subject,
  });

  console.log("staff", staffData);
  const [formData] = useState(new FormData());

  const [departments, setDeparments] = useState([]);
  // const [subject, setSubject] = useState([]);
  // console.log("sub", subject);
  const [a, setA] = useState([]);
  console.log("a", a);

  const roleOptions = [
    // { value: "chemistry", label: "Chemistry" }
  ];
  console.log("role", roleOptions);

  const handleChange = (name) => (event) => {
    formData.set(name, event.target.value);
    setStaffData({ ...staffData, [name]: event.target.value });
  };

  const handleFileChange = (name) => (event) => {
    formData.set(name, event.target.files[0]);
    setStaffData({ ...staffData, [name]: event.target.files[0].name });
  };

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

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    const { user, token } = isAuthenticated();
    formData.set("school", user.school);
    try {
      const resp = await updateStaff(staffData._id,user._id, formData);
      console.log(resp);
      if (resp.err) {
        return toast.error(resp.err);
      }
      toast.success("Staff added successfully");
      dispatch(setStaffEditing(false))
    } catch (err) {
      toast.error("Something Went Wrong");
    }
  };

  // Country state city data
  const [cscd, setCscd] = useState({
    country: staffData.country,
    state: staffData.state,
    city: staffData.city,
  });

  // contact person country state city data
  const [cpcscd, setcpCscd] = useState({
    contact_person_country: staffData.contact_person_country,
    contact_person_state: staffData.contact_person_state,
    contact_person_city: staffData.contact_person_city,
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

  useEffect(async () => {
    if (step === 3) {
      await Departments();
      // await Subjects();
      const { user, token } = isAuthenticated();
      try {
        const Subjects = await allSubjects(user._id, user.school, token);
        var list = [];
        console.log("subject", Subjects);
        Subjects[0].list.map(async (sub) => {
          list.push({
            value: sub,
            label: sub,
          });
        });
        setA(list);
        console.log("list", list);
      } catch (err) {
        toast.error("Something Went Wrong!");
      }
    }
  }, [step]);

  async function Departments() {
    const { user, token } = isAuthenticated();
    try {
      const dept = await getDepartment(user.school, user._id, token);
      console.log("dept", dept);
      setDeparments(dept);
    } catch (err) {
      toast.error("Something Went Wrong!");
    }
  }

  // async function Subjects() {
  //   const { user, token } = isAuthenticated();
  //   try {
  //     const Subjects = await allSubjects(user._id, user.school, token);
  //     console.log("subject", Subjects);
  //     setSubject(Subjects[0].list);
  //   } catch (err) {
  //     toast.error("Something Went Wrong!");
  //   }
  // }

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
                        // required
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
                      value={staffData.joining_date.slice(0,10)}
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
                      value={staffData.date_of_birth.slice(0,10)}
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
                      type="number"
                      onChange={handleChange("phone")}
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
                      type="number"
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
                        type="number"
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
                        <option value="canteen">Canteen</option>
                        <option value="teacher">Teacher</option>
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
                {staffData.assign_role === "teacher" ? (
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

export default UpdateStaff;