import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image, Font } from '@react-pdf/renderer';
import logo from '../assets/pdflogo.png';
import font from '../assets/fonts/OpenSans-Regular.ttf';

Font.register({
    family: 'Open Sans',
    src: font
});

const styles = StyleSheet.create({
    page: {
        fontFamily: 'Open Sans',
        fontSize: 12,
        padding: 20,
        position: 'relative'
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20
    },
    header: {
        textAlign: 'center',
        flex: 1
    },
    headerTitle: {
        fontSize: 14,
    },
    headerId: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    section: {
        marginBottom: 10
    },
    image: {
        width: 50,
        height: 50,
        marginBottom: 10
    },
    table: {
        display: 'table',
        width: 'auto',
        borderStyle: 'solid',
        borderWidth: 1,
        borderRightWidth: 0,
        borderBottomWidth: 0,
    },
    tableRow: {
        flexDirection: 'row',
    },
    tableColHeader: {
        width: '100%',
        borderStyle: 'solid',
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0,
        backgroundColor: '#f2f2f2',
    },
    tableCol: {
        width: '100%',
        borderStyle: 'solid',
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0,
    },
    tableCellHeader: {
        margin: 5,
        fontSize: 12,
        fontWeight: 'bold'
    },
    tableCell: {
        margin: 5,
        fontSize: 10
    },
    watermark: {
        position: 'absolute',
        fontSize: 100,
        color: 'rgba(200, 200, 200, 0.5)',
        transform: 'rotate(-45deg)',
        top: '25%',
        left: '10%',
    },
    bottomSection: {
        position: 'absolute',
        bottom: 60,
        left: 20,
        right: 20,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    signature: {
        textAlign: 'left'
    }
});

const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const daysOfWeek = ["Pazar", "Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi"];
    const dayOfWeek = daysOfWeek[date.getDay()];
    return `${day.toString().padStart(2, '0')}-${month.toString().padStart(2, '0')}-${year} ${dayOfWeek}`;
};

const PDFDocument = ({ report }) => {
    if (!report) {
        return null;
    }

    return (
        <Document>
            <Page style={styles.page}>
                <Text style={styles.watermark}>Es Veteriner</Text>
                <View style={styles.headerContainer}>
                    <Image src={logo} style={styles.image} />
                    <View style={styles.header}>
                        <Text style={styles.headerTitle}>T.C</Text>
                        <Text style={styles.headerTitle}>Tarım ve Orman Bakanlığı</Text>
                        <Text style={styles.headerTitle}>Es Veteriner Kliniği</Text>
                    </View>
                    <Text style={styles.headerId}>No: #{report.id}</Text>
                </View>
                <View style={styles.section}>
                    <Text style={{ marginBottom: 5, fontWeight: 'bold' }}>Rapor Bilgileri:</Text>
                    <View style={styles.table}>
                        <View style={styles.tableRow}>
                            <View style={styles.tableColHeader}>
                                <Text style={styles.tableCellHeader}>No</Text>
                            </View>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>{report.title}</Text>
                            </View>
                        </View>
                        <View style={styles.tableRow}>
                            <View style={styles.tableColHeader}>
                                <Text style={styles.tableCellHeader}>Teşhis</Text>
                            </View>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>{report.diagnosis}</Text>
                            </View>
                        </View>
                        <View style={styles.tableRow}>
                            <View style={styles.tableColHeader}>
                                <Text style={styles.tableCellHeader}>Fiyat</Text>
                            </View>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>{report.price}</Text>
                            </View>
                        </View>
                        <View style={styles.tableRow}>
                            <View style={styles.tableColHeader}>
                                <Text style={styles.tableCellHeader}>Randevu</Text>
                            </View>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>{report.appointment.animalName} - {report.appointment.date}</Text>
                            </View>
                        </View>
                        <View style={styles.tableRow}>
                            <View style={styles.tableColHeader}>
                                <Text style={styles.tableCellHeader}>Müşteri Adı</Text>
                            </View>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>{report.appointment.customerName}</Text>
                            </View>
                        </View>
                        <View style={styles.tableRow}>
                            <View style={styles.tableColHeader}>
                                <Text style={styles.tableCellHeader}>Doktor Adı</Text>
                            </View>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>{report.appointment.doctorName}</Text>
                            </View>
                        </View>
                    </View>
                </View>
                {report.vaccinationList.length > 0 && (
                    <View style={styles.section}>
                        <Text style={{ marginBottom: 5, fontWeight: 'bold' }}>Aşı Bilgileri:</Text>
                        <View style={styles.table}>
                            <View style={styles.tableRow}>
                                <View style={styles.tableColHeader}>
                                    <Text style={styles.tableCellHeader}>Adı</Text>
                                </View>
                                <View style={styles.tableColHeader}>
                                    <Text style={styles.tableCellHeader}>Kodu</Text>
                                </View>
                                <View style={styles.tableColHeader}>
                                    <Text style={styles.tableCellHeader}>Koruma Başlangıç</Text>
                                </View>
                                <View style={styles.tableColHeader}>
                                    <Text style={styles.tableCellHeader}>Koruma Bitiş</Text>
                                </View>
                            </View>
                            {report.vaccinationList.map((vaccination, index) => (
                                <View style={styles.tableRow} key={index}>
                                    <View style={styles.tableCol}>
                                        <Text style={styles.tableCell}>{vaccination.name}</Text>
                                    </View>
                                    <View style={styles.tableCol}>
                                        <Text style={styles.tableCell}>{vaccination.code}</Text>
                                    </View>
                                    <View style={styles.tableCol}>
                                        <Text style={styles.tableCell}>{formatDate(vaccination.protectionStartDate)}</Text>
                                    </View>
                                    <View style={styles.tableCol}>
                                        <Text style={styles.tableCell}>{formatDate(vaccination.protectionFinishDate)}</Text>
                                    </View>
                                </View>
                            ))}
                        </View>
                    </View>
                )}
                <View style={styles.bottomSection}>
                    <View>
                        <Text>Rapor Tarihi: {formatDate(new Date().toISOString())}</Text>
                    </View>
                    <View style={styles.signature}>
                        <Text>Veteriner Hekim: {report.appointment.doctorName}</Text>
                        <Text>İmza</Text>
                    </View>
                </View>
            </Page>
        </Document>
    );
};

export default PDFDocument;
