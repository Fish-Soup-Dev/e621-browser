import TagBar from '../components/TagBar';
import PostsVeiw from '../components/PostsVeiw';
import NavBar from '../components/Navbar';

import { useEffect, useState } from 'react';
const { ipcRenderer } = window.require('electron');

function GetTopTagsFromPosts(posts) {
    let tags = [];
    for (let i = 0; i < posts.length; i++) {
      for (let j = 0; j < posts[i].tags.general.length; j++) {
        let tag = posts[i].tags.general[j];
        let found = false;
        for (let k = 0; k < tags.length; k++) {
          if (tags[k].name === tag) {
            tags[k].count++;
            found = true;
          }
        }
        if (!found) {
          tags.push({name: tag, type: 0, count: 1});
        }
      }
      for (let j = 0; j < posts[i].tags.artist.length; j++) {
        let tag = posts[i].tags.artist[j];
        let found = false;
        for (let k = 0; k < tags.length; k++) {
          if (tags[k].name === tag) {
            tags[k].count++;
            found = true;
          }
        }
        if (!found) {
          tags.push({name: tag, type: 1, count: 1});
        }
      }
      for (let j = 0; j < posts[i].tags.meta.length; j++) {
        let tag = posts[i].tags.meta[j];
        let found = false;
        for (let k = 0; k < tags.length; k++) {
          if (tags[k].name === tag) {
            tags[k].count++;
            found = true;
          }
        }
        if (!found) {
          tags.push({name: tag, type: 2, count: 1});
        }
      }
      for (let j = 0; j < posts[i].tags.species.length; j++) {
        let tag = posts[i].tags.species[j];
        let found = false;
        for (let k = 0; k < tags.length; k++) {
          if (tags[k].name === tag) {
            tags[k].count++;
            found = true;
          }
        }
        if (!found) {
          tags.push({name: tag, type: 3, count: 1});
        }
      }
      for (let j = 0; j < posts[i].tags.copyright.length; j++) {
        let tag = posts[i].tags.copyright[j];
        let found = false;
        for (let k = 0; k < tags.length; k++) {
          if (tags[k].name === tag) {
            tags[k].count++;
            found = true;
          }
        }
        if (!found) {
          tags.push({name: tag, type: 4, count: 1});
        }
      }
    }
    tags.sort((a, b) => b.count - a.count);
    tags = tags.slice(0, 25);
    return tags;
}

const Posts = () => {
    const [posts, setPosts] = useState([]);
    const [pageNumber, setPageNumber] = useState(1);
    const [topTags, setTopTags] = useState([]);
    const [tags, setTags] = useState("");

    const getPosts = (search_text, keep_text, page_number, keep_page) => {
        let posts = ipcRenderer.sendSync('get-posts-from-search', search_text, keep_text, page_number, keep_page);
        setPosts(posts);
        setTopTags(GetTopTagsFromPosts(posts));
    };

    const pageUp = () => {
        if (pageNumber + 1 === 751) return;

        window.scrollTo(0, 0);

        setPageNumber(pageNumber + 1);
        getPosts("", true, pageNumber + 1, false);
    };

    const pageDown = () => {
        if (pageNumber - 1 < 1) return;

        window.scrollTo(0, 0);
        
        setPageNumber(pageNumber - 1);
        getPosts("", true, pageNumber - 1, false);
    };

    const refresh = () => {
        getPosts("", true, 0, true);
    };

    useEffect(() => {
        let p = ipcRenderer.sendSync('get-page-number');
        setPageNumber(p);
        let a = ipcRenderer.sendSync('get-search-text');
        setTags(a);
        getPosts(a, false, p, false);
    }, []);

    return (
        <div>
            <TagBar searchText={tags} setSearchText={setTags} searchFunction={getPosts} tags={topTags}/>
            <PostsVeiw posts={posts} pageNumber={pageNumber} pageUp={pageUp} pageDown={pageDown}/>
            <NavBar/>
            <button className="btn-refresh" onClick={refresh}>Refresh</button>
        </div> 
    );
}
 
export default Posts;