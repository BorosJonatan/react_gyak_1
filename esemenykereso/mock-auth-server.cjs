const express = require('express')
const session = require('express-session')

const app = express()
const PORT = 3001

app.use(express.json())

app.use(
  session({
    name: 'gyakorlo.session',
    secret: 'csak-helyi-gyakorlasra-hasznalt-titok',
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      sameSite: 'lax',
      secure: false,
    },
  })
)

const demoUser = {
  id: '1',
  name: 'Jonatán',
  email: 'tanulo@example.test',
}

app.post('/mock-auth/login', (req, res) => {
  const { email, password } = req.body ?? {}

  if (email !== demoUser.email || password !== 'gyakorlas123') {
    return res.status(401).json({
      message: 'Hibás e-mail-cím vagy jelszó.',
    })
  }

  req.session.regenerate((error) => {
    if (error) {
      return res.status(500).json({
        message: 'Nem sikerült létrehozni a sessiont.',
      })
    }

    req.session.userId = demoUser.id

    return res.json({
      message: 'Sikeres bejelentkezés.',
      user: demoUser,
    })
  })
})

app.get('/mock-auth/me', (req, res) => {
  if (req.session.userId !== demoUser.id) {
    return res.status(401).json({
      message: 'Nem vagy bejelentkezve.',
    })
  }

  return res.json(demoUser)
})

app.post('/mock-auth/logout', (req, res) => {
  req.session.destroy((error) => {
    if (error) {
      return res.status(500).json({
        message: 'Nem sikerült kijelentkezni.',
      })
    }

    res.clearCookie('gyakorlo.session', { path: '/' })

    return res.json({
      message: 'Sikeres kijelentkezés.',
    })
  })
})

app.listen(PORT, '127.0.0.1', () => {
  console.log(`Gyakorló auth API: http://127.0.0.1:${PORT}`)
})