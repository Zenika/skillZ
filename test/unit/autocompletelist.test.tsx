/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import AutoCompleteList, {
    autoCompleteListChildrenClasses,
    autoCompleteListParentChildrenClasses,
} from '../../src/components/atoms/AutoCompleteList'

describe('AutoCompleteList component', () => {
    it('renders an AutoCompleteList', () => {
        render(
            <AutoCompleteList
                choices={['Choice 1', 'Choice2']}
                onChange={() => {}}
                search={'C'}
                newType={'Choice'}
            ></AutoCompleteList>
        )

        const autocompletelist = screen.getByTestId('autocompletelist')

        expect(autocompletelist).toBeInTheDocument()

        // // Expect structure to be correct
        expect(autocompletelist.children).toHaveLength(1)
        expect(autocompletelist.children[0].children).toHaveLength(2)
        expect(autocompletelist.children[0].children[0].children).toHaveLength(
            3
        )
        expect(autocompletelist.children[0].children[1].children).toHaveLength(
            2
        )

        expect(
            autocompletelist.children[0].children[1].children[0].textContent
        ).toBe('Choice 1')

        expect(
            autocompletelist.children[0].children[1].children[1].textContent
        ).toBe('Choice2')

        // Expect class to be correct
        expect(autocompletelist.children[0]).toHaveClass(
            `${autoCompleteListParentChildrenClasses.base} ${autoCompleteListParentChildrenClasses.dark}`
        )

        expect(
            autocompletelist.children[0].children[1].children[0]
        ).toHaveClass(
            `${autoCompleteListChildrenClasses.base} ${autoCompleteListChildrenClasses.hover} ${autoCompleteListChildrenClasses.dark}`
        )
    })

    it('renders an AutoCompleteList and without search', () => {
        render(
            <AutoCompleteList
                choices={[
                    'Choice 1',
                    'Choice 2',
                    'Choice 3',
                    'Choice 4',
                    'Choice 5',
                ]}
                onChange={() => {}}
                search={''}
                newType={'Choice'}
            ></AutoCompleteList>
        )

        const autocompletelist = screen.getByTestId('autocompletelist')

        expect(autocompletelist).toBeInTheDocument()

        // Expect structure to be correct
        expect(autocompletelist.children).toHaveLength(0)
    })

    it('renders an AutoCompleteList and click', () => {
        const onChange = jest.fn()

        render(
            <AutoCompleteList
                choices={[
                    'Choice 1',
                    'Choice 2',
                    'Choice 3',
                    'Choice 4',
                    'Choice 5',
                ]}
                onChange={(choice) => onChange(choice)}
                search={'Choice'}
                newType={'Choice'}
            ></AutoCompleteList>
        )

        const autocompletelist = screen.getByTestId('autocompletelist')

        expect(autocompletelist).toBeInTheDocument()

        // Expect structure to be correct
        expect(autocompletelist.children).toHaveLength(1)
        expect(autocompletelist.children[0].children).toHaveLength(2)
        expect(autocompletelist.children[0].children[0].children).toHaveLength(
            3
        )
        expect(autocompletelist.children[0].children[1].children).toHaveLength(
            5
        )

        const choice2 = screen.getByText('Choice 2')

        choice2.click()

        expect(onChange.mock.calls.length).toEqual(1)
        expect(onChange.mock.calls[0][0]).toBe('Choice 2')
    })
})
