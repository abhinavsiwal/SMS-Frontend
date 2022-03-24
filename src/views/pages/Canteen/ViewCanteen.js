import React, { useEffect, useState } from "react";

import {
  Container,
  Card,
  CardBody,
  Input,
  Button,
  CardHeader,
  Col,
  Label,
} from "reactstrap";

// core components
import SimpleHeader from "components/Headers/SimpleHeader.js";
import AntTable from "../tables/AntTable";

//Ant Table
import { SearchOutlined } from "@ant-design/icons";
import { Popconfirm } from "antd";
import { canteenAdd, allCanteens } from "../../../api/canteen/index";
//Loader
import Loader from "components/Loader/Loader";

import { isAuthenticated } from "api/auth";

function ViewCanteen() {
  const [viewCanteen, setViewCanteen] = React.useState([]);
  const [allCanteen, setAllCanteen] = useState([]);
  const [loading, setLoading] = React.useState(false);
  const [selectedCanteenId, setSelectedCanteenId] = useState();

  const columns = [
    {
      title: "S No.",
      dataIndex: "s_no",
    },
    {
      title: "Canteen Name",
      dataIndex: "canteen_name",
      sorter: (a, b) => a.canteen_name > b.canteen_name,
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
        return record.canteen_name.toLowerCase().includes(value.toLowerCase());
      },
    },
    {
      title: "Items",
      dataIndex: "items",
      sorter: (a, b) => a.items > b.items,
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
        return record.items.toLowerCase().includes(value.toLowerCase());
      },
    },
    {
      title: "Description",
      dataIndex: "description",
      sorter: (a, b) => a.description > b.description,
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
        return record.description.toLowerCase().includes(value.toLowerCase());
      },
    },
    {
      title: "Image",
      dataIndex: "image",
      sorter: (a, b) => a.image > b.image,
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
        return record.image.toLowerCase().includes(value.toLowerCase());
      },
    },
    {
      title: "Price",
      dataIndex: "price",
      sorter: (a, b) => a.prize > b.prize,
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
        return record.prize.toLowerCase().includes(value.toLowerCase());
      },
    },
    {
      title: "Publish",
      dataIndex: "publish",
      sorter: (a, b) => a.publish > b.publish,
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
        return record.publish.toLowerCase().includes(value.toLowerCase());
      },
    },
    {
      title: "Time",
      dataIndex: "time",
      sorter: (a, b) => a.time > b.time,
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
        return record.time.toLowerCase().includes(value.toLowerCase());
      },
    },

    {
      title: "Action",
      key: "action",
      dataIndex: "action",
      fixed: "right",
    },
  ];

  const { user, token } = isAuthenticated();

  let permissions = [];
  useEffect(() => {
    if (user.role["Canteen Management"]) {
      permissions = user.role["Canteen Management"];
      console.log(permissions);
    }
  }, []);

  React.useEffect(() => {
    fetchStaff();

    // tableData();
  }, []);
  const fetchStaff = async () => {
    const res = await allCanteens(user._id, user.school); // Call your function here
    console.log(res);
    setAllCanteen(res);
    setSelectedCanteenId(res[0]._id);
    let selectedCanteen = allCanteen.find(
      (canteen) => canteen._id === selectedCanteenId
    );
    let data = [];

    for (let i = 0; i < selectedCanteen.menu.length; i++) {
      // if(selectedCanteen.menu.length===0){
      //   return
      // }

      data.push({
        key: i,
        s_no: [i + 1],
        canteen_name: selectedCanteen.menu[i].name,
        items: selectedCanteen.menu[i].items,
        description: selectedCanteen.menu[i].description,
        image: selectedCanteen.menu[i].image,
        price: selectedCanteen.menu[i].price,
        publish: selectedCanteen.menu[i].publish,
        time: selectedCanteen.menu[i].time,
        action: (
          <h5 key={i + 1} className="mb-0">
            {permissions && permissions.includes("edit") && (
              <Button
                className="btn-sm pull-right"
                color="primary"
                type="button"
                key={"edit" + i + 1}
              >
                <i className="fas fa-user-edit" />
              </Button>
            )}
            {permissions && permissions.includes("delete") && (
              <Button
                className="btn-sm pull-right"
                color="danger"
                type="button"
                key={"delete" + i + 1}
              >
                <Popconfirm
                  title="Sure to delete?"
                  // onConfirm={() => handleDelete(res[i]._id)}
                >
                  <i className="fas fa-trash" />
                </Popconfirm>
              </Button>
            )}
          </h5>
        ),
      });
      setViewCanteen(data);
      setLoading(true);
    }
  };
  // useEffect(() => {

  // }, [selectedCanteenId])

  const tableData = () => {
    console.log(selectedCanteenId);
    console.log(allCanteen);
    let selectedCanteen = allCanteen.find(
      (canteen) => canteen._id === selectedCanteenId
    );
    console.log(selectedCanteen);
    const data = [];
    if (selectedCanteen.menu) {
      for (let i = 0; i < selectedCanteen.menu.length; i++) {
        // if(selectedCanteen.menu.length===0){
        //   return
        // }
        data.push({
          key: i,
          s_no: [i + 1],
          canteen_name: selectedCanteen.menu[i].name,
          items: selectedCanteen.menu[i].items,
          description: selectedCanteen.menu[i].description,
          image: selectedCanteen.menu[i].image,
          price: selectedCanteen.menu[i].price,
          publish: selectedCanteen.menu[i].publish,
          time: selectedCanteen.menu[i].time,
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
                <Popconfirm
                  title="Sure to delete?"
                  // onConfirm={() => handleDelete(res[i]._id)}
                >
                  <i className="fas fa-trash" />
                </Popconfirm>
              </Button>
            </h5>
          ),
        });
      }
      setViewCanteen(data);
      setLoading(true);
    }
  };

  return (
    <>
      <SimpleHeader name="Canteen" parentName="View Canteen" />
      <Container className="mt--6 shadow-lg" fluid>
        <Card>
          <CardHeader>
            <h3>View Canteen</h3>

            <Input
              id="exampleFormControlSelect3"
              type="select"
              onChange={(e) => setSelectedCanteenId(e.target.value)}
              value={selectedCanteenId}
              required
              style={{ maxWidth: "10rem" }}
            >
              {allCanteen.map((canteen) => {
                return (
                  <option key={canteen._id} value={canteen._id} selected>
                    {canteen.name}
                  </option>
                );
              })}
            </Input>
          </CardHeader>
          <CardBody>
            {loading ? (
              <AntTable
                columns={columns}
                data={viewCanteen}
                pagination={true}
                exportFileName="StudentDetails"
              />
            ) : (
              <Loader />
            )}
          </CardBody>
        </Card>
      </Container>
    </>
  );
}

export default ViewCanteen;
