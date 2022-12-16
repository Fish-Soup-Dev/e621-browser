import NavBar from '../components/Navbar';

const Favorites = (props) => {
    return ( 
       <div>
            <div className="grid top-14 absolute">
                <h1 className="font-bold text-white">No Favorites</h1>
            </div>
            <NavBar/>
       </div> 
    );
}
 
export default Favorites;