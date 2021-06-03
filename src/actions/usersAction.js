
import axios from 'axios'

export const startRegisterUsers = (formData) => {
    return(dispatch) => {
        axios.post('http://dct-billing-app.herokuapp.com/api/users/register', formData)
        .then((response) => {
            const result = response.data
            //console.log(result)
            if(result.hasOwnProperty('errors')) {
                alert (result.errors)
            } else {
                alert('successfully created an account')
                dispatch(registerUsers(result))
            }
        })
        .catch((err) => {
            alert(err.message)
        })
    }
    
}
export const  registerUsers=(usersData)=>{
    return {
        type : "REG_USER",
        payload : usersData
    }
}