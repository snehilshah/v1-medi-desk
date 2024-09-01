import TabSwitcher from '@/components/custom/TabSwitcher'

export default function Auth() {
    return (
        <div className='relative flex w-full h-screen bg-background'>
            <div className='max-w-3xl absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'>
                <TabSwitcher SignUpTab={<h1>Hello SignUp</h1>} SignInTab={<h1>Sign Out </h1>} />
            </div>
        </div>
    )
}
