import { useState, useEffect } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import ContactList from '../components/ContactList'
import ContactForm from '../components/ContactForm'

function Contacts() {
  const [contacts, setContacts] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentContact, setCurrentContact] = useState({})
  const { getAccessTokenSilently } = useAuth0()

  useEffect(() => {
    fetchContacts()
  }, [])

  const fetchContacts = async () => {
    try {
      const token = await getAccessTokenSilently()
      const response = await fetch('http://localhost:5000/api/contacts', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })
      const data = await response.json()
      setContacts(data)
    } catch (error) {
      console.error('Error fetching contacts:', error)
    }
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

  const createContact = async (contactData) => {
    try {
      const token = await getAccessTokenSilently()
      const response = await fetch('http://localhost:5000/api/create_contact', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(contactData)
      })
      if (response.ok) {
        fetchContacts() // Refresh the contact list
      }
    } catch (error) {
      console.error('Error creating contact:', error)
    }
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
              <ContactForm existingContact={currentContact} updateCallBack={onUpdate} onSubmit={createContact}/>
          </div>
      </div>
      }
    </div>
  )
}

export default Contacts