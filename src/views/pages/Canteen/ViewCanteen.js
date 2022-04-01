import React, { useEffect, useState, useRef } from "react";

import {
  Container,
  Card,
  CardBody,
  Input,
  Button,
  CardHeader,
} from "reactstrap";
import { useReactToPrint } from "react-to-print";
// core components
import SimpleHeader from "components/Headers/SimpleHeader.js";
import AntTable from "../tables/AntTable";

//Ant Table
import { SearchOutlined } from "@ant-design/icons";
import { Popconfirm } from "antd";
import { canteenAdd, allCanteens, canteenDelete } from "../../../api/canteen/index";
//Loader
import Loader from "components/Loader/Loader";

import { isAuthenticated } from "api/auth";
import { toast } from "react-toastify";

function ViewCanteen() {
  const [viewCanteen, setViewCanteen] = React.useState([]);
  const [allCanteen, setAllCanteen] = useState([]);
  const [loading, setLoading] = React.useState(false);
  const [selectedCanteenId, setSelectedCanteenId] = useState();

const [checked, setChecked] = useState(false)

  const columns = [
    {
      title: "S No.",
      dataIndex: "s_no",
    },
    {
      title: "Item Name",
      dataIndex: "item_name",
      sorter: (a, b) => a.item_name > b.item_name,
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
      title: "Start Time",
      dataIndex: "start_time",
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

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  let permissions = [];
  useEffect(() => {
    if (user.role["Canteen Management"]) {
      permissions = user.role["Canteen Management"];
      console.log(permissions);
    }
  }, []);
  
  React.useEffect(() => {
    fetchStaff();
    
  }, [checked]);
  const fetchStaff = async () => {
    const res = await allCanteens(user._id, user.school); // Call your function here
    console.log(res);
    await setAllCanteen(res);
   await setSelectedCanteenId(res[0]._id);
  

    setLoading(true);
  };
  useEffect(() => {
    if(selectedCanteenId){
      tableData();
    }
  }, [selectedCanteenId]);

  const tableData = async() => {
    console.log(selectedCanteenId);
    console.log(allCanteen);
    let selectedCanteen = await allCanteen.find(
      (canteen) => canteen._id === selectedCanteenId
    );
    console.log(selectedCanteen);
    const data = [];
    if (selectedCanteen.menu.length === 0) {
      return;
    }
    for (let i = 0; i < selectedCanteen.menu.length; i++) {
      data.push({
        key: i,
        s_no: [i + 1],
        item_name: selectedCanteen.menu[i].item,
        start_time:selectedCanteen.menu[i].start_time,
        end_time:selectedCanteen.menu[i].end_time,
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
  };

const deleteCanteenHandler=async()=>{
  try {
    const data = await canteenDelete(selectedCanteenId,user._id);
    console.log(data);
    setChecked(!checked)
    toast.success("Canteen Deleted Successfully")
  } catch (err) {
    console.log(err);
    toast.error("Canteen Not Deleted")
  }
}


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
            <Button color="danger" className="mt-3" onClick={deleteCanteenHandler} >Delete Canteen</Button>
          </CardHeader>
          <CardBody>
            <Button color="primary" className="mb-2" onClick={handlePrint}>
              Print
            </Button>
            {loading ? (
              <div ref={componentRef}>
                <AntTable
                  columns={columns}
                  data={viewCanteen}
                  pagination={true}
                  exportFileName="StudentDetails"
                />
              </div>
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
