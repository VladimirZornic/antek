import React, { Component } from 'react';
import axios from 'axios'
// helper - validation
import { checkValidation } from '../helper/helper.js';


class Add extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            number: '',
            tag: [],
            newTag: '',
            errors: {}
        }
        this.handleInputNameChange = this.handleInputNameChange.bind(this)
        this.handleInputEmailChange = this.handleInputEmailChange.bind(this)
        this.handleInputNumberChange = this.handleInputNumberChange.bind(this)
        this.handleInputTagsChange = this.handleInputTagsChange.bind(this)
        this.handleFormSubmit = this.handleFormSubmit.bind(this)
        this.addNewTag = this.addNewTag.bind(this)
        this.removeTag = this.removeTag.bind(this)
    }

    handleInputNameChange(e) {
        const val = e.target.value
        this.setState({
            name: val
        })
    }

    handleInputEmailChange(e) {
        const val = e.target.value
        this.setState({
            email: val
        })

    }

    // odraditi proveru u helperu
    handleInputNumberChange(e) {
        const val = e.target.value
        this.setState({
            number: val
        })
    }

    handleInputTagsChange(e) {
        this.setState({
            newTag: e.target.value
        })
    }
    addNewTag() {
        let error = {};
        let tag = [];
        let hasError = true;
        if (!checkValidation("string", this.state.newTag)) {
            error["tag"] = "Tag contains illegal characters.";

        } else if (this.state.newTag === '') {
            error["tag"] = "You can not save empty tag.";
        } else {
            hasError = false;
            tag = [this.state.newTag, ...this.state.tag];
        }
        if(!hasError){
            this.setState({ errors: error, newTag: '', tag: tag })
        } else {
            this.setState({ errors: error})
        }
    }
    removeTag(tag) {
        const tags = this.state.tag.filter(t => {
            return t !== tag
        })
        this.setState({
            tag: [...tags]
        })
    }

    handleFormSubmit(e) {
        e.preventDefault();
        let hasError = false;
        const error = {};
        const name = checkValidation("string", this.state.name);
        let email;
        const number = this.state.number;

        // check name validation
        if (!name) {
            error["name"] = "Name is not valid.";
            hasError = true;
        }

        // check email validation if exist
        if (this.state.email === '') {
            email = '';
        } else {
            email = checkValidation("email", this.state.email);
            if (!email) {
                error["email"] = "Email is not valid.";
                hasError = true;
            }
        }

        // check phone number validation
        if (!checkValidation("number", number)) {
            error["number"] = "Number is not valid.";
            hasError = true;
        }

        this.setState({
            errors: error
        })

        if (!hasError) {
            const newContact = {
                name:this.state.name,
                email:this.state.email,
                number: this.state.number,
                tags: this.state.tag
            }
            axios.post(`http://localhost:3000/post`, newContact)
                .then(res => {
                    let success = {};
                    success["added"] = "Contact successfully added. Add one more."
                    if (res) {                       
                        this.setState({
                            name: '',
                            email:'',
                            number: '',
                            tags:[],
                            errors: success
                        })
                        setTimeout(() => {
                            this.props.update()
                        }, 1000);

                    } else {
                        console.log("not updated");

                    }
                })
        }
    }
    render() {
        const { name, email, number, tag, errors, newTag } = this.state
        return (
            <form>
                <div className="form-holder">
                    <label htmlFor="name">Name</label>
                    <input autoComplete="off" type="text" onChange={this.handleInputNameChange} placeholder="John" id="name" value={name} />
                    <p className="error-messsage">{errors["name"]}</p>
                </div>
                <div className="form-holder">
                    <label htmlFor="email">Email</label>
                    <input autoComplete="off" type="email" onChange={this.handleInputEmailChange} placeholder="john@mail.com" id="email" value={email} />
                    <p className="error-messsage">{errors["email"]}</p>
                </div>
                <div className="form-holder">
                    <label htmlFor="number">Number</label>
                    <p className="pointer">Use this pattern [xxx-xxxxxxx]</p>
                    <input autoComplete="off" type="text" onChange={this.handleInputNumberChange} id="number" placeholder="123-1234567" value={number} />
                    <p className="error-messsage">{errors["number"]}</p>
                </div>
                <div className="form-holder tag-input_field" >
                    <input autoComplete="off" type="text" onChange={this.handleInputTagsChange} id="tags" placeholder="Friend" value={newTag} />
                    <div className="btn btn-primary" onClick={() => this.addNewTag()}>Add tag</div>
                </div>
                <p className="error-messsage">{errors["tag"]}</p>
                <p className="label-tags">Tags:</p>
                <div className="form-holder" className="tags-field">
                    {
                        tag.map((t, index) => {
                            return (
                                <div key={index}>
                                   <p onClick={() => this.removeTag(t)}>{t} </p>
                                </div>
                            )
                        })
                    }
                </div>
                <div className="form-holder">
                    <button type="submit" className="btn btn-primary" name="submit" onClick={this.handleFormSubmit}>Save</button>
                    
                </div>
                <p className="success-messsage">{errors["added"]}</p>
            </form>
        )
    }
}
export default Add;