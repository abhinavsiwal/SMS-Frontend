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

//Ant Table
import { SearchOutlined } from "@ant-design/icons";
import { Popconfirm } from "antd";

//Loader
import Loader from "components/Loader/Loader";

import { isAuthenticated } from "api/auth";

function ViewCanteen() {
  const [viewCanteen, setViewCanteen] = React.useState([]);

  const [loading, setLoading] = React.useState(false);

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

  React.useEffect(() => {
    const fetchStaff = async () => {
      const { user, token } = isAuthenticated();
      const res = "a"; // Call your function here
      console.log(res);
      const data = [];
      for (let i = 0; i < res.length; i++) {
        data.push({
          key: i,
          s_no: [i + 1],
          canteen_name: res[i].canteen_name,
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
      setLoading(true);
    };
    fetchStaff();
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
