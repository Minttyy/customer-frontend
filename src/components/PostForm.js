import React from 'react';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import SendIcon from '@material-ui/icons/Send';
import ListIcon from '@material-ui/icons/List';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

class PostForm extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            userId: '',
            firstName: '',
            lastName:'',
            persons: [],
        }
    }

    changeHandler = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    submitHandler = (e) => {
        e.preventDefault()
        console.log(this.state)
        axios.post('https://localhost:44363/api/CustomerItems',this.state)
            .then(response => {
                console.log(response)
                alert("Thank you, your name has been submitted!")
            })
            .catch(error => {
                console.log(error)
            })
    }

    listHandler = (e) => {
        axios.get(`https://localhost:44363/api/CustomerItems`)
        .then(res => {
            const persons = res.data;
            this.setState({ persons });
          })
    }

    render() {
        const {userId, firstName, lastName} = this.state
        const isEnabled = firstName.length > 0 && lastName.length > 0 && userId.length > 0
        return(
            <div>
                <Grid container spacing={4}>
                    <Grid item xs={12}>
                        <TextField required id="standard-required" label="UserID" defaultValue="UserId" name="userId" value = {userId} onChange={this.changeHandler}/>
                
                    </Grid>
                    <Grid item xs={12}>
                        <TextField required id="standard-required" label="First Name" defaultValue="First Name" name="firstName" value = {firstName} onChange={this.changeHandler}/>
                
                    </Grid>
                    <Grid item xs={12}>
                        <TextField required id="standard-required" label="Last Name" defaultValue="Last Name" name="lastName" value = {lastName} onChange={this.changeHandler}/>
                
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                        variant="contained"
                        color="primary"
                        endIcon={<SendIcon/>}
                        onClick={this.submitHandler}
                        disabled={!isEnabled}
                        >
                        Send
                    </Button>
                    </Grid>
                    <Grid item xs = {12}>
                        <Button
                            variant="contained"
                            color="primary"
                            endIcon={<ListIcon/>}
                            onClick={this.listHandler}
                            >
                        List of Customers
                        </Button>
                        <List >
                            {this.state.persons.map(person => <ListItem> {person.firstName} {person.lastName}</ListItem>)}
                        </List>
                    </Grid>

                </Grid>

            </div>
        )
    }
}

export default PostForm