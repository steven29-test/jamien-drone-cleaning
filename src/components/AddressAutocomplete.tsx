import { useEffect, useState } from 'react'
import { Autocomplete, Box, CircularProgress, Paper, TextField, type PaperProps } from '@mui/material'

function AddressSuggestionsPaper({ children, ...props }: PaperProps) {
  return <Paper {...props}>
    {children}
    <Box sx={{ px: 1.5, py: 0.5, textAlign: 'right', fontSize: 10, lineHeight: 1.5, color: '#777' }}>
      <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer" onMouseDown={event => event.preventDefault()} style={{ color: 'inherit', textDecoration: 'none' }}>© OpenStreetMap</a>
    </Box>
  </Paper>
}

export default function AddressAutocomplete({ disabled }: { disabled: boolean }) {
  const [address, setAddress] = useState('')
  const [query, setQuery] = useState('')
  const [options, setOptions] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [unavailable, setUnavailable] = useState(false)

  useEffect(() => {
    if (disabled || query.trim().length < 4) {
      setLoading(false)
      setOptions([])
      return
    }
    let active = true
    const controller = new AbortController()
    const timer = window.setTimeout(async () => {
      setLoading(true)
      setUnavailable(false)
      const timeout = window.setTimeout(() => controller.abort(), 8000)
      try {
        const response = await fetch(`/api/address-suggestions?q=${encodeURIComponent(query.trim())}`, { signal: controller.signal })
        if (!response.ok) throw new Error('Address search unavailable')
        const data: { addresses?: string[] } = await response.json()
        if (active) setOptions(data.addresses || [])
      } catch {
        if (active) { setOptions([]); setUnavailable(true) }
      } finally {
        window.clearTimeout(timeout)
        if (active) setLoading(false)
      }
    }, 500)
    return () => { active = false; window.clearTimeout(timer); controller.abort() }
  }, [query, disabled])

  return <Autocomplete
    freeSolo
    disablePortal
    PaperComponent={AddressSuggestionsPaper}
    disabled={disabled}
    options={options}
    filterOptions={items => items}
    inputValue={address}
    loading={loading}
    loadingText="Finding addresses…"
    onInputChange={(_event, value, reason) => {
      setAddress(value)
      setOptions([])
      setUnavailable(false)
      setQuery(reason === 'input' ? value : '')
    }}
    onChange={(_event, value) => { setAddress(value || ''); setQuery(''); setOptions([]) }}
    renderInput={params => <TextField
      {...params}
      label="Property address / suburb"
      name="address"
      fullWidth
      placeholder="Start typing your address"
      helperText={unavailable ? 'Suggestions unavailable. You can enter your address manually.' : undefined}
      inputProps={{ ...params.inputProps, maxLength: 250, autoComplete: 'off' }}
      InputProps={{ ...params.InputProps, endAdornment: <>{loading && <CircularProgress color="inherit" size={16} />}{params.InputProps.endAdornment}</> }}
    />}
  />
}

