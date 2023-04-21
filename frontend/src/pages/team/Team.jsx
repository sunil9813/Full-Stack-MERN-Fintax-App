import React, { useEffect } from "react"
import { icons } from "../../components/assets/data/dummydata"
import { ButtonRoundMd } from "../../components/common/ui/Button"
import { TitleMd, TitleSm, TitleXl } from "../../components/common/ui/Title"
import { Loader } from "../../components/common/Loader"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify"
import { getAllTeams } from "../../redux/fetaures/TeamSlice"

export const Team = () => {
  const dispatch = useDispatch()

  const { teams, isLoading, isError, message } = useSelector((state) => state.team)

  useEffect(() => {
    dispatch(getAllTeams())

    if (isError) {
      toast.error(message)
    }
  }, [isError, message, dispatch])

  return (
    <>
      <section className='team relative'>
        <TitleXl title='Team' />
        <div className='containers py-16'>
          <div className='text-center'>
            <TitleSm title='Our Team Member' />
            <TitleMd title='Meet Our Amazing Team' />
          </div>

          {isLoading && <Loader />}
          <div className='grid grid-cols-4 gap-8 mt-10 md:grid-cols-2 mobile:grid-cols-1'>
            {teams.map((items) => (
              <div className='team-card relative h-[350px]' key={items._id}>
                <div className='team-details text-center bg-indigo-50 px-5 py-9 rounded-xl h-60'>
                  <h2 className='text-2xl font-semibold capitalize'>{items.post}</h2>
                  <p className='uppercase'>{items.name}</p>
                </div>
                <div className='card-img rounded-xl absolute top-32 mx-5 h-56 w-[260px]'>
                  {items?.image ? (
                    <img
                      src={items.image.filePath}
                      alt={items.image.filename}
                      className='object-cover w-full h-full rounded-3xl'
                    />
                  ) : (
                    <div className='bg-indigo-500 h-full w-full rounded-3xl flex justify-center items-center '>
                      <h1 className='text-img-none font-bold'>FA</h1>
                    </div>
                  )}
                  <div className='social-icons-team px-8 bg-secondary-rgba absolute w-full p-2 bottom-0 left-0 flex justify-between items-center rounded-b-xl'>
                    {icons.map((i, index) => (
                      <ButtonRoundMd icon={i.icon} color='primary' key={index} />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
