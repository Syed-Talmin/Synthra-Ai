import Sidebar from '../components/Sidebar'
import Messages from '../components/Messages'
const Home = () => {
  return (
    <div className='flex w-screen h-screen bg-[#121212] text-white overflow-hidden'>
      <Sidebar />
      <Messages />
    </div>
  );
};

export default Home;
