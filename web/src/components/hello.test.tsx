import { render, screen } from '@testing-library/react'
import { describe, expect,it } from 'vitest'

import { Hello } from '@/components/hello'

describe('Hello component', () => {
  it('renders the correct text', () => {
    render(<Hello />)
    expect(screen.getByText('Hello from the component!')).toBeInTheDocument()
  })
})
