const initialState={
    users:[
        {id:1,nom:"Ahmed",prenom:"guizi"},
        {id:2,nom:"Achraf",prenom:"guizi"}
    ]
};
const reducer=(state=initialState,Action)=>{
    switch(Action.type){
        case "Add_user":
            return{...state,...state.users.push(Action.payload)}
        
        case "ApDate_user":
            const user =state.users.find((u)=>u.id===parseInt(Action.payload.id))
            if(user){
                user.nom=Action.payload.nom
                user.prenom=Action.payload.prenom
            }
            return state 
            case "Delete_user":
                return{...state,users:[...state.users.filter((u)=>u.id!==parseInt(Action.payload))]}
                default : return state
    }
}
export default reducer