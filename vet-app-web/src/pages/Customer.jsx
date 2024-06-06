import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    Paper, TextField, Button, IconButton, Box, TablePagination, Dialog, DialogTitle, DialogContent, DialogActions
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import { CUSTOMER_API } from '../endpoints';
import send from '../assets/send.png';

function Customer() {
    const [customers, setCustomers] = useState([]);
    const [newCustomer, setNewCustomer] = useState({
        name: '',
        phone: '',
        email: '',
        address: '',
        city: ''
    });
    const [editingCustomerId, setEditingCustomerId] = useState(null);
    const [editingCustomer, setEditingCustomer] = useState({
        name: '',
        phone: '',
        email: '',
        address: '',
        city: ''
    });
    const [searchName, setSearchName] = useState('');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [errorMessage, setErrorMessage] = useState('');
    const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);

    useEffect(() => {
        fetchCustomers();
    }, [page, rowsPerPage]);

    const fetchCustomers = () => {
        axios.get(CUSTOMER_API.GET_ALL, {
            params: {
                pageNumber: page,
                pageSize: rowsPerPage
            }
        })
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
        setNewCustomer(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditingCustomer(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(CUSTOMER_API.CREATE, newCustomer)
            .then(response => {
                fetchCustomers();
                setNewCustomer({ name: '', phone: '', email: '', address: '', city: '' });
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
        axios.delete(CUSTOMER_API.DELETE(id))
            .then(() => {
                fetchCustomers();
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

    const handleEdit = (customer) => {
        setEditingCustomerId(customer.id);
        setEditingCustomer({
            name: customer.name,
            phone: customer.phone,
            email: customer.email,
            address: customer.address,
            city: customer.city
        });
    };

    const handleSave = (id) => {
        axios.put(CUSTOMER_API.UPDATE(id), editingCustomer)
            .then(() => {
                fetchCustomers();
                setEditingCustomerId(null);
                setEditingCustomer({ name: '', phone: '', email: '', address: '', city: '' });
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
        setEditingCustomerId(null);
        setEditingCustomer({ name: '', phone: '', email: '', address: '', city: '' });
    };

    const handleSearchByName = (e) => {
        e.preventDefault();
        axios.get(CUSTOMER_API.SEARCH_BY_NAME(searchName, page, rowsPerPage))
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

    const handleCloseErrorModal = () => {
        setIsErrorModalOpen(false);
        setErrorMessage('');
    };

    return (
        <Box sx={{ margin: '20px', padding: '20px', backgroundColor: 'white', borderRadius: '10px' }}>
            <Typography variant="h4" align="center" gutterBottom style={{ marginTop: '20px', marginBottom: '20px' }}>
                Müşteri Yönetimi
            </Typography>
            <Typography variant="h6" align="left" gutterBottom>
                Müşteri Listesi
            </Typography>
            <Box display="flex" justifyContent="flex-end" alignItems="center" mb={2}>
                <TextField
                    label="Müşteri Adı ile Ara"
                    value={searchName}
                    onChange={(e) => setSearchName(e.target.value)}
                    variant="outlined"
                    size="small"
                    style={{ marginRight: '10px' }}
                />
                <Button variant="contained" color="primary" onClick={handleSearchByName}>
                    Ara
                </Button>
            </Box>
            <TableContainer component={Paper} style={{ boxShadow: 'none' }}>
                <Table>
                    <TableHead style={{ backgroundColor: '#A855F7' }}>
                        <TableRow>
                            <TableCell style={{ color: 'white' }}>Müşteri Adı</TableCell>
                            <TableCell style={{ color: 'white' }}>Telefon</TableCell>
                            <TableCell style={{ color: 'white' }}>Email</TableCell>
                            <TableCell style={{ color: 'white' }}>Adres</TableCell>
                            <TableCell style={{ color: 'white' }}>Şehir</TableCell>
                            <TableCell style={{ color: 'white' }}>İşlemler</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {customers.length > 0 ? (
                            customers.map((customer) => (
                                <TableRow key={customer.id}>
                                    {editingCustomerId === customer.id ? (
                                        <>
                                            <TableCell>
                                                <TextField
                                                    name="name"
                                                    value={editingCustomer.name}
                                                    onChange={handleEditChange}
                                                    fullWidth
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <TextField
                                                    name="phone"
                                                    value={editingCustomer.phone}
                                                    onChange={handleEditChange}
                                                    fullWidth
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <TextField
                                                    name="email"
                                                    value={editingCustomer.email}
                                                    onChange={handleEditChange}
                                                    fullWidth
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <TextField
                                                    name="address"
                                                    value={editingCustomer.address}
                                                    onChange={handleEditChange}
                                                    fullWidth
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <TextField
                                                    name="city"
                                                    value={editingCustomer.city}
                                                    onChange={handleEditChange}
                                                    fullWidth
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <IconButton onClick={() => handleSave(customer.id)}>
                                                    <SaveIcon />
                                                </IconButton>
                                                <IconButton onClick={handleCancel}>
                                                    <CancelIcon />
                                                </IconButton>
                                            </TableCell>
                                        </>
                                    ) : (
                                        <>
                                            <TableCell>{customer.name}</TableCell>
                                            <TableCell>{customer.phone}</TableCell>
                                            <TableCell>{customer.email}</TableCell>
                                            <TableCell>{customer.address}</TableCell>
                                            <TableCell>{customer.city}</TableCell>
                                            <TableCell>
                                                <IconButton onClick={() => handleEdit(customer)}>
                                                    <EditIcon />
                                                </IconButton>
                                                <IconButton onClick={() => handleDelete(customer.id)}>
                                                    <DeleteIcon />
                                                </IconButton>
                                            </TableCell>
                                        </>
                                    )}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={6} align="center">Müşteri bulunamadı</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
                <TablePagination
                    component="div"
                    count={customers.length}
                    page={page}
                    onPageChange={handleChangePage}
                    rowsPerPage={rowsPerPage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </TableContainer>
            <Typography variant="h6" align="left" gutterBottom>
                Müşteri Ekle
            </Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Müşteri Adı"
                    name="name"
                    value={newCustomer.name}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    required
                />
                <TextField
                    label="Telefon"
                    name="phone"
                    value={newCustomer.phone}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    required
                />
                <TextField
                    label="Email"
                    name="email"
                    value={newCustomer.email}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    required
                />
                <TextField
                    label="Adres"
                    name="address"
                    value={newCustomer.address}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    required
                />
                <TextField
                    label="Şehir"
                    name="city"
                    value={newCustomer.city}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    required
                />
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginTop: '20px' }}>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        sx={{ display: 'flex', alignItems: 'center' }}
                    >
                        Ekle
                        <img src={send} alt="Send" style={{ height: '20px', marginLeft: '10px' }} />
                    </Button>
                </Box>
            </form>
            <Dialog open={isErrorModalOpen} onClose={handleCloseErrorModal}>
                <DialogTitle>Hata</DialogTitle>
                <DialogContent>{errorMessage}</DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseErrorModal} color="#">
                        Kapat
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}

export default Customer;
