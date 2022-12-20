import { BsArrowUpSquareFill, BsArrowDownSquareFill, BsFillDashSquareFill } from "react-icons/bs";
import { BsHeartFill, BsChatRightTextFill, BsFillPlayFill } from "react-icons/bs";
import { MdGif } from "react-icons/md";

const Post = (props) => {

    let type;
    if (props.post.file.ext === "webm") {
        type = 
            <div className="defualt-icons absolute">
                <MdGif size="40" className="text-white" />
            </div>
    } else if (props.post.file.ext === "gif") {
        type =
            <div className="defualt-icons absolute">
                <BsFillPlayFill size="40" className="text-white" />
            </div>
    }
    
    const ShowPostWindow = (post) => {
        const w = window.open('', "_blank");
        if (post.file.ext === "webm") {
            w.document.write(`<video src="${post.file.url}" controls autoplay style="width: 100%; height: 100%; object-fit: contain;"></video>`);
        } else {
            w.document.write(`<img src="${post.file.url}" alt="" style="width: 100%; height: 100%; object-fit: contain;"/>`);
        }
    }
    
    let score;
    if (props.post.score.total < 0) {
        score = 
        <div className="defualt-icons"> 
            <BsArrowDownSquareFill className="text-bad-red" /> 
            <p className="m-1">{props.post.score.total}</p> 
        </div>
    }
    else if (props.post.score.total > 0) {
        score =
        <div className="defualt-icons"> 
            <BsArrowUpSquareFill className="text-good-green" /> 
            <p className="m-1">{props.post.score.total}</p> 
        </div>
    } else {
        score =
        <div className="defualt-icons">
            <BsFillDashSquareFill className="text-white" />
            <p className="m-1">{props.post.score.total}</p>
        </div>
    }

    let fav = 
        <div className="defualt-icons">
            <BsHeartFill className="text-white" />
            <p className="m-1">{props.post.fav_count}</p>
        </div>
    
    let comment =
        <div className="defualt-icons">
            <BsChatRightTextFill className="text-white" />
            <p className="m-1">{props.post.comment_count}</p>
        </div>

    let rateing;
    if (props.post.rating === "s") {
        rateing = "border-good-green"
    } else if (props.post.rating === "q") {
        rateing = "border-ok-yellow"
    } else if (props.post.rating === "e") {
        rateing = "border-bad-red"
    }

    return ( 
        <div className="post shadow-xl flex flex-col items-center">
            <button>
                {type}
                <img src={props.post.preview.url} 
                     alt=""
                     className={`post-image ${rateing}`}
                     onClick={() => ShowPostWindow(props.post)}
                />
            </button>
            <div className="flex flex-row justify-center"> {score} {fav} {comment} </div>
        </div>
    );
}
 
export default Post;