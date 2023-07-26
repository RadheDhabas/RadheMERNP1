import React, { useContext, useState } from 'react'
import Layout from './Layout/Layout'; 
import Modal from 'react-modal';

function About() { 
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => {
        setIsModalOpen(true);
      };
      
      const closeModal = () => {
        setIsModalOpen(false);
      };
    return (
        <Layout> 
             <div> 
      <button onClick={openModal}>Open Modal</button>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
      > 
        <h2>Modal Title</h2>
        <p>Modal content goes here...</p>
        <button onClick={closeModal}>Close Modal</button>
      </Modal>
    </div>
        </Layout>
    )
}

export default About