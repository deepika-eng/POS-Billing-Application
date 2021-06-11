import React, {useState} from 'react'
import validator from 'validator'
import {useSelector, useDispatch} from 'react-redux'
import {addToCart} from '../../actions/billingAction'


const BillProduct = (props) => {
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [quantity, setQuantity] = useState('')
    const [formErrors, setFormErrors ] = useState('') // state variable
    const errors = {} // local variable


    const dispatch = useDispatch()

    const products = useSelector((state) => {
        return state.bill.products
    })

    const addProduct = (pName) => {
        const productData = products.find((ele) => {
            if(pName === ele.name){
                return ele
            }
        })
        //console.log(productData)
        return productData
    }

    const handleChange = (e) => {
        if(e.target.name === 'name'){
            setName(e.target.value)
        } else {
            setQuantity(e.target.value)
        }
    }

    const handleBlur = () => {
        if(name !== ''){
            const finalData = addProduct(name)
            setPrice(finalData.price)
        } else {
            setPrice('')
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        runValidation()

        const finalData = addProduct(name)
        //console.log('final data',finalData)

        if(Object.keys(errors).length === 0){
            const formData = {
                products : finalData,
                quantity : quantity
            }
             // console.log('formData', formData)
            dispatch(addToCart(formData))
            resetForm()
        }
                      
    }

    const resetForm = () => {
        setPrice('')
        setQuantity('')
        setName('')
    }

    const runValidation = () => {
        if(validator.isEmpty(name)){
            errors.name = "enter name"
        }if(!validator.isNumeric(quantity)){
            errors.mobile = "enter mobile number"
        }
        setFormErrors(errors)
    }

    return(
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type = "text"
                    name = 'name'
                    value = {name}
                    placeholder = 'product name'
                    onChange = {handleChange}
                    onBlur = {handleBlur}
                />
                {formErrors.name &&<span> {formErrors.name}</span>}
                 <input 
                    type='text'
                    name='quantity'
                    value={quantity}
                    placeholder='enter quantity'
                    onChange={handleChange}
                    onBlur={()=>{
                                const total = price*quantity
                                setPrice(total)
                         }}
                />
                {formErrors.quantity &&<span> {formErrors.quantity}</span>}
            
                 <input 
                    type='text'
                    value={price}
                    placeholder='price'
                    
                />
                <input 
                    type='submit'
                    value='Add to Cart'
                />

            </form>
        </div>
    )
}

export default BillProduct