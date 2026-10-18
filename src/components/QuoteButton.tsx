import { useState } from 'react'
import { Button, type ButtonProps } from '@mui/material'
import QuoteDialog from './QuoteDialog'

type QuoteButtonProps = Omit<ButtonProps, 'href' | 'component'> & { quoteUrl?: string; service?: string }

export default function QuoteButton({ quoteUrl, service, children, onClick, ...props }: QuoteButtonProps) {
  const [open, setOpen] = useState(false)
  const initialService = service || (quoteUrl ? new URLSearchParams(quoteUrl.split('?')[1] || '').get('service') : '') || 'Other / Not sure'
  return <>
    <Button {...props} aria-haspopup="dialog" onClick={event => {
      onClick?.(event)
      if (!event.defaultPrevented) setOpen(true)
    }}>{children}</Button>
    <QuoteDialog key={initialService} open={open} onClose={() => setOpen(false)} initialService={initialService} />
  </>
}
