import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
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
  const targetDate = new Date('August 21, 2026 00:00:00').getTime()

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
      'Везде': '✅ Буду везде!',
      'Только банкет': '🍽 Только на банкете',
      'Только второй день': '📅 Только на втором дне',
      'Не будет': '❌ Не смогу присутствовать'
    }[attendance] || attendance

    const drinksText = drinks.length > 0 ? drinks.join(', ') : 'не выбрано'
    const guestText = guest.trim() || 'без гостя'

    try {
      // Отправляем запрос к Netlify Function
      const response = await fetch('/.netlify/functions/sendMessage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          attendance: attendanceText,
          drinks: drinksText,
          guest: guestText
        })
      })

      if (response.ok) {
        setName('')
        setAttendance('')
        setDrinks([])
        setGuest('')
        setError('')
        alert('Спасибо! Ваш ответ отправлен 💒')
      } else {
        throw new Error('Ошибка отправки')
      }
    } catch (error) {
      console.error('Ошибка:', error)
      setError('Ошибка отправки. Пожалуйста, свяжитесь с нами по телефону')
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
        <p className='invite-vverh'>21 АВГУСТ 2026</p>
        <p className='invite-vverh'>До торожества осталось всего лишь:</p>
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
        <p className='invite-p'>Мы рады сообщить Вам, что состоится самое главное торжество в нашей жизни - день нашей свадьбы! Приглашаем Вас разделить с нами радость этого незабываемого дня.</p>
        <img className='invite-GandN' src={GN} alt="Жених и Невеста!" />
        <h1 className='invite-h1'>Пожелания по подаркам</h1>
        <p className='invite-p'>Мы начинаем семейную жизнь и хотим собрать свой первый совместный бар. Цветы, к сожалению, завянут, а хороший напиток останется с нами надолго. <b>Вместо букета - бутылку для нашей коллекции.</b> Пусть каждая бутылка напоминает нам о вас!</p>
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
        < h1 className='invite-h1'>Место проведения</h1>
        <p className='invite-p'>Торжество состоится в ресторане «Сид Холл».</p>
        <p className='invite-p'>Адрес: Ставропольский край, г. Пятигорск, ул. Фабричная, д. 1.</p>
        <p className='invite-p'>Ориентир: территория «Парк РОДНИК».</p>
        <div className='invite-map'>
          <iframe src="https://yandex.ru/map-widget/v1/?um=constructor%3Af3aa12335eb9a0dde031a3c260dd9291909731dd0521ad58a4993a61886487db&amp;source=constructor" width="100%" height="400" frameborder="0"></iframe>
        </div>
        <h1 className='invite-h1'>Ждем Вас на нашей свадьбе!</h1>
        <p className='invite-p'>Будем благодарны, если при выборе нарядов на наше торжество вы придержитесь следующей палитры</p>
        <p className='invite-palitra'>
          <div className='invite-palitra3'>Chocolate</div>
          <div className='invite-palitra1'>Burgundy</div>
          <div className='invite-palitra4'>Deep Red</div>
          <div className='invite-palitra2'>Beige</div>


        </p>
        <h1 className='invite-h1'>Свадебное расписание</h1>
        <h1 className='invite-datatime'>21.08</h1>
        <p className='invite-timeing'>
          <div className='invite-time'>16:30</div>
          <div className='invite-description'><h2>Торжественная регистрация брака</h2><h3>Пятигорск, Фабричная улица, 1 (Сид Холл)</h3>Приглашаем всех разделить с нами такой торжественный момент</div>
        </p>
        <p className='invite-timeing'>
          <div className='invite-time'>17:00</div>
          <div className='invite-description'><h2>Фотосессия</h2><h3>Пятигорск, Фабричная улица, 1 (Сид Холл)</h3>До банкета у вас будет время, чтобы узнать друг друга поближе и пофотографироваться</div>
        </p>
        <p className='invite-timeing'>
          <div className='invite-time'>17:30</div>
          <div className='invite-description'><h2>Праздничный банкет</h2><h3>Пятигорск, Фабричная улица, 1 (Сид Холл)</h3>Здесь пройдет наш праздничный банкет</div>
        </p>
        <p className='invite-timeing'>
          <div className='invite-time'>00:00</div>
          <div className='invite-description'><h2>Окончание праздничного дня</h2><h3>Пятигорск, Фабричная улица, 1 (Сид Холл)</h3>Даже такой день может когда-то подойти к концу</div>
        </p>
        <h1 className='invite-datatime'>22.08</h1>
        <p className='invite-timeing'>
          <div className='invite-time'>13:00</div>
          <div className='invite-description'><h2>Сбор гостей и продолжение торжества</h2><h3>Пятигорск, Фабричная улица, 1 (Летняя веранда)</h3>Встречаемся для продолжения праздника в уютной атмосфере</div>
        </p>
        <div className='invite-sectioninfo'>
          <h1 className='invite-h1'>Дорогие гости!</h1>
          <p className='invite-p'>Чтобы мы могли комфортно организовать банкет, учесть ваши предпочтения в напитках — заполните, пожалуйста, небольшую анкету до 10 августа 2026г.</p>
          <p className='invite-p'>Заранее благодарим и ждем вас с нетерпением!</p>

          <h1 className='invite-h1'>Ваше имя и фамилия</h1>
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
          />

          <h1 className='invite-h1'>Сможете ли вы быть с нами в этот день?</h1>
          <div className='invite-check'>
            <input
              type="radio"
              name="attendance"
              checked={attendance === 'Везде'}
              onChange={() => setAttendance('Везде')}
            />
            <p>Да, конечно! Буду везде!</p>
          </div>
          <div className='invite-check'>
            <input
              type="radio"
              name="attendance"
              checked={attendance === 'Только банкет'}
              onChange={() => setAttendance('Только банкет')}
            />
            <p>Конечно буду, но приду только на банкет!</p>
          </div>
          <div className='invite-check'>
            <input
              type="radio"
              name="attendance"
              checked={attendance === 'Только второй день'}
              onChange={() => setAttendance('Только второй день')}
            />
            <p>Да, конечно, но буду только на втором дне</p>
          </div>
          <div className='invite-check'>
            <input
              type="radio"
              name="attendance"
              checked={attendance === 'Не будет'}
              onChange={() => setAttendance('Не будет')}
            />
            <p>К сожалению я не смогу присутствовать(</p>
          </div>

          <h1 className='invite-h1'>Что предпочитаете из напитков? (можно выбрать несколько)</h1>
          <div className='invite-check'>
            <input
              type="checkbox"
              checked={drinks.includes('Шампанское')}
              onChange={() => toggleDrink('Шампанское')}
            />
            <p>Шампанское</p>
          </div>
          <div className='invite-check'>
            <input
              type="checkbox"
              checked={drinks.includes('Вино белое')}
              onChange={() => toggleDrink('Вино белое')}
            />
            <p>Вино белое</p>
          </div>
          <div className='invite-check'>
            <input
              type="checkbox"
              checked={drinks.includes('Вино красное')}
              onChange={() => toggleDrink('Вино красное')}
            />
            <p>Вино красное</p>
          </div>
          <div className='invite-check'>
            <input
              type="checkbox"
              checked={drinks.includes('Виски/Коньяк')}
              onChange={() => toggleDrink('Виски/Коньяк')}
            />
            <p>Виски/Коньяк</p>
          </div>
          <div className='invite-check'>
            <input
              type="checkbox"
              checked={drinks.includes('Водка')}
              onChange={() => toggleDrink('Водка')}
            />
            <p>Водка</p>
          </div>
          <div className='invite-check'>
            <input
              type="checkbox"
              checked={drinks.includes('Безалкогольные напитки')}
              onChange={() => toggleDrink('Безалкогольные напитки')}
            />
            <p>Безалкогольные</p>
          </div>

          <h1 className='invite-h1'>Будете ли вы с парой/гостем?</h1>
          <p className='invite-p'>Укажите имя и фамилию вашего гостя</p>
          <input
            type="text"
            value={guest}
            onChange={e => setGuest(e.target.value)}
          />

          <p className='invite-p'>Пожалуйста подтвердите свое присутствие до 10.08.2026</p>
          <p className='invite-p'>Если же после ответа ваше решение измениться, то вы всегда можете отправить ответ снова!)</p>
          {error && <p className="invite-error">{error}</p>}
          <p className='invite-p'>
            <button onClick={sendForm} className='invite-a' disabled={isLoading}>
              {isLoading ? 'Отправка...' : 'Дать ответ'}
            </button>
          </p>
        </div>
      </div>
    </div >
  </>)
}