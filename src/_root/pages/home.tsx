import { useAuthContext } from '@/context/AuthProvider';
import TypewriterComponent from 'typewriter-effect';

const Home = () => {
  const { user } = useAuthContext();
  //temporary logout function

  return (
    <div className='w-full h-full flex '>
      <div className='block text-xl max-w-[30em] w-full mx-auto p-4'>
        <TypewriterComponent
          onInit={(typewriter) => {
            const part1 = typewriter
              .typeString(`<span class="leading-10 text-xl font-thin">Hey <span class="bg-gradient-to-r from-rose-500 to-purple-500 bg-clip-text text-transparent"> ${user.username}</span> </span>`)
              .pauseFor(100)
              .typeString("<br><span class='font-semibold text-3xl'>Let's </span>");

            part1.start();

            setInterval(() => {
              part1.typeString("<span class='font-semibold text-3xl w-min bg-gradient-to-r from-yellow-300 to-orange-500 text-transparent bg-clip-text'> create recipes</span>")
                .pauseFor(2000)
                .deleteChars(15)
                .typeString("<span class='font-semibold text-3xl w-min bg-gradient-to-r from-blue-400 to-blue-900 text-transparent bg-clip-text'> organize your groceries</span>")
                .pauseFor(2000)
                .deleteChars(24).start();
            }, 2000);


          }}
        />
        <p className="text-gray-500 mt-2">Welcome to your dashboard.</p>

      </div>
    </div>
  )
}

export default Home