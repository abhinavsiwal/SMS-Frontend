// reactstrap components
import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Container,
  Row,
  Col,
  Button,
  CardImg,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  ListGroupItem,
  ListGroup,
  ModalFooter,
  Modal,
  ModalBody,
  Form,
  Label,
  Input,
} from "reactstrap";
// core components

import Loader from "components/Loader/Loader";
import SimpleHeader from "components/Headers/SimpleHeader.js";
import { schoolProfile, editProfile,adminProfileEdit } from "api/school";
import { FaEdit } from "react-icons/fa";
import { isAuthenticated } from "api/auth";
import { toast, ToastContainer } from "react-toastify";
import { fetchingSchoolProfileError } from "constants/errors";
import { updateSchoolError } from "constants/errors";
import { updateSchoolSuccess } from "constants/success";

function AdminProfile() {
  // 1 -> Details 2 -> Contact
  const [activeTab, setActiveTab] = useState("1");
  const [schoolDetails, setSchoolDetails] = useState({});
  const [editing, setEditing] = useState(false);
  const { user } = isAuthenticated();
  const [formData] = useState(new FormData());
  const [checked, setChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editSchoolProfile, setEditSchoolProfile] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
  });

  const [permissions, setPermissions] = useState([]);
  const [editLoading, setEditLoading] = useState(false);
  useEffect(() => {
    // console.log(user);
    if (user.permissions["School Profile Module"]) {
      let permission1 = user.permissions["School Profile Module"];
      setPermissions(permission1);
      // console.log(permissions);
    }
  }, []);

  useEffect(() => {
    getSchoolDetails();
  }, [checked]);

  const getSchoolDetails = async () => {
    try {
      setLoading(true);
      const { data } = await schoolProfile(user.school, user._id);
      // console.log(user);
      // console.log(data);
      setSchoolDetails(data);
      setEditSchoolProfile({
        ...editSchoolProfile,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        phone: user.phone,
      });
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
      toast.error(fetchingSchoolProfileError);
    }
  };

  const handleChange = (name) => (event) => {
    // formData.set(name, event.target.value);
    setEditSchoolProfile({ ...editSchoolProfile, [name]: event.target.value });
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    // console.log(editSchoolProfile);
    formData.set("firstname", editSchoolProfile.firstname);
    formData.set("lastname", editSchoolProfile.lastname);
    formData.set("email",editSchoolProfile.email);
    formData.set("phone", editSchoolProfile.phone);

    try {
      setEditLoading(true);
      const data = await adminProfileEdit(user._id, formData);
      // console.log(data);

      setEditSchoolProfile({
        ...editSchoolProfile,
        firstname: data.firstname,
        lastname: data.lastname,
        email: data.email,
        phone: data.phone,
      });

      setEditing(false);
      setEditLoading(false);
      toast.success("Profile Updated Successfully");
    } catch (err) {
      console.log(err);
      setEditLoading(false);
      toast.error("Error Updating Profile");
    }
  };

  return (
    <>
      <SimpleHeader name="School Profile" />
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
      <Modal
        style={{ height: "75vh" }}
        isOpen={editing}
        toggle={() => setEditing(false)}
        size="lg"
        scrollable
      >
        <div className="modal-header">
          <h2 className="modal-title" id="modal-title-default">
            {editing ? "Event List" : ""}
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
        {editLoading ? (
          <Loader />
        ) : (
          <ModalBody>
            <Form onSubmit={handleEdit}>
              <Row>
                <Col>
                  <Label
                    className="form-control-label"
                    htmlFor="example4cols2Input"
                  >
                    First Name
                  </Label>
                  <Input
                    id="example4cols2Input"
                    placeholder="Class"
                    type="text"
                    onChange={handleChange("firstname")}
                    value={editSchoolProfile.firstname}
                    required
                  />
                </Col>
                <Col>
                  <Label
                    className="form-control-label"
                    htmlFor="example4cols2Input"
                  >
                    Last Name
                  </Label>
                  <Input
                    id="example4cols2Input"
                    placeholder="Class"
                    type="text"
                    onChange={handleChange("lastname")}
                    value={editSchoolProfile.lastname}
                    required
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <Label
                    className="form-control-label"
                    htmlFor="example4cols2Input"
                  >
                    Email
                  </Label>
                  <Input
                    id="example4cols2Input"
                    placeholder="Class"
                    type="text"
                    onChange={handleChange("email")}
                    value={editSchoolProfile.email}
                    required
                  />
                </Col>
                <Col>
                  <Label
                    className="form-control-label"
                    htmlFor="example4cols2Input"
                  >
                    Phone
                  </Label>
                  <Input
                    id="example4cols2Input"
                    placeholder="Class"
                    type="text"
                    onChange={handleChange("phone")}
                    value={editSchoolProfile.phone}
                    required
                  />
                </Col>
              </Row>

              <Button
                color="success"
                type="submit"
                className="mt-2 mb-2"
                style={{ float: "right" }}
              >
                Save changes
              </Button>
            </Form>
          </ModalBody>
        )}
      </Modal>
      <Container className="mt--6" fluid>
        {loading ? (
          <Loader />
        ) : (
          <Row>
            <Col lg="4">
              <div className="card-wrapper">
                <Card>
                  <Col align="center">
                    <CardImg
                      alt="..."
                      src="https://trancaes.files.wordpress.com/2015/09/school-logo-new.jpg"
                      top
                      className="p-4"
                      style={{ width: "80%", height: "100%" }}
                    />
                  </Col>
                  <CardBody className="mt-0">
                    <Row>
                      <Col align="center">
                        <h4 className="mt-0 mb-1">Name</h4>
                        <span className="text-md">
                          {user.firstname} {user.lastname}
                        </span>
                      </Col>
                    </Row>
                    <Row>
                      <Col align="center">
                        <h4 className="mt-3 mb-1">Email</h4>
                        <span className="text-md">{user.email}</span>
                      </Col>
                    </Row>
                    <Row>
                      <Col align="center">
                        <h4 className="mt-3 mb-1">Phone</h4>
                        <span className="text-md">{user.phone}</span>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </div>
            </Col>
            <Col>
              <div className="card-wrapper">
                <Card>
                  <CardHeader>
                    <Row>
                      <Col md="10">
                        <Nav pills style={{ cursor: "pointer" }}>
                          <NavItem>
                            <NavLink
                              className={activeTab === "1" ? "active" : ""}
                              onClick={() => setActiveTab("1")}
                            >
                              Details
                            </NavLink>
                          </NavItem>
                          <NavItem>
                            <NavLink
                              className={activeTab === "2" ? "active" : ""}
                              onClick={() => setActiveTab("2")}
                            >
                              Contact
                            </NavLink>
                          </NavItem>
                        </Nav>
                      </Col>
                      {permissions && permissions.includes("edit") && (
                        <Col className="text-right">
                          <Button
                            className="btn-icon"
                            color="primary"
                            type="button"
                            onClick={() => setEditing(true)}
                          >
                            <span className="btn-inner--icon">
                              <FaEdit />
                            </span>
                          </Button>
                        </Col>
                      )}
                    </Row>
                  </CardHeader>
                  <CardBody>
                    <TabContent activeTab={activeTab}>
                      <TabPane tabId="1">
                        <ListGroup flush>
                          <Row>
                            <Col>
                              <ListGroupItem className="checklist-entry flex-column align-items-start py-4 px-4">
                                <div className="checklist-item checklist-item-info">
                                  <div className="checklist-info">
                                    <h5 className="checklist-title mb-0">
                                      School Address
                                    </h5>
                                    <small>{schoolDetails.address}</small>
                                  </div>
                                </div>
                              </ListGroupItem>
                            </Col>
                            <Col md="4">
                              <ListGroupItem className="checklist-entry flex-column align-items-start py-4 px-4">
                                <div className="checklist-item checklist-item-success">
                                  <div className="checklist-info">
                                    <h5 className="checklist-title mb-0">
                                      Pin Code
                                    </h5>
                                    <small>{schoolDetails.pincode}</small>
                                  </div>
                                </div>
                              </ListGroupItem>
                            </Col>
                          </Row>
                          <Row className="mt-4">
                            <Col>
                              <ListGroupItem className="checklist-entry flex-column align-items-start py-4 px-4">
                                <div className="checklist-item checklist-item-success">
                                  <div className="checklist-info">
                                    <h5 className="checklist-title mb-0">
                                      Country
                                    </h5>
                                    <small>{schoolDetails.country}</small>
                                  </div>
                                </div>
                              </ListGroupItem>
                            </Col>
                            <Col>
                              <ListGroupItem className="checklist-entry flex-column align-items-start py-4 px-4">
                                <div className="checklist-item checklist-item-info">
                                  <div className="checklist-info">
                                    <h5 className="checklist-title mb-0">
                                      City
                                    </h5>
                                    <small>{schoolDetails.city}</small>
                                  </div>
                                </div>
                              </ListGroupItem>
                            </Col>
                            <Col>
                              <ListGroupItem className="checklist-entry flex-column align-items-start py-4 px-4">
                                <div className="checklist-item checklist-item-success">
                                  <div className="checklist-info">
                                    <h5 className="checklist-title mb-0">
                                      State
                                    </h5>
                                    <small>{schoolDetails.state}</small>
                                  </div>
                                </div>
                              </ListGroupItem>
                            </Col>
                          </Row>
                        </ListGroup>
                      </TabPane>
                      <TabPane tabId="2">
                        <ListGroup flush>
                          <Row>
                            <Col>
                              <ListGroupItem className="checklist-entry flex-column align-items-start py-4 px-4">
                                <div className="checklist-item checklist-item-success">
                                  <div className="checklist-info">
                                    <h5 className="checklist-title mb-0">
                                      School Email
                                    </h5>
                                    <small>{schoolDetails.email}</small>
                                  </div>
                                </div>
                              </ListGroupItem>
                            </Col>
                            <Col>
                              <ListGroupItem className="checklist-entry flex-column align-items-start py-4 px-4">
                                <div className="checklist-item checklist-item-info">
                                  <div className="checklist-info">
                                    <h5 className="checklist-title mb-0">
                                      Primary Contact Number
                                    </h5>
                                    <small>+91 {schoolDetails.phone}</small>
                                  </div>
                                </div>
                              </ListGroupItem>
                            </Col>
                          </Row>
                          <Row className="mt-4">
                            <Col>
                              <ListGroupItem className="checklist-entry flex-column align-items-start py-4 px-4">
                                <div className="checklist-item checklist-item-success">
                                  <div className="checklist-info">
                                    <h5 className="checklist-title mb-0">
                                      Telephone
                                    </h5>
                                    <small>{schoolDetails.telephone}</small>
                                  </div>
                                </div>
                              </ListGroupItem>
                            </Col>
                            <Col>
                              <ListGroupItem className="checklist-entry flex-column align-items-start py-4 px-4">
                                <div className="checklist-item checklist-item-info">
                                  <div className="checklist-info">
                                    <h5 className="checklist-title mb-0">
                                      Fax No.
                                    </h5>
                                    <small>+91 123456789</small>
                                  </div>
                                </div>
                              </ListGroupItem>
                            </Col>
                          </Row>
                        </ListGroup>
                      </TabPane>
                    </TabContent>
                  </CardBody>
                </Card>
              </div>
            </Col>
          </Row>
        )}
      </Container>
    </>
  );
}

export default AdminProfile;
