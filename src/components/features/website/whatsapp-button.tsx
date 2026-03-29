import Link from 'next/link'
import { FaWhatsapp } from 'react-icons/fa'

interface WhatsAppButtonProps {
  phoneNumber?: string
}

export const WhatsAppButton = ({ phoneNumber }: WhatsAppButtonProps) => {
  if (!phoneNumber) return
  const message = 'Hallo, ich interessiere mich für Ihre Autos!'

  return (
    <Link
      className="fixed bottom-6 right-6 p-4 z-50 flex items-center justify-center bg-green-500 hover:bg-green-600 rounded-full text-white shadow-lg transition transform hover:scale-110"
      href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`}
      target="_blank"
      prefetch={false}
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
    >
      <FaWhatsapp size={28} />
    </Link>
  )
}
