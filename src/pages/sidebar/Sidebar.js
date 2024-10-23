import './Sidebar.css';

function Sidebar(){
    return(
        <>
            <div id="sidebarDiv">
                <img src="./logo192.png" height={500} style={{marginTop:"-100px",marginLeft:"-100px"}}></img>

                <div className="title_sidebar"  >
                    <h2>Recipe App with ReactJS</h2>
                    <h3>Build and Deploy</h3>
                </div>
            </div>
        </>
    )
}

export default Sidebar;