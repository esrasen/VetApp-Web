import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Box, Typography, Autocomplete, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    Paper, TextField, Button, IconButton, TablePagination, Dialog, DialogTitle, DialogContent, DialogActions
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import { PDFDownloadLink } from '@react-pdf/renderer';
import PDFDocument from './PDFDocument';
import { REPORT_API, APPOINTMENT_API } from '../endpoints';
import send from '../assets/send.png';

function Report() {
    const [reports, setReports] = useState([]);
    const [appointments, setAppointments] = useState([]);
    const [newReport, setNewReport] = useState({
        title: '',
        diagnosis: '',
        price: '',
        appointmentId: ''
    });
    const [editingReportId, setEditingReportId] = useState(null);
    const [editingReport, setEditingReport] = useState({
        title: '',
        diagnosis: '',
        price: '',
        appointmentId: ''
    });
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [errorMessage, setErrorMessage] = useState('');
    const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
    const [selectedReport, setSelectedReport] = useState(null);

    useEffect(() => {
        fetchReports();
        fetchAppointments();
    }, [page, rowsPerPage]);

    const fetchReports = () => {
        axios.get(REPORT_API.GET_ALL, {
            params: {
                pageNumber: page,
                pageSize: rowsPerPage
            }
        })
            .then(response => {
                if (response.data && response.data.content) {
                    setReports(response.data.content);
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

    const fetchAppointments = () => {
        axios.get(APPOINTMENT_API.GET_ALL)
            .then(response => {
                if (response.data && response.data.content) {
                    const updatedAppointments = response.data.content.map(appointment => ({
                        ...appointment,
                        animalName: appointment.animal?.name,
                        customerName: appointment.animal?.customer?.name
                    }));
                    setAppointments(updatedAppointments);
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
        setNewReport(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditingReport(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleAppointmentChange = (event, newValue) => {
        if (newValue) {
            setNewReport(prevState => ({
                ...prevState,
                appointmentId: newValue.id
            }));
        } else {
            setNewReport(prevState => ({
                ...prevState,
                appointmentId: ''
            }));
        }
    };

    const handleEditAppointmentChange = (event, newValue) => {
        if (newValue) {
            setEditingReport(prevState => ({
                ...prevState,
                appointmentId: newValue.id
            }));
        } else {
            setEditingReport(prevState => ({
                ...prevState,
                appointmentId: ''
            }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(REPORT_API.CREATE, newReport)
            .then(response => {
                fetchReports();
                setNewReport({ title: '', diagnosis: '', price: '', appointmentId: '' });
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
        axios.delete(REPORT_API.DELETE(id))
            .then(() => {
                fetchReports();
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

    const handleEdit = (report) => {
        setEditingReportId(report.id);
        setEditingReport({
            title: report.title,
            diagnosis: report.diagnosis,
            price: report.price,
            appointmentId: report.appointment.id
        });
    };

    const handleSave = (id) => {
        axios.put(REPORT_API.UPDATE(id), editingReport)
            .then(response => {
                fetchReports();
                setEditingReportId(null);
                setEditingReport({ title: '', diagnosis: '', price: '', appointmentId: '' });
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
        setEditingReportId(null);
        setEditingReport({ title: '', diagnosis: '', price: '', appointmentId: '' });
    };

    const handleDownloadPDF = (report) => {
        setSelectedReport(report);
    };

    const handleCloseErrorModal = () => {
        setIsErrorModalOpen(false);
        setErrorMessage('');
    };

    return (
        <Box sx={{ margin: '20px', padding: '20px', backgroundColor: 'white', borderRadius: '10px' }}>
            <Typography variant="h4" align="center" gutterBottom style={{ marginTop: '20px', marginBottom: '20px' }}>
                Rapor Yönetimi
            </Typography>
            <Typography variant="h6" align="left" gutterBottom>
                Rapor Listesi
            </Typography>
            <TableContainer component={Paper} style={{ boxShadow: 'none' }}>
                <Table>
                    <TableHead style={{ backgroundColor: '#A855F7' }}>
                        <TableRow>
                            <TableCell style={{ color: 'white' }}>Başlık</TableCell>
                            <TableCell style={{ color: 'white' }}>Teşhis</TableCell>
                            <TableCell style={{ color: 'white' }}>Fiyat</TableCell>
                            <TableCell style={{ color: 'white' }}>Randevu</TableCell>
                            <TableCell style={{ color: 'white' }}>Aşılar</TableCell>
                            <TableCell style={{ color: 'white' }}>İşlemler</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {reports.length > 0 ? (
                            reports.map((report) => (
                                <TableRow key={report.id} id={`report-${report.id}`}>
                                    {editingReportId === report.id ? (
                                        <>
                                            <TableCell>
                                                <TextField
                                                    name="title"
                                                    value={editingReport.title}
                                                    onChange={handleEditChange}
                                                    fullWidth
                                                    placeholder="Başlık"
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <TextField
                                                    name="diagnosis"
                                                    value={editingReport.diagnosis}
                                                    onChange={handleEditChange}
                                                    fullWidth
                                                    placeholder="Teşhis"
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <TextField
                                                    name="price"
                                                    value={editingReport.price}
                                                    onChange={handleEditChange}
                                                    fullWidth
                                                    placeholder="Fiyat"
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <Autocomplete
                                                    options={appointments}
                                                    getOptionLabel={(option) => `${option.animal.name} - ${option.appointmentDate}`}
                                                    value={appointments.find(appointment => appointment.id === editingReport.appointmentId) || null}
                                                    onChange={handleEditAppointmentChange}
                                                    renderInput={(params) => <TextField {...params} label="Randevu" placeholder="Randevu seçiniz" />}
                                                />
                                            </TableCell>
                                            <TableCell>
                                                {report.vaccinationList && report.vaccinationList.map(vaccination => (
                                                    <Typography key={vaccination.id}>
                                                        {vaccination.name}
                                                    </Typography>
                                                ))}
                                            </TableCell>
                                            <TableCell>
                                                <IconButton onClick={() => handleSave(report.id)}>
                                                    <SaveIcon />
                                                </IconButton>
                                                <IconButton onClick={handleCancel}>
                                                    <CancelIcon />
                                                </IconButton>
                                            </TableCell>
                                        </>
                                    ) : (
                                        <>
                                            <TableCell>{report.title}</TableCell>
                                            <TableCell>{report.diagnosis}</TableCell>
                                            <TableCell>{report.price}</TableCell>
                                            <TableCell>{`${report.appointment?.animalName || ''} - ${report.appointment?.date || ''}`}</TableCell>
                                            <TableCell>
                                                {report.vaccinationList && report.vaccinationList.map(vaccination => (
                                                    <Typography key={vaccination.id}>
                                                        {vaccination.name}
                                                    </Typography>
                                                ))}
                                            </TableCell>
                                            <TableCell>
                                                <IconButton onClick={() => handleEdit(report)}>
                                                    <EditIcon />
                                                </IconButton>
                                                <IconButton onClick={() => handleDelete(report.id)}>
                                                    <DeleteIcon />
                                                </IconButton>
                                                <PDFDownloadLink
                                                    document={<PDFDocument report={report} />}
                                                    fileName={`report_${report.id}.pdf`}
                                                >
                                                    {({ blob, url, loading, error }) =>
                                                        loading ? 'Yükleniyor...' : <Button onClick={() => handleDownloadPDF(report)}>PDF İndir</Button>
                                                    }
                                                </PDFDownloadLink>
                                            </TableCell>
                                        </>
                                    )}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={6} align="center">Rapor bulunamadı</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={reports.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </TableContainer>
            <Typography variant="h6" align="left" gutterBottom style={{ marginTop: '20px' }}>
                Rapor Ekle
            </Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Başlık"
                    name="title"
                    value={newReport.title}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    required
                    placeholder="Başlık"
                />
                <TextField
                    label="Teşhis"
                    name="diagnosis"
                    value={newReport.diagnosis}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    required
                    placeholder="Teşhis"
                />
                <TextField
                    label="Fiyat"
                    name="price"
                    value={newReport.price}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    required
                    placeholder="Fiyat"
                />
                <Autocomplete
                    options={appointments}
                    getOptionLabel={(option) => `${option.animal.name} - ${option.appointmentDate}`}
                    value={appointments.find(appointment => appointment.id === newReport.appointmentId) || null}
                    onChange={handleAppointmentChange}
                    renderInput={(params) => <TextField {...params} label="Randevu" placeholder="Randevu seçiniz" margin="normal" required fullWidth />}
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

export default Report;
