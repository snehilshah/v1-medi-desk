import TabSwitcher from '@/components/custom/TabSwitcher'
import SignInForm from './SignInForm'
import SignUpForm from './SignUpForm'

export default function Auth() {
    return (
        <div className='relative flex w-full h-screen bg-background'>
            <div className='max-w-3xl absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'>
                <TabSwitcher SignUpTab={<SignUpForm />} SignInTab={<SignInForm />} />
            </div>
        </div>
    )
}
