import React, { useState, useEffect } from "react";
import { Container, Card, Table, Input } from "reactstrap";
import SimpleHeader from "components/Headers/SimpleHeader";
import "./styles.css";
import { allClass, assignClassTeacher } from "api/class";
import { toast } from "react-toastify";
import { isAuthenticated } from "api/auth";
import { allStaffs } from "api/staff";

const ClassTeacher = () => {
  const [classList, setClassList] = useState([]);
  const [teacherList, setTeacherList] = useState([]);
  const { user, token } = isAuthenticated();

  useEffect(async () => {
    try {
      const classess = await allClass(user._id, user.school, token);
      console.log("classes", classess);
      if (classess.err) {
        return toast.error(classess.err);
      }
      setClassList(classess);
    } catch (err) {
      toast.error("Something Went Wrong!");
    }

    try {
      const { user, token } = isAuthenticated();
      const payload = { school: user.school };

      const teachers = await allStaffs(user.school, user._id);
      console.log(teachers);
      if (teachers.err) {
        return toast.error(teachers.err);
      }
      setTeacherList(teachers);
    } catch (err) {
      toast.error(err);
    }
  }, []);

  const assignClassTeacherHandler = (classId) => async (e) => {
    console.log(classId);
    console.log(e.target.value);
    let formData = new FormData();
    formData.set("classTeacher",e.target.value)
    try {
      const data = await assignClassTeacher(classId,user._id,token,formData);
      console.log(data);    
    } catch (err) {
      console.log(err);
    }
  
  };

  return (
    <>
      <SimpleHeader name="Class Teacher" parentName="Class Management" />
      <Container fluid className="mt--6">
        <Card className="mb-4">
          <Table className="my-table mt-2">
            <tbody>
              {classList.map((clas) => (
                <tr key={clas._id} className="teacher-table-row">
                  <td className="teacher-table-class">{clas.name}</td>
                  <td>
                    <Input
                      id={clas._id}
                      type="select"
                      onChange={assignClassTeacherHandler(clas._id)}
                    >
                      {teacherList.map((tech, i) => (
                        <option key={i} value={tech._id}>
                          {tech.firstname} {tech.lastname}
                        </option>
                      ))}
                    </Input>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card>
      </Container>
    </>
  );
};

export default ClassTeacher;
