import { ButtonPrimary } from "../components/common/ui/Button"
import { Border, Card, Grid, Heading, SubHeading, Title } from "../components/common/ui/Design"

export const AddPrice = () => {
  return (
    <>
      <section className='add-services'>
        <Card>
          <Title>Create price</Title>
          <Border>
            <Heading>Add Heading</Heading>
            <Grid col={2} gap={5}>
              <div>
                <SubHeading>Title</SubHeading>
                <input type='text' placeholder='Write your title' className='bg-gray-100 text-gray-900 text-sm rounded-md focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 block w-full p-3 outline-0' />
              </div>
              <div>
                <SubHeading>Sub Title</SubHeading>
                <input type='text' placeholder='Write your sub title' className='bg-gray-100 text-gray-900 text-sm rounded-md focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 block w-full p-3 outline-0' />
              </div>
            </Grid>
            <br />
            <ButtonPrimary text='Create' color='bg-indigo-500' />
          </Border>
        </Card>

        <br />
        <Card>
          <Border>
            <Grid col={2} gap={5} className='text w-1/2'>
              <div>
                <SubHeading>Title</SubHeading>
                <input type='text' placeholder='Write your sub title' className='bg-gray-100 text-gray-900 text-sm rounded-md focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 block w-full p-3 outline-0' />
              </div>
              <div>
                <SubHeading>Price</SubHeading>
                <input type='text' placeholder='Write your sub title' className='bg-gray-100 text-gray-900 text-sm rounded-md focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 block w-full p-3 outline-0' />
              </div>
            </Grid>

            <div>
              <SubHeading>Desc</SubHeading>
              <textarea name='' id='' rows='5' className='h-58 bg-gray-100 text-gray-900 text-sm rounded-md focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 block w-full p-3 outline-0'></textarea>
            </div>

            <br />
            <ButtonPrimary text='Create' color='bg-indigo-500' />
          </Border>
        </Card>
      </section>
    </>
  )
}
