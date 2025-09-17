import { Hello } from '@/components/hello'
import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'

describe('Hello component', () => {
  it('renders the correct text', () => {
    render(<Hello />)
    expect(screen.getByText('Hello from the component!')).toBeInTheDocument()
  })
})
