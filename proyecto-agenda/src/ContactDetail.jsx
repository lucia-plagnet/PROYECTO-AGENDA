import React from 'react';

function ContactDetail({ contact }) {
  return (
    <div>
      <p><strong>Nombre:</strong> {contact.name}</p>
      <p><strong>Correo electronico:</strong>{contact.email}</p>
      <p><strong>Número de teléfono:</strong> {contact.phoneNumber}</p>
      <p><strong>Dirección:</strong> {contact.address}</p>
    </div>
  );
}

export default ContactDetail;