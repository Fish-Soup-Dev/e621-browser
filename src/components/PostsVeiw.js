import Post from "./Post";

const PostsVeiw = (props) => {
    return ( 
        <div className="postveiw">
            <div className="page-controlls inline-flex m-2">
                <button className="page-controll-button rounded-l" onClick={props.pageDown}>Prev</button>
                <button className="page-controll-button" onClick={props.pageUp}>Next</button>
                <p className="page-number rounded-r">{props.pageNumber}</p>
            </div>
            <div className="posts">
                {props.posts.map((post) => (
                    <Post post={post} key={post.id}/>
                ))}
            </div>
            <div className="page-controlls inline-flex m-2">
                <button className="page-controll-button rounded-l" onClick={props.pageDown}>Prev</button>
                <button className="page-controll-button" onClick={props.pageUp}>Next</button>
                <p className="page-number rounded-r">{props.pageNumber}</p>
            </div>
        </div>
    );
}
 
export default PostsVeiw;