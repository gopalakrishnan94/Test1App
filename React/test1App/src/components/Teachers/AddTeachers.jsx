import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Panel, Form, Input, Button, ButtonToolbar, InputPicker, Modal } from 'rsuite';
import { createTeacher, getTeacherById, updateTeacher } from '../../redux/actions/teacherActions';

const AddTeachers = () => {

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
        TeacherName: '',
        TeacherAge: '',
        TeacherGender: '',
        EmailId: '',
        PhoneNumber: '',
        Address: ''
    }

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();

    const [TeacherDTO, SetTeacherDTO] = React.useState(initialState);
    const [ModalMessage, setModalMessage] = React.useState();
    const [Modalopen, setModalOpen] = React.useState(false);
    const handleModalOpen = () => setModalOpen(true);
    const handleModalClose = () => {
        setModalOpen(false);
        navigate("/Teachers");
    };

    const Textarea = React.forwardRef((props, ref) => <Input {...props} as="textarea" ref={ref} />);

    const handleChange = (val, e) => {
        const {name} = e.target;
        SetTeacherDTO({...TeacherDTO, [name]: val});
    }

    const handleSelectChange = (val) => {
        SetTeacherDTO({...TeacherDTO, TeacherGender: val});
    }

    const fetchGetTeacher = (id) => {
        if (id) {
            dispatch(getTeacherById(id))
            .then(data => {
                console.log(data);
                var Stu = data;
                SetTeacherDTO(Stu)
            })
            .catch((err) => {
                console.log(err);
            });
        }
    }

    useEffect(() => {
        fetchGetTeacher(id);
            // eslint-disable-next-line
    }, []);

    const handleSubmit = () => {
        console.log(TeacherDTO)
        if (id) {
            // Update
            dispatch(updateTeacher(TeacherDTO, TeacherDTO.TeacherID))
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
            dispatch(createTeacher(TeacherDTO))
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
            <Panel header={id ? "Edit Teachers" : "Add Teachers"}>
                <Form layout="horizontal">
                    <Form.Group controlId="TeacherName-7">
                        <Form.ControlLabel>Teacher Name</Form.ControlLabel>
                        <Form.Control name="TeacherName" value={TeacherDTO.TeacherName || ''} onChange={handleChange} />
                        <Form.HelpText tooltip>Required</Form.HelpText>
                    </Form.Group>
                    <Form.Group controlId="TeacherAge-7">
                        <Form.ControlLabel>Teacher Age</Form.ControlLabel>
                        <Form.Control name="TeacherAge" type="number" value={TeacherDTO.TeacherAge || ''} onChange={handleChange} />
                    </Form.Group>
                    <Form.Group controlId="TeacherGender-7">
                        <Form.ControlLabel>Teacher Gender</Form.ControlLabel>
                        <InputPicker name="TeacherGender" data={GenderData} style={{ width: 300 }} value={TeacherDTO.TeacherGender || ''} onChange={handleSelectChange} />
                    </Form.Group>
                    <Form.Group controlId="EmailId-7">
                        <Form.ControlLabel>Email</Form.ControlLabel>
                        <Form.Control name="EmailId" type="email" value={TeacherDTO.EmailId || ''} onChange={handleChange} />
                    </Form.Group>
                    <Form.Group controlId="PhoneNumber-7">
                        <Form.ControlLabel>Phone Number</Form.ControlLabel>
                        <Form.Control name="PhoneNumber" value={TeacherDTO.PhoneNumber || ''} onChange={handleChange} />
                    </Form.Group>
                    <Form.Group controlId="Address-7">
                        <Form.ControlLabel>Address</Form.ControlLabel>
                        <Form.Control name="Address" rows={5} accepter={Textarea} value={TeacherDTO.Address || ''} onChange={handleChange} />
                    </Form.Group>
                    <Form.Group>
                        <ButtonToolbar>
                            <Button appearance="primary" onClick={handleSubmit}>Submit</Button>
                            <Button appearance="default" onClick={() => navigate("/Teachers")}>Cancel</Button>
                        </ButtonToolbar>
                    </Form.Group>
                </Form>
            </Panel>
            <Modal open={Modalopen} onClose={handleModalClose}>
                <Modal.Header>
                    <Modal.Title className='text-center'>{id ? "Edit Teachers" : "Add Teachers"}</Modal.Title>
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

export default AddTeachers;