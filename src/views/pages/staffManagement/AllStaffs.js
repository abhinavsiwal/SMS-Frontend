import React, { useEffect, useState } from "react";
import { isAuthenticated } from "api/auth";
import { allStaffs } from "api/staff";

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

import ReactPaginate from "react-paginate";

const AllStaffs = () => {
  // 0 -> List, 1-> Grid
  const [view, setView] = useState(0);
  const [staffList, setStaffList] = useState([]);
  // Pagination
  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 9;
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % staffList.length;
    setItemOffset(newOffset);
  };
  useEffect(() => {
    const fetchStaffs = async () => {
      const endOffset = itemOffset + itemsPerPage;
      const { user, token } = isAuthenticated();
      const payload = { school: user.school };
      const res = await allStaffs(user._id, token, JSON.stringify(payload));
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
          assign_role: res[i].assign_role,
          job: res[i].job,
          salary: res[i].salary,
          department: res[i].department,
          joining_date: res[i].joining_date.split("T")[0].toString(),
          action: (
            <h5 key={i + 1} className="mb-0">
              <Button
                className="btn-sm pull-right"
                color="primary"
                type="button"
                key={"edit" + i + 1}
              >
                <i className="fas fa-user-edit" />
              </Button>
              <Button
                className="btn-sm pull-right"
                color="danger"
                type="button"
                key={"delete" + i + 1}
              >
                <i className="fas fa-trash" />
              </Button>
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
      setStaffList(data);
      setCurrentItems(data.slice(itemOffset, endOffset));
      setPageCount(Math.ceil(data.length / itemsPerPage));
    };
    fetchStaffs();
  }, [itemOffset, itemsPerPage]);

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
      title: "Assign Role",
      dataIndex: "assign_role",
      sorter: (a, b) => a.assign_role > b.assign_role,
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
        return record.assign_role.toLowerCase().includes(value.toLowerCase());
      },
    },
    {
      title: "Job",
      dataIndex: "job",
      sorter: (a, b) => a.job > b.job,
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
        return record.job.toLowerCase().includes(value.toLowerCase());
      },
    },
    {
      title: "Salary",
      dataIndex: "salary",
      sorter: (a, b) => a.salary > b.salary,
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
        return record.salary.toLowerCase().includes(value.toLowerCase());
      },
    },
    {
      title: "Department",
      dataIndex: "department",
      sorter: (a, b) => a.department > b.department,
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
        return record.department.toLowerCase().includes(value.toLowerCase());
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
      <SimpleHeader name="All Staffs" />
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
          </CardHeader>
          <CardBody>
            {view === 0 ? (
              <>
                <AntTable
                  columns={columns}
                  data={staffList}
                  pagination={true}
                  exportFileName="StaffDetails"
                />
              </>
            ) : (
              <>
                <Container className="" fluid>
                  <Row className="card-wrapper">
                    {currentItems.map((staff, index) => (
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
                                <span className="text-md">{staff.sid}</span>
                              </Col>
                            </Row>
                            <Row>
                              <Col align="center">
                                <h4 className="mt-3 mb-1">First Name</h4>
                                <span className="text-md">
                                  {staff.first_name}
                                </span>
                              </Col>
                              <Col align="center">
                                <h4 className="mt-3 mb-1">Last Name</h4>
                                <span className="text-md">
                                  {staff.last_name}
                                </span>
                              </Col>
                            </Row>
                            <Row>
                              <Col align="center">
                                <h4 className="mt-3 mb-1">Assign Role</h4>
                                <span className="text-md">
                                  {staff.assign_role}
                                </span>
                              </Col>
                              <Col align="center">
                                <h4 className="mt-3 mb-1">Department</h4>
                                <span className="text-md">
                                  {staff.department}
                                </span>
                              </Col>
                            </Row>
                            <Row>
                              <Col align="center">
                                <Button className="mt-3">
                                  <Link
                                    to="/admin/staff-profile"
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
  );
};

export default AllStaffs;
