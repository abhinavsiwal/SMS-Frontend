import React from "react";

import {
  Container,
  Card,
  CardBody,
  Input,
  Button,
  CardHeader,
} from "reactstrap";

// core components
import SimpleHeader from "components/Headers/SimpleHeader.js";
import AntTable from "../tables/AntTable";

import { SearchOutlined } from "@ant-design/icons";
import { isAuthenticated } from "api/auth";
import { Popconfirm } from "antd";

function ViewCanteen() {
  const [viewCanteen, setViewCanteen] = React.useState([]);
  const columns = [
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
      title: "Prize",
      dataIndex: "prize",
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

  // const data = [];
  // for (let i = 1; i < 20; i++) {
  // data.push({
  //   key: "2",
  //   items: "Aloo",
  //   description: "addfdfdddffdfd",
  //   image: "sun.jpg",
  //   prize: "15",
  //   publish: "Yes",
  //   time: "11:00AM",

  //   key: i,
  //   hash: `${i}`,
  //   name: "Ajay",
  // });
  // }

  React.useEffect(() => {
    const fetchStudents = async () => {
      const { user, token } = isAuthenticated();
      const res = "a"; // Call your function here
      console.log(res);
      const data = [];
      for (let i = 0; i < res.length; i++) {
        data.push({
          key: i,
          items: res[i].items,
          description: res[i].description,
          image: res[i].image,
          prize: res[i].prize,
          publish: res[i].publish,
          time: res[i].time,
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
    };
    fetchStudents();
  }, []);

  return (
    <>
      <SimpleHeader name="Canteen" parentName="View Canteen" />
      <Container className="mt--6 shadow-lg" fluid>
        <Card>
          <CardHeader>
            <h3>View Canteen</h3>
          </CardHeader>
          <CardBody>
            <AntTable
              columns={columns}
              data={viewCanteen}
              pagination={true}
              exportFileName="StudentDetails"
            />
          </CardBody>
        </Card>
      </Container>
    </>
  );
}

export default ViewCanteen;
