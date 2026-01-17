import React from 'react'
import { FaWhatsapp } from 'react-icons/fa'

interface WhatsAppButtonProps {
  phoneNumber?: string | null
}

export const WhatsAppButton = ({ phoneNumber }: WhatsAppButtonProps) => {
  if (!phoneNumber) return null

  const message = 'Hallo, ich interessiere mich für Ihre Autos!'

  return (
    <a
      href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-lg flex items-center justify-center transition transform hover:scale-110 z-50"
      aria-label="Chat on WhatsApp"
    >
      <FaWhatsapp size={28} />
    </a>
  )
}
