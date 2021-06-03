const usersIntialState = {}

const usersReducer = (state=usersIntialState,action)=>{
    switch(action.type){
        case 'REG_USER' : {
            return {...action.payload}
        }
       // case 'LOGIN_USER':{
        //    return {...action.payload}
        //}
        //case 'GET_DETAILS' : {
         //   return {...action.payload}
       // }
        default:{
            return {...state}
        }
    }
}

export default usersReducer