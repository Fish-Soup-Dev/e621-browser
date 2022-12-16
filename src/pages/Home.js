import TagBar from '../components/TagBar';
import PostsVeiw from '../components/PostsVeiw';
import NavBar from '../components/Navbar';

import Axios from 'axios';
import { useEffect, useState } from 'react';

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

const Home = () => {
    const [posts, setPosts] = useState([]);
    const [topTags, setTopTags] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [pageNumber, setPageNumber] = useState(1);

    const getPosts = (tags, page) => {
        Axios.get("https://e621.net/posts?limit=75&page=" + page + "&tags="+tags, {
        headers: {
            //"User-Agent": "e621dl/2.0 (by silly fella)", // idk about this
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": "Basic U2lsbHlGZWxsYTpMUFRuOWhKUTF6S3NwQ0haYzdjdUp4WjI="
        },
        }).then((response) => {
        setPosts(response.data.posts);
        setTopTags(GetTopTagsFromPosts(response.data.posts));
        });
    };

    const scrollUp = () => {
        window.scrollTo(0, 0);
    }

    const pageUp = () => {
        if (pageNumber + 1 === 751) return;
        scrollUp();
        setPageNumber(pageNumber + 1);
        getPosts(searchText, pageNumber + 1);
    };

    const pageDown = () => {
        if (pageNumber - 1 < 1) return;
        scrollUp();
        setPageNumber(pageNumber - 1);
        getPosts(searchText, pageNumber - 1);
    };

    const refresh = () => {
        getPosts(searchText, pageNumber);
    };

    useEffect(() => {
        setPageNumber(1);
        getPosts("", 1);
        setSearchText("");
    }, []);

    return ( 
       <div>
            <TagBar searchText={searchText} setSearchText={setSearchText} searchFunction={getPosts} tags={topTags}/>
            <PostsVeiw posts={posts} pageNumber={pageNumber} pageUp={pageUp} pageDown={pageDown}/>
            <NavBar/>
            <button className="btn-refresh" onClick={refresh}>Refresh</button>
       </div> 
    );
}
 
export default Home;