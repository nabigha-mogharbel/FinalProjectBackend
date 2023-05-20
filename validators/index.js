import validate from "mongoose-validator"
export const EmailValidator=[
    validate({
        validator: 'isEmail',
        message: 'Email should contains @ and . characters',
      }),
]
export const PhoneValidator=[
    validate({
        validator: 'isMobilePhone',
        message: 'Phone number is not valid',
      }),
]