import { useState, useEffect, useRef } from 'react'
import './Envelope.css'

function Envelope({ children }) {
  const [isOpen, setIsOpen] = useState(false)
  const buttonRef = useRef(null)
  const flapRef = useRef(null)

  const handleOpen = () => {
    setIsOpen(true)
  }

  // Точное позиционирование кнопки на нижнем кончике клапана
  useEffect(() => {
    const positionButton = () => {
      if (buttonRef.current && flapRef.current && !isOpen) {
        const flap = flapRef.current
        const button = buttonRef.current
        const flapRect = flap.getBoundingClientRect()
        
        // Нижняя точка клапана (центр по горизонтали, низ по вертикали)
        const bottomX = flapRect.left + flapRect.width / 2
        const bottomY = flapRect.bottom
        
        button.style.position = 'fixed'
        button.style.left = `${bottomX}px`
        button.style.top = `${bottomY}px`
        button.style.transform = 'translate(-50%, -50%)'
      }
    }

    positionButton()
    window.addEventListener('resize', positionButton)
    window.addEventListener('scroll', positionButton)
    
    return () => {
      window.removeEventListener('resize', positionButton)
      window.removeEventListener('scroll', positionButton)
    }
  }, [isOpen])

  return (
    <>
      <div className={`envelope-overlay ${isOpen ? 'open' : ''}`}>
        <div className="envelope-flap" ref={flapRef}></div>
        <div className="envelope-body"></div>
      </div>
      <button 
        ref={buttonRef}
        className="open-button" 
        onClick={handleOpen}
        aria-label="Open envelope"
      ></button>
      <div className={`main-content ${isOpen ? 'visible' : ''}`}>
        {children}
      </div>
    </>
  )
}

export default Envelope