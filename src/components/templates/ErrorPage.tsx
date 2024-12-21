import { useRouter } from 'next/router'
import Button from '../atoms/Button'
import { useI18n } from '../../providers/I18nProvider'

const ErrorPage = () => {
    const { t } = useI18n()
    const { reload } = useRouter()

    return (
        <div className="flex h-screen">
            <div className="m-auto flex flex-col">
                <h3>{t('error.unknown')}</h3>
                <Button type={'primary'} callback={reload}>
                    {t('error.refetch')}
                </Button>
            </div>
        </div>
    )
}

export default ErrorPage
