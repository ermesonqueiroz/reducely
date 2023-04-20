import React, { useState, useRef } from 'react'
import api from './services/api'
import { Link } from './entities/link'
import { Formik, Form } from 'formik'
import { Moon, Sun, Loader, Copy, Check } from 'lucide-react'
import { useTheme } from './contexts/theme'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { FullLogo } from '@/components/ui/FullLogo'

function App() {
  const { toggleColorMode, darkMode } = useTheme()
  const [shortURL, setShortURL] = useState('')
  const [copiedShortURL, setCopiedShortURL] = useState(false)

  return (
    <>
      <div className="fixed top-0 w-full flex justify-center">
        <header className="p-8 flex justify-between w-full">
          <FullLogo />

          <Button
            className="px-0 h-10 w-10"
            variant="ghost"
            onClick={toggleColorMode}
          >
            {
              darkMode
                ? <Moon className="h-5 w-5" />
                : <Sun className="h-5 w-5" />
            }
          </Button>
        </header>
      </div>
      <div className="flex flex-col mt-[15vh] md:h-screen md:mt-0 items-center justify-center">
        <div className="flex w-full px-8 md:w-8/12 xl:w-1/2 2xl:w-2/5 flex-col gap-y-6">
          <div className="uppercase font-bold">
            <h1 className="scroll-m-20 text-3xl font-extrabold tracking-tight">Encurte sua URL</h1>
          </div>

          <Formik
            initialValues={{
              target: ''
            }}
            onSubmit={async (values, { setSubmitting, setValues, setTouched }) => {
              try {
                const { data: response, status, statusText } = await api<Link>({
                  url: '/api/v1/link',
                  method: 'POST',
                  data: values,
                })

                setShortURL(response.id)
                setValues({ target: '' })
              } finally {
                setSubmitting(false)
              }
            }}
          >
            {({
              handleSubmit,
              handleChange,
              values,
              errors,
              touched,
              handleBlur,
              isSubmitting
            }) => (
              <Form onSubmit={handleSubmit} className="flex flex-col gap-y-4">
                <div className="flex flex-col w-full">
                  <Input
                    type="url"
                    placeholder="https://www.minha.url.longa.com"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.target}
                    autoComplete="off"
                    name="target"
                  />
                </div>

                <Button type="submit" className="w-full uppercase font-bold" disabled={isSubmitting}>
                  {
                    isSubmitting
                      ? <Loader className="h-5 w-5 animate-spin" />
                      : 'Encurtar'
                  }
                </Button>
              </Form>
            )}
          </Formik>

          {
            shortURL && (
              <div className="flex w-full justify-between items-center py-2 px-4 rounded-lg border border-border">
                <p>{window.location.origin}{window.location.pathname}{shortURL}</p>
                <Button
                  className="px-0 h-8 w-8"
                  variant="outline"
                  onClick={() => {
                    navigator
                      .clipboard
                      .writeText(`${window.location.origin}${window.location.pathname}${shortURL}`)

                    if (copiedShortURL) return

                    setCopiedShortURL(true)
                    setTimeout(() => {
                      setCopiedShortURL(false)
                    }, 1500)
                  }}
                >
                  {
                    !copiedShortURL
                      ? <Copy className="h-4 w-4" />
                      : <Check className="h-4 w-4" />
                  }
                </Button>
              </div>
            )
          }
        </div>

        <footer className="flex flex-col gap-y-6 md:flex-row w-full px-8 justify-between md:w-8/12 2xl:w-2/5 mt-12 text-sm xl:w-1/2">
          <p>&copy; 2022 Reducely</p>

          <ul className="flex flex-col gap-x-8 gap-y-2 md:flex-row">
            <li><a href="https://linkedin.com/in/ermesonsampaio" target="_blank">LinkedIn</a></li>
            <li><a href="https://github.com/ermesonqueiroz/reducely" target="_blank">GitHub</a></li>
            <li><a href="https://github.com/ermesonqueiroz/reducely-server" target="_blank">API</a></li>
          </ul>    
        </footer>
      </div>
    </>
  )
}

export default App
