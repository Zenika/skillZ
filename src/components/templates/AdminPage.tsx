import { useRouter } from 'next/router';
import React from 'react';
import Tab from '../../components/atoms/Tab';
import Tabs from '../../components/atoms/Tabs';
import CommonPage from '../../components/templates/CommonPage';
import Loading from '../molecules/Loading';
import { useI18n } from '../../providers/I18nProvider';
import { useAdmin } from '../../providers/AdminProvider';

type AdminPageProps = {
    children: any;
};

export default function AdminPage({ children }: AdminPageProps) {
    const { pathname, push } = useRouter();
    const { isAdmin } = useAdmin();
    const { t } = useI18n();

    if (!isAdmin) {
        push('/');
        return <Loading></Loading>;
    }

    return (
        <CommonPage page={'Admin'} backBar={false}>
            <Tabs>
                <Tab
                    title={t('admin.skills')}
                    current={pathname === '/admin/skills'}
                    href={{ pathname: '/admin/skills' }}
                />
                <Tab
                    title={t('admin.categories')}
                    current={pathname === '/admin/categories'}
                    href={{ pathname: '/admin/categories' }}
                />
            </Tabs>
            {children}
        </CommonPage>
    );
}
