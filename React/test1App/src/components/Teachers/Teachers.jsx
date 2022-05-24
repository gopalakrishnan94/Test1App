import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllTeachers } from '../../redux/actions/teacherActions';
import { Panel, Button } from 'rsuite';
import { Table, Column, HeaderCell, Cell } from 'rsuite-table';
import { Link } from "react-router-dom";

const Teachers = () => {

    const teachers = useSelector((state) => state.TeacherReducer);
    const dispatch = useDispatch();

    const fetchAllTeachers = () => {
        dispatch(getAllTeachers())
        .catch((err) => {
            console.log(err)
        });
    }

    useEffect(() => {
        fetchAllTeachers();
        // eslint-disable-next-line
    }, []);

    const ActionCell = ({ rowData, dataKey, onClick, ...props }) => {
        return (
          <Cell {...props} style={{ padding: '6px' }}>
            <Button
              size="xs"
              appearance="link"
            >
              <Link to={`/Teachers/EditTeachers/${rowData.TeacherID}`}>Edit</Link>
            </Button>
          </Cell>
        );
      };

    return (
        <div className='row'>
            <Panel header="Teachers List" shaded>
            <Button size="sm" appearance="ghost">
              <Link to="/Teachers/AddTeachers">Add</Link>
            </Button>
                <Table
                    virtualized
                    autoHeight
                    affixHeader
                    cellBordered
                    headerHeight={30}
                    rowHeight={30}
                    data={teachers.TeachersList}
                >
                    <Column align={'center'} width={150} sortable>
                        <HeaderCell>Name</HeaderCell>
                        <Cell dataKey="TeacherName" />
                    </Column>

                    <Column align={'center'} width={100}>
                        <HeaderCell>Age</HeaderCell>
                        <Cell dataKey="TeacherAge" />
                    </Column>

                    <Column align={'center'} width={150}>
                        <HeaderCell>Gender</HeaderCell>
                        <Cell dataKey="TeacherGender" />
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

export default Teachers;