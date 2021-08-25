export default function Logout(){
    function click(){
        window.location.href = "/";
    }
    return(
        <div>
            <button style={{width:"200px"}} onClick={click}>LogOut</button>
        </div>
    )
}