import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Tab from '../../src/components/atoms/Tab'
import Tabs, { tabsClasses } from '../../src/components/atoms/Tabs'
import { createMockRouter } from './utils/createMockRouter'
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime'

describe('Tabs component', () => {
    it('renders a tabs', () => {
        render(
            <Tabs>
                <Tab current={false} href={'/test'} title={'Tab'} />
            </Tabs>
        )

        const tabs = screen.getByTestId('tabs')

        expect(tabs).toBeInTheDocument()

        expect(tabs).toHaveClass(tabsClasses.base)
        expect(tabs).toHaveClass(tabsClasses.dark)
    })

    it('renders a tabs with multiple tab', () => {
        render(
            <Tabs>
                <Tab current={false} href={'/test'} title={'Tab'} />
                <Tab current={false} href={'/test2'} title={'Tab2'} />
                <Tab current={false} href={'/test3'} title={'Tab3'} />
            </Tabs>
        )

        const tabs = screen.getByTestId('tabs')
        const tab1 = screen.getByText('Tab')
        const tab2 = screen.getByText('Tab2')
        const tab3 = screen.getByText('Tab3')

        expect(tabs.children).toHaveLength(1)

        expect(tabs).toBeInTheDocument()
        expect(tab1).toBeInTheDocument()
        expect(tab2).toBeInTheDocument()
        expect(tab3).toBeInTheDocument()
    })

    it('renders a tabs, with multiple tabs and click on second tab', () => {
        const mockPush = jest.fn()
        const mockRouter = createMockRouter({ push: mockPush })

        render(
            <RouterContext.Provider value={mockRouter}>
                <Tab current={false} href={'/test'} title={'Tab'} />
                <Tab
                    current={true}
                    href={'/current-tab'}
                    title={'Current tab'}
                />
                <Tab current={false} href={'/test3'} title={'Tab3'} />
            </RouterContext.Provider>
        )

        const tab = screen.getByText('Current tab')

        tab.click()

        expect(mockPush).toHaveBeenCalledWith('/current-tab', '/current-tab', {
            locale: undefined,
            scroll: true,
            shallow: undefined,
        })
    })
})
