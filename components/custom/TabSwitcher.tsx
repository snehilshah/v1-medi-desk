import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'


type Props = {
  SignUpTab: React.ReactNode
  SignInTab: React.ReactNode
}


export default function TabSwitcher(props: Props) {
  return (
    <Tabs className='max-w-[500px]'>
      <TabsList>
        <TabsTrigger value='sign-up'>Sign Up</TabsTrigger>
        <TabsTrigger value='sign-in'>Sign In</TabsTrigger>
      </TabsList>

      <TabsContent value='sign-up'>{props.SignUpTab}</TabsContent>
      <TabsContent value='sign-in'>{props.SignInTab}</TabsContent>
    </Tabs>
  )
}
