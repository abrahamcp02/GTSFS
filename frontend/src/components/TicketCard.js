import React from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { Document, Page, View, Text, Image, StyleSheet } from '@react-pdf/renderer';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/TicketCard.css';

// Define styles for the PDF
const styles = StyleSheet.create({
  page: {
    padding: 40, // Increased padding for better print margins
    fontFamily: 'Helvetica',
    fontSize: 12,
    lineHeight: 1.5,
    flexDirection: 'column',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
    borderBottomStyle: 'solid',
    marginBottom: 10,
    paddingBottom: 10,
  },
  logo: {
    width: 190, // Increased logo size
    height: 190, // Increased logo size
  },
  qrCode: {
    width: 100,
    height: 100,
  },
  eventTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
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
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  detailLabel: {
    fontWeight: 'bold',
  },
});

const TicketPDF = ({ ticket }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Image style={styles.logo} src="https://i.ibb.co/3TPQ5dV/LOGO-GRUPO-DE-TEATRO-SAN-FRANCIS.png" />
        <View>
          <Text style={styles.eventTitle}>{ticket.performance_title}</Text>
          <Text style={styles.text}>{new Date(ticket.performance_date).toLocaleDateString()}</Text>
          <Text style={styles.text}>{new Date(ticket.performance_date).toLocaleTimeString()}</Text>
          <Text style={styles.text}>{ticket.venue}</Text>
        </View>
        <Image style={styles.qrCode} src={`https://api.qrserver.com/v1/create-qr-code/?data=${ticket.serial_number}&size=100x100`} />
      </View>
      <View style={styles.ticketInfo}>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Representación:</Text>
          <Text>{ticket.performance_name}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Fecha:</Text>
          <Text>{new Date(ticket.performance_date).toLocaleDateString()}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Hora:</Text>
          <Text>{new Date(ticket.performance_date).toLocaleTimeString()}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Asiento:</Text>
          <Text>{ticket.seat_number}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Fila:</Text>
          <Text>{ticket.row_number}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Precio:</Text>
          <Text>{ticket.price}€</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Identificador:</Text>
          <Text>{ticket.serial_number}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Comprado el:</Text>
          <Text>{new Date(ticket.purchased_at).toLocaleDateString()}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Comprado por:</Text>
          <Text>{ticket.user_name}</Text>
        </View>
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
