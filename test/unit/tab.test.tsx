import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Tab, { tabClasses } from '../../src/components/atoms/Tab';
import { createMockRouter } from './utils/createMockRouter';
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';

describe('Tab component', () => {
    it('renders a tab', () => {
        render(<Tab current={false} href={'/test'} title={'Tab'} />);

        const tab = screen.getByText('Tab');

        expect(tab).toBeInTheDocument();

        expect(tab).toHaveClass(tabClasses.base);
        expect(tab).toHaveClass(tabClasses.hover);
    });

    it('renders a tab, click and check href', () => {
        const mockPush = jest.fn();
        const mockRouter = createMockRouter({ push: mockPush });

        render(
            <RouterContext.Provider value={mockRouter}>
                <Tab current={true} href={'/test'} title={'Current tab'} />
            </RouterContext.Provider>
        );

        const tab = screen.getByText('Current tab');

        tab.click();

        expect(mockPush).toHaveBeenCalledWith('/test', '/test', {
            locale: undefined,
            scroll: true,
            shallow: undefined,
        });
    });

    it('renders a current tab', () => {
        render(<Tab current={true} href={'/test'} title={'Current tab'} />);

        const tab = screen.getByText('Current tab');

        expect(tab).toBeInTheDocument();

        expect(tab).toHaveClass(tabClasses.border);
    });
});
