import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/react'
import SearchBar from '../../src/components/atoms/SearchBar/SearchBar'

describe('SearchBar component', () => {
    it('renders a SearchBar', () => {
        let value = 'This is a test'
        const setSearch = jest.fn((v) => (value = v))

        render(
            <SearchBar
                setSearch={setSearch}
                value={value}
                placeholder={'Search for something'}
            />
        )

        const input = screen.getByDisplayValue('This is a test')

        expect(input).toBeInTheDocument()

        // Expect the input to have the correct value
        expect(input).toHaveValue('This is a test')

        // Expect the input to have the correct placeholder
        expect(input).toHaveAttribute('placeholder', 'Search for something')

        // Expect the input to have the correct class
        expect(input).toHaveClass(
            'bg-light-ultrawhite border border-light-light w-full rounded-full p-4 bg-right outline-none dark:bg-dark-light dark:border-dark-light hover:border-light-graybutton hover:bg-light-dark hover:dark:border-dark-graybutton hover:dark:bg-dark-radargrid focus-visible:outline-light-red dark:focus-visible:outline-dark-red'
        )
    })

    it('renders a SearchBar with initial value', () => {
        let value = 'This is a test with initial value'
        const setSearch = jest.fn((v) => (value = v))

        render(
            <SearchBar
                setSearch={setSearch}
                value={null}
                initialValue={value}
            />
        )

        const input = screen.getByDisplayValue(
            'This is a test with initial value'
        )

        expect(input).toBeInTheDocument()

        // Expect the input to have the correct value
        expect(input).toHaveValue('This is a test with initial value')

        // Expect the input to have the correct class
        expect(input).toHaveClass(
            'bg-light-ultrawhite border border-light-light w-full rounded-full p-4 bg-right outline-none dark:bg-dark-light dark:border-dark-light hover:border-light-graybutton hover:bg-light-dark hover:dark:border-dark-graybutton hover:dark:bg-dark-radargrid focus-visible:outline-light-red dark:focus-visible:outline-dark-red'
        )
    })

    it('renders a SearchBar and change value', () => {
        let value = null
        const setSearch = jest.fn((v) => (value = v))

        const { rerender } = render(
            <SearchBar
                setSearch={setSearch}
                value={value}
                initialValue={'First render'}
            />
        )

        const input = screen.getByDisplayValue('First render')

        expect(input).toBeInTheDocument()

        // Expect the input to have the correct value
        expect(input).toHaveValue('First render')

        // Expect the input to have the correct class
        expect(input).toHaveClass(
            'bg-light-ultrawhite border border-light-light w-full rounded-full p-4 bg-right outline-none dark:bg-dark-light dark:border-dark-light hover:border-light-graybutton hover:bg-light-dark hover:dark:border-dark-graybutton hover:dark:bg-dark-radargrid focus-visible:outline-light-red dark:focus-visible:outline-dark-red'
        )

        // Change the value
        fireEvent.change(input, { target: { value: 'Second render' } })

        rerender(
            <SearchBar
                setSearch={setSearch}
                value={value}
                initialValue={'First render'}
            />
        )

        // Expect the input to have the correct value
        expect(input).toHaveValue('Second render')

        // Expect callback to have been called
        expect(setSearch).toHaveBeenCalled()

        // Expect callback to have been called with the correct value
        expect(setSearch).toHaveBeenCalledWith('Second render')
    })
})
