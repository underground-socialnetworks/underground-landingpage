import React, { Component } from 'react';
import './App.css';

const axios = require('axios');

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            firstName: "",
            lastName: "",
            email: "",
            submitted: false
        };
    }

    // componentDidMount() {
    //     if (this.state.submitted) {
    //         document.getElementById('completePage').scrollIntoView({block: "start", inline: "nearest", behavior: "smooth"});
    //     }
    // }

    handleChangeFirstName = (e) => {
        this.setState({firstName: e.target.value});
    }

    handleChangeLastName = (e) => {
        this.setState({lastName: e.target.value});
    }

    handleChangeEmail = (e) => {
        this.setState({email: e.target.value});
    }

    handleSubmit = (e) => {
        e.preventDefault();
        if (this.state.firstName && this.state.lastName && this.state.email) {
            axios.post('/signup', {
                    firstName: this.state.firstName,
                    lastName: this.state.lastName,
                    email: this.state.email
                })
                .then((response) => {
                    if (response.status === 200) {
                        this.setState({ submitted: true }, () => {
                            document.getElementById('completePage').scrollIntoView({block: "start", inline: "nearest", behavior: "smooth"});
                        });
                    }
                })
                .catch((error) => {
                    console.log(error);
            });
        }
    }

    renderForm() {
        return (
            <div className="App-header" id="signUpForm">
                <form action="/signup" method="post" >
                    <input type="text" name="firstname" className="signup_input" placeholder="First name" onChange={(e)=>{this.handleChangeFirstName(e)}}/><br/>
                    <input type="text" name="lastname" className="signup_input" placeholder="Last name" onChange={(e)=>{this.handleChangeLastName(e)}}/><br/>
                    <input type="text" name="email" className="signup_input" placeholder="Email" onChange={(e)=>{this.handleChangeEmail(e)}}/><br/>
                    <button type="submit" className="signup_btn" onClick={(e)=>{this.handleSubmit(e)}}>Sign Up</button>
                </form>
            </div>
        )
    }

    renderComplete() {
        return (
            <div className="App-header" id="completePage">
                <p>
                    Congratulations!<br/>
                    You have joined the revolution<br/>
                    Expect to hear from us soon
                </p>
            </div>
        )
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <p>
                        Hate the MTA?<br/>
                        Join the revolution today
                    </p>
                    <button type="button" className="signup_btn" onClick={()=>{document.getElementById('signUpForm').scrollIntoView({block: "start", inline: "nearest", behavior: "smooth"})}}>JOIN</button>
                </header>
                {this.renderForm()}
                {this.state.submitted? this.renderComplete() : null}
            </div>
        );
    }
}

export default App;
