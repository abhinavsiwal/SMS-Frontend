import React, { useEffect, useState, useRef } from "react";
import { isAuthenticated } from "api/auth";
import { allStudents, deleteStudent } from "api/student";

import {
  Card,
  CardHeader,
  CardBody,
  Input,
  Container,
  Row,
  Col,
  Button,
  CardImg,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
// core components
import SimpleHeader from "components/Headers/SimpleHeader.js";
import { SearchOutlined } from "@ant-design/icons";
import AntTable from "../tables/AntTable";
import { Link } from "react-router-dom";
import Loader from "components/Loader/Loader";
import { Popconfirm } from "antd";
import { toast } from "react-toastify";
import ReactPaginate from "react-paginate";
import { useHistory } from "react-router";
import UpdateStudent from "./UpdateStudent";
import { useSelector, useDispatch } from "react-redux";
import { useReactToPrint } from "react-to-print";
import PermissionsGate from "routeGuard/PermissionGate";

import { setStudentEditing } from "store/reducers/student";
import { SCOPES } from "routeGuard/permission-maps";
const AllStudents = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { studentEditing } = useSelector((state) => state.studentReducer);
  const [loading, setLoading] = useState(false);
  // 0 -> List, 1-> Grid
  const [view, setView] = useState(0);
  const [studentList, setStudentList] = useState([]);
  const [checked, setChecked] = useState(false);
  // Pagination
  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [editing, setEditing] = useState(false);
  const [editingData, setEditingData] = useState({});
  const itemsPerPage = 9;
  const { user, token } = isAuthenticated();
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % studentList.length;
    setItemOffset(newOffset);
  };

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  let permissions = [];
  useEffect(() => {
    if (user.role["Student Management"]) {
      permissions = user.role["Student Management"];
      console.log(permissions);
    }
  }, []);
  useEffect(() => {
    const fetchStudents = async () => {
      const endOffset = itemOffset + itemsPerPage;
      const payload = { school: user.school };
      const res = await allStudents(
        user.school,
        user._id,
        token,
        JSON.stringify(payload)
      );
      console.log("res", res);
      const data = [];
      for (let i = 0; i < res.length; i++) {
        data.push({
          key: i,
          sid: res[i].SID,
          first_name: res[i].firstname,
          last_name: res[i].lastname,
          email: res[i].email,
          phone: res[i].phone,
          gender: res[i].gender,
          dob: res[i].date_of_birth.split("T")[0].toString(),
          class: "Class",
          section: "Section",
          roll: "Roll",
          joining_date: res[i].joining_date.split("T")[0].toString(),
          action: (
            <h5 key={i + 1} className="mb-0">
              {/* <Link to={`/admin/update-student/${res[i]._id}`}> */}
              {permissions && permissions.includes("edit") && (
                <Button
                  className="btn-sm pull-right"
                  color="primary"
                  type="button"
                  key={"edit" + i + 1}
                  onClick={() => {
                    updateStudentHandler(res[i]);
                  }}
                >
                  <i className="fas fa-user-edit" />
                </Button>
              )}
              {/* </Link> */}
              {permissions && permissions.includes("edit") && (
                <Button
                  className="btn-sm pull-right"
                  color="danger"
                  type="button"
                  key={"delete" + i + 1}
                >
                  <Popconfirm
                    title="Sure to delete?"
                    onConfirm={() => deleteStudentHandler(res[i]._id)}
                  >
                    <i className="fas fa-trash" />
                  </Popconfirm>
                </Button>
              )}
              <Button
                className="btn-sm pull-right"
                color="success"
                type="button"
                key={"view" + i + 1}
              >
                <i className="fas fa-user" />
              </Button>
            </h5>
          ),
        });
      }
      setStudentList(data);
      setCurrentItems(data.slice(itemOffset, endOffset));
      setPageCount(Math.ceil(data.length / itemsPerPage));
      setLoading(true);
    };
    fetchStudents();
  }, [itemOffset, itemsPerPage, checked]);

  const deleteStudentHandler = async (studentId) => {
    const { user } = isAuthenticated();
    try {
      const data = await deleteStudent(studentId, user._id);
      console.log(data);
      if (checked === false) {
        setChecked(true);
      } else {
        setChecked(false);
      }
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  const updateStudentHandler = (studentData) => {
    console.log("Update Student");
    console.log(studentData);
    dispatch(setStudentEditing(true));
    setEditingData(studentData);
    // return <UpdateStudent studentDetails={studentData} />;
  };

  const columns = [
    {
      title: "SID",
      dataIndex: "sid",
      sorter: (a, b) => a.sid > b.sid,
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => {
        return (
          <>
            <Input
              autoFocus
              placeholder="Type text here"
              value={selectedKeys[0]}
              onChange={(e) => {
                setSelectedKeys(e.target.value ? [e.target.value] : []);
                confirm({ closeDropdown: false });
              }}
              onBlur={() => {
                confirm();
              }}
            ></Input>
          </>
        );
      },
      filterIcon: () => {
        return <SearchOutlined />;
      },
      onFilter: (value, record) => {
        return record.sid.toLowerCase().includes(value.toLowerCase());
      },
    },
    {
      title: "First Name",
      dataIndex: "first_name",
      sorter: (a, b) => a.first_name > b.first_name,
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => {
        return (
          <>
            <Input
              autoFocus
              placeholder="Type text here"
              value={selectedKeys[0]}
              onChange={(e) => {
                setSelectedKeys(e.target.value ? [e.target.value] : []);
                confirm({ closeDropdown: false });
              }}
              onBlur={() => {
                confirm();
              }}
            ></Input>
          </>
        );
      },
      filterIcon: () => {
        return <SearchOutlined />;
      },
      onFilter: (value, record) => {
        return record.first_name.toLowerCase().includes(value.toLowerCase());
      },
    },
    {
      title: "Last Name",
      dataIndex: "last_name",
      sorter: (a, b) => a.last_name > b.last_name,
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => {
        return (
          <>
            <Input
              autoFocus
              placeholder="Type text here"
              value={selectedKeys[0]}
              onChange={(e) => {
                setSelectedKeys(e.target.value ? [e.target.value] : []);
                confirm({ closeDropdown: false });
              }}
              onBlur={() => {
                confirm();
              }}
            ></Input>
          </>
        );
      },
      filterIcon: () => {
        return <SearchOutlined />;
      },
      onFilter: (value, record) => {
        return record.last_name.toLowerCase().includes(value.toLowerCase());
      },
    },
    {
      title: "Email",
      dataIndex: "email",
      sorter: (a, b) => a.email > b.email,
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => {
        return (
          <>
            <Input
              autoFocus
              placeholder="Type text here"
              value={selectedKeys[0]}
              onChange={(e) => {
                setSelectedKeys(e.target.value ? [e.target.value] : []);
                confirm({ closeDropdown: false });
              }}
              onBlur={() => {
                confirm();
              }}
            ></Input>
          </>
        );
      },
      filterIcon: () => {
        return <SearchOutlined />;
      },
      onFilter: (value, record) => {
        return record.email.toLowerCase().includes(value.toLowerCase());
      },
    },
    {
      title: "Phone",
      dataIndex: "phone",
      sorter: (a, b) => a.phone > b.phone,
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => {
        return (
          <>
            <Input
              autoFocus
              placeholder="Type text here"
              value={selectedKeys[0]}
              onChange={(e) => {
                setSelectedKeys(e.target.value ? [e.target.value] : []);
                confirm({ closeDropdown: false });
              }}
              onBlur={() => {
                confirm();
              }}
            ></Input>
          </>
        );
      },
      filterIcon: () => {
        return <SearchOutlined />;
      },
      onFilter: (value, record) => {
        return record.phone.toLowerCase().includes(value.toLowerCase());
      },
    },
    {
      title: "Gender",
      dataIndex: "gender",
      sorter: (a, b) => a.gender > b.gender,
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => {
        return (
          <>
            <Input
              autoFocus
              placeholder="Type text here"
              value={selectedKeys[0]}
              onChange={(e) => {
                setSelectedKeys(e.target.value ? [e.target.value] : []);
                confirm({ closeDropdown: false });
              }}
              onBlur={() => {
                confirm();
              }}
            ></Input>
          </>
        );
      },
      filterIcon: () => {
        return <SearchOutlined />;
      },
      onFilter: (value, record) => {
        return record.gender.toLowerCase().includes(value.toLowerCase());
      },
    },
    {
      title: "DOB",
      dataIndex: "dob",
      sorter: (a, b) => a.dob > b.dob,
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => {
        return (
          <>
            <Input
              autoFocus
              placeholder="Type text here"
              value={selectedKeys[0]}
              onChange={(e) => {
                setSelectedKeys(e.target.value ? [e.target.value] : []);
                confirm({ closeDropdown: false });
              }}
              onBlur={() => {
                confirm();
              }}
            ></Input>
          </>
        );
      },
      filterIcon: () => {
        return <SearchOutlined />;
      },
      onFilter: (value, record) => {
        return record.dob.toLowerCase().includes(value.toLowerCase());
      },
    },
    {
      title: "Class",
      dataIndex: "class",
      sorter: (a, b) => a.class > b.class,
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => {
        return (
          <>
            <Input
              autoFocus
              placeholder="Type text here"
              value={selectedKeys[0]}
              onChange={(e) => {
                setSelectedKeys(e.target.value ? [e.target.value] : []);
                confirm({ closeDropdown: false });
              }}
              onBlur={() => {
                confirm();
              }}
            ></Input>
          </>
        );
      },
      filterIcon: () => {
        return <SearchOutlined />;
      },
      onFilter: (value, record) => {
        return record.class.toLowerCase().includes(value.toLowerCase());
      },
    },
    {
      title: "Section",
      dataIndex: "section",
      sorter: (a, b) => a.section > b.section,
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => {
        return (
          <>
            <Input
              autoFocus
              placeholder="Type text here"
              value={selectedKeys[0]}
              onChange={(e) => {
                setSelectedKeys(e.target.value ? [e.target.value] : []);
                confirm({ closeDropdown: false });
              }}
              onBlur={() => {
                confirm();
              }}
            ></Input>
          </>
        );
      },
      filterIcon: () => {
        return <SearchOutlined />;
      },
      onFilter: (value, record) => {
        return record.section.toLowerCase().includes(value.toLowerCase());
      },
    },
    {
      title: "Roll",
      dataIndex: "roll",
      sorter: (a, b) => a.roll > b.roll,
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => {
        return (
          <>
            <Input
              autoFocus
              placeholder="Type text here"
              value={selectedKeys[0]}
              onChange={(e) => {
                setSelectedKeys(e.target.value ? [e.target.value] : []);
                confirm({ closeDropdown: false });
              }}
              onBlur={() => {
                confirm();
              }}
            ></Input>
          </>
        );
      },
      filterIcon: () => {
        return <SearchOutlined />;
      },
      onFilter: (value, record) => {
        return record.roll.toLowerCase().includes(value.toLowerCase());
      },
    },
    {
      title: "Joining Date",
      dataIndex: "joining_date",
      sorter: (a, b) => a.joining_date > b.joining_date,
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => {
        return (
          <>
            <Input
              autoFocus
              placeholder="Type text here"
              value={selectedKeys[0]}
              onChange={(e) => {
                setSelectedKeys(e.target.value ? [e.target.value] : []);
                confirm({ closeDropdown: false });
              }}
              onBlur={() => {
                confirm();
              }}
            ></Input>
          </>
        );
      },
      filterIcon: () => {
        return <SearchOutlined />;
      },
      onFilter: (value, record) => {
        return record.joining_date.toLowerCase().includes(value.toLowerCase());
      },
    },
    {
      title: "Action",
      key: "action",
      dataIndex: "action",
      fixed: "right",
    },
  ];

  return (
    <>
      {!studentEditing ? (
        <>
          <SimpleHeader name="All Students" />
          <Container className="mt--6" fluid>
            <Card className="mb-4">
              <CardHeader>
                <Button
                  color={`${view === 0 ? "warning" : "primary"}`}
                  type="button"
                  onClick={() => {
                    setView(0);
                  }}
                >
                  List View
                </Button>{" "}
                <Button
                  color={`${view === 1 ? "warning" : "primary"}`}
                  type="button"
                  onClick={() => {
                    setView(1);
                  }}
                >
                  Grid View
                </Button>
                <Button color="primary" type="button" onClick={handlePrint}>
                  Export to pdf
                </Button>
              </CardHeader>
              <CardBody>
                {view === 0 ? (
                  <>
                    {loading ? (
                      <div ref={componentRef}>
                        <AntTable
                          columns={columns}
                          data={studentList}
                          pagination={true}
                          exportFileName="StudentDetails"
                        />
                      </div>
                    ) : (
                      <Loader />
                    )}
                  </>
                ) : (
                  <>
                    <Container className="" fluid>
                      <Row className="card-wrapper">
                        {currentItems.map((student, index) => (
                          <Col md="4" key={index}>
                            <Card>
                              <CardHeader align="right">
                                <UncontrolledDropdown>
                                  <DropdownToggle
                                    className="btn-icon-only text-light"
                                    color=""
                                    role="button"
                                    size="sm"
                                  >
                                    <i className="fas fa-ellipsis-v" />
                                  </DropdownToggle>
                                  <DropdownMenu
                                    className="dropdown-menu-arrow"
                                    right
                                  >
                                    <DropdownItem
                                      href="#pablo"
                                      onClick={(e) => e.preventDefault()}
                                    >
                                      Edit
                                    </DropdownItem>
                                    <DropdownItem
                                      href="#pablo"
                                      onClick={(e) => e.preventDefault()}
                                    >
                                      Delete
                                    </DropdownItem>
                                  </DropdownMenu>
                                </UncontrolledDropdown>
                              </CardHeader>
                              <CardImg
                                alt="..."
                                src="https://colorlib.com/polygon/kiaalap/img/profile/1.jpg"
                                top
                                className="p-4"
                              />
                              <CardBody className="mt-0">
                                <Row>
                                  <Col align="center">
                                    <h4 className="mt-3 mb-1">SID</h4>
                                    <span className="text-md">
                                      {student.sid}
                                    </span>
                                  </Col>
                                </Row>
                                <Row>
                                  <Col align="center">
                                    <h4 className="mt-3 mb-1">First Name</h4>
                                    <span className="text-md">
                                      {student.first_name}
                                    </span>
                                  </Col>
                                  <Col align="center">
                                    <h4 className="mt-3 mb-1">Last Name</h4>
                                    <span className="text-md">
                                      {student.last_name}
                                    </span>
                                  </Col>
                                </Row>
                                <Row>
                                  <Col align="center">
                                    <h4 className="mt-3 mb-1">Class</h4>
                                    <span className="text-md">
                                      {student.class}
                                    </span>
                                  </Col>
                                  <Col align="center">
                                    <h4 className="mt-3 mb-1">Section</h4>
                                    <span className="text-md">
                                      {student.section}
                                    </span>
                                  </Col>
                                  <Col align="center">
                                    <h4 className="mt-3 mb-1">Roll</h4>
                                    <span className="text-md">
                                      {student.roll}
                                    </span>
                                  </Col>
                                </Row>
                                <Row>
                                  <Col align="center">
                                    <Button className="mt-3">
                                      <Link
                                        to="/admin/student-profile"
                                        className="mb-1"
                                      >
                                        Read More
                                      </Link>
                                    </Button>
                                  </Col>
                                </Row>
                              </CardBody>
                            </Card>
                          </Col>
                        ))}
                      </Row>
                    </Container>
                    <Row>
                      <Col className="d-flex justify-content-around mt-4">
                        <ReactPaginate
                          nextLabel=">"
                          onPageChange={handlePageClick}
                          pageRangeDisplayed={3}
                          marginPagesDisplayed={2}
                          pageCount={pageCount}
                          previousLabel="<"
                          pageClassName="page-item"
                          pageLinkClassName="page-link"
                          previousClassName="page-item"
                          previousLinkClassName="page-link"
                          nextClassName="page-item"
                          nextLinkClassName="page-link"
                          breakLabel="..."
                          breakClassName="page-item"
                          breakLinkClassName="page-link"
                          containerClassName="pagination"
                          activeClassName="active"
                          renderOnZeroPageCount={null}
                        />
                      </Col>
                    </Row>
                  </>
                )}
              </CardBody>
            </Card>
          </Container>
        </>
      ) : (
        <UpdateStudent studentDetails={editingData} />
      )}
    </>
  );
};

export default AllStudents;
