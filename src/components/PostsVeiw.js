import Post from "./Post";

const PostsVeiw = (props) => {

    let controlls;
    if(props.posts.length > 0){
        controlls = (
            <div className="page-controlls inline-flex m-2">
                <button className="page-controll-button rounded-l" onClick={props.pageDown}>Prev</button>
                <button className="page-controll-button" onClick={props.pageUp}>Next</button>
                <p className="page-number rounded-r">{props.pageNumber}</p>

                <button className="page-controll-button align-middle fixed right-6 rounded" onClick={props.refresh}>Refresh</button>
            </div>
        )
    }

    return ( 
        <div className="postveiw h-[calc(100vh-56px)] overflow-y-scroll">
            {controlls}
            <div className="posts">
                {props.posts.map((post) => (
                    <Post post={post} key={post.id}/>
                ))}
            </div>
            {controlls}
        </div>
    );
}
 
export default PostsVeiw;