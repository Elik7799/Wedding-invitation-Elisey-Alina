import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import emailjs from '@emailjs/browser' // Добавьте этот импорт
import './Invite.css'
import ChildrenElisey from './assets/ChildrenJenih.jpg'
import ChildrenAlina from './assets/ChildrenNevesta.jpg'
import GN from './assets/JenihNevesta.jpg'
import QR from './assets/qr.png'
import QRvk from './assets/qrvk.png'
import TG from './assets/TG.png'
import VK from './assets/VK.png'
import Song from './assets/song.mp3'

export default function Invite() {
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef(null)

  const toggleMusic = () => {
    if (isPlaying) {
      audioRef.current.pause()
    } else {
      audioRef.current.play()
    }
    setIsPlaying(!isPlaying)
  }

  const inviteRef = useRef(null)

  // Состояния для формы
  const [name, setName] = useState('')
  const [attendance, setAttendance] = useState('')
  const [drinks, setDrinks] = useState([])
  const [guest, setGuest] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [activeTab, setActiveTab] = useState('tg')

  // Целевая дата: 21 августа 2026 года
  const targetDate = new Date('August 21, 2026 16:00:00').getTime()

  const [timeLeft, setTimeLeft] = useState({
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })

  // Таймер
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime()
      const distance = targetDate - now

      if (distance < 0) {
        setTimeLeft({
          months: 0,
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0
        })
        clearInterval(timer)
        return
      }

      const months = Math.floor(distance / (1000 * 60 * 60 * 24 * 30.44))
      const days = Math.floor((distance % (1000 * 60 * 60 * 24 * 30.44)) / (1000 * 60 * 60 * 24))
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((distance % (1000 * 60)) / 1000)

      setTimeLeft({
        months,
        days,
        hours,
        minutes,
        seconds
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [targetDate])

  // Функции для формы
  const toggleDrink = (drink) => {
    setDrinks(prev =>
      prev.includes(drink)
        ? prev.filter(d => d !== drink)
        : [...prev, drink]
    )
  }

  const sendForm = async () => {
    if (!name.trim()) {
      setError('Введите имя и фамилию')
      return
    }

    if (!attendance) {
      setError('Выберите вариант присутствия')
      return
    }

    setError('')
    setIsLoading(true)

    const attendanceText = {
      'Везде': '✅ Буду везде! (21 и 22 августа)',
      'Только первый': '🍽 Только 21 августа!',
      'Не будет': '❌ Не смогу присутствовать'
    }[attendance] || attendance

    const drinksText = drinks.length > 0 ? drinks.join(', ') : 'не выбрано'
    const guestText = guest.trim() || 'не указан'

    try {
      const SERVICE_ID = 'service_vxnfjxp'
      const TEMPLATE_ID = 'template_w6li3o5'
      const PUBLIC_KEY = '-GMQwDLfUA8HwbObV'

      const templateParams = {
        to_name: 'Организаторы',
        from_name: name,
        name: name,
        attendance: attendanceText,
        drinks: drinksText,
        guest: guestText,
        to_email: 'ВАШ_EMAIL@gmail.com'
      }

      const response = await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        templateParams,
        PUBLIC_KEY
      )

      if (response.status === 200) {
        setName('')
        setAttendance('')
        setDrinks([])
        setGuest('')
        setError('')
        alert('✅ Спасибо! Ваш ответ отправлен нам на почту 💒')
      } else {
        throw new Error('Ошибка отправки')
      }
    } catch (error) {
      console.error('Ошибка:', error)
      setError('❌ Ошибка отправки. Пожалуйста, свяжитесь с нами по телефону: 8 (906) 473-33-35')
    } finally {
      setIsLoading(false)
    }
  }


  return (<>
    <div className='invite-main' ref={inviteRef}>
      <div className='invite-sectionvverh'>
        <h1 className='invite-txtmusic'>Включите мелодию!</h1>
        <audio ref={audioRef} loop>
          <source src={Song} type="audio/mpeg" />
        </audio>
        <button onClick={toggleMusic} className="invite-music">
          {isPlaying ? '🔊' : '🔈❌'}
        </button>
        <p className='invite-cards'><img src={ChildrenElisey} alt="Маленький Елисей" />Елисей</p>
        <p className='invite-pluse'>+</p>
        <p className='invite-cards'><img src={ChildrenAlina} alt="Маленькая Алина" />Алина</p>
        <p className='invite-gn'>Е + А = ♡</p>
        <p className='invite-vverh'>МЫ ВЫРОСЛИ И ТЕПЕРЬ НАМ МОЖНО</p>
        <p className='invite-vverh'>21 АВГУСТА 2026</p>
        <p className='invite-vverh'>До нашей свадьбы осталось:</p>
        <p className='invite-vverh'>
          <div className='invite-timer'><p>{timeLeft.months}</p><p>мес.</p></div>
          <div className='invite-timer'><p>{timeLeft.days}</p><p>дн.</p></div>
          <div className='invite-timer'><p>{timeLeft.hours}</p><p>ч.</p></div>
          <div className='invite-timer'><p>{timeLeft.minutes}</p><p>мин.</p></div>
          <div className='invite-timer'><p>{timeLeft.seconds}</p><p>сек.</p></div>
        </p>
      </div>
      <div className='invite-sectioninfo'>
        <h1 className='invite-h1'>Дорогие и любимые!</h1>
        <p className='invite-p'>Мы рады сообщить, что состоится самое важное и трогательное событие в нашей жизни - день нашей свадьбы! Приглашаем вас разделить с нами эту радость.</p>
        <p className='invite-cardsGN'><img src={GN} alt="Жених и Невеста!" />Е+А=♡</p>
        < h1 className='invite-h1'>Место проведения</h1>
        <p className='invite-p'>Наше торжество состоится на территории «Парк РОДНИК» по адресу: Ставропольский край, г. Пятигорск, ул. Фабричная, д. 1.</p>
        <p className='invite-p'>21 августа - банкетный зал «Сид Холл».</p>
        <p className='invite-p'>22 августа - «Летняя Веранда».</p>
        <h1 className='invite-h1'>Свадебное расписание</h1>
        <h1 className='invite-datatime'>21.08</h1>
        <p className='invite-timeing'>
          <div className='invite-time'>16:00</div>
          <div className='invite-description'><h2>Сбор гостей</h2>Время для приветственных бокалов и приятного ожидания торжественного момента</div>
        </p>
        <p className='invite-timeing'>
          <div className='invite-time'>16:30</div>
          <div className='invite-description'><h2>Выездная регистрация</h2>Приглашаем разделить с нами трогательное мгновение</div>
        </p>
        <p className='invite-timeing'>
          <div className='invite-time'>17:00</div>
          <div className='invite-description'><h2>Фотосессия</h2>Самое время для живых и душевных кадров</div>
        </p>
        <p className='invite-timeing'>
          <div className='invite-time'>17:30</div>
          <div className='invite-description'><h2>Начало банкета</h2>Рассадка гостей и первые тосты</div>
        </p>
        <h1 className='invite-datatime'>22.08</h1>
        <p className='invite-timeing'>
          <div className='invite-time'>13:00</div>
          <div className='invite-description'><h2>Продолжение торжества</h2>Встречаемся для продолжения праздника в уютной атмосфере</div>
        </p>
        <h1 className='invite-h1'>Пожелания по подаркам</h1>
        <p className='invite-p'>Конверт станет самым удачным подарком для нас. А также, мы бы хотели нарушить традицию и вместо цветов с удовольствием примем бутылочку изысканного напитка.</p>
        <h1 className='invite-h1'>Примечание</h1>
        <p className='invite-p'>Для любителей сюрпризов, просьба прийти с лотерейными билетами «Русское лото». На обратной стороне билета указать свой номер телефона.</p>
        <h1 className='invite-h1'>Фото</h1>
        <p className='invite-p'>Вы можете делать фото в этот торжественный день и опубликовать их по этому QR-code:</p>
        <div className="invite-tabs">
          <button className={`tab ${activeTab === 'tg' ? 'active' : ''}`} onClick={() => setActiveTab('tg')}><img className='invite-logo' src={TG} alt="QR-code" />TG</button>
          <button className={`tab ${activeTab === 'vk' ? 'active' : ''}`} onClick={() => setActiveTab('vk')}><img className='invite-logo' src={VK} alt="QR-code" />VK</button>
        </div>
        {activeTab === 'tg' && (<>
          <img className='invite-qr' src={QR} alt="QR-code" />
          <p className='invite-p'>↓</p>
          <p className='invite-p'><a href="https://t.me/+EEdeN2S7f6dkZjMy" target="_blank" rel="noopener noreferrer" className='invite-a'>Или по этой кнопке</a></p>
        </>)}
        {activeTab === 'vk' && (<>
          <img className='invite-qr' src={QRvk} alt="QR-code" />
          <p className='invite-p'>↓</p>
          <p className='invite-p'><a href="https://vk.me/join/Tf6ql0EwBdK_Crbs8e3c9UjHzpoYDSelqFw=" target="_blank" rel="noopener noreferrer" className='invite-a'>Или по этой кнопке</a></p>
        </>)}
        <h1 className='invite-h1'>Ждем Вас на нашей свадьбе!</h1>
        <p className='invite-p'>Будем благодарны, если при выборе нарядов вы придержитесь следующей палитры:</p>
        <p className='invite-palitra'>
          <div className='invite-palitra3'>Chocolate</div>
          <div className='invite-palitra2'>Beige</div>
          <div className='invite-palitra1'>Burgundy</div>
          <div className='invite-palitra4'>Deep Red</div>
        </p>
        <div className='invite-sectioninfo'>
          <h1 className='invite-h1'>Дорогие гости!</h1>
          <p className='invite-p'>Заполните, пожалуйста, небольшую анкету до 10 августа 2026г.</p>
          <p className='invite-p'>Заранее благодарим и ждем вас с нетерпением!</p>

          <h1 className='invite-h1'>Ваше имя и фамилия</h1>
          <p className='invite-p'>Просьба указать гостей через запятую</p>
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
          />

          <h1 className='invite-h1'>Подтвердите свое присутствие</h1>
          <div className='invite-check'>
            <div>
              <input
                type="radio"
                name="attendance"
                checked={attendance === 'Везде'}
                onChange={() => setAttendance('Везде')}
              />
            </div>
            <p>Буду 21.08 и 22.08!</p>
          </div>
          <div className='invite-check'>
            <div>
              <input
                type="radio"
                name="attendance"
                checked={attendance === 'Только первый'}
                onChange={() => setAttendance('Только первый')}
              />
            </div>
            <p>Только 21.08!</p>
          </div>
          <div className='invite-check'>
            <div>
              <input
                type="radio"
                name="attendance"
                checked={attendance === 'Не будет'}
                onChange={() => setAttendance('Не будет')}
              />
            </div>
            <p>Не смогу</p>
          </div>

          <h1 className='invite-h1'>Предпочтение по напиткам</h1>
          <div className='invite-check'>
            <div>
              <input
                type="checkbox"
                checked={drinks.includes('Шампанское')}
                onChange={() => toggleDrink('Шампанское')}
              />
            </div>
            <p>Шампанское</p>
          </div>
          <div className='invite-check'>
            <div><input
              type="checkbox"
              checked={drinks.includes('Вино белое')}
              onChange={() => toggleDrink('Вино белое')}
            /></div>
            <p>Вино белое</p>
          </div>
          <div className='invite-check'>
            <div><input
              type="checkbox"
              checked={drinks.includes('Вино красное')}
              onChange={() => toggleDrink('Вино красное')}
            /></div>
            <p>Вино красное</p>
          </div>
          <div className='invite-check'>
            <div><input
              type="checkbox"
              checked={drinks.includes('Виски/Коньяк')}
              onChange={() => toggleDrink('Виски/Коньяк')}
            /></div>
            <p>Виски/Коньяк</p>
          </div>
          <div className='invite-check'>
            <div><input
              type="checkbox"
              checked={drinks.includes('Водка')}
              onChange={() => toggleDrink('Водка')}
            /></div>
            <p>Водка</p>
          </div>
          <p className='invite-p'>Если же после ответа ваше решение измениться, то вы всегда можете отправить ответ снова!</p>
          {error && <div className="invite-error">{error}</div>}
          <p className='invite-p'>
            <button onClick={sendForm} className='invite-a' disabled={isLoading}>
              {isLoading ? 'Отправка...' : 'Дать ответ'}
            </button>
          </p>
        </div>
      </div>
      <div className='invite-map'>
        <iframe src="https://yandex.ru/map-widget/v1/?um=constructor%3Af3aa12335eb9a0dde031a3c260dd9291909731dd0521ad58a4993a61886487db&amp;source=constructor" width="100%" height="400" frameborder="0"></iframe>
      </div>
    </div >
  </>)
}