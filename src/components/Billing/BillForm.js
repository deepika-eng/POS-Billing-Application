import React,{useState,useEffect} from 'react'
import validator from 'validator'
import {useDispatch,useSelector} from 'react-redux'
import {billCustomerData,startGetCustomers} from '../../actions/billingAction'

const BillForm = (props) => {
    const [date, setDate] =useState('')
    const [name, setName] = useState('')
    const [mobile, setMobile] = useState('')
    const [formErrors, setFormErrors ] = useState('') // state variable
    const errors = {} // local variable
 
    const dispatch = useDispatch()

    const customers = useSelector((state) => {
        return state.bill.customers
    })  

    useEffect(() => {
        dispatch(startGetCustomers())
    },[])

    const addData = (number) => {
        const customerData = customers.find((ele) => {
            if(number === ele.mobile) {
                return ele
            }
        })
        //console.log('customer Data', customerData)
        return customerData
    }
 
    const handleChange = (e) => {
        if(e.target.name === "date"){
            setDate(e.target.value)
        }else {
            setMobile(e.target.value)
        }
    }

    const handleBlur = () => {
        if(mobile!== ''){
            const data = addData(mobile)
           // console.log(data)
            setName(data.name)
        } else {
            setName('')
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        runValidation()

        const data = addData(mobile)

        if(Object.keys(errors).length === 0) {

            const formData = {
                date : date,
                customers : data._id, ...data 
            }
            //console.log( 'form data',formData)
        
        dispatch(billCustomerData(formData))
        resetForm()
        }
        
        
    }

    const resetForm = () => {
        setName('')
        setDate('')
        setMobile('')
    }

    const runValidation = () => {
        // if(validator.isDate(date)){
        //     errors.date = "mention date"
        // }
        if(validator.isEmpty(name)){
            errors.name = "enter name"
        }if(!validator.isNumeric(mobile)){
            errors.mobile = "enter mobile number"
        }
        setFormErrors(errors)
    }

    return(
        <div>
            <form onSubmit = {handleSubmit} > 
                <input
                    type = "date"
                    value = {date}
                    name = "date"
                    onChange = {handleChange}
                />
                {/* {formErrors.date &&<span> {formErrors.date}</span>} */}

                <input
                    type = "text"
                    value= {name}
                    name = "name"
                    placeholder = "enter customer name"
                />
                {formErrors.name &&<span> {formErrors.name}</span>}

                <input 
                    type='text'
                    value={mobile}
                    name='mobile'
                    placeholder='enter mobile no'
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
                {formErrors.mobile &&<span> {formErrors.mobile}</span>}
                <input type = "submit" value = "Add" />             
            </form>
        </div>
    )
}

export default BillForm