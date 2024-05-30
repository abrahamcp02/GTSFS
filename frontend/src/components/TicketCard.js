import React from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import 'bootstrap/dist/css/bootstrap.min.css';
import './TicketCard.css';

// Define styles for the PDF
const styles = StyleSheet.create({
  page: {
    backgroundColor: '#ffffff',
    padding: 20,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 240,
    height: 180,
  },
  qrCode: {
    width: 100,
    height: 100,
  },
  eventTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  text: {
    fontSize: 12,
    marginBottom: 5,
  },
  ticketInfo: {
    marginBottom: 10,
  },
  ticketDetail: {
    fontSize: 14,
    marginBottom: 5,
  },
  footer: {
    marginTop: 20,
    textAlign: 'center',
    fontSize: 12,
    color: '#555',
  },
});

const TicketPDF = ({ ticket }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Image style={styles.logo} src="https://i.ibb.co/3TPQ5dV/LOGO-GRUPO-DE-TEATRO-SAN-FRANCIS.png" />
        <Image style={styles.qrCode} src={`https://api.qrserver.com/v1/create-qr-code/?data=${ticket.serial_number}&size=100x100`} />
      </View>
      <Text style={styles.eventTitle}>{ticket.performance_title}</Text>
      <View style={styles.ticketInfo}>
        <Text style={styles.ticketDetail}>Representación: {ticket.performance_name}</Text>
        <Text style={styles.ticketDetail}>Fecha: {new Date(ticket.performance_date).toLocaleDateString()}</Text>
        <Text style={styles.ticketDetail}>Hora: {new Date(ticket.performance_date).toLocaleTimeString() }</Text>
        <Text style={styles.ticketDetail}>Asiento: {ticket.seat_number} Fila: {ticket.row_number}</Text>
        <Text style={styles.ticketDetail}>Precio: {ticket.price}€</Text>
        <Text style={styles.ticketDetail}>Identificador: {ticket.serial_number}</Text>
        <Text style={styles.ticketDetail}>Comprado el: {new Date(ticket.purchased_at).toLocaleDateString()}</Text>
        <Text style={styles.ticketDetail}>Comprado por: {ticket.user_name}</Text>
      </View>
      <Text style={styles.footer}>Gracias por apoyar al Grupo de Teatro San Francisco Solano!</Text>
    </Page>
  </Document>
);

const TicketCard = ({ ticket }) => {
  return (
    <div className="ticket-card card mb-4">
      <div className="card-body d-flex flex-column align-items-center">
        <h3 className="card-title">{ticket.performance_title}</h3>
        <div className="ticket-detail mb-2"><strong>Representación:</strong> {ticket.performance_name}</div>
        <div className="ticket-detail mb-2"><strong>Fecha:</strong> {new Date(ticket.performance_date).toLocaleDateString()}</div>
        <div className="ticket-detail mb-2"><strong>Hora:</strong> {new Date(ticket.performance_date).toLocaleTimeString()}</div>
        <div className="ticket-detail mb-2"><strong>Asiento:</strong> {ticket.seat_number}</div>
        <div className="ticket-detail mb-2"><strong>Fila:</strong> {ticket.row_number}</div>
        <div className="ticket-detail mb-2"><strong>Precio:</strong> {ticket.price}€</div>
        <div className="ticket-detail mb-2"><strong>Identificador:</strong> {ticket.serial_number}</div>
        <div className="ticket-detail mb-2"><strong>Comprado el:</strong> {new Date(ticket.purchased_at).toLocaleDateString()}</div>
        <PDFDownloadLink document={<TicketPDF ticket={ticket} />} fileName="ticket.pdf" className="btn btn-primary mt-3">
          {({ loading }) => (loading ? 'Cargando documento...' : 'Descargar PDF')}
        </PDFDownloadLink>
      </div>
    </div>
  );
};

export default TicketCard;
