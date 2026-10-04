import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import emailjs from '@emailjs/browser'

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const isEmailjsConfigured = Boolean(SERVICE_ID && TEMPLATE_ID && PUBLIC_KEY)

const inputClass =
  'block w-full rounded-md border border-gray-300 bg-white px-3 py-2.5 text-sm text-[#1B3326] placeholder:text-gray-400 focus:border-[#193828] focus:outline-none focus:ring-2 focus:ring-[#193828]/20'

export default function Modal({ isOpen, onClose }) {
  const { t } = useTranslation()
  const [success, setSuccess] = useState(false)
  const [serverError, setServerError] = useState('')

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: { name: '', email: '', message: '', company_url: '' },
  })

  // قفل الـ scroll + زرار Escape
  useEffect(() => {
    if (!isOpen) return undefined
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  // تصفير الفورم لما المودال يتقفل
  useEffect(() => {
    if (!isOpen) {
      reset()
      setSuccess(false)
      setServerError('')
    }
  }, [isOpen, reset])

  useEffect(() => {
    if (isEmailjsConfigured) {
      emailjs.init({ publicKey: PUBLIC_KEY })
    }
  }, [])

  const onSubmit = async (data) => {
    setServerError('')

    // honeypot: لو اتملى يبقى بوت، نتظاهر بالنجاح من غير ما نبعت
    if (data.company_url) {
      setSuccess(true)
      reset()
      return
    }

    if (!isEmailjsConfigured) {
      setServerError(t('contact.modal.errors.CONFIG_ERROR'))
      return
    }

    try {
      await emailjs.send(SERVICE_ID, TEMPLATE_ID, {
        name: data.name,
        user_name: data.name,
        from_name: data.name,
        email: data.email,
        user_email: data.email,
        reply_to: data.email,
        message: data.message,
        user_message: data.message,
        comments: data.message,
        time: `${new Date().toLocaleString('en-GB', {
          dateStyle: 'medium',
          timeStyle: 'short',
          timeZone: 'UTC',
        })} UTC`,
      })

      setSuccess(true)
      reset()
    } catch (err) {
      const code =
        err?.status === 412
          ? 'PRECONDITION_FAILED'
          : err?.status === 429
            ? 'TOO_MANY_REQUESTS'
            : err?.status === 0 || err?.status === undefined
              ? 'NETWORK'
              : 'SERVER_ERROR'

      if (code === 'NETWORK') {
        setServerError(t('contact.modal.errors.NETWORK'))
      } else {
        setServerError(
          t(`contact.modal.errors.${code}`, {
            defaultValue: t('contact.modal.errors.SERVER_ERROR'),
          })
        )
      }
    }
  }

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/60 p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="contact-modal-title"
        className="relative w-full max-w-md"
      >
        <div className="relative rounded-md border border-[#1B3326]/15 bg-white p-4 text-[#1B3326] shadow-xl md:p-6">
          <div className="flex items-center justify-between border-b border-[#1B3326]/15 pb-4 md:pb-5">
            <h2 id="contact-modal-title" className="text-lg font-medium">
              {t('contact.modal.title')}
            </h2>
            <button
              type="button"
              onClick={onClose}
              aria-label={t('contact.modal.closeLabel')}
              className="ms-auto inline-flex size-9 items-center justify-center rounded-md text-[#1B3326] hover:bg-gray-100"
            >
              <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18 17.94 6M18 18 6.06 6" />
              </svg>
              <span className="sr-only">{t('contact.modal.closeLabel')}</span>
            </button>
          </div>

          {success ? (
            <div className="pt-6 text-center">
              <h3 className="text-base font-medium">{t('contact.modal.successTitle')}</h3>
              <p className="mt-2 text-sm text-gray-600">{t('contact.modal.successDesc')}</p>
              <button
                type="button"
                onClick={onClose}
                className="mt-6 w-full rounded-md bg-[#193828] px-4 py-2.5 text-sm font-medium text-white hover:bg-[#234A35] focus:outline-none focus:ring-4 focus:ring-[#193828]/20"
              >
                {t('contact.modal.close')}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} noValidate className="pt-4 md:pt-6">
              {/* Honeypot: اسم غريب عشان المتصفح ميعملوش autofill */}
              <div aria-hidden="true" className="absolute -start-[9999px] h-0 w-0 overflow-hidden opacity-0">
                <label htmlFor="company_url">Leave this field empty</label>
                <input
                  id="company_url"
                  type="text"
                  tabIndex={-1}
                  autoComplete="new-password"
                  {...register('company_url')}
                />
              </div>

              <div className="mb-4">
                <label htmlFor="name" className="mb-2.5 block text-sm font-medium">
                  {t('contact.modal.nameLabel')}
                </label>
                <input
                  id="name"
                  type="text"
                  autoComplete="name"
                  placeholder={t('contact.modal.namePlaceholder')}
                  aria-invalid={!!errors.name}
                  className={inputClass}
                  {...register('name', {
                    setValueAs: (v) => (typeof v === 'string' ? v.trim() : v),
                    required: t('contact.modal.validation.nameRequired'),
                    minLength: { value: 2, message: t('contact.modal.validation.nameShort') },
                    maxLength: { value: 100, message: t('contact.modal.validation.nameLong') },
                  })}
                />
                {errors.name && <p className="mt-1.5 text-xs text-red-600">{errors.name.message}</p>}
              </div>

              <div className="mb-4">
                <label htmlFor="email" className="mb-2.5 block text-sm font-medium">
                  {t('contact.modal.emailLabel')}
                </label>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder={t('contact.modal.emailPlaceholder')}
                  aria-invalid={!!errors.email}
                  className={inputClass}
                  {...register('email', {
                    setValueAs: (v) => (typeof v === 'string' ? v.trim() : v),
                    required: t('contact.modal.validation.emailRequired'),
                    pattern: { value: EMAIL_REGEX, message: t('contact.modal.validation.emailInvalid') },
                    maxLength: { value: 255, message: t('contact.modal.validation.emailLong') },
                  })}
                />
                {errors.email && <p className="mt-1.5 text-xs text-red-600">{errors.email.message}</p>}
              </div>

              <div className="mb-4">
                <label htmlFor="message" className="mb-2.5 block text-sm font-medium">
                  {t('contact.modal.messageLabel')}
                </label>
                <textarea
                  id="message"
                  rows={4}
                  placeholder={t('contact.modal.messagePlaceholder')}
                  aria-invalid={!!errors.message}
                  className={`${inputClass} resize-none`}
                  {...register('message', {
                    setValueAs: (v) => (typeof v === 'string' ? v.trim() : v),
                    required: t('contact.modal.validation.messageRequired'),
                    minLength: { value: 10, message: t('contact.modal.validation.messageShort') },
                    maxLength: { value: 2000, message: t('contact.modal.validation.messageLong') },
                  })}
                />
                {errors.message && <p className="mt-1.5 text-xs text-red-600">{errors.message.message}</p>}
              </div>

              {serverError && (
                <p role="alert" className="mb-4 rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">
                  {serverError}
                </p>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-md bg-[#193828] px-4 py-2.5 text-sm font-medium text-white hover:bg-[#234A35] focus:outline-none focus:ring-4 focus:ring-[#193828]/20 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? t('contact.modal.sending') : t('contact.modal.submit')}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}