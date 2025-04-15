
import {createSlice} from "@reduxjs/toolkit"

const userList=[

    {
        id:1,
        name:"youssef1",
        email:"you1@gmail.com",
    },
    {
        id:2,
        name:"youssef2",
        email:"you2@gmail.com",
    },
    {
        id:3,
        name:"youssef3",
        email:"you3@gmail.com",
    }


]

const userSlice=createSlice({

    name:"users",

    initialState:userList,

    reducers:{

        addUser:(state, action)=>{

            state.push(action.payload)


        },

        modifUser:(state, action)=>{

            const user = state.find((u)=>u.id===parseInt(action.payload.id))

            if (user) {

                user.name = action.payload.name

                user.email = action.payload.email
            }


        },

        deleteUser:(state, action)=>{

       


            return state.filter(f=> f.id !== action.payload.id);
    
        },

        rechercheUser:(state, action)=>{

            return state.filter(f=> f.id == action.payload.id);

        }


    }

})

export const {addUser, modifUser,deleteUser,rechercheUser}=userSlice.actions

export default userSlice.reducer;