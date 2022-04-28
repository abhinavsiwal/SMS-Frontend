import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Form,
  Label,
  Input,
  Button,
  CardHeader,
} from "reactstrap";
import { allStudents, filterStudent } from "api/student";
import Loader from "components/Loader/Loader";
import { isAuthenticated } from "api/auth";
import { getAllBooks } from "../../../api/libraryManagement";
import { allStaffs } from "api/staff";
import "./style.css";
import { toast, ToastContainer } from "react-toastify";
import { allClass } from "api/class";
const StudentReturn = () => {
  const { user, token } = isAuthenticated();
  const [returnData, setReturnData] = useState({
    class: "",
    section: "",
    student: "",
    bookName: "",
    bookId: "",
    collectionDate: "",
    collectedBy: "",
  });
  const [loading, setLoading] = useState(false);
  const [classList, setClassList] = useState([]);
  const [selectedClass, setSelectedClass] = useState({});
  const [studentLoading, setStudentLoading] = useState(false);
  const [students, setStudents] = useState([]);
  const [allStaff, setAllStaff] = useState([]);
  const [allBooks, setAllBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState({});

  const getAllClasses = async () => {
    try {
      setLoading(true);
      const classess = await allClass(user._id, user.school, token);
      console.log("classes", classess);
      if (classess.err) {
        setLoading(false);
        return toast.error(classess.err);
      }
      setClassList(classess);
      setLoading(false);
      // toast.success(fetchingClassSuccess)
      setLoading(false);
    } catch (err) {
      toast.error("Fetching Classes Failed");
    }
  };
  const getAllBooksHandler = async () => {
    try {
      setLoading(true);
      const data = await getAllBooks(user.school, user._id);
      console.log(data);
      setAllBooks(data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      toast.error("Fetching Books Failed");
      setLoading(false);
    }
  };
  const getAllStaffs = async () => {
    try {
      setLoading(true);
      const { data } = await allStaffs(user.school, user._id);
      console.log(data);
      //   let canteenStaff = data.find((staff) => staff.assign_role === "library");
      setAllStaff(data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      toast.error("Fetching Staffs Failed");
      setLoading(false);
    }
  };
  useEffect(() => {
    getAllClasses();
    getAllBooksHandler();
    getAllStaffs();
  }, []);
  const handleChange = (name) => async (event) => {
    setReturnData({ ...returnData, [name]: event.target.value });
    console.log(name, event.target.value);
    if (name === "class") {
      // console.log("@@@@@@@@=>", event.target.value);
      // setSelectedClassId(event.target.value);
      let selectedClass = classList.find(
        (item) => item._id.toString() === event.target.value.toString()
      );
      // console.log(selectedClass);
      setSelectedClass(selectedClass);
    }
    if (name === "section") {
      filterStudentHandler(event.target.value);
    }
    if (name === "bookName") {
      let selectedBook = allBooks.find(
        (item) => item._id.toString() === event.target.value.toString()
      );
      console.log(selectedBook);
      setSelectedBook(selectedBook);
    }
  };
  const filterStudentHandler = async (id) => {
    
    const formData = {
      section: id,
      class: returnData.class,
    };
    try {
      setLoading(true);
      const data = await filterStudent(user.school, user._id, formData);
      console.log(data);
      setStudents(data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      toast.error("Fetching Students Failed");
      setLoading(false);
    }
  };

  return <div>StudentReturn</div>;
};


export default StudentReturn;
