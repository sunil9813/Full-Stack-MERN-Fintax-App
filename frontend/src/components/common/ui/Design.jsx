export const Container = ({ children }) => {
  return (
    <div className='bg-gray-50'>
      <div className='w-[85%] m-auto'>{children}</div>
    </div>
  )
}
export const Card = ({ children }) => {
  return <div className='bg-white p-8 rounded-lg shadow-shadow2'>{children}</div>
}
export const Title = ({ children }) => {
  return <h1 className='text-xl font-semibold capitalize text-secondary mb-5'>{children}</h1>
}

export const Heading = ({ children }) => {
  return <h2 className='text-md font-semibold capitalize mb-5'>{children}</h2>
}
export const SubHeading = ({ children }) => {
  return <h2 className='text-sm capitalize my-2'>{children}</h2>
}

export const Border = ({ children }) => {
  return <div className='p-5 border border-gray-200 rounded-lg mb-5'>{children}</div>
}
export const Grid = ({ children, col, gap }) => {
  return <div className={` grid grid-cols-${col} gap-${gap}`}>{children}</div>
}
