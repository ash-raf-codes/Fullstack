import { useState, useEffect, use } from 'react'
import ContactList from './ContactList.jsx'
import ContactForm from './ContactForm.jsx'
import './App.css'

function App() {

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
    console.log(data.contacts)
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
      <> 
        <ContactList contacts={contacts} updateContact={openEditModal} updateCallBack={onUpdate}/>
        <button onClick={openCreateModal}>Create New Contact</button>
        { isModalOpen && <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={closeModal}>&times;</span>
                <ContactForm existingContact={currentContact} updateCallBack={onUpdate}/>
          </div>
        </div>
        }
    </>
  );
}

export default App
