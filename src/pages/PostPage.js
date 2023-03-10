import { useNavigate, useParams } from "react-router-dom";
import ReactPlayer from 'react-player';

import { useEffect, useState } from 'react';
const { ipcRenderer } = window.require('electron');

const PostPage = () => {
    const params = useParams();
    const navigate = useNavigate();

    const [post, setPost] = useState([]);
    const [status, setStatus] = useState(false);
    const [likeCount, setLikeCount] = useState(0);
    const [favoriteCount, setFavoriteCount] = useState(0);

    const getLoginStat = () => {
        if (ipcRenderer.sendSync('get-data', 'loged_in') === true) {
            return true;
        }
    }

    const likePost = (id) => {
        
    }

    const dislikePost = (id) => {
        
    }

    const favoritePost = (id) => {
        
    }   

    const unfavoritePost = (id) => {
        
    }

    useEffect(() => {
        let p = ipcRenderer.sendSync('get-post', params.id);
        setPost(p);
        setStatus(true);
    }, [params.id]);

    let picture;
    let tags_artist;
    let tags_character;
    let tags_copyright;
    let tags_general;
    let tags_invalid;
    let tags_lore;
    let tags_meta;
    let tags_species;

    if (status === true) {
        if (post.file.ext === "webm") {
            picture = <ReactPlayer url={post.file.url} width="100%" height="100%" playing={true} loop={true} className="h-screen"/>
        } else {
            picture = <img src={post.file.url} alt="" className="h-screen" />
        }
        tags_artist = post.tags.artist.map((tag) => (
            <p className="e6-font text-mid-orange m-1" key={tag}>{tag}</p>
        ))
        tags_character = post.tags.character.map((tag) => (
            <p className="e6-font text-good-green m-1" key={tag}>{tag}</p>
        ))
        tags_copyright = post.tags.copyright.map((tag) => (
            <p className="e6-font text-sus-purple m-1" key={tag}>{tag}</p>
        ))
        tags_general = post.tags.general.map((tag) => (
            <p className="e6-font text-ok-yellow m-1" key={tag}>{tag}</p>
        ))
        tags_invalid = post.tags.invalid.map((tag) => (
            <p className="e6-font text-bad-red m-1" key={tag}>{tag}</p>
        ))
        tags_lore = post.tags.lore.map((tag) => (
            <p className="e6-font text-sus-purple m-1" key={tag}>{tag}</p>
        ))
        tags_meta = post.tags.meta.map((tag) => (
            <p className="e6-font text-white m-1" key={tag}>{tag}</p>
        ))
        tags_species = post.tags.species.map((tag) => (
            <p className="e6-font text-bad-red m-1" key={tag}>{tag}</p>
        ))
    } else {
        picture = <p className="e6-font">Loading...</p>
    }

    let controls;
    if (getLoginStat() === true) {
        controls = 
            <div className="flex flex-row flex-none">
                <button className="btn-navbar h-10" onClick={() => navigate(-1)}>Back</button>

                <div className="flex flex-row flex-none e6-font m-2">
                    <button className="page-controll-button h-10 rounded-l py-2 px-3" onClick={() => dislikePost(params.id)} >Dislike</button>
                    <button className="page-controll-button h-10 py-2 px-3" onClick={() => likePost(params.id)} >Like</button>
                    <h1 className="page-number h-10 rounded-r py-2 px-3">{likeCount}</h1>
                </div>

                <div className="flex flex-row flex-none e6-font m-2">
                    <button className="page-controll-button h-10 rounded-l py-2 px-5" onClick={() => favoritePost(params.id)}>Favorite</button>
                    <h1 className="page-number h-10 rounded-r py-2 px-5">{favoriteCount}</h1>
                </div>
                
                <button className="btn-navbar h-10" onClick={() => unfavoritePost(params.id)}>Unfavorite</button>
                <button className="btn-navbar h-10" >Download</button>
            </div>
    } else {
        controls =
        <div className="flex flex-col flex-none">
            <button className="btn-navbar h-10" onClick={() => navigate(-1)}>Back</button>
        </div>
    }

    return (
        <div className="post-page flex">
            {controls}
            <div className="post-tags overflow-y-scroll h-screen scrollbar-hide bg-gray-800 tagbar">
                {tags_artist} {tags_character} {tags_species} {tags_copyright} {tags_general} {tags_invalid} {tags_lore} {tags_meta}
            </div>
            {picture}
        </div>
    )
}

export default PostPage;