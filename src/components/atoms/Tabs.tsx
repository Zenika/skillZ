import React from 'react';
import { TabProps } from './Tab';

type TabsProps = {
    children: React.ReactElement<TabProps> | React.ReactElement<TabProps>[];
};

export const tabsClasses = {
    base: 'text-sm font-medium text-center text-gray-500 mb-8',
    dark: 'dark:text-gray-400 dark:border-gray-700',
};

const Tabs = ({ children }: TabsProps) => {
    return (
        <div
            className={`${tabsClasses.base} ${tabsClasses.dark}`}
            data-testid="tabs"
        >
            <div className={'flex'}>{children}</div>
        </div>
    );
};

export default Tabs;
