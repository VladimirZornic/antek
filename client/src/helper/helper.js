export const checkValidation = (type, value) => {
    switch (type) {
        case "string":
            return checkStringValidation(value);
        case "number":
            return checkNumberValidation(value)    
        case "email":
            return checkEmailValidation(value)    
    
        default:
            break;
    }
}

function checkStringValidation (val) {
    const patt = /[^a-z 0-9]/gi
    if(patt.test(val)){
        return false
    } else {
        return true
    }    
}
function checkEmailValidation (val){
    const patt = /\S+@\S+\.\S+/;
    return patt.test(val);
}


function checkNumberValidation (val) {
    let phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    if(val.match(phoneno)){
        return true;
    } else {
        return false
    }
}
