import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    Paper, TextField, Button, IconButton, MenuItem, Box, TablePagination, Autocomplete, FormControl, InputLabel, Select, Dialog, DialogTitle, DialogContent, DialogActions
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import { ANIMAL_API, CUSTOMER_API } from '../endpoints';
import send from '../assets/send.png';

function Animal() {
    const [animals, setAnimals] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [newAnimal, setNewAnimal] = useState({
        name: '',
        species: '',
        breed: '',
        gender: '',
        colour: '',
        dateOfBirth: '',
        customerId: ''
    });
    const [editingAnimalId, setEditingAnimalId] = useState(null);
    const [editingAnimal, setEditingAnimal] = useState({
        name: '',
        species: '',
        breed: '',
        gender: '',
        colour: '',
        dateOfBirth: '',
        customerId: ''
    });
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [searchType, setSearchType] = useState('animal');
    const [searchQuery, setSearchQuery] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);

    useEffect(() => {
        fetchAnimals();
        fetchCustomers();
    }, [page, rowsPerPage]);

    const fetchAnimals = () => {
        axios.get(ANIMAL_API.GET_ALL, {
            params: {
                pageNumber: page,
                pageSize: rowsPerPage
            }
        })
            .then(response => {
                if (response.data && response.data.content) {
                    setAnimals(response.data.content);
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

    const fetchCustomers = () => {
        axios.get(CUSTOMER_API.GET_ALL)
            .then(response => {
                if (response.data && response.data.content) {
                    setCustomers(response.data.content);
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

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewAnimal(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditingAnimal(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleCustomerChange = (event, newValue) => {
        if (newValue) {
            setNewAnimal(prevState => ({
                ...prevState,
                customerId: newValue.id
            }));
        } else {
            setNewAnimal(prevState => ({
                ...prevState,
                customerId: ''
            }));
        }
    };

    const handleEditCustomerChange = (event, newValue) => {
        if (newValue) {
            setEditingAnimal(prevState => ({
                ...prevState,
                customerId: newValue.id
            }));
        } else {
            setEditingAnimal(prevState => ({
                ...prevState,
                customerId: ''
            }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(ANIMAL_API.CREATE, {
            ...newAnimal,
            customer: { id: newAnimal.customerId }
        })
            .then(response => {
                fetchAnimals();
                setNewAnimal({ name: '', species: '', breed: '', gender: '', colour: '', dateOfBirth: '', customerId: '' });
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
        axios.delete(ANIMAL_API.DELETE(id))
            .then(() => {
                fetchAnimals();
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

    const handleEdit = (animal) => {
        setEditingAnimalId(animal.id);
        setEditingAnimal({
            name: animal.name,
            species: animal.species,
            breed: animal.breed,
            gender: animal.gender,
            colour: animal.colour,
            dateOfBirth: animal.dateOfBirth,
            customerId: animal.customer.id
        });
    };

    const handleSave = (id) => {
        axios.put(ANIMAL_API.UPDATE(id), {
            ...editingAnimal,
            customer: { id: editingAnimal.customerId }
        })
            .then(() => {
                fetchAnimals();
                setEditingAnimalId(null);
                setEditingAnimal({ name: '', species: '', breed: '', gender: '', colour: '', dateOfBirth: '', customerId: '' });
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
        setEditingAnimalId(null);
        setEditingAnimal({ name: '', species: '', breed: '', gender: '', colour: '', dateOfBirth: '', customerId: '' });
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleSearchTypeChange = (e) => {
        setSearchType(e.target.value);
    };

    const handleSearch = () => {
        if (searchType === 'animal') {
            axios.get(ANIMAL_API.SEARCH_BY_NAME(searchQuery, page, rowsPerPage))
                .then(response => {
                    if (response.data && response.data.content) {
                        setAnimals(response.data.content);
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
        } else if (searchType === 'customer') {
            axios.get(ANIMAL_API.SEARCH_BY_CUSTOMER(searchQuery, page, rowsPerPage))
                .then(response => {
                    if (response.data && response.data.content) {
                        setAnimals(response.data.content);
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
        }
    };

    const handleCloseErrorModal = () => {
        setIsErrorModalOpen(false);
        setErrorMessage('');
    };

    return (
        <Box sx={{ margin: '20px', padding: '20px', backgroundColor: 'white', borderRadius: '10px' }}>
            <Typography variant="h4" align="center" gutterBottom style={{ marginTop: '20px', marginBottom: '20px' }}>
                Hayvan Yönetimi
            </Typography>
            <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="h6" align="left" gutterBottom>
                    Hayvan Listesi
                </Typography>
                <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} alignItems="center" width={{ xs: '100%', md: 'auto' }}>
                    <FormControl variant="outlined" sx={{ minWidth: 120, marginRight: { xs: 0, md: 2 }, marginBottom: { xs: 2, md: 0 }, width: { xs: '100%', md: 'auto' } }}>
                        <InputLabel>Arama Türü</InputLabel>
                        <Select value={searchType} onChange={handleSearchTypeChange} label="Arama Türü">
                            <MenuItem value="animal">Hayvan Adı</MenuItem>
                            <MenuItem value="customer">Müşteri Adı</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField
                        label={searchType === 'animal' ? 'Hayvan Adı ile Ara' : 'Müşteri Adı ile Ara'}
                        value={searchQuery}
                        onChange={handleSearchChange}
                        variant="outlined"
                        sx={{ marginRight: { xs: 0, md: 2 }, marginBottom: { xs: 2, md: 0 }, width: { xs: '100%', md: 'auto' } }}
                    />
                    <Button variant="contained" color="primary" sx={{ width: { xs: '100%', md: 'auto' } }} onClick={handleSearch}>
                        Ara
                    </Button>
                </Box>
            </Box>
            <TableContainer component={Paper} style={{ boxShadow: 'none' }}>
                <Table>
                    <TableHead style={{ backgroundColor: '#A855F7' }}>
                        <TableRow>
                            <TableCell style={{ color: 'white' }}>Adı</TableCell>
                            <TableCell style={{ color: 'white' }}>Türü</TableCell>
                            <TableCell style={{ color: 'white' }}>Cinsi</TableCell>
                            <TableCell style={{ color: 'white' }}>Cinsiyeti</TableCell>
                            <TableCell style={{ color: 'white' }}>Rengi</TableCell>
                            <TableCell style={{ color: 'white' }}>Doğum Tarihi</TableCell>
                            <TableCell style={{ color: 'white' }}>Müşteri</TableCell>
                            <TableCell style={{ color: 'white' }}>İşlemler</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {animals.length > 0 ? (
                            animals.map((animal) => (
                                <TableRow key={animal.id}>
                                    {editingAnimalId === animal.id ? (
                                        <>
                                            <TableCell>
                                                <TextField
                                                    name="name"
                                                    value={editingAnimal.name}
                                                    onChange={handleEditChange}
                                                    fullWidth
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <TextField
                                                    name="species"
                                                    value={editingAnimal.species}
                                                    onChange={handleEditChange}
                                                    fullWidth
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <TextField
                                                    name="breed"
                                                    value={editingAnimal.breed}
                                                    onChange={handleEditChange}
                                                    fullWidth
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <TextField
                                                    name="gender"
                                                    value={editingAnimal.gender}
                                                    onChange={handleEditChange}
                                                    fullWidth
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <TextField
                                                    name="colour"
                                                    value={editingAnimal.colour}
                                                    onChange={handleEditChange}
                                                    fullWidth
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <TextField
                                                    name="dateOfBirth"
                                                    type="date"
                                                    value={editingAnimal.dateOfBirth}
                                                    onChange={handleEditChange}
                                                    fullWidth
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <Autocomplete
                                                    options={customers}
                                                    getOptionLabel={(option) => option.name}
                                                    value={customers.find(customer => customer.id === editingAnimal.customerId) || null}
                                                    onChange={handleEditCustomerChange}
                                                    renderInput={(params) => <TextField {...params} label="Müşteri" />}
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <IconButton onClick={() => handleSave(animal.id)}>
                                                    <SaveIcon />
                                                </IconButton>
                                                <IconButton onClick={handleCancel}>
                                                    <CancelIcon />
                                                </IconButton>
                                            </TableCell>
                                        </>
                                    ) : (
                                        <>
                                            <TableCell>{animal.name}</TableCell>
                                            <TableCell>{animal.species}</TableCell>
                                            <TableCell>{animal.breed}</TableCell>
                                            <TableCell>{animal.gender}</TableCell>
                                            <TableCell>{animal.colour}</TableCell>
                                            <TableCell>{animal.dateOfBirth}</TableCell>
                                            <TableCell>{animal.customer.name}</TableCell>
                                            <TableCell>
                                                <IconButton onClick={() => handleEdit(animal)}>
                                                    <EditIcon />
                                                </IconButton>
                                                <IconButton onClick={() => handleDelete(animal.id)}>
                                                    <DeleteIcon />
                                                </IconButton>
                                            </TableCell>
                                        </>
                                    )}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={8} align="center">Hayvan bulunamadı</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={animals.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </TableContainer>
            <Typography variant="h6" align="left" gutterBottom style={{ marginTop: '20px' }}>
                Hayvan Ekle
            </Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Adı"
                    name="name"
                    value={newAnimal.name}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    required
                />
                <TextField
                    label="Türü"
                    name="species"
                    value={newAnimal.species}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    required
                />
                <TextField
                    label="Cinsi"
                    name="breed"
                    value={newAnimal.breed}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    required
                />
                <TextField
                    label="Cinsiyeti"
                    name="gender"
                    value={newAnimal.gender}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    required
                />
                <TextField
                    label="Rengi"
                    name="colour"
                    value={newAnimal.colour}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    required
                />
                <TextField
                    label="Doğum Tarihi"
                    name="dateOfBirth"
                    type="date"
                    value={newAnimal.dateOfBirth}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    required
                />
                <Autocomplete
                    options={customers}
                    getOptionLabel={(option) => option.name}
                    value={customers.find(customer => customer.id === newAnimal.customerId) || null}
                    onChange={handleCustomerChange}
                    renderInput={(params) => <TextField {...params} label="Müşteri" margin="normal" required fullWidth />}
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

export default Animal;
