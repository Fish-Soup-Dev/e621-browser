const Post = (props) => {
    const ShowRating = (rating) => {
        if (rating === "s") {
            return <p className="px-1 text-good-green">S</p>
        } else if (rating === "q") {
            return <p className="px-1 text-ok-yellow">Q</p>
        } else if (rating === "e") {
            return <p className="px-1 text-bad-red">E</p>
        } else {
            return <p className="px-1 text-white">U</p>
        }
    }

    const ShowPostWindow = (post) => {
        const w = window.open('', "_blank");
        if (post.file.ext === "webm") {
            w.document.write(`<video src="${post.file.url}" controls autoplay style="width: 100%; height: 100%; object-fit: contain;"></video>`);
        } else {
            w.document.write(`<img src="${post.file.url}" alt="" style="width: 100%; height: 100%; object-fit: contain;"/>`);
        }
    }

    const ShowPostType = (post) => {
        if (post.file.ext === "webm") {
            return <p className="px-1 text-white font-bold absolute outline rounded bg-sus-purple outline-sus-purple">Webm</p>
        } else if (post.file.ext === "gif") {
            return <p className="px-1 text-white font-bold absolute outline rounded bg-sus-purple outline-sus-purple">Gif</p>
        }
    }

    return ( 
        <div className="post">
            {ShowPostType(props.post)}
            <button>
                <img src={props.post.preview.url} alt="" className="post-image" onClick={() => ShowPostWindow(props.post)}/>
            </button>
            <div style={{"display": "flex"}}>
                <p className={`${props.post.score.total < 0 ? "text-bad-red" : "text-good-green"}`}>S{props.post.score.total}</p>
                <p className="px-1">F{props.post.fav_count}</p>
                <p>C{props.post.comment_count}</p>
                {ShowRating(props.post.rating)}
            </div>
        </div>
    );
}
 
export default Post;