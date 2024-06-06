import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    Paper, TextField, Button, IconButton, Box, TablePagination, Autocomplete, Dialog, DialogTitle, DialogContent, DialogActions
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import { DOCTOR_API } from '../endpoints';
import send from '../assets/send.png';

function Doctor() {
    const [doctors, setDoctors] = useState([]);
    const [newDoctor, setNewDoctor] = useState({
        name: '',
        phone: '',
        email: '',
        address: '',
        city: ''
    });
    const [editingDoctorId, setEditingDoctorId] = useState(null);
    const [editingDoctor, setEditingDoctor] = useState({
        name: '',
        phone: '',
        email: '',
        address: '',
        city: ''
    });
    const [workDays, setWorkDays] = useState([]);
    const [newWorkDay, setNewWorkDay] = useState({
        workDay: '',
        doctorId: null
    });
    const [editingWorkDayId, setEditingWorkDayId] = useState(null);
    const [editingWorkDay, setEditingWorkDay] = useState({
        workDay: '',
        doctorId: null
    });
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [errorMessage, setErrorMessage] = useState('');
    const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);

    useEffect(() => {
        fetchDoctors();
        fetchAllWorkDays();
    }, [page, rowsPerPage]);

    const fetchDoctors = () => {
        axios.get(DOCTOR_API.GET_ALL, {
            params: {
                pageNumber: page,
                pageSize: rowsPerPage
            }
        })
            .then(response => {
                if (response.data && response.data.content) {
                    setDoctors(response.data.content);
                } else {
                    setErrorMessage('API response is not in expected format');
                    setIsErrorModalOpen(true);
                }
            })
            .catch(error => {
                setErrorMessage(
                    error.response && error.response.data && error.response.data.message
                        ? 'API error: ' + error.response.data.message
                        : 'API error: ' + error.message
                );

                setIsErrorModalOpen(true);
            });
    };

    const fetchAllWorkDays = () => {
        axios.get(DOCTOR_API.GET_WORK_DAYS(null, page, rowsPerPage))
            .then(response => {
                if (response.data && response.data.content) {
                    setWorkDays(response.data.content);
                } else {
                    setErrorMessage('API response is not in expected format');
                    setIsErrorModalOpen(true);
                }
            })
            .catch(error => {
                setErrorMessage(
                    error.response && error.response.data && error.response.data.message
                        ? 'API error: ' + error.response.data.message
                        : 'API error: ' + error.message
                );

                setIsErrorModalOpen(true);
            });
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewDoctor(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditingDoctor(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(DOCTOR_API.CREATE, newDoctor)
            .then(response => {
                fetchDoctors();
                setNewDoctor({ name: '', phone: '', email: '', address: '', city: '' });
            })
            .catch(error => {
                setErrorMessage(
                    error.response && error.response.data && error.response.data.message
                        ? 'API error: ' + error.response.data.message
                        : 'API error: ' + error.message
                );

                setIsErrorModalOpen(true);
            });
    };

    const handleDelete = (id) => {
        axios.delete(DOCTOR_API.DELETE(id))
            .then(() => {
                fetchDoctors();
            })
            .catch(error => {
                setErrorMessage(
                    error.response && error.response.data && error.response.data.message
                        ? 'API error: ' + error.response.data.message
                        : 'API error: ' + error.message
                );

                setIsErrorModalOpen(true);
            });
    };

    const handleEdit = (doctor) => {
        setEditingDoctorId(doctor.id);
        setEditingDoctor({
            name: doctor.name,
            phone: doctor.phone,
            email: doctor.email,
            address: doctor.address,
            city: doctor.city
        });
    };

    const handleSave = (id) => {
        axios.put(DOCTOR_API.UPDATE(id), editingDoctor)
            .then(() => {
                fetchDoctors();
                setEditingDoctorId(null);
                setEditingDoctor({ name: '', phone: '', email: '', address: '', city: '' });
            })
            .catch(error => {
                setErrorMessage(
                    error.response && error.response.data && error.response.data.message
                        ? 'API error: ' + error.response.data.message
                        : 'API error: ' + error.message
                );

                setIsErrorModalOpen(true);
            });
    };

    const handleCancel = () => {
        setEditingDoctorId(null);
        setEditingDoctor({ name: '', phone: '', email: '', address: '', city: '' });
    };

    const handleWorkDaySubmit = (e) => {
        e.preventDefault();
        axios.post(DOCTOR_API.CREATE_WORK_DAY, newWorkDay)
            .then(response => {
                fetchAllWorkDays();
                setNewWorkDay({ workDay: '', doctorId: null });
            })
            .catch(error => {
                setErrorMessage(
                    error.response && error.response.data && error.response.data.message
                        ? 'API error: ' + error.response.data.message
                        : 'API error: ' + error.message
                );

                setIsErrorModalOpen(true);
            });
    };

    const handleWorkDayDelete = (id) => {
        axios.delete(DOCTOR_API.DELETE_WORK_DAY(id))
            .then(() => {
                fetchAllWorkDays();
            })
            .catch(error => {
                setErrorMessage(
                    error.response && error.response.data && error.response.data.message
                        ? 'API error: ' + error.response.data.message
                        : 'API error: ' + error.message
                );

                setIsErrorModalOpen(true);
            });
    };

    const handleWorkDayEdit = (workDay) => {
        setEditingWorkDayId(workDay.id);
        setEditingWorkDay({
            workDay: workDay.workDay,
            doctorId: workDay.doctor.id
        });
    };

    const handleWorkDaySave = (id) => {
        axios.put(DOCTOR_API.UPDATE_WORK_DAY(id), editingWorkDay)
            .then(() => {
                fetchAllWorkDays();
                setEditingWorkDayId(null);
                setEditingWorkDay({ workDay: '', doctorId: null });
            })
            .catch(error => {
                setErrorMessage(
                    error.response && error.response.data && error.response.data.message
                        ? 'API error: ' + error.response.data.message
                        : 'API error: ' + error.message
                );

                setIsErrorModalOpen(true);
            });
    };

    const handleWorkDayCancel = () => {
        setEditingWorkDayId(null);
        setEditingWorkDay({ workDay: '', doctorId: null });
    };

    const handleCloseErrorModal = () => {
        setIsErrorModalOpen(false);
        setErrorMessage('');
    };

    return (
        <Box sx={{ margin: '20px', padding: '20px', backgroundColor: 'white', borderRadius: '10px' }}>
            <Typography variant="h4" align="center" gutterBottom style={{ marginTop: '20px', marginBottom: '20px' }}>
                Doktor Yönetimi
            </Typography>

            <Typography variant="h6" align="left" gutterBottom style={{ marginTop: '20px' }}>
                Doktor Listesi
            </Typography>
            <TableContainer component={Paper} style={{ boxShadow: 'none' }}>
                <Table>
                    <TableHead style={{ backgroundColor: '#A855F7' }}>
                        <TableRow>
                            <TableCell style={{ color: 'white' }}>Doktor Adı</TableCell>
                            <TableCell style={{ color: 'white' }}>Telefon</TableCell>
                            <TableCell style={{ color: 'white' }}>Email</TableCell>
                            <TableCell style={{ color: 'white' }}>Adres</TableCell>
                            <TableCell style={{ color: 'white' }}>Şehir</TableCell>
                            <TableCell style={{ color: 'white' }}>İşlemler</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {doctors.length > 0 ? (
                            doctors.map((doctor) => (
                                <TableRow key={doctor.id}>
                                    {editingDoctorId === doctor.id ? (
                                        <>
                                            <TableCell>
                                                <TextField
                                                    name="name"
                                                    value={editingDoctor.name}
                                                    onChange={handleEditChange}
                                                    fullWidth
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <TextField
                                                    name="phone"
                                                    value={editingDoctor.phone}
                                                    onChange={handleEditChange}
                                                    fullWidth
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <TextField
                                                    name="email"
                                                    value={editingDoctor.email}
                                                    onChange={handleEditChange}
                                                    fullWidth
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <TextField
                                                    name="address"
                                                    value={editingDoctor.address}
                                                    onChange={handleEditChange}
                                                    fullWidth
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <TextField
                                                    name="city"
                                                    value={editingDoctor.city}
                                                    onChange={handleEditChange}
                                                    fullWidth
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <IconButton onClick={() => handleSave(doctor.id)}>
                                                    <SaveIcon />
                                                </IconButton>
                                                <IconButton onClick={handleCancel}>
                                                    <CancelIcon />
                                                </IconButton>
                                            </TableCell>
                                        </>
                                    ) : (
                                        <>
                                            <TableCell>{doctor.name}</TableCell>
                                            <TableCell>{doctor.phone}</TableCell>
                                            <TableCell>{doctor.email}</TableCell>
                                            <TableCell>{doctor.address}</TableCell>
                                            <TableCell>{doctor.city}</TableCell>
                                            <TableCell>
                                                <IconButton onClick={() => handleEdit(doctor)}>
                                                    <EditIcon />
                                                </IconButton>
                                                <IconButton onClick={() => handleDelete(doctor.id)}>
                                                    <DeleteIcon />
                                                </IconButton>
                                            </TableCell>
                                        </>
                                    )}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={6} align="center">Doktor bulunamadı</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={doctors.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </TableContainer>

            <Typography variant="h6" align="left" gutterBottom style={{ marginTop: '20px' }}>
                Doktor Ekle
            </Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Doktor Adı"
                    name="name"
                    value={newDoctor.name}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    required
                />
                <TextField
                    label="Telefon"
                    name="phone"
                    value={newDoctor.phone}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    required
                />
                <TextField
                    label="Email"
                    name="email"
                    value={newDoctor.email}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    required
                />
                <TextField
                    label="Adres"
                    name="address"
                    value={newDoctor.address}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    required
                />
                <TextField
                    label="Şehir"
                    name="city"
                    value={newDoctor.city}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    required
                />
                <Box display="flex" justifyContent="flex-end">
                    <Button type="submit" variant="contained" color="primary" endIcon={<img src={send} alt="send" style={{ width: '20px' }} />}>
                        Ekle
                    </Button>
                </Box>
            </form>

            <Typography variant="h6" align="left" gutterBottom style={{ marginTop: '20px' }}>
                Çalışma Günleri Listesi
            </Typography>

            <TableContainer component={Paper} style={{ boxShadow: 'none', marginTop: '20px' }}>
                <Table>
                    <TableHead style={{ backgroundColor: '#A855F7' }}>
                        <TableRow>
                            <TableCell style={{ color: 'white' }}>Doktor Adı</TableCell>
                            <TableCell style={{ color: 'white' }}>Çalışma Tarihi</TableCell>
                            <TableCell style={{ color: 'white' }}>İşlemler</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {workDays.length > 0 ? (
                            workDays.map((workDay) => (
                                <TableRow key={workDay.id}>
                                    {editingWorkDayId === workDay.id ? (
                                        <>
                                            <TableCell>
                                                <Autocomplete
                                                    options={doctors}
                                                    getOptionLabel={(option) => option.name}
                                                    value={doctors.find(doctor => doctor.id === editingWorkDay.doctorId) || null}
                                                    onChange={(event, newValue) => setEditingWorkDay({ ...editingWorkDay, doctorId: newValue ? newValue.id : null })}
                                                    renderInput={(params) => <TextField {...params} label="Doktor Seçiniz" margin="normal" required fullWidth />}
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <TextField
                                                    name="workDay"
                                                    type="date"
                                                    value={editingWorkDay.workDay}
                                                    onChange={(e) => setEditingWorkDay({ ...editingWorkDay, workDay: e.target.value })}
                                                    fullWidth
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <IconButton onClick={() => handleWorkDaySave(workDay.id)}>
                                                    <SaveIcon />
                                                </IconButton>
                                                <IconButton onClick={handleWorkDayCancel}>
                                                    <CancelIcon />
                                                </IconButton>
                                            </TableCell>
                                        </>
                                    ) : (
                                        <>
                                            <TableCell>{workDay.doctor.name}</TableCell>
                                            <TableCell>{workDay.workDay}</TableCell>
                                            <TableCell>
                                                <IconButton onClick={() => handleWorkDayEdit(workDay)}>
                                                    <EditIcon />
                                                </IconButton>
                                                <IconButton onClick={() => handleWorkDayDelete(workDay.id)}>
                                                    <DeleteIcon />
                                                </IconButton>
                                            </TableCell>
                                        </>
                                    )}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={3} align="center">Çalışma günü bulunamadı</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={workDays.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </TableContainer>

            <Typography variant="h6" align="left" gutterBottom style={{ marginTop: '20px' }}>
                Çalışma Günleri Yönetimi
            </Typography>
            <form onSubmit={handleWorkDaySubmit}>
                <Autocomplete
                    options={doctors}
                    getOptionLabel={(option) => option.name}
                    value={doctors.find(doctor => doctor.id === newWorkDay.doctorId) || null}
                    onChange={(event, newValue) => setNewWorkDay({ ...newWorkDay, doctorId: newValue ? newValue.id : null })}
                    renderInput={(params) => <TextField {...params} label="Doktor Seçiniz" margin="normal" required fullWidth />}
                />
                <TextField
                    label="Çalışma Tarihi"
                    name="workDay"
                    type="date"
                    value={newWorkDay.workDay}
                    onChange={(e) => setNewWorkDay({ ...newWorkDay, workDay: e.target.value })}
                    fullWidth
                    margin="normal"
                    required
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <Box display="flex" justifyContent="flex-end">
                    <Button type="submit" variant="contained" color="primary">
                        Ekle
                    </Button>
                </Box>
            </form>


            <Dialog open={isErrorModalOpen} onClose={handleCloseErrorModal}>
                <DialogTitle>Hata</DialogTitle>
                <DialogContent>{errorMessage}</DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseErrorModal} color="primary">
                        Kapat
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}

export default Doctor;
