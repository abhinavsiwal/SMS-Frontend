import React,{useState} from "react";

import {
  Container,
  Card,
  CardBody,
  Input,
  Button,
  CardHeader,
  Modal,
  ModalBody,
  Table,
} from "reactstrap";

// core components
import SimpleHeader from "components/Headers/SimpleHeader.js";
import AntTable from "../tables/AntTable";

//Ant Table
import { DeleteRowOutlined, SearchOutlined } from "@ant-design/icons";
import { Popconfirm } from "antd";

//Loader
import Loader from "components/Loader/Loader";

import { isAuthenticated } from "api/auth";
import {routeAdd,routesAll,deleteRoute} from 'api/transportation'


function ViewRoute() {
  const [viewRoute, setViewRoute] = React.useState([]);
  const [modalState, setModalState] = React.useState(false);
  const [modalSupport, setModalSupport] = React.useState();
  const [loading, setLoading] = React.useState(false);
  const [allRoutes, setAllRoutes] = useState([]);
  const [checked, setChecked] = useState(false);

  const openModal = (support) => {
    setModalSupport(support);
    setModalState(true);
  };

  const columns = [
    {
      title: "S No.",
      dataIndex: "s_no",
    },
    {
      title: "Route Name",
      dataIndex: "route_name",
      sorter: (a, b) => a.route_name > b.route_name,
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
        return record.route_name.toLowerCase().includes(value.toLowerCase());
      },
    },
    {
      title: "Bus No.",
      dataIndex: "bus_no",
      sorter: (a, b) => a.bus_no > b.bus_no,
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
        return record.bus_no.toLowerCase().includes(value.toLowerCase());
      },
    },
    {
      title: "Staff Members",
      dataIndex: "staff_members",
      sorter: (a, b) => a.staff_members > b.staff_members,
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
        return record.staff_members.toLowerCase().includes(value.toLowerCase());
      },
    },

    {
      title: "Start Time",
      dataIndex: "start_time",
      sorter: (a, b) => a.start_time > b.start_time,
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
        return record.start_time.toLowerCase().includes(value.toLowerCase());
      },
    },

    {
      title: "End Time",
      dataIndex: "end_time",
      sorter: (a, b) => a.end_time > b.end_time,
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
        return record.end_time.toLowerCase().includes(value.toLowerCase());
      },
    },

    {
      title: "Action",
      key: "action",
      dataIndex: "action",
      fixed: "right",
    },
  ];

  React.useEffect(() => {
   
    fetchRoutes();
  }, [checked]);


  const { user } = isAuthenticated();

  const fetchRoutes = async () => {
    let res = await routesAll(user._id, user.school);
    console.log(res);
    const data = [];
    for (let i = 0; i < res.length; i++) {
      data.push({
        key: i,
        s_no: i + 1,
        route_name: res[i].name,
        bus_no: res[i].bus_number,
        staff_members: res[i].staff.firstName,
        start_time: res[i].start,
        end_time: res[i].end,
        action: (
          <>
            <h5 key={i + 1} className="mb-0">
              <span>{res[i].startTime}</span>
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
                <Popconfirm
                  title="Sure to delete?"
                  onConfirm={() => handleDelete(res[i]._id)}
                >
                  <i className="fas fa-trash" />
                </Popconfirm>
              </Button>
              <Button
                className="btn-sm pull-right"
                color="primary"
                type="button"
                key={"view" + i + 1}
                onClick={() => {
                  openModal(res[i]);
                }}
              >
                View More
              </Button>
            </h5>
          </>
        ),
      });
    }
    setViewRoute(data);
    setLoading(true);
  };


const handleDelete=async(routeId)=>{
  try {
    const data = await deleteRoute(user._id,routeId)
    console.log(data);
    setChecked(!checked);
  } catch (err) {
    console.log(err);
  }
}


  return (
    <>
      <SimpleHeader name="Transport" parentName="View Route" />
      <Container className="mt--6 shadow-lg" fluid>
        <Card>
          <CardHeader>
            <h3>View Route</h3>
          </CardHeader>
          <CardBody>
            {loading ? (
              <AntTable
                columns={columns}
                data={viewRoute}
                pagination={true}
                exportFileName="StudentDetails"
              />
            ) : (
              <Loader />
            )}
          </CardBody>
        </Card>

        <Modal
          className="modal-dialog-centered"
          isOpen={modalState}
          toggle={() => setModalState(false)}
        >
          <div className="modal-header">
            <h6 className="modal-title" id="modal-title-default">
              Route Details
            </h6>
            <button
              aria-label="Close"
              className="close"
              data-dismiss="modal"
              type="button"
              onClick={() => setModalState(false)}
            >
              <span aria-hidden={true}>×</span>
            </button>
          </div>
          <ModalBody>
            <Table bordered responsive>
              <thead>
                <tr>
                  <th>S No.</th>
                  <th>Place Name</th>
                  <th>pickup Time</th>
                  <th>DropTime</th>
                </tr>
              </thead>
              {modalSupport.stops !== null ? (
                    <>
                      {modalSupport.stops.map((stop, index) => {
                        return (
                          <tbody>
                            <tr key={index}>
                              <td>{index + 1}</td>
                              <td>{stop.stopName}</td>
                              <td>{stop.pickupTime}</td>
                              <td>{stop.dropTime}</td>
                            </tr>
                          </tbody>
                        );
                      })}
                    </>
                  ) : (
                    <h3>No Data</h3>
                  )}
            </Table>
          </ModalBody>
        </Modal>
      </Container>
    </>
  );
}

export default ViewRoute;
