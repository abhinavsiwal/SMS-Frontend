import React, { useEffect, useState } from "react";
import Select from "react-select";
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
  Table,
} from "reactstrap";
import { Popconfirm, TimePicker } from "antd";
import "./RolePermissions.css";
import { isAuthenticated } from "api/auth";
// core components
import SimpleHeader from "components/Headers/SimpleHeader.js";
import { addRole, updateRole } from "api/rolesAndPermission";
import { getAllRoles } from "api/rolesAndPermission";
import { deleteRole } from "api/rolesAndPermission";

function RolePermissions() {
  const [addRoleModal, setAddRoleModal] = React.useState(false);
  const [editRoleModal, setEditRoleModal] = useState(false);
  const [manageModal, setManageModal] = useState(false);
  const [modal2, setModal2] = React.useState(false);
  const [modal3, setModal3] = React.useState(false);
  const [role, setRole] = React.useState();
  const [editRole, setEditRole] = useState("");
  const [editRoleId, setEditRoleId] = useState("");
  const [permissionName, setPermissionName] = React.useState();
  const [applicationName, setApplicationName] = React.useState();
  const [mappingPermissions, setMappingPermissions] = useState({});
  const [mappingRoleName, setMappingRoleName] = useState("");
  const [mappingRoleId, setMappingRoleId] = useState("")
  const [roleName, setRoleName] = React.useState([
    "Super Admin",
    "Admin",
    "Field Engineers",
  ]);
  const [allRoles, setAllRoles] = useState([]);
  const [checked, setChecked] = useState(false);
  console.log(roleName);
  const { user } = isAuthenticated();
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

  const [manageRolePermissions, setManageRolePermissions] = React.useState([
    "bshjb",
    "cnjdc",
    "jdnkjnc",
  ]);

  const roleOption = [
    {
      value: "view",
      label: "View",
    },
    {
      value: "export",
      label: "Export",
    },
    {
      value: "delete",
      label: "Delete",
    },
    {
      value: "import",
      label: "Import",
    },
  ];

  useEffect(() => {
    getAllRolesHandler();
    // setMappingRoleName(allRoles[0].name)
  }, [checked]);

  const addRoleHandler = async () => {
    console.log(role);
    const formData = new FormData();
    formData.set("name", role);
    formData.set("school", user.school);
    try {
      const data = await addRole(user._id, formData);
      console.log(data);
      setRole("");
      setAddRoleModal(false);
      setChecked(!checked);
    } catch (err) {
      console.log(err);
    }
  };

  const getAllRolesHandler = async () => {
    console.log(user);
    try {
      const data = await getAllRoles(user._id, user.school);
      console.log(data);
      setAllRoles(data);
      setMappingRoleName(data[0].name);
      setMappingRoleId(data[0]._id);
    } catch (err) {
      console.log(err);
    }
  };

  const editRoleHandler = (role, roleId) => {
    setEditRoleModal(true);
    setEditRole(role);
    setEditRoleId(roleId);
  };

  const editRoleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.set("name", editRole);
      const data = await updateRole(user._id, editRoleId, formData);
      console.log(data);
      setChecked(!checked);
      setEditRoleModal(false);
      setEditRole("");
      setEditRoleId("");
    } catch (err) {
      console.log(err);
    }
  };

  const deleteRoleHandler = async (roleId) => {
    try {
      const data = await deleteRole(user._id, roleId);
      console.log(data);
      setChecked(!checked);
    } catch (err) {
      console.log(err);
    }
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

  const managePermissonSubmit = async () => {
    console.log(mappingRoleId);
    console.log(mappingPermissions);
    let selectedRole = allRoles.find(role=>role._id===mappingRoleId);
    console.log(selectedRole.name);
    try {
      const formData = new FormData();
      formData.set("name", selectedRole.name);
      // formData.set("permissions", JSON.stringify(mappingPermissions.obj));
      formData.set("permissions", JSON.stringify(mappingPermissions));
      const data = await updateRole(user._id, mappingRoleId, formData);
      console.log(data);
      setChecked(!checked);
      setManageModal(false);
      setMappingPermissions([]);
    } catch (err) {
      console.log(err);
    }
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

  const handlePermissionChange = (name) => (value) => {
    let obj = {};
    let a = [];
    console.log(name);
    console.log(value);

    value.map((items) => {
      a.push(items.value);
    });

    obj[name] = a;  
    console.log("a", obj[name]);


    setMappingPermissions({...mappingPermissions,...obj});
  };

  return (
    <>
      <SimpleHeader name="Roles-Permissions" />
      <Container className="mt--6" fluid>
        <Row>
          <Col className="m-1">
            <Button
              color="primary"
              type="button"
              onClick={() => setManageModal(true)}
            >
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
                    onClick={() => setAddRoleModal(true)}
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
                  {allRoles.map((role) => {
                    return (
                      <>
                        <ListGroupItem>
                          <Col className="d-flex justify-content-between">
                            <div>{role.name}</div>
                            <div className="d-flex justify-content-between">
                              <Button
                                className="btn-sm pull-right"
                                color="primary"
                                type="button"
                                onClick={() =>
                                  editRoleHandler(role.name, role._id)
                                }
                              >
                                <i className="fas fa-user-edit" />
                              </Button>
                              <Button
                                className="btn-sm pull-right"
                                color="danger"
                                type="button"
                              >
                                <Popconfirm
                                  title="Sure to delete?"
                                  onConfirm={() => deleteRoleHandler(role._id)}
                                >
                                  <i className="fas fa-trash" />
                                </Popconfirm>
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
        {/* Edit role modal */}
        <Modal
          className="modal-dialog-centered"
          isOpen={editRoleModal}
          toggle={() => setEditRoleModal(false)}
          size="sm"
        >
          <div className="modal-header">
            <h2 className="modal-title" id="modal-title-default">
              Role Name
            </h2>
            <button
              aria-label="Close"
              className="close"
              data-dismiss="modal"
              type="button"
              onClick={() => setEditRoleModal(false)}
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
                  onChange={(e) => setEditRole(e.target.value)}
                  value={editRole}
                  placeholder="Role Name"
                  type="text"
                  required
                />
              </Col>
            </Row>
          </ModalBody>
          <ModalFooter>
            <Button color="success" type="button" onClick={editRoleSubmit}>
              Edit Role
            </Button>
          </ModalFooter>
        </Modal>
        {/* Mangae role modal */}
        <Modal
          // className="modal-dialog-centered"
          isOpen={manageModal}
          toggle={() => setManageModal(false)}
          size="lg"
          className="custom-modal-style"
          scrollable
        >
          <div className="modal-header">
            <h2 className="modal-title" id="modal-title-default">
              Role Permissions Mapping
            </h2>
            <Input
              id="example4cols2Input"
              type="select"
              // onChange={handleChange("class")}
              required
              onChange={(e) => setMappingRoleId(e.target.value)}
            >
              {allRoles?.map((role, index) => (
                <option
                  key={index}
                  value={role._id}
                >
                  {role.name}
                </option>
              ))}
            </Input>
            <button
              aria-label="Close"
              className="close"
              data-dismiss="modal"
              type="button"
              onClick={() => setManageModal(false)}
            >
              <span aria-hidden={true}>×</span>
            </button>
          </div>
          <ModalBody>
            <Table>
              <tbody>
                {user.module.map((module, index) => (
                  <tr key={index}>
                    <td className="mt-4">{module}</td>
                    <td>
                      <Select
                        isMulti
                        name="permissions"
                        options={roleOption}
                        onChange={handlePermissionChange(module)}
                        className="basic-multi-select "
                        classNamePrefix="select"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </ModalBody>
          <ModalFooter>
            <Button
              color="success"
              type="button"
              onClick={managePermissonSubmit}
            >
              Submit
            </Button>
          </ModalFooter>
        </Modal>
        {/* Add roles model */}
        <Modal
          className="modal-dialog-centered"
          isOpen={addRoleModal}
          toggle={() => setAddRoleModal(false)}
          size="sm"
        >
          <div className="modal-header">
            <h2 className="modal-title" id="modal-title-default">
              Role Name
            </h2>
            <button
              aria-label="Close"
              className="close"
              data-dismiss="modal"
              type="button"
              onClick={() => setAddRoleModal(false)}
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
            <Button color="success" type="button" onClick={addRoleHandler}>
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
