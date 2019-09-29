import React, { Component } from 'react';
import Input from '@material-ui/core/Input';
import { Field, reduxForm } from 'redux-form'
import { storage } from '../Firebase';

class ImageUpload extends Component {
    constructor(props) {
        super(props);

        this.state = {
            image: null,
            url: '',
            progress: 0
        }

        this.handleChange = this.handleChange.bind(this);
    }

    renderTextField = ({
        input,
        label,
        meta: { touched, error },
        ...custom
      }) => (
            <div>
                <Input type="file" onChange={this.handleChange}/>
                {/* <button onClick={this.handleUpload}>Upload</button> */}
                <img src={this.state.url || 'http://via.placeholder.com/400x300'} alt="Uploaded images" height="150" width="200"/>
            </div>
      )

    handleChange = e => {
        console.log(this.props.nameProps)
        if (e.target.files[0]) {
            const image = e.target.files[0];
            // this.setState(() => ({image}));

            // {image} = this.state;
            const uploadTask = storage.ref(`images/${image.name}`).put(image);
            uploadTask.on('state_changed', 

            (snapshot) => {
                
            }, 

            (error) => {
                // error function ....
                console.log(error);
            }, 

            () => {
                // complete function ....
                storage.ref('images').child(image.name).getDownloadURL().then(url => {
                    console.log(url);
                    this.setState({url});
                })
            });
        }
    }

    render() {
        const style = {
            display: 'flex',
            marginLeft: 30,
            width: '50%',
            flexDirection: 'column',
            
        };

        return (
            <div style={style}>
                <Field name={this.props.nameProps} component={this.renderTextField} />
            </div>
        )
    }
}

export default ImageUpload;