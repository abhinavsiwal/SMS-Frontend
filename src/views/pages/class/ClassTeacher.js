import React, { useState, useEffect } from "react";
import { Container, Card, Table, Input } from "reactstrap";
import SimpleHeader from "components/Headers/SimpleHeader";
import "./styles.css";
import { allClass, assignClassTeacher,nonClassTeachers } from "api/class";
import { toast,ToastContainer } from "react-toastify";
import { isAuthenticated } from "api/auth";
import { allStaffs,updateStaff1 } from "api/staff";

import {
  fetchingClassError,
  classTeacherAssignError,
  fetchingStaffFailed,
} from "constants/errors";
import { classTeacherAssignSuccess } from "constants/success";

import Loader from "components/Loader/Loader";

const ClassTeacher = () => {
  const [classList, setClassList] = useState([]);
  const [sectionList, setsectionList] = useState([]);
  const [teacherList, setTeacherList] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user, token } = isAuthenticated();
  const [checked, setChecked] = useState(false);
  // let permissions;
  //   useEffect(() => {
  //     if (user.role["Library Management"]) {
  //       permissions = user.role["Library Management"];
  //       console.log(permissions);
  //     }
  //   }, []);

  useEffect(async () => {
    try {
      const classess = await allClass(user._id, user.school, token);
      console.log("classes", classess);
      if (classess.err) {
        return toast.error(classess.err);
      }
      setClassList(classess);
      // setLoading(true);
      // toast.success(fetchingClassSuccess)
    } catch (err) {
      toast.error(fetchingClassError);
    }

    try {
      const { user, token } = isAuthenticated();
      const payload = { school: user.school };

      const teachers = await nonClassTeachers(user.school, user._id);
      console.log(teachers);
      if (teachers.err) {
        return toast.error(teachers.err);
      }
      setTeacherList(teachers);
    } catch (err) {
      toast.error(fetchingStaffFailed);
    }
  }, [checked]);

  const assignClassTeacherHandler = (sectionId) => async (e) => {
    console.log(sectionId);
    console.log(e.target.value);
    let staffId = e.target.value;
    let formData = new FormData();
    formData.set("classTeacher", e.target.value);
    let formData1 = new FormData();
    formData1.set("schoolClassTeacher", sectionId);
    try {
      setLoading(true);
      const data = await assignClassTeacher(sectionId, user._id, token, formData);
      console.log(data);
      const data1 = await updateStaff1(staffId, user._id, formData1);
      console.log(data1);
      toast.success(classTeacherAssignSuccess);
      setChecked(!checked)
      setLoading(false)
    } catch (err) {
      console.log(err);
      toast.error(classTeacherAssignError);
      setLoading(false);
    }
  };

  return (
    <>
      <SimpleHeader name="Class Teacher" parentName="Class Management" />
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
      <Container fluid className="mt--6">
        <Card className="mb-4">
          {!loading ? (
            <Table className="my-table mt-2">
              <tbody>
                {classList.map((clas) => (
                  <tr key={clas._id} className="teacher-table-row">
                    <td className="teacher-table-class">{clas.name}</td>
                    <tbody>
                      {clas.section &&
                        clas.section.map((section) => {
                          return (
                            <tr key={section._id} className="teacher-table-row">
                              <td className="teacher-table-class">
                                {section.name}
                              </td>
                              <td>
                                <Input
                                  id={section._id}
                                  type="select"
                                  onChange={assignClassTeacherHandler(section._id)}
                                  value={section.classTeacher}
                                >
                                  <option value="">Select Teacher</option>
                                  {teacherList.map((tech, i) => (
                                    <option key={i} value={tech._id}>
                                      {tech.firstname} {tech.lastname}
                                    </option>
                                  ))}
                                </Input>
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <Loader />
          )}
        </Card>
      </Container>
    </>
  );
};

export default ClassTeacher;
