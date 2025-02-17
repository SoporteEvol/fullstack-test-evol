
import NavigationItem from './NavigationItem';

const Navigation = () => {

    const data = [
        {title: "Todas", counter:10},
        {title: "Abiertas", counter:4},
        {title: "Cerradas", counter:12},
        {title: "Tags", counter:22},
      ]
  return (
    <div className='flex justify-around px-6 mb-5'>
        <NavigationItem data={data}/>
    </div>
  )
}

export default Navigation