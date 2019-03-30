import React, { Component } from 'react';
import { BrowserRouter as Router, Route  } from 'react-router-dom';
import axios from 'axios'

// components
import Edit from './Edit'


class PhoneBook extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dataObject: this.props.data.data,
            isEdit: false,
            id: null
        }
        this.showPhoneBook = this.showPhoneBook.bind(this);
        this.handleDelete = this.handleDelete.bind(this)
        this.handleEditLinkClick = this.handleEditLinkClick.bind(this);
        this.hanldeEditChange = this.hanldeEditChange.bind(this)
        this.singleRefData = React.createRef();
    }
    componentWillUnmount(){
        this.setState({
            isEdit: false
        })
    }
    showPhoneBook() {
        const render = this.state.dataObject.map((singleDataObject, objIndex) => {
            return (
                <div className="single-phonebook__wrapper" key={objIndex}>
                    <div key={singleDataObject.id} className="singel-phonebook" ref={this.singleRefData}>

                        <address className={`${this.state.isEdit ? "single-edit" : "single-address"}`}>
                            <p>Name: <span>{singleDataObject.name}</span></p>
                            {
                                singleDataObject.email !== '' ? 
                                <p>Email: <a href={`mailto:${singleDataObject.email}`}>{singleDataObject.email}</a> </p>
                                :
                                ""
                            }
                            
                            <p>Number: <span>{singleDataObject.number}</span> </p>

                            {
                                singleDataObject.tags === undefined || singleDataObject.tags.length === 0?
                                    ''
                                    :
                                    <p className="single-phonebook__description">Tags:
                                    {
                                            singleDataObject.tags.map((tag, index) => <span key={index} className="single-phonebook__tags"> /{tag} </span>)
                                        }
                                    </p>
                            }

                        </address>

                        <div style={this.state.isEdit ? { display: "block" } : { display: "block" }}>
                            <div className="singel-phonebook__edit-btn" onClick={() => this.handleEditLinkClick(singleDataObject.id)}></div>
                            <div className="singel-phonebook__delete-btn" onClick={() => this.handleDelete(singleDataObject.id, singleDataObject)}></div>
                        </div>

                    </div>
                </div>



            )
        })
        return render;
    }

    hanldeEditChange(d, u) {
        const items = this.state.dataObject.filter(i => {
            return i.id !== d[0].id;
        })

        this.setState({
            isEdit: false,
            dataObject: [u, ...items],
        })
    }
    handleEditLinkClick(id) {
        this.setState({
            id: id,
            isEdit: true,
        })
    }
    handleDelete(id, item) {
        const items = this.state.dataObject.filter(i => {
            return i !== item;
        })
        axios.delete(`http://localhost:3000/delete/${id}`)
            .then(data => {
                if (data) {
                    this.setState({
                        dataObject: [...items]
                    })
                }
            },
                (error) => {
                    console.log(error);
                }
            )

    }
    render() {
        return (
            <Router>
            <div className="myPhoneBook">

                {
                    this.state.isEdit ?
                        <Edit id={this.state.id} update={this.hanldeEditChange} />
                    :
                        this.showPhoneBook()
                }
            </div>
            </Router>
        )
    }
}
export default PhoneBook;