import NavBar from '../components/Navbar';

const Home = () => {
    return ( 
        <div>
            <NavBar />
            <div className="top-14 fixed w-screen h-screen">
                <h1 className="e6-font flex justify-center text-7xl">Home</h1>
                <h2 className="e6-font flex justify-center text-3xl">Do not use this app if you are under 18</h2>
            </div>
        </div> 
    );
}

export default Home;