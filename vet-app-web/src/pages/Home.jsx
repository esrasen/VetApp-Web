import React, { useEffect, useState } from 'react';
import { Container, Grid, Paper, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Bar, Pie, Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement, LineElement } from 'chart.js';
import API_BASE_URL from '../config';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement, LineElement);

function Home() {
    const [customerCount, setCustomerCount] = useState(0);
    const [animalCount, setAnimalCount] = useState(0);
    const [doctorCount, setDoctorCount] = useState(0);
    const [appointmentCount, setAppointmentCount] = useState(0);
    const [vaccinationCount, setVaccinationCount] = useState(0);
    const [reportCount, setReportCount] = useState(0);

    useEffect(() => {
        axios.get(`${API_BASE_URL}/customers`)
            .then(response => setCustomerCount(response.data.totalElements))
            .catch(error => console.error('API error:', error));

        axios.get(`${API_BASE_URL}/animals`)
            .then(response => setAnimalCount(response.data.totalElements))
            .catch(error => console.error('API error:', error));

        axios.get(`${API_BASE_URL}/doctors`)
            .then(response => setDoctorCount(response.data.totalElements))
            .catch(error => console.error('API error:', error));

        axios.get(`${API_BASE_URL}/appointments`)
            .then(response => setAppointmentCount(response.data.totalElements))
            .catch(error => console.error('API error:', error));

        axios.get(`${API_BASE_URL}/vaccinations`)
            .then(response => setVaccinationCount(response.data.totalElements))
            .catch(error => console.error('API error:', error));

        axios.get(`${API_BASE_URL}/reports`)
            .then(response => setReportCount(response.data.totalElements))
            .catch(error => console.error('API error:', error));
    }, []);

    const barData = {
        labels: ['Müşteriler', 'Hayvanlar', 'Doktorlar', 'Randevular', 'Aşılar', 'Raporlar'],
        datasets: [
            {
                label: 'Toplam Sayı',
                data: [customerCount, animalCount, doctorCount, appointmentCount, vaccinationCount, reportCount],
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    };

    const pieData = {
        labels: ['Müşteriler', 'Hayvanlar', 'Doktorlar', 'Randevular', 'Aşılar', 'Raporlar'],
        datasets: [
            {
                label: 'Toplam Sayı',
                data: [customerCount, animalCount, doctorCount, appointmentCount, vaccinationCount, reportCount],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    const lineData = {
        labels: ['Müşteriler', 'Hayvanlar', 'Doktorlar', 'Randevular', 'Aşılar', 'Raporlar'],
        datasets: [
            {
                label: 'Toplam Sayı',
                data: [customerCount, animalCount, doctorCount, appointmentCount, vaccinationCount, reportCount],
                fill: false,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'right',
            },
            title: {
                display: true,
                text: 'Veteriner Yönetim Sistemi İstatistikleri',
            },
        },
    };

    const chartContainerStyle = { height: '300px' };

    return (
        <Container maxWidth="lg" style={{ marginTop: '20px' }}>
            <Typography variant="h4" align="center" gutterBottom>Veteriner Yönetim Sistemi</Typography>
            <Grid container spacing={3} style={{ marginTop: '20px' }}>
                <Grid item xs={12} sm={6} md={4}>
                    <Paper style={{ padding: '20px', textAlign: 'center' }}>
                        <Typography variant="h6">Müşteri Yönetimi</Typography>
                        <Button variant="contained" color="primary" component={Link} to="/customers">
                            Müşteri Yönetimine Git
                        </Button>
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <Paper style={{ padding: '20px', textAlign: 'center' }}>
                        <Typography variant="h6">Hayvan Yönetimi</Typography>
                        <Button variant="contained" color="primary" component={Link} to="/animals">
                            Hayvan Yönetimine Git
                        </Button>
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <Paper style={{ padding: '20px', textAlign: 'center' }}>
                        <Typography variant="h6">Doktor Yönetimi</Typography>
                        <Button variant="contained" color="primary" component={Link} to="/doctors">
                            Doktor Yönetimine Git
                        </Button>
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <Paper style={{ padding: '20px', textAlign: 'center' }}>
                        <Typography variant="h6">Randevu Yönetimi</Typography>
                        <Button variant="contained" color="primary" component={Link} to="/appointments">
                            Randevu Yönetimine Git
                        </Button>
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <Paper style={{ padding: '20px', textAlign: 'center' }}>
                        <Typography variant="h6">Aşı Yönetimi</Typography>
                        <Button variant="contained" color="primary" component={Link} to="/vaccinations">
                            Aşı Yönetimine Git
                        </Button>
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <Paper style={{ padding: '20px', textAlign: 'center' }}>
                        <Typography variant="h6">Rapor Yönetimi</Typography>
                        <Button variant="contained" color="primary" component={Link} to="/reports">
                            Rapor Yönetimine Git
                        </Button>
                    </Paper>
                </Grid>
            </Grid>
            <Typography variant="h5" align="center" gutterBottom style={{ marginTop: '40px' }}>
                İstatistikler
            </Typography>
            <Grid container spacing={3} style={{ marginTop: '20px' }}>
                <Grid item xs={12} md={4}>
                    <Paper style={{ padding: '20px' }}>
                        <div style={chartContainerStyle}>
                            <Bar data={barData} options={options} />
                        </div>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Paper style={{ padding: '20px' }}>
                        <div style={chartContainerStyle}>
                            <Pie data={pieData} options={options} />
                        </div>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Paper style={{ padding: '20px' }}>
                        <div style={chartContainerStyle}>
                            <Line data={lineData} options={options} />
                        </div>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
}

export default Home;
