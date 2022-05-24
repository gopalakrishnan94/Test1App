import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllStudents } from '../../redux/actions/studentActions';
import { Panel, Button } from 'rsuite';
import { Table, Column, HeaderCell, Cell } from 'rsuite-table';
import { Link } from "react-router-dom";

const Students = () => {

    const students = useSelector((state) => state.StudentReducer);
    const dispatch = useDispatch();

    const fetchAllStudents = () => {
        dispatch(getAllStudents())
        .catch((err) => {
            console.log(err)
        });
    }

    useEffect(() => {
        fetchAllStudents();
        // eslint-disable-next-line
    }, []);

    const ActionCell = ({ rowData, dataKey, onClick, ...props }) => {
        return (
          <Cell {...props} style={{ padding: '6px' }}>
            <Button
              size="xs"
              appearance="link"
            >
              <Link to={`/Students/EditStudents/${rowData.StudentID}`}>Edit</Link>
            </Button>
          </Cell>
        );
      };

    return (
        <div className='row'>
            <Panel header="Students List" shaded>
            <Button size="sm" appearance="ghost">
              <Link to="/Students/AddStudents">Add</Link>
            </Button>
                <Table
                    virtualized
                    autoHeight
                    affixHeader
                    cellBordered
                    headerHeight={30}
                    rowHeight={30}
                    data={students.StudentList}
                >
                    <Column align={'center'} width={150} sortable>
                        <HeaderCell>Name</HeaderCell>
                        <Cell dataKey="StudentName" />
                    </Column>

                    <Column align={'center'} width={100}>
                        <HeaderCell>Age</HeaderCell>
                        <Cell dataKey="StudentAge" />
                    </Column>

                    <Column align={'center'} width={150}>
                        <HeaderCell>Gender</HeaderCell>
                        <Cell dataKey="StudentGender" />
                    </Column>

                    <Column align={'center'} width={150} sortable>
                        <HeaderCell>Exam ID</HeaderCell>
                        <Cell dataKey="ExamId" />
                    </Column>

                    <Column align={'center'} width={200} sortable>
                        <HeaderCell>Email ID</HeaderCell>
                        <Cell dataKey="EmailId" />
                    </Column>

                    <Column align={'center'} width={200}>
                        <HeaderCell>Phone Number</HeaderCell>
                        <Cell dataKey="PhoneNumber" />
                    </Column>

                    <Column align={'center'} width={250}>
                        <HeaderCell>Address</HeaderCell>
                        <Cell dataKey="Address" />
                    </Column>

                    <Column align={'center'} width={100}>
                        <HeaderCell>Action</HeaderCell>
                        <ActionCell />
                    </Column>
                </Table>
            </Panel>
        </div>
    )
};

export default Students;