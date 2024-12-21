import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Topic, { topicClasses } from '../../src/components/atoms/Topic';

describe('Topic component', () => {
    it('renders a common readonly topic', () => {
        render(
            <Topic
                type={'common'}
                topic={{ id: '2', name: 'Test' }}
                keyId={1}
                readOnly={true}
            />
        );

        const topic = screen.getByText('Test');

        // Expect topic to exist
        expect(topic).toBeInTheDocument();

        // Expect correct classes of parent
        expect(topic).toHaveClass('text-sm');

        // Expect topic parent button to have disabled attribute
        expect(topic.parentNode).toHaveAttribute('disabled');

        // Expect correct classes of parent button
        expect(topic.parentNode).toHaveClass(
            `${topicClasses.base} ${topicClasses.disabled} ${topicClasses.variant['common']}`
        );

        // Expect main parent to have correct number of children
        expect(topic.parentNode.parentNode.childNodes.length).toEqual(1);

        // Expect main parent to have correct classes
        expect(topic.parentNode.parentNode).toHaveClass('flex-initial py-2');
    });

    it('renders a selected readonly topic', () => {
        render(
            <Topic
                type={'selected'}
                topic={{ id: '2', name: 'Test' }}
                keyId={1}
                readOnly={true}
            />
        );

        const topic = screen.getByText('Test');

        // Expect topic to exist
        expect(topic).toBeInTheDocument();

        // Expect correct classes of parent
        expect(topic).toHaveClass('text-sm');

        // Expect topic parent button to have disabled attribute
        expect(topic.parentNode).toHaveAttribute('disabled');

        // Expect correct classes of parent button
        expect(topic.parentNode).toHaveClass(
            `${topicClasses.base} ${topicClasses.disabled} ${topicClasses.variant['selected']}`
        );

        // Expect main parent to have correct number of children
        expect(topic.parentNode.parentNode.childNodes.length).toEqual(1);

        // Expect main parent to have correct classes
        expect(topic.parentNode.parentNode).toHaveClass('flex-initial py-2');
    });

    it('renders a common topic with click', () => {
        const callback = jest.fn(); // Mock callback

        render(
            <Topic
                type={'common'}
                topic={{ id: '2', name: 'Test' }}
                keyId={1}
                readOnly={false}
                callback={() => callback('Click!')}
            />
        );

        const topic = screen.getByText('Test');

        // Expect chip to exist
        expect(topic).toBeInTheDocument();

        const button = screen.getByRole('button');

        button.click();

        expect(callback.mock.calls.length).toEqual(1);
        expect(callback).toHaveBeenCalledWith('Click!');
    });

    it('renders a common readonly topic with click', () => {
        const callback = jest.fn(); // Mock callback

        render(
            <Topic
                type={'common'}
                topic={{ id: '2', name: 'Test' }}
                keyId={1}
                readOnly={true}
                callback={() => callback('Click!')}
            />
        );

        const topic = screen.getByText('Test');

        // Expect chip to exist
        expect(topic).toBeInTheDocument();

        const button = screen.getByRole('button');

        button.click();

        expect(callback.mock.calls.length).toEqual(0);
    });
});
