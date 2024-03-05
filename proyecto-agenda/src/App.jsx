import React, { useState } from 'react';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faTrash, faEye, faUser, faEnvelope, faPhone, faHouse, faMugSaucer } from '@fortawesome/free-solid-svg-icons';
import ContactDetail from './ContactDetail'; 



function App() {
  //estado para los contactos
  const [contacts, setContacts] = useState([]);
  //estado para el contacto que se está añadiendo
  const [currentContact, setCurrentContact] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    address: ''
  });


  // maneja el cambio en los inputs del formulario para actualizar el contacto actual
  const inputChange = (event) => {
    setCurrentContact({
      ...currentContact,
      [event.target.name]: event.target.value
    });
  }

  // añade un nuevo contacto a la lista de contactos
  const addContact = () => {
    if (currentContact.name.trim() !== '') {
      const newContact = {
        id: Date.now(),
        ...currentContact
      };
      const newContacts = [...contacts, newContact];
      setContacts(newContacts);
      setCurrentContact({
        name: '',
        email: '',
        phoneNumber: '',
        address: ''
      });
    }
  };

  // elimina un contacto de la lista de contactos basado en su ID
  const deleteContact = (contactId) => {
    const updatedContacts = contacts.filter(contact => contact.id !== contactId);
    setContacts(updatedContacts);
  }


  //estado para el texto de busqueda
  const [search, setSearch] = useState('');
 
  const [selectedContact, setSelectedContact] = useState(null); //estado para el contacto seleccionado y almacenamiento del mismo para ver detalle


  // muestra el detalle de un contacto seleccionado
  const seeDetail = (contactId) => {
    const selected = contacts.find(contact => contact.id === contactId);
    setSelectedContact(selected);
  }

  // Cierra el detalle del contacto
  const closeDetail = () => {
    setSelectedContact(null);
  }

  // Filtra los contactos basados en el texto de búsqueda
  const searchContact = () => {
    return contacts.filter(contact => contact.name.toLowerCase().startsWith(search.toLowerCase()));
  }

  
  return (
    <>
      <main></main>

      <div className='container'>
        <div>
          <h1>MIS CONTACTOS <FontAwesomeIcon icon={faMugSaucer} /> </h1>
        </div>

        {/* formulario para añadir nuevos contactos */}
        <div className='input-container'>
          <div className='icon'>
            <FontAwesomeIcon icon={faUser} />
            <FontAwesomeIcon icon={faEnvelope} />
            <FontAwesomeIcon icon={faPhone} />
            <FontAwesomeIcon icon={faHouse} />
          </div>
          <div>
            <input type="text" name="name" value={currentContact.name} onChange={inputChange} placeholder='Nombre' />
            <input type="email" name="email" value={currentContact.email} onChange={inputChange} placeholder='Correo Electrónico' />
            <input type="text" name="phoneNumber" value={currentContact.phoneNumber} onChange={inputChange} placeholder='Número de teléfono' />
            <input type="text" name="address" value={currentContact.address} onChange={inputChange} placeholder='Dirección' />
          </div>
          <button onClick={addContact}>Añadir contacto</button>
        </div>

        {/* barra de busqueda */}
        <div className="search-container">
          <input className="search-input" type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder='Buscar contacto' />
          <FontAwesomeIcon icon={faSearch} className="search-icon" />
        </div>

        {/* lista de contactos filtrados */}
        <div className="container-list-search">
          <ul>
            {search && searchContact().map((contact) => (
              <li key={contact.id}>
                <div className="contact-item">
                  <p className="contact-text">{contact.name}</p>
                  <div className="icon-container">
                    <FontAwesomeIcon className='fa-trash' icon={faTrash} onClick={() => deleteContact(contact.id)} />
                    <FontAwesomeIcon className='fa-eye' icon={faEye} onClick={() => seeDetail(contact.id)} />
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* lista de todos los contactos */}
        <div className="container-list">
          <ul>
            {contacts.map((contact) => (
              <li key={contact.id}>
                <div className="contact-item">
                  <p className="contact-text">{contact.name}</p>
                  <div className="icon-container">
                    <FontAwesomeIcon className='fa-trash' icon={faTrash} onClick={() => deleteContact(contact.id)} />
                    <FontAwesomeIcon className='fa-eye' icon={faEye} onClick={() => seeDetail(contact.id)} />
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* detalle del contacto seleccionado */}
        <div className="container-detail">
          {selectedContact && (
            <div className="contact-detail">
              <h2>Detalle del contacto</h2>
              <ContactDetail className="detail" contact={selectedContact} />
              <button onClick={closeDetail}>Cerrar</button>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default App;
