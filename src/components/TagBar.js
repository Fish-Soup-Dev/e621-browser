import { BsFillPlusSquareFill, BsFillDashSquareFill } from "react-icons/bs";

const TagBar = (props) => {
    const _handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            props.searchFunction(props.searchText, false, 1, false);
        }
    }

    const addtoSearch = (tag) => {
        props.setSearchText(props.searchText + " " + tag.name);
        props.searchFunction(props.searchText + " " + tag.name, false, 1, false);
    }

    const removeFromSearch = (tag) => {
        props.setSearchText(props.searchText + " -" + tag.name);
        props.searchFunction(props.searchText + " -" + tag.name, false, 1, false);
    }
    
    const tagColor = (tag) => {
        if (tag.type === 0) {
            return "text-ok-yellow"
        } else if (tag.type === 1){
            return "text-mid-orange"
        } else if (tag.type === 2){
            return "text-white"
        } else if (tag.type === 3){
            return "text-bad-red"
        } else if (tag.type === 4){
            return "text-sus-purple"
        }
    }

    return ( 
        <div className="scrollbar-hide overflow-y-scroll tagbar h-[calc(100vh-56px)]">
            <input 
                type="text" 
                className="search-bar" 
                value={props.searchText} 
                onKeyDown={_handleKeyDown} 
                onChange={(e) => props.setSearchText(e.target.value)} 
                placeholder="Search"
            />
            <div className="tags">
                {props.tags.map((tag) => (
                    <div className="flex flex-row items-center mx-1" key={tag.name}>
                        <BsFillPlusSquareFill className={`mx-1 ${tagColor(tag)}`} onClick={() => addtoSearch(tag)} />
                        <BsFillDashSquareFill className={`mx-1 ${tagColor(tag)}`} onClick={() => removeFromSearch(tag)} />
                        <p className={`mx-1 font-bold ${tagColor(tag)}`}>{tag.name}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
 
export default TagBar;