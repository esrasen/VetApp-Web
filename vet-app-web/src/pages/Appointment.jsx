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
import { APPOINTMENT_API, DOCTOR_API, ANIMAL_API } from '../endpoints';
import send from '../assets/send.png';

function Appointment() {
    const [appointments, setAppointments] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const [animals, setAnimals] = useState([]);
    const [newAppointment, setNewAppointment] = useState({
        appointmentDate: '',
        doctor: null,
        animal: null
    });
    const [editingAppointmentId, setEditingAppointmentId] = useState(null);
    const [editingAppointment, setEditingAppointment] = useState({
        appointmentDate: '',
        doctor: null,
        animal: null
    });
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [errorMessage, setErrorMessage] = useState('');
    const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);

    const [searchStartDate, setSearchStartDate] = useState('');
    const [searchEndDate, setSearchEndDate] = useState('');
    const [searchType, setSearchType] = useState('');
    const [searchId, setSearchId] = useState('');

    useEffect(() => {
        fetchAppointments();
        fetchDoctors();
        fetchAnimals();
    }, [page, rowsPerPage]);

    const fetchAppointments = () => {
        axios.get(APPOINTMENT_API.GET_ALL, {
            params: {
                pageNumber: page,
                pageSize: rowsPerPage
            }
        })
            .then(response => {
                if (response.data && response.data.content) {
                    setAppointments(response.data.content);
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

    const fetchDoctors = () => {
        axios.get(DOCTOR_API.GET_ALL)
            .then(response => {
                setDoctors(response.data.content || response.data);
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

    const fetchAnimals = () => {
        axios.get(ANIMAL_API.GET_ALL)
            .then(response => {
                setAnimals(response.data.content || response.data);
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
        setNewAppointment(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditingAppointment(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleDoctorChange = (event, newValue) => {
        setNewAppointment(prevState => ({
            ...prevState,
            doctor: newValue || null
        }));
    };

    const handleAnimalChange = (event, newValue) => {
        setNewAppointment(prevState => ({
            ...prevState,
            animal: newValue || null
        }));
    };

    const handleEditDoctorChange = (event, newValue) => {
        setEditingAppointment(prevState => ({
            ...prevState,
            doctor: newValue || null
        }));
    };

    const handleEditAnimalChange = (event, newValue) => {
        setEditingAppointment(prevState => ({
            ...prevState,
            animal: newValue || null
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(APPOINTMENT_API.CREATE, newAppointment)
            .then(response => {
                fetchAppointments();
                setNewAppointment({ appointmentDate: '', doctor: null, animal: null });
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
        axios.delete(APPOINTMENT_API.DELETE(id))
            .then(() => {
                fetchAppointments();
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

    const handleEdit = (appointment) => {
        setEditingAppointmentId(appointment.id);
        setEditingAppointment({
            appointmentDate: appointment.appointmentDate,
            doctor: appointment.doctor,
            animal: appointment.animal
        });
    };

    const handleSave = (id) => {
        axios.put(APPOINTMENT_API.UPDATE(id), editingAppointment)
            .then(() => {
                fetchAppointments();
                setEditingAppointmentId(null);
                setEditingAppointment({ appointmentDate: '', doctor: null, animal: null });
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
        setEditingAppointmentId(null);
        setEditingAppointment({ appointmentDate: '', doctor: null, animal: null });
    };

    const handleCloseErrorModal = () => {
        setIsErrorModalOpen(false);
        setErrorMessage('');
    };

    const handleSearch = () => {
        let searchApi;
        if (searchType === 'doctor') {
            searchApi = APPOINTMENT_API.SEARCH_BY_DOCTOR_AND_DATE(searchId, searchStartDate, searchEndDate, page, rowsPerPage);
        } else {
            searchApi = APPOINTMENT_API.SEARCH_BY_ANIMAL_AND_DATE(searchId, searchStartDate, searchEndDate, page, rowsPerPage);
        }

        axios.get(searchApi)
            .then(response => {
                if (response.data && response.data.content) {
                    setAppointments(response.data.content);
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

    return (
        <Box sx={{ margin: '20px', padding: '20px', backgroundColor: 'white', borderRadius: '10px' }}>
            <Typography variant="h4" align="center" gutterBottom style={{ marginTop: '20px', marginBottom: '20px' }}>
                Randevu Yönetimi
            </Typography>
            <Box display="flex" justifyContent="space-between" mb={2}>
                <Typography variant="h6" align="left" gutterBottom>
                    Randevu Arama
                </Typography>
                <Box display="flex" alignItems="center">
                    <Autocomplete
                        options={[{ type: 'doctor', label: 'Doktora Göre' }, { type: 'animal', label: 'Hayvana Göre' }]}
                        getOptionLabel={(option) => option.label}
                        onChange={(event, newValue) => setSearchType(newValue ? newValue.type : '')}
                        renderInput={(params) => <TextField {...params} label="Arama Türü" margin="normal" fullWidth />}
                        sx={{ width: 200, marginRight: 2 }}
                    />
                    <Autocomplete
                        options={searchType === 'doctor' ? doctors : animals}
                        getOptionLabel={(option) => option.name}
                        onChange={(event, newValue) => setSearchId(newValue ? newValue.id : '')}
                        renderInput={(params) => <TextField {...params} label={searchType === 'doctor' ? 'Doktor Seçiniz' : 'Hayvan Seçiniz'} margin="normal" fullWidth />}
                        sx={{ width: 200, marginRight: 2 }}
                    />
                    <TextField
                        label="Başlangıç Tarihi"
                        type="date"
                        value={searchStartDate}
                        onChange={(e) => setSearchStartDate(e.target.value)}
                        InputLabelProps={{ shrink: true }}
                        sx={{ marginRight: 2 }}
                    />
                    <TextField
                        label="Bitiş Tarihi"
                        type="date"
                        value={searchEndDate}
                        onChange={(e) => setSearchEndDate(e.target.value)}
                        InputLabelProps={{ shrink: true }}
                        sx={{ marginRight: 2 }}
                    />
                    <Button variant="contained" color="primary" onClick={handleSearch}>
                        Ara
                    </Button>
                </Box>
            </Box>
            <Typography variant="h6" align="left" gutterBottom>
                Randevu Listesi
            </Typography>
            <TableContainer component={Paper} style={{ boxShadow: 'none' }}>
                <Table>
                    <TableHead style={{ backgroundColor: '#A855F7' }}>
                        <TableRow>
                            <TableCell style={{ color: 'white' }}>Randevu Tarihi</TableCell>
                            <TableCell style={{ color: 'white' }}>Doktor</TableCell>
                            <TableCell style={{ color: 'white' }}>Hayvan</TableCell>
                            <TableCell style={{ color: 'white' }}>İşlemler</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {appointments.length > 0 ? (
                            appointments.map((appointment) => (
                                <TableRow key={appointment.id}>
                                    {editingAppointmentId === appointment.id ? (
                                        <>
                                            <TableCell>
                                                <TextField
                                                    name="appointmentDate"
                                                    type="datetime-local"
                                                    value={editingAppointment.appointmentDate}
                                                    onChange={handleEditChange}
                                                    fullWidth
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <Autocomplete
                                                    options={doctors}
                                                    getOptionLabel={(option) => option.name}
                                                    value={editingAppointment.doctor || null}
                                                    onChange={handleEditDoctorChange}
                                                    renderInput={(params) => <TextField {...params} label="Doktor" placeholder="Doktor seçiniz" />}
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <Autocomplete
                                                    options={animals}
                                                    getOptionLabel={(option) => option.name}
                                                    value={editingAppointment.animal || null}
                                                    onChange={handleEditAnimalChange}
                                                    renderInput={(params) => <TextField {...params} label="Hayvan" placeholder="Hayvan seçiniz" />}
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <IconButton onClick={() => handleSave(appointment.id)}>
                                                    <SaveIcon />
                                                </IconButton>
                                                <IconButton onClick={handleCancel}>
                                                    <CancelIcon />
                                                </IconButton>
                                            </TableCell>
                                        </>
                                    ) : (
                                        <>
                                            <TableCell>{appointment.appointmentDate}</TableCell>
                                            <TableCell>{appointment.doctor.name}</TableCell>
                                            <TableCell>{appointment.animal.name}</TableCell>
                                            <TableCell>
                                                <IconButton onClick={() => handleEdit(appointment)}>
                                                    <EditIcon />
                                                </IconButton>
                                                <IconButton onClick={() => handleDelete(appointment.id)}>
                                                    <DeleteIcon />
                                                </IconButton>
                                            </TableCell>
                                        </>
                                    )}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={4} align="center">Randevu bulunamadı</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={appointments.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </TableContainer>
            <Typography variant="h6" align="left" gutterBottom style={{ marginTop: '20px' }}>
                Randevu Ekle
            </Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Randevu Tarihi"
                    name="appointmentDate"
                    type="datetime-local"
                    value={newAppointment.appointmentDate}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    required
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <Autocomplete
                    options={doctors}
                    getOptionLabel={(option) => option.name}
                    value={newAppointment.doctor}
                    onChange={handleDoctorChange}
                    renderInput={(params) => <TextField {...params} label="Doktor" placeholder="Doktor seçiniz" margin="normal" required fullWidth />}
                />
                <Autocomplete
                    options={animals}
                    getOptionLabel={(option) => option.name}
                    value={newAppointment.animal}
                    onChange={handleAnimalChange}
                    renderInput={(params) => <TextField {...params} label="Hayvan" placeholder="Hayvan seçiniz" margin="normal" required fullWidth />}
                />
                <Box display="flex" justifyContent="flex-end">
                    <Button type="submit" variant="contained" color="primary" endIcon={<img src={send} alt="send" style={{ width: '20px' }} />}>
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

export default Appointment;
