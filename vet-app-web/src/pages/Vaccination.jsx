import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    Paper, TextField, Button, IconButton, Autocomplete, TablePagination, Dialog, DialogTitle, DialogContent, DialogActions
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import { VACCINATION_API, ANIMAL_API, REPORT_API } from '../endpoints';
import send from '../assets/send.png';

function Vaccination() {
    const [vaccinations, setVaccinations] = useState([]);
    const [animals, setAnimals] = useState([]);
    const [reports, setReports] = useState([]);
    const [newVaccination, setNewVaccination] = useState({
        name: '',
        code: '',
        protectionStartDate: '',
        protectionFinishDate: '',
        animalWithoutCustomer: {
            id: '',
            name: '',
            species: '',
            breed: '',
            gender: '',
            dateOfBirth: '',
            colour: ''
        },
        reportId: null
    });
    const [editingVaccinationId, setEditingVaccinationId] = useState(null);
    const [editingVaccination, setEditingVaccination] = useState({
        name: '',
        code: '',
        protectionStartDate: '',
        protectionFinishDate: '',
        animalWithoutCustomer: {
            id: '',
            name: '',
            species: '',
            breed: '',
            gender: '',
            dateOfBirth: '',
            colour: ''
        },
        reportId: null
    });
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [searchName, setSearchName] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);

    useEffect(() => {
        fetchVaccinations();
        fetchAnimals();
        fetchReports();
    }, [page, rowsPerPage]);

    const fetchVaccinations = () => {
        axios.get(VACCINATION_API.GET_ALL, {
            params: {
                pageNumber: page,
                pageSize: rowsPerPage
            }
        })
            .then(response => {
                if (response.data && response.data.content) {
                    setVaccinations(response.data.content);
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

    const fetchAnimals = () => {
        axios.get(ANIMAL_API.GET_ALL)
            .then(response => {
                if (response.data && response.data.content) {
                    setAnimals(response.data.content);
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

    const fetchReports = () => {
        axios.get(REPORT_API.GET_ALL)
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

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewVaccination(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditingVaccination(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleAnimalChange = (event, newValue) => {
        if (newValue) {
            setNewVaccination(prevState => ({
                ...prevState,
                animalWithoutCustomer: {
                    id: newValue.id,
                    name: newValue.name,
                    species: newValue.species,
                    breed: newValue.breed,
                    gender: newValue.gender,
                    dateOfBirth: newValue.dateOfBirth,
                    colour: newValue.colour
                }
            }));
        } else {
            setNewVaccination(prevState => ({
                ...prevState,
                animalWithoutCustomer: {
                    id: '',
                    name: '',
                    species: '',
                    breed: '',
                    gender: '',
                    dateOfBirth: '',
                    colour: ''
                }
            }));
        }
    };

    const handleEditAnimalChange = (event, newValue) => {
        if (newValue) {
            setEditingVaccination(prevState => ({
                ...prevState,
                animalWithoutCustomer: {
                    id: newValue.id,
                    name: newValue.name,
                    species: newValue.species,
                    breed: newValue.breed,
                    gender: newValue.gender,
                    dateOfBirth: newValue.dateOfBirth,
                    colour: newValue.colour
                }
            }));
        } else {
            setEditingVaccination(prevState => ({
                ...prevState,
                animalWithoutCustomer: {
                    id: '',
                    name: '',
                    species: '',
                    breed: '',
                    gender: '',
                    dateOfBirth: '',
                    colour: ''
                }
            }));
        }
    };

    const handleReportChange = (event, newValue) => {
        if (newValue) {
            setNewVaccination(prevState => ({
                ...prevState,
                reportId: newValue.id
            }));
        } else {
            setNewVaccination(prevState => ({
                ...prevState,
                reportId: null
            }));
        }
    };

    const handleEditReportChange = (event, newValue) => {
        if (newValue) {
            setEditingVaccination(prevState => ({
                ...prevState,
                reportId: newValue.id
            }));
        } else {
            setEditingVaccination(prevState => ({
                ...prevState,
                reportId: null
            }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formattedNewVaccination = {
            ...newVaccination,
            protectionStartDate: new Date(newVaccination.protectionStartDate).toISOString().split('T')[0],
            protectionFinishDate: new Date(newVaccination.protectionFinishDate).toISOString().split('T')[0]
        };
        axios.post(VACCINATION_API.CREATE, formattedNewVaccination)
            .then(response => {
                fetchVaccinations();
                setNewVaccination({
                    name: '', code: '', protectionStartDate: '', protectionFinishDate: '', animalWithoutCustomer: {
                        id: '', name: '', species: '', breed: '', gender: '', dateOfBirth: '', colour: ''
                    }, reportId: null
                });
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
        axios.delete(VACCINATION_API.DELETE(id))
            .then(() => {
                fetchVaccinations();
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

    const handleEdit = (vaccination) => {
        setEditingVaccinationId(vaccination.id);
        setEditingVaccination({
            name: vaccination.name,
            code: vaccination.code,
            protectionStartDate: vaccination.protectionStartDate,
            protectionFinishDate: vaccination.protectionFinishDate,
            animalWithoutCustomer: {
                id: vaccination.animal.id,
                name: vaccination.animal.name,
                species: vaccination.animal.species,
                breed: vaccination.animal.breed,
                gender: vaccination.animal.gender,
                dateOfBirth: vaccination.animal.dateOfBirth,
                colour: vaccination.animal.colour
            },
            reportId: vaccination.report ? vaccination.report.id : null
        });
    };

    const handleSave = (id) => {
        const formattedEditingVaccination = {
            ...editingVaccination,
            protectionStartDate: new Date(editingVaccination.protectionStartDate).toISOString().split('T')[0],
            protectionFinishDate: new Date(editingVaccination.protectionFinishDate).toISOString().split('T')[0]
        };
        axios.put(VACCINATION_API.UPDATE(id), formattedEditingVaccination)
            .then(response => {
                fetchVaccinations();
                setEditingVaccinationId(null);
                setEditingVaccination({
                    name: '', code: '', protectionStartDate: '', protectionFinishDate: '', animalWithoutCustomer: {
                        id: '', name: '', species: '', breed: '', gender: '', dateOfBirth: '', colour: ''
                    }, reportId: null
                });
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
        setEditingVaccinationId(null);
        setEditingVaccination({
            name: '', code: '', protectionStartDate: '', protectionFinishDate: '', animalWithoutCustomer: {
                id: '', name: '', species: '', breed: '', gender: '', dateOfBirth: '', colour: ''
            }, reportId: null
        });
    };

    const handleSearchByDateRange = () => {
        axios.get(VACCINATION_API.SEARCH_BY_RANGE(startDate, endDate, page, rowsPerPage))
            .then(response => {
                if (response.data && response.data.content) {
                    setVaccinations(response.data.content);
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

    const handleSearchByName = () => {
        axios.get(VACCINATION_API.SEARCH_BY_NAME(searchName, page, rowsPerPage))
            .then(response => {
                if (response.data && response.data.content) {
                    setVaccinations(response.data.content);
                } else {
                    setErrorMessage('API response is not an array');
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

    const handleCloseErrorModal = () => {
        setIsErrorModalOpen(false);
        setErrorMessage('');
    };

    return (
        <Box sx={{ margin: '20px', padding: '20px', backgroundColor: 'white', borderRadius: '10px' }}>
            <Typography variant="h4" align="center" gutterBottom style={{ marginTop: '20px', marginBottom: '20px' }}>
                Aşı Yönetimi
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: 'center', width: { xs: '100%', md: 'auto' } }}>
                    <TextField
                        label="Hayvan Adı ile Ara"
                        value={searchName}
                        onChange={(e) => setSearchName(e.target.value)}
                        variant="outlined"
                        size="small"
                        sx={{ width: { xs: '100%', md: 'auto' }, marginBottom: { xs: '10px', md: 0 }, marginRight: { md: '10px' } }}
                    />
                    <Button variant="contained" color="primary" onClick={handleSearchByName} sx={{ width: { xs: '100%', md: 'auto' }, marginBottom: { xs: '10px', md: 0 } }}>
                        Ara
                    </Button>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: 'center', width: { xs: '100%', md: 'auto' } }}>
                    <TextField
                        label="Başlangıç Tarihi"
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        variant="outlined"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        sx={{ width: { xs: '100%', md: 'auto' }, marginBottom: { xs: '10px', md: 0 }, marginRight: { md: '20px' } }}
                    />
                    <TextField
                        label="Bitiş Tarihi"
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        variant="outlined"
                        sx={{ width: { xs: '100%', md: 'auto' }, marginBottom: { xs: '10px', md: 0 }, marginRight: { md: '20px' } }}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <Button variant="contained" color="primary" onClick={handleSearchByDateRange} sx={{ width: { xs: '100%', md: 'auto' } }}>
                        Tarihe Göre Ara
                    </Button>
                </Box>
            </Box>

            <TableContainer component={Paper} style={{ boxShadow: 'none' }}>
                <Table>
                    <TableHead style={{ backgroundColor: '#A855F7' }}>
                        <TableRow>
                            <TableCell style={{ color: 'white' }}>Aşı Adı</TableCell>
                            <TableCell style={{ color: 'white' }}>Kod</TableCell>
                            <TableCell style={{ color: 'white' }}>Koruma Başlangıç Tarihi</TableCell>
                            <TableCell style={{ color: 'white' }}>Koruma Bitiş Tarihi</TableCell>
                            <TableCell style={{ color: 'white' }}>Hayvan</TableCell>
                            <TableCell style={{ color: 'white' }}>Rapor</TableCell>
                            <TableCell style={{ color: 'white' }}>İşlemler</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {vaccinations.length > 0 ? (
                            vaccinations.map((vaccination) => (
                                <TableRow key={vaccination.id}>
                                    {editingVaccinationId === vaccination.id ? (
                                        <>
                                            <TableCell>
                                                <TextField
                                                    name="name"
                                                    value={editingVaccination.name}
                                                    onChange={handleEditChange}
                                                    fullWidth
                                                    placeholder="Aşı Adı"
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <TextField
                                                    name="code"
                                                    value={editingVaccination.code}
                                                    onChange={handleEditChange}
                                                    fullWidth
                                                    placeholder="Kod"
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <TextField
                                                    name="protectionStartDate"
                                                    type="date"
                                                    value={editingVaccination.protectionStartDate}
                                                    onChange={handleEditChange}
                                                    fullWidth
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                    placeholder="Koruma Başlangıç Tarihi"
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <TextField
                                                    name="protectionFinishDate"
                                                    type="date"
                                                    value={editingVaccination.protectionFinishDate}
                                                    onChange={handleEditChange}
                                                    fullWidth
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                    placeholder="Koruma Bitiş Tarihi"
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <Autocomplete
                                                    options={animals}
                                                    getOptionLabel={(option) => option.name}
                                                    value={animals.find(animal => animal.id === editingVaccination.animalWithoutCustomer.id) || null}
                                                    onChange={handleEditAnimalChange}
                                                    renderInput={(params) => <TextField {...params} label="Hayvan" placeholder="Hayvan seçiniz" />}
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <Autocomplete
                                                    options={reports}
                                                    getOptionLabel={(option) => option.title}
                                                    value={reports.find(report => report.id === editingVaccination.reportId) || null}
                                                    onChange={handleEditReportChange}
                                                    renderInput={(params) => <TextField {...params} label="Rapor" placeholder="Rapor seçiniz" />}
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <IconButton onClick={() => handleSave(vaccination.id)}>
                                                    <SaveIcon />
                                                </IconButton>
                                                <IconButton onClick={handleCancel}>
                                                    <CancelIcon />
                                                </IconButton>
                                            </TableCell>
                                        </>
                                    ) : (
                                        <>
                                            <TableCell>{vaccination.name}</TableCell>
                                            <TableCell>{vaccination.code}</TableCell>
                                            <TableCell>{vaccination.protectionStartDate}</TableCell>
                                            <TableCell>{vaccination.protectionFinishDate}</TableCell>
                                            <TableCell>{vaccination.animal.name}</TableCell>
                                            <TableCell>{vaccination.report ? vaccination.report.title : 'Yok'}</TableCell>
                                            <TableCell>
                                                <IconButton onClick={() => handleEdit(vaccination)}>
                                                    <EditIcon />
                                                </IconButton>
                                                <IconButton onClick={() => handleDelete(vaccination.id)}>
                                                    <DeleteIcon />
                                                </IconButton>
                                            </TableCell>
                                        </>
                                    )}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={7} align="center">Aşı bulunamadı</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 50]}
                    component="div"
                    count={vaccinations.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </TableContainer>
            <Typography variant="h6" align="left" gutterBottom style={{ marginTop: '20px' }}>
                Aşı Ekle
            </Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Aşı Adı"
                    name="name"
                    value={newVaccination.name}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    required
                    placeholder="Aşı Adı"
                />
                <TextField
                    label="Kod"
                    name="code"
                    value={newVaccination.code}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    required
                    placeholder="Kod"
                />
                <TextField
                    label="Koruma Başlangıç Tarihi"
                    name="protectionStartDate"
                    type="date"
                    value={newVaccination.protectionStartDate}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    required
                    InputLabelProps={{
                        shrink: true,
                    }}
                    placeholder="Koruma Başlangıç Tarihi"
                />
                <TextField
                    label="Koruma Bitiş Tarihi"
                    name="protectionFinishDate"
                    type="date"
                    value={newVaccination.protectionFinishDate}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    required
                    InputLabelProps={{
                        shrink: true,
                    }}
                    placeholder="Koruma Bitiş Tarihi"
                />
                <Autocomplete
                    options={animals}
                    getOptionLabel={(option) => option.name}
                    value={animals.find(animal => animal.id === newVaccination.animalWithoutCustomer.id) || null}
                    onChange={handleAnimalChange}
                    renderInput={(params) => <TextField {...params} label="Hayvan" placeholder="Hayvan seçiniz" margin="normal" required fullWidth />}
                />
                <Autocomplete
                    options={reports}
                    getOptionLabel={(option) => option.title}
                    value={reports.find(report => report.id === newVaccination.reportId) || null}
                    onChange={handleReportChange}
                    renderInput={(params) => <TextField {...params} label="Rapor" placeholder="Rapor seçiniz" margin="normal" fullWidth />}
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

export default Vaccination;
