const Pool = (props) => {
    return ( 
        <div className="pool bg-cool-gray-0 hover:bg-cool-gray-1">
            <button>
                <h1>{props.pool.name}</h1>
            </button>
        </div>
    );
}
 
export default Pool;