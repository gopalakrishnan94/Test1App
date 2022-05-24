import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Panel, Form, Input, Button, ButtonToolbar, InputPicker, Modal } from 'rsuite';
import { createStudent, getStudentById, updateStudent } from '../../redux/actions/studentActions';

const AddStudents = () => {

    const GenderData = [
        {
            label: "Male",
            value: "Male"
        },
        {
            label: "Female",
            value: "Female"
        }
    ]

    const initialState = {
        StudentName: '',
        StudentAge: '',
        StudentGender: '',
        ExamId: '',
        EmailId: '',
        PhoneNumber: '',
        Address: ''
    }

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();

    const [StudentDTO, SetStudentDTO] = React.useState(initialState);
    const [ModalMessage, setModalMessage] = React.useState();
    const [Modalopen, setModalOpen] = React.useState(false);
    const handleModalOpen = () => setModalOpen(true);
    const handleModalClose = () => {
        setModalOpen(false);
        navigate("/Students");
    };

    const Textarea = React.forwardRef((props, ref) => <Input {...props} as="textarea" ref={ref} />);

    const handleChange = (val, e) => {
        const {name} = e.target;
        SetStudentDTO({...StudentDTO, [name]: val});
    }

    const handleSelectChange = (val) => {
        SetStudentDTO({...StudentDTO, StudentGender: val});
    }

    const fetchGetStudent = (id) => {
        if (id) {
            dispatch(getStudentById(id))
            .then(data => {
                console.log(data);
                var Stu = data;
                SetStudentDTO(Stu)
            })
            .catch((err) => {
                console.log(err);
            });
        }
    }

    useEffect(() => {
        fetchGetStudent(id);
            // eslint-disable-next-line
    }, []);

    const handleSubmit = () => {
        console.log(StudentDTO)
        if (id) {
            // Update
            dispatch(updateStudent(StudentDTO, StudentDTO.StudentID))
            .then(data => {
                console.log(data);
                setModalMessage(data.Message);
                handleModalOpen();
            })
            .catch((err) => {
                console.log(err);
            });
        } else {
            // Create
            dispatch(createStudent(StudentDTO))
            .then(data => {
                console.log(data);
                setModalMessage(data.Message);
                handleModalOpen();
            })
            .catch((err) => {
                console.log(err);
            });
        }
    }

    return (
        <div className='row'>
            <Panel header={id ? "Edit Students" : "Add Students"}>
                <Form layout="horizontal">
                    <Form.Group controlId="StudentName-7">
                        <Form.ControlLabel>Student Name</Form.ControlLabel>
                        <Form.Control name="StudentName" value={StudentDTO.StudentName || ''} onChange={handleChange} />
                        <Form.HelpText tooltip>Required</Form.HelpText>
                    </Form.Group>
                    <Form.Group controlId="StudentAge-7">
                        <Form.ControlLabel>Student Age</Form.ControlLabel>
                        <Form.Control name="StudentAge" type="number" value={StudentDTO.StudentAge || ''} onChange={handleChange} />
                    </Form.Group>
                    <Form.Group controlId="StudentGender-7">
                        <Form.ControlLabel>Student Gender</Form.ControlLabel>
                        <InputPicker name="StudentGender" data={GenderData} style={{ width: 300 }} value={StudentDTO.StudentGender || ''} onChange={handleSelectChange} />
                    </Form.Group>
                    <Form.Group controlId="ExamId-7">
                        <Form.ControlLabel>Exam ID</Form.ControlLabel>
                        <Form.Control name="ExamId" value={StudentDTO.ExamId || ''} onChange={handleChange} />
                    </Form.Group>
                    <Form.Group controlId="EmailId-7">
                        <Form.ControlLabel>Email</Form.ControlLabel>
                        <Form.Control name="EmailId" type="email" value={StudentDTO.EmailId || ''} onChange={handleChange} />
                    </Form.Group>
                    <Form.Group controlId="PhoneNumber-7">
                        <Form.ControlLabel>Phone Number</Form.ControlLabel>
                        <Form.Control name="PhoneNumber" value={StudentDTO.PhoneNumber || ''} onChange={handleChange} />
                    </Form.Group>
                    <Form.Group controlId="Address-7">
                        <Form.ControlLabel>Address</Form.ControlLabel>
                        <Form.Control name="Address" rows={5} accepter={Textarea} value={StudentDTO.Address || ''} onChange={handleChange} />
                    </Form.Group>
                    <Form.Group>
                        <ButtonToolbar>
                            <Button appearance="primary" onClick={handleSubmit}>Submit</Button>
                            <Button appearance="default" onClick={() => navigate("/Students")}>Cancel</Button>
                        </ButtonToolbar>
                    </Form.Group>
                </Form>
            </Panel>
            <Modal open={Modalopen} onClose={handleModalClose}>
                <Modal.Header>
                    <Modal.Title className='text-center'>{id ? "Edit Students" : "Add Students"}</Modal.Title>
                </Modal.Header>
                <Modal.Body className='text-center'>
                     {ModalMessage}
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleModalClose} appearance="primary">
                        Ok
                    </Button>
                    <Button onClick={handleModalClose} appearance="subtle">
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
};

export default AddStudents;