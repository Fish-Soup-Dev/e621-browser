const Pool = (props) => {
    return ( 
        <div className="pool bg-gray-800 hover:bg-gray-900">
            <button>
                <h1>{props.pool.name}</h1>
            </button>
        </div>
    );
}
 
export default Pool;