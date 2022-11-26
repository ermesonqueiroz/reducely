import React, { useState, useRef } from 'react'
import reactLogo from './assets/react.svg'
import api from './services/api'
import { Link } from './entities/link'
import {
  Form,
  FormError,
  FormInput,
  FormSubmit,
  useFormState,
} from 'ariakit/form'
import {
  Dialog,
  DialogDismiss,
  DialogHeading,
  useDialogState,
} from 'ariakit/dialog'
import { Button } from 'ariakit/button'
import { ToastContainer, toast } from 'react-toastify';

function App() {
  const form = useFormState({
    defaultValues: { url: '' },
  });
  const dialog = useDialogState();
  const [link, setLink] = useState({} as Link);
  const linkCopyArea = useRef(null);

  form.useValidate(() => {
    const value = form.getValue('target');
    const tester = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[\w]*))?)/;

    if (!tester.test(value)) form.setError('target', `The target "${value}" is invalid.`);
  });

  form.useSubmit(async () => {
    try {
      const { data: response, status, statusText } = await api<Link>({
        url: '/api/v1/link',
        method: 'POST',
        data: form.values,
      });

      setLink(response);
      dialog.toggle();

      form.setValue('target', '');
    } catch ({ response: { data: { error } } }) {
      form.setError('target', error);
    }
  });

  function copyLinkToClipboard(e: React.MouseEvent<HTMLButtonElement>) {
    linkCopyArea.current.select();
    document.execCommand('copy');
    e.target.focus();

    toast.success('Link copiado!');
  }

  return (
    <>
      <div className="flex flex-col bg-neutral-900 h-screen items-center justify-center">
        <div className="flex w-full px-8 md:w-8/12 xl:w-1/2 xl:w-1/2 2xl:w-2/5 flex-col gap-y-10">
          <div className="text-teal-50 uppercase font-bold">
            <h1 className="text-3xl">Encurte seu link</h1>
          </div>

          <Form
            state={form}
            aria-labelledby="create-new-link"
            className="flex flex-col items-center w-full"
          >
            <div className="flex flex-col w-full gap-y-2">
              <FormInput
                name={form.names.target}
                required
                placeholder="https://www.mylongurl.com"
                className="h-12 rounded-md outline-none flex w-full px-4 bg-neutral-600 placeholder:text-neutral-400 text-neutral-200 text-lg transition-colors hover:bg-neutral-700 focus:bg-neutral-700"
              />
              <FormError
                name={form.names.target}
                className="text-red-400 transition-all pb-4"
              />
            </div>

            <FormSubmit className="h-12 rounded-md outline-none w-full bg-teal-600 text-neutral-100 text-lg uppercase font-bold cursor-pointer hover:bg-teal-700 transition-colors">
              ENCURTAR
            </FormSubmit>
          </Form>
        </div>

        <footer className="flex flex-col gap-y-6 md:flex-row w-full px-8 justify-between md:w-8/12 2xl:w-2/5 mt-12 text-neutral-500 text-sm xl:w-1/2">
          <p>&copy; 2022 Url Shortener</p>

          <ul className="flex flex-col gap-x-8 gap-y-2 md:flex-row lg:gap-20">
            <li><a href="https:/github.com/ermesonqueiroz/url-shortener-web" target="_blank">GitHub</a></li>
            <li><a href="https:/github.com/ermesonqueiroz/url-shortener" target="_blanki">API</a></li>
          </ul>    
        </footer>
      </div>

      <Dialog
        state={dialog}
        className="flex flex-col z-50 mx-4 sm:mx-0 rounded-2xl p-6 py-9 md:p-9 bg-neutral-50"
        backdropProps={{
          className: 'flex items-center justify-center bg-black/80 backdrop-blur-sm'
        }}
      >
        <DialogHeading className="text-2xl md:text-3xl text-stone-900 font-bold pb-6">
          Link Encurtado com Sucesso
        </DialogHeading>

        <p className="text-lg md:text-xl text-neutral-900 pb-2">
          O resultado do link encurtado:
        </p>

        <Button
          onClick={copyLinkToClipboard}
          className="flex justify-between items-center gap-x-4 border-neutral-400 border rounded-lg text-sm md:text-lg bg-neutral-200 text-neutral-900 font-mono py-2 px-4 mb-6"
        >
          <input
            type="text"
            className="bg-neutral-200 cursor-pointer outline-none w-full pointer-events-none"
            ref={linkCopyArea}
            value={`${import.meta.env.VITE_API_URL}/r/${link.id}`}
            readonly
          />

          <div>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />
            </svg>
          </div>
        </Button>

        <div>
          <DialogDismiss className="bg-teal-600 px-5 py-3 text-lg text-neutral-200 rounded-xl font-bold">
            OK
          </DialogDismiss>
        </div>
      </Dialog>

      <ToastContainer
        className="text-xl"
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  )
}

export default App
