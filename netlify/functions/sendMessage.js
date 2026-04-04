exports.handler = async (event) => {
  // Разрешаем только POST запросы
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    }
  }

  // Получаем токены из переменных окружения Netlify
  const BOT_TOKEN = process.env.BOT_TOKEN
  const CHAT_ID = process.env.CHAT_ID

  // Проверяем наличие токенов
  if (!BOT_TOKEN || !CHAT_ID) {
    console.error('Missing environment variables')
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Server configuration error' })
    }
  }

  try {
    const formData = JSON.parse(event.body)
    
    const attendanceText = {
      'Везде': '✅ Буду везде!',
      'Только банкет': '🍽 Только на банкете',
      'Только второй день': '📅 Только на втором дне',
      'Не будет': '❌ Не смогу присутствовать'
    }[formData.attendance] || formData.attendance

    const message = `
🎉 НОВАЯ АНКЕТА 🎉

👤 Имя: ${formData.name}
📅 Присутствие: ${attendanceText}
🍷 Напитки: ${formData.drinks}
👥 Гость: ${formData.guest}

⏰ Отправлено: ${new Date().toLocaleString('ru-RU')}
    `.trim()

    const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: message,
        parse_mode: 'HTML'
      })
    })

    if (response.ok) {
      return {
        statusCode: 200,
        body: JSON.stringify({ success: true })
      }
    } else {
      const errorData = await response.json()
      console.error('Telegram API error:', errorData)
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Failed to send message' })
      }
    }
  } catch (error) {
    console.error('Error:', error)
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    }
  }
}