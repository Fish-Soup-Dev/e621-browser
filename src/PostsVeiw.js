import Post from "./Post";

const PostsVeiw = (props) => {
    return ( 
        <div className="postveiw">
            <div className="page-controlls">
            </div>
            <div className="posts">
                {props.posts.map((post) => (
                    <Post post={post} key={post.id}/>
                ))}
            </div>
        </div>
    );
}
 
export default PostsVeiw;