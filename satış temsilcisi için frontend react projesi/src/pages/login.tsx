import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

type LoginPageProps = {
  onLogin: () => void
}

export const LoginPage = ({ onLogin }: LoginPageProps) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    setLoading(true)
    setTimeout(() => {
      onLogin()
      navigate('/')
    }, 800)
  }

  return (
    <div className="flex min-h-screen flex-col justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-4 py-12 text-white">
      <div className="mx-auto grid w-full max-w-5xl gap-12 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col justify-center space-y-6"
        >
          <img
            src="/doni-logo.png"
            alt="Doni Global Bilişim Teknolojileri"
            className="h-16 w-auto object-contain"
            style={{ maxHeight: '80px' }}
          />
          <Badge className="w-fit rounded-full bg-white/15 text-xs uppercase tracking-[0.5em] text-white">
            Dijital Dönüşüm
          </Badge>
          <h1 className="text-4xl font-semibold leading-tight">
            Modern & kurumsal dashboard deneyimi.
          </h1>
          <p className="text-sm text-white/70">
            Doni Global müşterilerine gösterilebilir demo dashboard. Gerçek zamanlı mock
            datalar, KPI kartları ve operasyonel içgörüler ile gelir/kullanıcı aktivitelerini
            profesyonel biçimde aktarmayı hedefler.
          </p>
          <div className="grid gap-4 text-sm text-white/70">
            <p>✔ Recharts tabanlı grafikler</p>
            <p>✔ Tailwind + shadcn UI</p>
            <p>✔ Responsive & tema destekli</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="border-none bg-white/10 backdrop-blur-2xl">
            <CardHeader className="space-y-1 text-white">
              <CardTitle className="text-2xl font-semibold">Panele giriş yap</CardTitle>
              <p className="text-sm text-white/70">Mock kimlik doğrulama</p>
            </CardHeader>
            <CardContent>
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                  <label className="text-sm text-white/80">Email</label>
                  <Input
                    type="email"
                    placeholder="ornek@doniglobal.com"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    required
                    className="mt-2 bg-white/20 text-white placeholder:text-white/50"
                  />
                </div>
                <div>
                  <label className="text-sm text-white/80">Şifre</label>
                  <Input
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    required
                    className="mt-2 bg-white/20 text-white placeholder:text-white/50"
                  />
                </div>
                <Button
                  type="submit"
                  className="h-12 w-full rounded-2xl bg-teal-400 text-base font-semibold text-slate-900 hover:bg-teal-300"
                  disabled={loading}
                >
                  {loading ? 'Kontrol ediliyor...' : 'Dashboard\'a giriş yap'}
                </Button>
              </form>
              <p className="mt-6 text-center text-xs text-white/60">
                Bu ekran yalnızca görsel amaçlıdır. Herhangi bir veri saklanmaz.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}

