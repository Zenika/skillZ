import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Tag, { tagClasses } from '../../src/components/atoms/Tag';

describe('Tag component', () => {
    it('renders a green readonly chip', () => {
        render(<Tag color={'green'} name={'Test'} keyId={1} readOnly={true} />);

        const tag = screen.getByText('Test');

        // Expect chip to exist
        expect(tag).toBeInTheDocument();

        // Expect correct classes of parent
        expect(tag).toHaveClass('text-sm');

        // Expect Tag parent button to have disabled attribute
        expect(tag.parentNode).toHaveAttribute('disabled');

        // Expect correct classes of parent button
        expect(tag.parentNode).toHaveClass(
            `${tagClasses.base} ${tagClasses.disabled} ${tagClasses.color['green']}`
        );

        // Expect main parent to have correct number of children
        expect(tag.parentNode.parentNode.childNodes.length).toEqual(1);

        // Expect main parent to have correct classes
        expect(tag.parentNode.parentNode).toHaveClass('flex-initial py-2');
    });

    it('renders a red readonly chip', () => {
        render(<Tag color={'red'} name={'Test'} keyId={1} readOnly={true} />);

        const tag = screen.getByText('Test');

        // Expect chip to exist
        expect(tag).toBeInTheDocument();

        // Expect correct classes of parent
        expect(tag).toHaveClass('text-sm');

        // Expect correct classes of parent button
        expect(tag.parentNode).toHaveClass(
            `${tagClasses.base} ${tagClasses.disabled} ${tagClasses.color['red']}`
        );

        // Expect main parent to have correct number of children
        expect(tag.parentNode.parentNode.childNodes.length).toEqual(1);

        // Expect main parent to have correct classes
        expect(tag.parentNode.parentNode).toHaveClass('flex-initial py-2');
    });

    it('renders a blue readonly chip', () => {
        render(<Tag color={'blue'} name={'Test'} keyId={1} readOnly={true} />);

        const tag = screen.getByText('Test');

        // Expect chip to exist
        expect(tag).toBeInTheDocument();

        // Expect correct classes of parent
        expect(tag).toHaveClass('text-sm');

        // Expect correct classes of parent button
        expect(tag.parentNode).toHaveClass(
            `${tagClasses.base} ${tagClasses.disabled} ${tagClasses.color['blue']}`
        );

        // Expect main parent to have correct number of children
        expect(tag.parentNode.parentNode.childNodes.length).toEqual(1);

        // Expect main parent to have correct classes
        expect(tag.parentNode.parentNode).toHaveClass('flex-initial py-2');
    });

    it('renders a yellow readonly chip', () => {
        render(
            <Tag color={'yellow'} name={'Test'} keyId={1} readOnly={true} />
        );

        const tag = screen.getByText('Test');

        // Expect chip to exist
        expect(tag).toBeInTheDocument();

        // Expect correct classes of parent
        expect(tag).toHaveClass('text-sm');

        // Expect correct classes of parent button
        expect(tag.parentNode).toHaveClass(
            `${tagClasses.base} ${tagClasses.disabled} ${tagClasses.color['yellow']}`
        );

        // Expect main parent to have correct number of children
        expect(tag.parentNode.parentNode.childNodes.length).toEqual(1);

        // Expect main parent to have correct classes
        expect(tag.parentNode.parentNode).toHaveClass('flex-initial py-2');
    });

    it('renders a green readonly chip with uppercase', () => {
        render(
            <Tag
                color={'green'}
                name={'Test'}
                keyId={1}
                readOnly={true}
                uppercase={true}
            />
        );

        const tagUppercase = screen.getByText('Test');

        // Expect chip to exist
        expect(tagUppercase).toBeInTheDocument();

        // Expect correct classes of parent
        expect(tagUppercase).toHaveClass('text-sm');

        // Expect correct classes of parent button
        expect(tagUppercase.parentNode).toHaveClass(
            `${tagClasses.base} ${tagClasses.disabled} ${tagClasses.color['green']} ${tagClasses.uppercase}`
        );

        // Expect main parent to have correct number of children
        expect(tagUppercase.parentNode.parentNode.childNodes.length).toEqual(1);

        // Expect main parent to have correct classes
        expect(tagUppercase.parentNode.parentNode).toHaveClass(
            'flex-initial py-2'
        );
    });
    it('renders a green readonly chip', () => {
        render(<Tag color={'green'} name={'Test'} keyId={1} readOnly={true} />);

        const tag = screen.getByText('Test');

        // Expect chip to exist
        expect(tag).toBeInTheDocument();

        // Expect correct classes of parent
        expect(tag).toHaveClass('text-sm');

        // Expect correct classes of parent button
        expect(tag.parentNode).toHaveClass(
            `${tagClasses.base} ${tagClasses.disabled} ${tagClasses.color['green']}`
        );

        // Expect main parent to have correct number of children
        expect(tag.parentNode.parentNode.childNodes.length).toEqual(1);

        // Expect main parent to have correct classes
        expect(tag.parentNode.parentNode).toHaveClass('flex-initial py-2');
    });

    it('renders a green chip with click', () => {
        const callback = jest.fn(); // Mock callback

        render(
            <Tag
                color={'green'}
                name={'Test'}
                keyId={1}
                readOnly={false}
                callback={() => callback('Click!')}
            />
        );

        const tag = screen.getByText('Test');

        // Expect chip to exist
        expect(tag).toBeInTheDocument();

        const button = screen.getByRole('button');

        button.click();

        expect(callback.mock.calls.length).toEqual(1);
        expect(callback).toHaveBeenCalledWith('Click!');
    });
});
