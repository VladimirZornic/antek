import React, { Component } from 'react';
import axios from 'axios';

// helper-validation
import { checkValidation } from '../helper/helper.js';
import Loading from './Loading';

class Edit extends Component {
    constructor(props) {
        super(props)
        this.state = {
            hasData: false,
            id: this.props.id,
            name: '',
            email: '',
            tags: [],
            newTag: '',
            number: '',
            errors: {},
            hasError: false
        }
        this.handleEditSubmit = this.handleEditSubmit.bind(this);
        this.handleEditInputName = this.handleEditInputName.bind(this);
        this.handleEditInputEmail = this.handleEditInputEmail.bind(this);
        this.handleEditInputNumber = this.handleEditInputNumber.bind(this);
        this.handleEditInputTags = this.handleEditInputTags.bind(this)
        this.handleEditCancel = this.handleEditCancel.bind(this)
        this.removeTag = this.removeTag.bind(this);
    }
    componentDidMount() {
        axios.get(`http://localhost:3000/get/${this.state.id}`)
            .then(data => {
                this.setState({
                    hasData: true,
                    data: data.data,
                    name: data.data[0].name,
                    email: data.data[0].email,
                    number: data.data[0].number,
                    tags: data.data[0].tags,
                })
            },
                error => {
                    console.log(error);
                }
            )
    }

    handleEditCancel(e) {
        e.preventDefault();
        const newData = {
            id: this.state.id,
            name: this.state.name,
            email: this.state.email,
            number: this.state.number,
            tags: this.state.tags
        }
        this.props.update(this.state.data, newData)
    }


    handleEditInputName(e) {
        this.setState({ name: e.target.value })
    }
    handleEditInputEmail(e) {
        this.setState({ email: e.target.value })
    }
    handleEditInputNumber(e) {
        this.setState({ number: e.target.value })
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
            tag = [this.state.newTag, ...this.state.tags];
        }
        if (!hasError) {
            this.setState({ errors: error, newTag: '', tags: tag })
        } else {
            this.setState({ errors: error })
        }
    }
    handleEditInputTags(e) {
        this.setState({
            newTag: e.target.value
        })
    }
    removeTag(tag) {
        const tags = this.state.tags.filter(t => {
            return t !== tag
        })
        this.setState({
            tags: [...tags]
        })
    }
    handleEditSubmit(e) {
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
            const newData = {
                id: this.state.id,
                name: this.state.name,
                email: this.state.email,
                number: this.state.number,
                tags: this.state.tags
            }
            axios.put(`http://localhost:3000/put`, newData)
                .then(res => {
                    if (res) {
                        this.props.update(this.state.data, newData)
                    } else {
                        console.log("not updated");

                    }
                })
        }
    }
    render() {
        const { hasData, name, email, number, tags, newTag, errors } = this.state
        return (
            <div>
                {
                    hasData ?
                        <form>
                            <div className="form-holder">
                                <label htmlFor="name">Name</label>
                                <input type="text" onChange={this.handleEditInputName} id="name" value={name} />
                                <p className="error-messsage">{errors["name"]}</p>
                            </div>
                            <div className="form-holder">
                                <label htmlFor="email">Email</label>
                                <input type="email" onChange={this.handleEditInputEmail} id="email" placeholder={`${name}@mail.com`} value={email} />
                                <p className="error-messsage">{errors["email"]}</p>
                            </div>
                            <div className="form-holder">
                                <label htmlFor="number">Number</label>
                                <input type="text" onChange={this.handleEditInputNumber} id="number" value={number} />
                                <p className="error-messsage">{errors["number"]}</p>
                            </div>
                            <div className="form-holder tag-input_field" >
                                <input type="text" onChange={this.handleEditInputTags} id="tags" placeholder="Friend" value={newTag} />
                                <div className="btn btn-primary" onClick={() => this.addNewTag()}>Add tag</div>
                            </div>
                            <p className="error-messsage">{errors["tag"]}</p>
                            <p className="label-tags">Tags:</p>
                            <div className="form-holder tags-field">
                                {
                                    tags.map((t, index) => {
                                        return (
                                            <div key={index}>
                                                <p onClick={() => this.removeTag(t)}>{t} </p>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            <div>
                                <button className="btn btn-primary" onClick={this.handleEditSubmit}>Save</button>
                                <button className="btn" onClick={this.handleEditCancel}>Cancel</button>
                            </div>
                        </form>
                        :
                        <Loading />
                }

            </div>
        )
    }
}
export default Edit;
