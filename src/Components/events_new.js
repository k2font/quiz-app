import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { Link } from 'react-router-dom'
import Input from '@material-ui/core/Input';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Switch from '@material-ui/core/Switch';
import { storage } from '../Firebase';

import NavigationBar from './NavigationBar'

import { postEvent, postEventImage } from '../Actions'

class EventsNew extends Component {
    constructor(props) {
        super(props)
        this.onSubmitText = this.onSubmitText.bind(this)
        this.onSubmitImage = this.onSubmitImage.bind(this)
        this.renderImageField = this.renderImageField.bind(this);
        this.renderTextField = this.renderTextField.bind(this);
        this.handleChange = this.handleChange.bind(this)
        this.handleImageChange = this.handleImageChange.bind(this)

        this.state = {
            image: null,
            url: '',
            progress: 0,
            checkedA: false,
        }
    }

    // フィールドを描画する
    // 現在は使っていない関数

    renderTextField = ({
        input,
        label,
        meta: { touched, error },
        ...custom
      }) => (
            <div>
                <TextField
                    style={{
                        width: 500,
                        marginLeft: 30,
                    }}
                    margin="normal"
                    label={label}
                    {...input}
                    {...custom}
                />
                {touched && error && <span>{error}</span>} {/* この書き方が不明 */}
            </div>
      )

    renderImageField = ({
        input,
        label,
      }) => (
            <div>
                <Input type="file" onChange={this.handleImageChange}/>
                {/* <button onClick={this.handleUpload}>Upload</button> */}
                <img src={this.state.url || 'http://via.placeholder.com/400x300'} alt="Uploaded images" height="150" width="200"/>
            </div>
      )

    handleImageChange = e => {
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

    handleChange = name => event => {
        this.setState({ ...this.state, [name]: event.target.checked });
    };

    handleImageChange = name => event => {
        this.setState({ ...this.state, [name]: event.target.value });
      };

    async onSubmitText(values) {
        await this.props.postEvent(values)
        this.props.history.push('/events')
    }

    async onSubmitImage(values) {
        console.log(values)
        await this.props.postEventImage(values)
        this.props.history.push('/events')
    }

    render () {
        // pristine: ユーザの入力状態をtrue / falseで管理
        // submitting: submitしたらtrueになる変数
        const { handleSubmit, pristine, submitting, invalid } = this.props
        return (
            <React.Fragment>
                <NavigationBar />

                <Typography
                    style={{
                        margin: 10,
                        fontSize: 30,
                        fontWeight: 700,
                    }}
                >
                    問題登録フォーム
                </Typography>

                <div>
                    <Typography
                        style={{
                            marginTop: 30,
                            marginLeft: 10,
                            fontSize: 15,
                            fontWeight: 300,
                        }}
                    >
                        画像を使用した問題を登録する
                    </Typography>

                    <Switch
                        checked={this.state.checkedA}
                        onChange={this.handleChange('checkedA')}
                        value="checkedA"
                        inputProps={{ 'aria-label': 'secondary checkbox' }}
                    />
                </div>

                {this.state.checkedA === false ? (
                    <form onSubmit={handleSubmit(this.onSubmitText)} >
                        <div>
                            <Field label="問題" name="question" component={this.renderTextField} />
                        </div>

                        <div>
                            <Field label="選択肢A" name="choice1" component={this.renderTextField} />
                        </div>

                        <div>
                            <Field label="選択肢B" name="choice2" component={this.renderTextField} />
                        </div>

                        <div>
                            <Field label="選択肢C" name="choice3" component={this.renderTextField} />
                        </div>

                        <div>
                            <Field label="選択肢D" name="choice4" component={this.renderTextField} />
                        </div>

                        <div>
                            <Field label="回答" name="answer" component={this.renderTextField} />
                        </div>

                        <div>
                            <Button type="submit" value="Submit" disabled={pristine || submitting || invalid} variant="contained" color="primary" style={{margin: 10}} onClick={() => {}}>
                                登録
                            </Button>

                            <Button color="primary" to="/events"><Link to="/events">Cancel</Link></Button>
                        </div>
                    </form>
                ) : (
                    <div>
                        <div>
                            <TextField
                                onChange={this.handleImageChange('question')}
                                style={{
                                    width: 500,
                                    marginLeft: 30,
                                }}
                                margin="normal"
                                label="問題"
                            />
                        </div>

                        <div>
                            <Typography
                                style={{
                                    marginTop: 40,
                                    marginLeft: 30,
                                    fontSize: 15,
                                    fontWeight: 300,
                                }}
                            >
                                選択肢A
                            </Typography>
                            <Input
                                type="file"
                                style={{
                                    marginLeft: 30,
                                }}
                                onChange={(e) => {
                                if (e.target.files[0]) {
                                    const image = e.target.files[0];

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
                                            console.log("url1 : " + url);
                                            this.setState({choice1: url});
                                        })
                                    });
                                }
                            }}/>
                            {/* <button onClick={this.handleUpload}>Upload</button> */}
                            <img src={this.state.choice1 || 'http://www.jaipuriaschoolpadrauna.in/wp-content/uploads/2016/11/blank-img.jpg'} alt="Uploaded images" height="150" width="200"/>
                        </div>

                        <div>
                            <Typography
                                style={{
                                    marginTop: 40,
                                    marginLeft: 30,
                                    fontSize: 15,
                                    fontWeight: 300,
                                }}
                            >
                                選択肢B
                            </Typography>
                            <Input
                                type="file"
                                style={{
                                    marginLeft: 30,
                                }}
                                onChange={(e) => {
                                if (e.target.files[0]) {
                                    const image = e.target.files[0];

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
                                            console.log("url2 : " + url);
                                            this.setState({choice2: url});
                                        })
                                    });
                                }
                            }}/>
                            {/* <button onClick={this.handleUpload}>Upload</button> */}
                            <img src={this.state.choice2 || 'http://www.jaipuriaschoolpadrauna.in/wp-content/uploads/2016/11/blank-img.jpg'} alt="Uploaded images" height="150" width="200"/>
                        </div>

                        <div>
                            <Typography
                                style={{
                                    marginTop: 40,
                                    marginLeft: 30,
                                    fontSize: 15,
                                    fontWeight: 300,
                                }}
                            >
                                選択肢C
                            </Typography>
                            <Input
                                type="file"
                                style={{
                                    marginLeft: 30,
                                }}
                                onChange={(e) => {
                                if (e.target.files[0]) {
                                    const image = e.target.files[0];

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
                                            console.log("url3 : " + url);
                                            this.setState({choice3: url});
                                        })
                                    });
                                }
                            }}/>
                            {/* <button onClick={this.handleUpload}>Upload</button> */}
                            <img src={this.state.choice3 || 'http://www.jaipuriaschoolpadrauna.in/wp-content/uploads/2016/11/blank-img.jpg'} alt="Uploaded images" height="150" width="200"/>
                        </div>

                        <div>
                            <Typography
                                style={{
                                    marginTop: 40,
                                    marginLeft: 30,
                                    fontSize: 15,
                                    fontWeight: 300,
                                }}
                            >
                                選択肢D
                            </Typography>
                            <Input
                                type="file"
                                style={{
                                    marginLeft: 30,
                                }}
                                onChange={(e) => {
                                if (e.target.files[0]) {
                                    const image = e.target.files[0];

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
                                            console.log("url4 : " + url);
                                            this.setState({choice4: url});
                                        })
                                    });
                                }
                            }}/>
                            {/* <button onClick={this.handleUpload}>Upload</button> */}
                            <img src={this.state.choice4 || 'http://www.jaipuriaschoolpadrauna.in/wp-content/uploads/2016/11/blank-img.jpg'} alt="Uploaded images" height="150" width="200"/>
                        </div>

                        <div>
                            <TextField
                                onChange={this.handleImageChange('answer')}
                                style={{
                                    width: 500,
                                    marginLeft: 30,
                                }}
                                margin="normal"
                                label="回答"
                            />
                        </div>

                        <div>
                            <Button type="submit" value="Submit" variant="contained" color="primary" style={{margin: 10}} onClick={() => {this.onSubmitImage(this.state)}}>
                                登録
                            </Button>

                            <Button color="primary" to="/events"><Link to="/events">Cancel</Link></Button>
                        </div>
                    </div>
                )}
            </React.Fragment>
        )
    }
}

// valuesには入力されている値が渡ってくる
const validate = (values) => {
    const errors = {}

    if(!values.question) {
        errors.title = "問題を入力してください！"
    }

    if(!values.choice1) {
        errors.body = "選択肢Aを入力してください！"
    }

    if(!values.choice2) {
        errors.body = "選択肢Bを入力してください！"
    }

    if(!values.choice3) {
        errors.body = "選択肢Cを入力してください！"
    }

    if(!values.choice4) {
        errors.body = "選択肢Dを入力してください！"
    }

    if(!values.answer) {
        errors.body = "回答をアルファベット入力してください！"
    }

    return errors
}

const mapDispatchToProps = ({ postEvent, postEventImage })

export default connect(null, mapDispatchToProps)(
    reduxForm({ validate, form: 'eventNewForm' })(EventsNew)
)