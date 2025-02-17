
interface NavigationItemProps {
  data: { title: string; counter: number }[];
}


const NavigationItem = ({data}: NavigationItemProps) => {

  
  return (
    <div className="flex justify-between w-[100vw]">
 {data && data.map((item, index) =>(
  <div key={index}>
  
<button type="button" className="inline-flex items-center px-1 py-2.5  text-[14px] text-center text-neutral-700  hover:cursor-pointer font-medium">
{item.title}
<span className="inline-flex items-center bg-blue-600 text-white justify-center w-5 h-5 ms-2 text-xs font-semibold  rounded-full">
{item.counter}
</span>
</button>

  </div>
 ))}

</div>
  )
}

export default NavigationItem