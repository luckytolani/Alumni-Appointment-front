export default function Logout(){
    function click(){
        sessionStorage.clear();
        window.location.href = "/#";
    }
    return(
        <div>
            <button style={{width:"200px"}} onClick={click}>LogOut</button>
        </div>
    )
}