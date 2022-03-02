import React, { useState, useEffect } from 'react';
import { Container, Card, Table, Input } from 'reactstrap';
import SimpleHeader from 'components/Headers/SimpleHeader';
import './styles.css';

const ClassTeacher = () => {
  const [classList, setClassList] = useState([]);
  const [teacherList, setTeacherList] = useState([]);

  useEffect(() => {
    setClassList(['Class 1', 'Class 1', 'Class 1', 'Class 1', 'Class 1', 'Class 1', 'Class 1', 'Class 1', 'Class 1', 'Class 1', 'Class 1', 'Class 1', 'Class 1', 'Class 1', 'Class 1', 'Class 1']);
    setTeacherList(['Rick', 'Roll', 'Rick', 'Roll', 'Rick', 'Roll', 'Rick', 'Roll', 'Rick', 'Roll']);
  }, []);
  return (
    <>
      <SimpleHeader name="Class Teacher" parentName="Class Management" />
      <Container fluid className="mt--6">
        <Card className="mb-4">
          <Table className="my-table mt-2">
            <tbody>
              {classList?.map((clas, index) => (
                <tr key={index} className="teacher-table-row">
                  <td className="teacher-table-class">{clas}</td>
                  <td>
                    <Input id={index} type="select">
                      {teacherList?.map((tech, i) => (
                        <option key={i} value={tech}>
                          {tech}
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
