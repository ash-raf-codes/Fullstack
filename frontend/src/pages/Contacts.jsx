import { useState, useEffect } from 'react'
import ContactList from '../components/ContactList'
import ContactForm from '../components/ContactForm'

function Contacts() {
  const [contacts, setContacts] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentContact, setCurrentContact] = useState({})

  useEffect(() => {
    fetchContacts()
  }, [])

  const fetchContacts = async () => {
    const response = await fetch('http://localhost:5000/contacts')
    const data = await response.json()
    setContacts(data.contacts)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setCurrentContact({})
  }

  const openCreateModal = () => {
    if (!isModalOpen) setIsModalOpen(true)
  }

  const openEditModal = (contact) => {
    if (isModalOpen) return
    setCurrentContact(contact)
    setIsModalOpen(true)
  }

  const onUpdate = () => {
    closeModal()
    fetchContacts()
  }

  return (
    <div className="contacts-page">
      <h2>Contacts</h2>
      <ContactList contacts={contacts} updateContact={openEditModal} updateCallBack={onUpdate}/>
      <button onClick={openCreateModal}>Create New Contact</button>
      { isModalOpen && <div className="modal">
          <div className="modal-content">
              <span className="close" onClick={closeModal}>&times;</span>
              <ContactForm existingContact={currentContact} updateCallBack={onUpdate}/>
          </div>
      </div>
      }
    </div>
  )
}

export default Contacts