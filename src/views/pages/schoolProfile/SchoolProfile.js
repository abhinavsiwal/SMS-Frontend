// reactstrap components
import React, { useState, useEffect } from "react";
import PermissionsGate from "routeGuard/PermissionGate";
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

import SimpleHeader from "components/Headers/SimpleHeader.js";
import { schoolProfile } from "api/school";
import { FaEdit } from "react-icons/fa";
import { isAuthenticated } from "api/auth";
import { SCOPES } from "routeGuard/permission-maps";

function SchoolProfile() {
  // 1 -> Details 2 -> Contact
  const [activeTab, setActiveTab] = useState("1");
  const [schoolDetails, setSchoolDetails] = useState({});
  const [editing, setEditing] = useState(false);
  const { user } = isAuthenticated();
  const [formData] = useState(new FormData());
  const [editSchoolProfile, setEditSchoolProfile] = useState({
    school_name: "",
    abbreviation: "",
    school_address: "",
    pin_code: "",
    country: "",
    city: "",
    state: "",
    school_email: "",
    primary_contact_no: "",
    telephone: "",
    fax_no: "",
  });
  useEffect(() => {
    getSchoolDetails();
  }, []);

  const getSchoolDetails = async () => {
    try {
      const { data } = await schoolProfile(user.school, user._id);
      console.log(user);
      console.log(data);
      setSchoolDetails(data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (name) => (event) => {
    formData.set(name, event.target.value);
    setEditSchoolProfile({ ...editSchoolProfile, [name]: event.target.value });
  };

  const handleEdit = () => {};

  return (
    <>
      <SimpleHeader name="School Profile" />
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
        <ModalBody>
          <Form>
            <Row>
              <Col>
                <Label
                  className="form-control-label"
                  htmlFor="example4cols2Input"
                >
                  School Name
                </Label>
                <Input
                  id="example4cols2Input"
                  placeholder="Class"
                  type="text"
                  onChange={handleChange("school_name")}
                  value={editSchoolProfile.school_name}
                  required
                />
              </Col>
              <Col>
                <Label
                  className="form-control-label"
                  htmlFor="example4cols2Input"
                >
                  Abbreviation
                </Label>
                <Input
                  id="example4cols2Input"
                  placeholder="Class"
                  type="text"
                  onChange={handleChange("abbreviation")}
                  value={editSchoolProfile.abbreviation}
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
                  Route Name
                </Label>
                <Input
                  id="example4cols2Input"
                  placeholder="Class"
                  type="text"
                  // onChange={handleChange("route_name")}
                  // value={route.route_name}
                  required
                />
              </Col>
              <Col>
                <Label
                  className="form-control-label"
                  htmlFor="example4cols2Input"
                >
                  Route Name
                </Label>
                <Input
                  id="example4cols2Input"
                  placeholder="Class"
                  type="text"
                  // onChange={handleChange("route_name")}
                  // value={route.route_name}
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
                  Route Name
                </Label>
                <Input
                  id="example4cols2Input"
                  placeholder="Class"
                  type="text"
                  // onChange={handleChange("route_name")}
                  // value={route.route_name}
                  required
                />
              </Col>
              <Col>
                <Label
                  className="form-control-label"
                  htmlFor="example4cols2Input"
                >
                  Route Name
                </Label>
                <Input
                  id="example4cols2Input"
                  placeholder="Class"
                  type="text"
                  // onChange={handleChange("route_name")}
                  // value={route.route_name}
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
                  Route Name
                </Label>
                <Input
                  id="example4cols2Input"
                  placeholder="Class"
                  type="text"
                  // onChange={handleChange("route_name")}
                  // value={route.route_name}
                  required
                />
              </Col>
              <Col>
                <Label
                  className="form-control-label"
                  htmlFor="example4cols2Input"
                >
                  Route Name
                </Label>
                <Input
                  id="example4cols2Input"
                  placeholder="Class"
                  type="text"
                  // onChange={handleChange("route_name")}
                  // value={route.route_name}
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
                  Route Name
                </Label>
                <Input
                  id="example4cols2Input"
                  placeholder="Class"
                  type="text"
                  // onChange={handleChange("route_name")}
                  // value={route.route_name}
                  required
                />
              </Col>
              <Col>
                <Label
                  className="form-control-label"
                  htmlFor="example4cols2Input"
                >
                  Route Name
                </Label>
                <Input
                  id="example4cols2Input"
                  placeholder="Class"
                  type="text"
                  // onChange={handleChange("route_name")}
                  // value={route.route_name}
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
                  Route Name
                </Label>
                <Input
                  id="example4cols2Input"
                  placeholder="Class"
                  type="text"
                  // onChange={handleChange("route_name")}
                  // value={route.route_name}
                  required
                />
              </Col>
              <Col>
                <Label
                  className="form-control-label"
                  htmlFor="example4cols2Input"
                >
                  Route Name
                </Label>
                <Input
                  id="example4cols2Input"
                  placeholder="Class"
                  type="text"
                  // onChange={handleChange("route_name")}
                  // value={route.route_name}
                  required
                />
              </Col>
            </Row>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="success" type="button" onClick={handleEdit}>
            Save changes
          </Button>
        </ModalFooter>
      </Modal>
      <Container className="mt--6" fluid>
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
                      <h4 className="mt-0 mb-1">School Name</h4>
                      <span className="text-md">
                        {schoolDetails.schoolname}
                      </span>
                    </Col>
                  </Row>
                  <Row>
                    <Col align="center">
                      <h4 className="mt-3 mb-1">Abbreviation</h4>
                      <span className="text-md">
                        {schoolDetails.abbreviation}
                      </span>
                    </Col>
                  </Row>
                  <Row>
                    <Col align="center">
                      <h4 className="mt-3 mb-1">Affiliated Board</h4>
                      <span className="text-md">
                        {schoolDetails.affiliateBoard}
                      </span>
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
                    <PermissionsGate scopes={[SCOPES.canEdit]}>
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
                    </PermissionsGate>
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
                                  <h5 className="checklist-title mb-0">City</h5>
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
      </Container>
    </>
  );
}

export default SchoolProfile;
