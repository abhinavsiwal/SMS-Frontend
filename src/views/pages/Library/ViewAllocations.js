import React, { useEffect, useState, useRef } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Form,
  Input,
  Button,
  Modal,
  ModalFooter,
  ModalBody,
  CardHeader,
} from "reactstrap";
import SimpleHeader from "components/Headers/SimpleHeader";
import { isAuthenticated } from "api/auth";
import { ToastContainer, toast } from "react-toastify";
import { SearchOutlined } from "@ant-design/icons";
import Loader from "components/Loader/Loader";
import { Popconfirm } from "antd";
import AntTable from "../tables/AntTable";
import { getAllHistory } from "../../../api/libraryManagement";
const ViewAllocations = () => {
  const { user } = isAuthenticated();
  const [type, setType] = useState("empty");
  const [typeValue, setTypeValue] = useState(0);
  const [loading, setLoading] = useState(false);
  const [historyData, setHistoryData] = useState([]);
  const [typeFilter, setTypeFilter] = useState([]);
  const [view, setView] = useState(1);
  const [studentHistory, setStudentHistory] = useState([]);
  const [staffHistory, setStaffHistory] = useState([]);
  useEffect(() => {
    getAllHistoryHandler();
  }, []);

  let columns1 = [
    {
      title: "Student Name",
      dataIndex: "student_name",
      width: 150,
      sorter: (a, b) => a.student_name > b.student_name,
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
        return record.student_name.toLowerCase().includes(value.toLowerCase());
      },
    },
    {
      title: "Student SID",
      dataIndex: "student_sid",
      width: 150,
      sorter: (a, b) => a.student_sid > b.student_sid,
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
        return record.student_sid.toLowerCase().includes(value.toLowerCase());
      },
    },
    {
      title: "Roll No",
      dataIndex: "student_roll",
      width: 150,
      sorter: (a, b) => a.student_roll > b.student_roll,
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
        return record.student_roll.toLowerCase().includes(value.toLowerCase());
      },
    },
    {
      title: "Class",
      dataIndex: "student_class",
      width: 150,
      sorter: (a, b) => a.student_class > b.student_class,
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
        return record.student_class.toLowerCase().includes(value.toLowerCase());
      },
    },
    {
      title: "Section",
      dataIndex: "student_section",
      width: 150,
      sorter: (a, b) => a.student_section > b.student_section,
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
        return record.student_section
          .toLowerCase()
          .includes(value.toLowerCase());
      },
    },
    {
      title: "Book Name",
      dataIndex: "book_name",
      width: 150,
      sorter: (a, b) => a.book_name > b.book_name,
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
        return record.book_name.toLowerCase().includes(value.toLowerCase());
      },
    },
    {
      title: "Book Id",
      dataIndex: "book_id",
      width: 150,
      sorter: (a, b) => a.book_id > b.book_id,
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
        return record.book_id.toLowerCase().includes(value.toLowerCase());
      },
    },
    {
      title: "Allocation Date",
      dataIndex: "allocation_date",
      width: 150,
      sorter: (a, b) => a.allocation_date > b.allocation_date,
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
        return record.allocation_date
          .toLowerCase()
          .includes(value.toLowerCase());
      },
    },
    {
      title: "Allocated By",
      dataIndex: "allocated_by",
      width: 150,
      sorter: (a, b) => a.allocated_by > b.allocated_by,
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
        return record.allocated_by.toLowerCase().includes(value.toLowerCase());
      },
    },
  
  ];
  let columns2 = [
    {
      title: "Student Name",
      dataIndex: "student_name",
      width: 150,
      sorter: (a, b) => a.student_name > b.student_name,
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
        return record.student_name.toLowerCase().includes(value.toLowerCase());
      },
    },
    {
      title: "Student SID",
      dataIndex: "student_sid",
      width: 150,
      sorter: (a, b) => a.student_sid > b.student_sid,
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
        return record.student_sid.toLowerCase().includes(value.toLowerCase());
      },
    },
    {
      title: "Roll No",
      dataIndex: "student_roll",
      width: 150,
      sorter: (a, b) => a.student_roll > b.student_roll,
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
        return record.student_roll.toLowerCase().includes(value.toLowerCase());
      },
    },
    {
      title: "Class",
      dataIndex: "student_class",
      width: 150,
      sorter: (a, b) => a.student_class > b.student_class,
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
        return record.student_class.toLowerCase().includes(value.toLowerCase());
      },
    },
    {
      title: "Section",
      dataIndex: "student_section",
      width: 150,
      sorter: (a, b) => a.student_section > b.student_section,
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
        return record.student_section
          .toLowerCase()
          .includes(value.toLowerCase());
      },
    },
    {
      title: "Book Name",
      dataIndex: "book_name",
      width: 150,
      sorter: (a, b) => a.book_name > b.book_name,
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
        return record.book_name.toLowerCase().includes(value.toLowerCase());
      },
    },
    {
      title: "Book Id",
      dataIndex: "book_id",
      width: 150,
      sorter: (a, b) => a.book_id > b.book_id,
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
        return record.book_id.toLowerCase().includes(value.toLowerCase());
      },
    },
    {
      title: "Collection Date",
      dataIndex: "collection_date",
      width: 150,
      sorter: (a, b) => a.collection_date > b.collection_date,
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
        return record.collection_date
          .toLowerCase()
          .includes(value.toLowerCase());
      },
    },
    {
      title: "Collected By",
      dataIndex: "collected_by",
      width: 150,
      sorter: (a, b) => a.collected_by > b.collected_by,
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
        return record.collected_by.toLowerCase().includes(value.toLowerCase());
      },
    },
  
  ];
  let columns3 = [
    {
      title: "Staff Name",
      dataIndex: "staff_name",
      width: 150,
      sorter: (a, b) => a.staff_name > b.staff_name,
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
        return record.student_name.toLowerCase().includes(value.toLowerCase());
      },
    },
    {
      title: "Staff SID",
      dataIndex: "staff_sid",
      width: 150,
      sorter: (a, b) => a.staff_sid > b.staff_sid,
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
        return record.staff_sid.toLowerCase().includes(value.toLowerCase());
      },
    },

    {
      title: "Department",
      dataIndex: "department",
      width: 150,
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
      title: "Book Name",
      dataIndex: "book_name",
      width: 150,
      sorter: (a, b) => a.book_name > b.book_name,
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
        return record.book_name.toLowerCase().includes(value.toLowerCase());
      },
    },
    {
      title: "Book Id",
      dataIndex: "book_id",
      width: 150,
      sorter: (a, b) => a.book_id > b.book_id,
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
        return record.book_id.toLowerCase().includes(value.toLowerCase());
      },
    },
    {
      title: "Allocation Date",
      dataIndex: "allocation_date",
      width: 150,
      sorter: (a, b) => a.allocation_date > b.allocation_date,
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
        return record.allocation_date
          .toLowerCase()
          .includes(value.toLowerCase());
      },
    },
    {
      title: "Allocated By",
      dataIndex: "allocated_by",
      width: 150,
      sorter: (a, b) => a.allocated_by > b.allocated_by,
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
        return record.allocated_by.toLowerCase().includes(value.toLowerCase());
      },
    },
  
  ];
  let columns4 = [
    {
      title: "Staff Name",
      dataIndex: "staff_name",
      width: 150,
      sorter: (a, b) => a.staff_name > b.staff_name,
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
        return record.student_name.toLowerCase().includes(value.toLowerCase());
      },
    },
    {
      title: "Staff SID",
      dataIndex: "staff_sid",
      width: 150,
      sorter: (a, b) => a.staff_sid > b.staff_sid,
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
        return record.staff_sid.toLowerCase().includes(value.toLowerCase());
      },
    },

    {
      title: "Department",
      dataIndex: "department",
      width: 150,
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
      title: "Book Name",
      dataIndex: "book_name",
      width: 150,
      sorter: (a, b) => a.book_name > b.book_name,
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
        return record.book_name.toLowerCase().includes(value.toLowerCase());
      },
    },
    {
      title: "Book Id",
      dataIndex: "book_id",
      width: 150,
      sorter: (a, b) => a.book_id > b.book_id,
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
        return record.book_id.toLowerCase().includes(value.toLowerCase());
      },
    },
    {
      title: "Collection Date",
      dataIndex: "collection_date",
      width: 150,
      sorter: (a, b) => a.allocation_date > b.allocation_date,
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
        return record.collection_date
          .toLowerCase()
          .includes(value.toLowerCase());
      },
    },
    {
      title: "Collected By",
      dataIndex: "collected_by",
      width: 150,
      sorter: (a, b) => a.collected_by > b.collected_by,
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
        return record.collected_by.toLowerCase().includes(value.toLowerCase());
      },
    },
  
  ];

  const getAllHistoryHandler = async () => {
    try {
      setLoading(true);
      const data = await getAllHistory(user.school, user._id);
      console.log(data);

      setHistoryData(data);

      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
      toast.error("Error fetching Allocations");
    }
  };

  useEffect(() => {
    console.log("here");
    if (type === "empty") {
      setTypeFilter([]);
      return;
    } else if (type === "allocation") {
      setTypeValue(1);

      let filteredData = historyData.filter(
        (data) => data.status === "Allocated"
      );
      console.log(filteredData);
      setTypeFilter(filteredData);
    } else if (type === "return") {
      setTypeValue(2);
      let filteredData = historyData.filter((data) => data.status === "Return");
      setTypeFilter(filteredData);
      console.log(filteredData);
    }
  }, [type]);

  useEffect(() => {
    console.log("here");
    if (view === 0) {
      return;
    } else if (view === 1) {
      console.log("@@@@@");
      let tableData = [];
      console.log(typeFilter);
      typeFilter.forEach((data, index) => {
        console.log(data);
        if (data.student && data.status === "Allocated") {
          tableData.push({
            key: index,
            student_name: data.student && data.student.firstname,
            student_sid: data.student && data.student.SID,
            student_roll: data.student && data.student.roll_number,
            class: data.student && data.student.class,
            section: data.student && data.student.section,
            book_name: data.book && data.book.name,
            book_id: data.book && data.bookID,
            allocation_date: data.allocationDate,
            allocated_by: data.allocatedBy,
      
          });
        } else if (data.student && data.status === "Return") {
          tableData.push({
            key: index,
            student_name: data.student && data.student.firstname,
            student_sid: data.student && data.student.SID,
            student_roll: data.student && data.student.roll_number,
            class: data.student && data.student.class,
            section: data.student && data.student.section,
            book_name: data.book && data.book.name,
            book_id: data.book && data.bookID,
            collection_date: data.collectionDate,
            collected_by: data.collectedBy,
          });
        }
      });
      console.log(tableData);
      setStudentHistory(tableData);
    } else if (view === 2) {
      let tableData = [];

      typeFilter.forEach((data, index) => {
        if (data.staff && data.status === "Return") {
          tableData.push({
            key: index,
            staff_name: data.staff && data.staff.firstname,
            staff_sid: data.staff && data.staff.SID,
            department: data.staff && data.staff.class,
            book_name: data.book && data.book.name,
            book_id: data.book && data.bookID,
            allocation_date: data.allocationDate,
            allocated_by: data.allocatedBy,
          });
        } else if (data.staff && data.status === "Allocated") {
          tableData.push({
            key: index,
            staff_name: data.staff && data.staff.firstname,
            staff_sid: data.staff && data.staff.SID,
            department: data.staff && data.staff.class,
            book_name: data.book && data.book.name,
            book_id: data.book && data.bookID,
            collection_date: data.collectionDate,
            collected_by: data.collectedBy,
          });
        }
      });
      setStaffHistory(tableData);
    }
  }, [view, type, typeValue]);

  return (
    <>
      <SimpleHeader name="Add Section" parentName="Class Management" />
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <Container className="mt--6" fluid>
        <Row>
          <Col>
            <div className="card-wrapper">
              <Card>
                <CardHeader>
                  <Row>
                    <Col md="3">
                      <Input
                        id="example4cols2Input"
                        type="select"
                        required
                        onChange={(e) => setType(e.target.value)}
                        value={type}
                      >
                        <option value="empty">Select Type</option>
                        <option value="allocation">Allocations</option>
                        <option value="return">Return</option>
                      </Input>
                    </Col>
                  </Row>
                  <Row className="mt-2">
                    <Col>
                      <Button
                        color={`${view === 1 ? "warning" : "primary"}`}
                        type="button"
                        onClick={() => {
                          setView(1);
                        }}
                      >
                        Student
                      </Button>{" "}
                      <Button
                        color={`${view === 2 ? "warning" : "primary"}`}
                        type="button"
                        onClick={() => {
                          setView(2);
                        }}
                      >
                        Staff
                      </Button>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                  {loading ? (
                    <Loader />
                  ) : (
                    <>
                      {typeValue === 1 && (
                        <>
                          {view === 1 && (
                            <div style={{ overflowX: "auto" }}>
                              <AntTable
                                columns={columns1}
                                data={studentHistory}
                                pagination={true}
                                exportFileName="LibraryDetails"
                              />
                            </div>
                          )}
                          {view === 2 && (
                            <div style={{ overflowX: "auto" }}>
                              <AntTable
                                columns={columns3}
                                data={staffHistory}
                                pagination={true}
                                exportFileName="LibraryDetails"
                              />
                            </div>
                          )}
                        </>
                      )}
                      {typeValue === 2 && (
                        <>
                          {view === 1 && (
                            <div style={{ overflowX: "auto" }}>
                              <AntTable
                                columns={columns2}
                                data={studentHistory}
                                pagination={true}
                                exportFileName="LibraryDetails"
                              />
                            </div>
                          )}
                          {view === 2 && (
                            <div style={{ overflowX: "auto" }}>
                              <AntTable
                                columns={columns4}
                                data={staffHistory}
                                pagination={true}
                                exportFileName="LibraryDetails"
                              />
                            </div>
                          )}
                        </>
                      )}
                    </>
                  )}
                </CardBody>
              </Card>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ViewAllocations;
