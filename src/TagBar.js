const TagBar = (props) => {
    const _handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            props.searchFunction(props.searchText, 1);
        }
    }

    const addtoSearch = (tag) => {
        props.setSearchText(props.searchText + " " + tag.name);
        props.searchFunction(props.searchText + " " + tag.name, 1);
    }

    const showTag = (tag) => {
        if (tag.type === 0) {
            return <li className="tag text-ok-yellow" onClick={() => addtoSearch(tag)} key={tag.name}>{tag.name}</li>
        } else if (tag.type === 1){
            return <li className="tag text-mid-orange" onClick={() => addtoSearch(tag)} key={tag.name}>{tag.name}</li>
        } else if (tag.type === 2){
            return <li className="tag text-white" onClick={() => addtoSearch(tag)} key={tag.name}>{tag.name}</li>
        } else if (tag.type === 3){
            return <li className="tag text-bad-red" onClick={() => addtoSearch(tag)} key={tag.name}>{tag.name}</li>
        } else if (tag.type === 4){
            return <li className="tag text-sus-purple" onClick={() => addtoSearch(tag)} key={tag.name}>{tag.name}</li>
        }
    }


    return ( 
        <div className="tagbar">
            <input type="text" value={props.searchText} onKeyDown={_handleKeyDown} onChange={(e) => props.setSearchText(e.target.value)} placeholder="Search" className="search-bar"/>
            <ul className="tags">
                <h1 className="font-bold text-white px-4">Tags</h1>
                {props.tags.map((tag) => (
                    showTag(tag)
                ))}
            </ul>
        </div>
    );
}
 
export default TagBar;