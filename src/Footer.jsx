import './Footer.css'

function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="wedding-footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>С любовью,</h3>
          <p>Елисей & Алина</p>
        </div>

        <div className="footer-section">
          <h3>Дата и место</h3>
          <p>21 августа 2026 • 16:00</p>
          <p>Банкетный зал «Сид Холл»</p>
          <p>г. Пятигорск, ул. Фабричная, 1</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {currentYear} Приглашение на свадьбу. С нетерпением ждём вас!</p>
      </div>
    </footer>
  )
}

export default Footer