import { Dialog, Transition } from '@headlessui/react'
import React, { Fragment, useState } from 'react'

const MobileMenu = () => {

    const [isOpen, setIsOpen] = useState(true)

    function closeModal() {
      setIsOpen(false)
    }
    
    function openModal() {
      setIsOpen(true)
    }

  return (
    <>
        
    </>
  )
}

export default MobileMenu;