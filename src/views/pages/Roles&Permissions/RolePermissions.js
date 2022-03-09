import React from "react";

//ReactStrap Components
import {
  Card,
  CardHeader,
  CardBody,
  Container,
  Row,
  Col,
  Button,
  ListGroupItem,
  ListGroup,
  Input,
  Modal,
  ModalBody,
  ModalFooter,
} from "reactstrap";

import "./RolePermissions.css";

// core components
import SimpleHeader from "components/Headers/SimpleHeader.js";
function RolePermissions() {
  const [editing, setEditing] = React.useState(false);
  const [modal2, setModal2] = React.useState(false);
  const [modal3, setModal3] = React.useState(false);
  const [role, setRole] = React.useState();
  const [permissionName, setPermissionName] = React.useState();
  const [applicationName, setApplicationName] = React.useState();
  const [roleName, setRoleName] = React.useState([
    "Super Admin",
    "Admin",
    "Field Engineers",
  ]);
  console.log(roleName);
  const [Permissions, setPermissions] = React.useState([
    "View",
    "Export",
    "Delete",
    "Import",
  ]);
  const [application, setApplication] = React.useState([
    "Pricing",
    "Owner",
    "Vendor",
    "Organization",
  ]);

  const addRoleName = () => {
    if (role.length === 0) return;
    let arr = roleName;
    arr.push(role);
    setRoleName(arr);
    setRole("");
    setEditing(false);
  };

  const addPermissionName = () => {
    if (permissionName.length === 0) return;
    let arr = Permissions;
    arr.push(permissionName);
    setPermissions(arr);
    setPermissionName("");
    setModal3(false);
  };

  const addApplicationName = () => {
    if (applicationName.length === 0) return;
    let arr = application;
    arr.push(application);
    setApplication(arr);
    setApplicationName("");
    setModal2(false);
  };

  const handleChangeRoleName = (e) => {
    if (e.target.key === "Enter") return;
    setRole(e.target.value);
  };

  const handleChangePermissionName = (e) => {
    if (e.target.key === "Enter") return;
    setPermissionName(e.target.value);
  };

  const handleChangeApplicationName = (e) => {
    if (e.target.key === "Enter") return;
    setApplicationName(e.target.value);
  };

  return (
    <>
      <SimpleHeader name="Roles-Permissions" />
      <Container className="mt--6" fluid>
        <Row>
          <Col className="m-1">
            <Button color="primary" type="button">
              Manage Role Permissions Mapping
            </Button>
          </Col>
        </Row>
        <Row className="d-flex justify-content-between">
          <Col lg="4">
            <Card>
              <CardHeader>
                <div className="d-flex justify-content-between Role-Permissions">
                  <p>Manage Roles</p>
                  <Button
                    color="primary"
                    type="button"
                    onClick={() => setEditing(true)}
                  >
                    Add Roles
                  </Button>
                </div>
              </CardHeader>
              <CardBody>
                <Col className="d-flex justify-content-between Role-Permissions">
                  <p>Role Name</p>
                  <p>Actions</p>
                </Col>
                <Col md="6">
                  <Input
                    id="example4cols2Input"
                    placeholder="Role Name"
                    type="text"
                    // onChange={handleChange("abbreviation")}
                    required
                  />
                </Col>

                <ListGroup className="m-1">
                  {roleName.map((roll) => {
                    return (
                      <>
                        <ListGroupItem>
                          <Col className="d-flex justify-content-between">
                            <div>{roll}</div>
                            <div className="d-flex justify-content-between">
                              <Button
                                className="btn-sm pull-right"
                                color="primary"
                                type="button"
                              >
                                <i className="fas fa-user-edit" />
                              </Button>
                              <Button
                                className="btn-sm pull-right"
                                color="danger"
                                type="button"
                              >
                                <i className="fas fa-trash" />
                              </Button>
                            </div>
                          </Col>
                        </ListGroupItem>
                      </>
                    );
                  })}
                </ListGroup>
              </CardBody>
            </Card>
          </Col>

          <Col lg="4">
            <Card>
              <CardHeader>
                <div className="d-flex justify-content-between Role-Permissions">
                  <p>Manage Permissions</p>
                  <Button
                    color="primary"
                    type="button"
                    onClick={() => setModal3(true)}
                  >
                    Add Permissions
                  </Button>
                </div>
              </CardHeader>
              <CardBody>
                <Col className="d-flex justify-content-between Role-Permissions">
                  <p>Permissions Name</p>
                  <p>Actions</p>
                </Col>
                <Col md="6">
                  <Input
                    id="example4cols2Input"
                    placeholder="Permission Name"
                    type="text"
                    // onChange={handleChange("abbreviation")}
                    required
                  />
                </Col>
                <ListGroup className="m-1">
                  {Permissions.map((Permissions) => {
                    return (
                      <>
                        <ListGroupItem>
                          <Col className="d-flex justify-content-between">
                            <div>{Permissions}</div>
                            <div className="d-flex justify-content-between">
                              <Button
                                className="btn-sm pull-right"
                                color="primary"
                                type="button"
                              >
                                <i className="fas fa-user-edit" />
                              </Button>
                              <Button
                                className="btn-sm pull-right"
                                color="danger"
                                type="button"
                              >
                                <i className="fas fa-trash" />
                              </Button>
                            </div>
                          </Col>
                        </ListGroupItem>
                      </>
                    );
                  })}
                </ListGroup>
              </CardBody>
            </Card>
          </Col>

          <Col lg="4">
            <Card>
              <CardHeader>
                <div className="d-flex justify-content-between Role-Permissions">
                  <p>Manage Applications</p>
                  <Button
                    color="primary"
                    type="button"
                    onClick={() => setModal2(true)}
                  >
                    Add Applications
                  </Button>
                </div>
              </CardHeader>
              <CardBody>
                <Col className="d-flex justify-content-between Role-Permissions">
                  <p>Applications Name</p>
                  <p>Actions</p>
                </Col>
                <Col md="6">
                  <Input
                    id="example4cols2Input"
                    placeholder="Application Name"
                    type="text"
                    // onChange={handleChange("abbreviation")}
                    required
                  />
                </Col>
                <ListGroup className="m-1">
                  {application.map((application) => {
                    return (
                      <>
                        <ListGroupItem>
                          <Col className="d-flex justify-content-between">
                            <div>{application}</div>
                            <div className="d-flex justify-content-between">
                              <Button
                                className="btn-sm pull-right"
                                color="primary"
                                type="button"
                              >
                                <i className="fas fa-user-edit" />
                              </Button>
                              <Button
                                className="btn-sm pull-right"
                                color="danger"
                                type="button"
                              >
                                <i className="fas fa-trash" />
                              </Button>
                            </div>
                          </Col>
                        </ListGroupItem>
                      </>
                    );
                  })}
                </ListGroup>
              </CardBody>
            </Card>
          </Col>
        </Row>

        <Modal
          className="modal-dialog-centered"
          isOpen={editing}
          toggle={() => setEditing(false)}
          size="sm"
        >
          <div className="modal-header">
            <h2 className="modal-title" id="modal-title-default">
              {editing ? "Role Name" : ""}
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
            <Row>
              <Col>
                <label className="form-control-label">Role Name</label>
                <Input
                  id="form-department-name"
                  onChange={handleChangeRoleName}
                  placeholder="Role Name"
                  type="text"
                  required
                />
              </Col>
            </Row>
          </ModalBody>
          <ModalFooter>
            <Button color="success" type="button" onClick={addRoleName}>
              Add Role
            </Button>
          </ModalFooter>
        </Modal>

        <Modal
          className="modal-dialog-centered"
          isOpen={modal3}
          toggle={() => setModal3(false)}
          size="sm"
        >
          <div className="modal-header">
            <h2 className="modal-title" id="modal-title-default">
              {modal3 ? "Permission Name" : ""}
            </h2>
            <button
              aria-label="Close"
              className="close"
              data-dismiss="modal"
              type="button"
              onClick={() => setModal3(false)}
            >
              <span aria-hidden={true}>×</span>
            </button>
          </div>
          <ModalBody>
            <Row>
              <Col>
                <label className="form-control-label">Permission Name</label>
                <Input
                  id="form-department-name"
                  onChange={handleChangePermissionName}
                  placeholder="Permission Name"
                  type="text"
                />
              </Col>
            </Row>
          </ModalBody>
          <ModalFooter>
            <Button color="success" type="button" onClick={addPermissionName}>
              Add Permission
            </Button>
          </ModalFooter>
        </Modal>

        <Modal
          className="modal-dialog-centered"
          isOpen={modal2}
          toggle={() => setModal2(false)}
          size="sm"
        >
          <div className="modal-header">
            <h2 className="modal-title" id="modal-title-default">
              {modal2 ? "Application Name" : ""}
            </h2>
            <button
              aria-label="Close"
              className="close"
              data-dismiss="modal"
              type="button"
              onClick={() => setModal2(false)}
            >
              <span aria-hidden={true}>×</span>
            </button>
          </div>
          <ModalBody>
            <Row>
              <Col>
                <label className="form-control-label">Application Name</label>
                <Input
                  id="form-department-name"
                  onChange={handleChangeApplicationName}
                  placeholder="Application Name"
                  type="text"
                />
              </Col>
            </Row>
          </ModalBody>
          <ModalFooter>
            <Button color="success" type="button" onClick={addApplicationName}>
              Add Application
            </Button>
          </ModalFooter>
        </Modal>
      </Container>
    </>
  );
}

export default RolePermissions;
