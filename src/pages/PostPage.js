import { useNavigate, useParams } from "react-router-dom";
import Axios from 'axios';
import { useEffect, useState } from 'react';
const { ipcRenderer } = window.require('electron');

const PostPage = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState([]);
    const [status, setStatus] = useState(false);
    const [likeCount, setLikeCount] = useState(0);
    const [favoriteCount, setFavoriteCount] = useState(0);

    const getKey = () => {
        if (ipcRenderer.sendSync('get-data', 'loged_in') === true) {
            let userName = ipcRenderer.sendSync('get-data', 'user_name');
            let userKey = ipcRenderer.sendSync('get-data', 'user_api_key');
            let base64key = Buffer.from(userName + ":" + userKey).toString('base64');
            return base64key;
        }
    }

    const getLoginStat = () => {
        if (ipcRenderer.sendSync('get-data', 'loged_in') === true) {
            return true;
        }
    }

    const likePost = (id) => {
        const apturl = "https://e621.net/posts/" + id + "/votes/?score=1&no_unvote=true";

        const requestOptions = {
            method: 'POST',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/x-www-form-urlencoded",
                "Authorization": "Basic " + getKey(),
            },
        };
        fetch(apturl, requestOptions)
        .then(response => response.json())
        .then(data => setLikeCount(data.score));
    }

    const dislikePost = (id) => {
        const apturl = "https://e621.net/posts/" + id + "/votes/?score=-1";

        const requestOptions = {
            method: 'POST',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/x-www-form-urlencoded",
                "Authorization": "Basic " + getKey(),
            },
        };
        fetch(apturl, requestOptions)
        .then(response => response.json())
        .then(data => setLikeCount(data.score));
    }

    const favoritePost = (id) => {
        const apturl = "https://e621.net/favorites/?post_id=" + id;

        const requestOptions = {
            method: 'POST',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/x-www-form-urlencoded",
                "Authorization": "Basic " + getKey(),
            },
        };
        fetch(apturl, requestOptions)
        .then(response => response.json())
        .then(data => setFavoriteCount(data.fav_count));
    }   

    // const unfavoritePost = (id) => {
    //     const apturl = "https://e621.net/favorites/" + id;

    //     const requestOptions = {
    //         method: 'DELETE',
    //         headers: {
    //             "Authorization": "Basic " + getKey(),
    //         },
    //         mode: 'cors',
    //     };
    //     fetch(apturl, requestOptions)
    //     .then(response => response.json())
    //     .then(data => console.log(data))
    //     .catch(error => console.log(error));
    // }

    const addToLocalFavorite = (id) => {
        let localFavorite = ipcRenderer.sendSync('get-data', 'fav_posts');
        if (localFavorite.find((element) => element === id)) {
            console.log("Already in local favorite");
            return;
        }
        localFavorite.push(id);
        ipcRenderer.send('set-data', 'fav_posts', localFavorite);
        console.log(localFavorite);
    }

    useEffect(() => {
        const getPost = (id) => {
            Axios.get("https://e621.net/posts/" + id, {
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Authorization": "basic " + getKey()
                },
                }).then((response) => {
                    setPost(response.data.post);
                    setStatus(true);
                    setLikeCount(response.data.post.score.total);
                    setFavoriteCount(response.data.post.fav_count);
                });
        }

        getPost(params.id);
        getLoginStat();
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
            picture = <video src={post.file.url} autoPlay loop muted className="h-screen" />
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
            <div className="flex flex-col flex-none">
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
                
                <button className="btn-navbar h-10" onClick={() => addToLocalFavorite(params.id)}>Local Favorite</button>
                {/* <button className="btn-navbar h-10" onClick={() => unfavoritePost(params.id)}>Unfavorite</button> */}
                <button className="btn-navbar h-10" >Download</button>
            </div>
    } else {
        controls =
        <div className="flex flex-col flex-none">
            <button className="btn-navbar h-10" onClick={() => navigate(-1)}>Back</button>
            <button className="btn-navbar h-10" onClick={() => addToLocalFavorite(params.id)}>Favorite</button>
            <button className="btn-navbar h-10" >Download</button>
        </div>
    }

    return (
        <div className="post-page flex">
            <div className="post-tags overflow-y-scroll h-screen scrollbar-hide bg-gray-800">
                {tags_artist} {tags_character} {tags_species} {tags_copyright} {tags_general} {tags_invalid} {tags_lore} {tags_meta}
            </div>
            {controls}
            {picture}
        </div>
    )
}

export default PostPage;