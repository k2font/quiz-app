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

import { getEvent, deleteEvent, putEvent } from '../Actions'

class EventsShow extends Component {
    constructor(props) {
        super(props)
        this.onSubmit = this.onSubmit.bind(this)
        this.onDeleteClick = this.onDeleteClick.bind(this)
        this.renderImageField = this.renderImageField.bind(this);
        this.renderTextField = this.renderTextField.bind(this);
        this.handleImageChange = this.handleImageChange.bind(this)
        this.handleChange = this.handleChange.bind(this)

        this.state = {
            image: null,
            url: '',
            progress: 0,
            checkedA: false,
        }
    }

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

    componentDidMount() {
      const { id } = this.props.match.params
      if(id) {
        this.props.getEvent(id)
      }
    }

    // フィールドを描画する
    renderField(field) {
        const { input, label, type, meta: { touched, error } } = field

        return (
            <div>
                <input {...input} placeholder={label} type={type} />
                {touched && error && <span>{error}</span>} {/* この書き方が不明 */}
            </div>
        )
    }

    async onSubmitText(values) {
        await this.props.postEvent(values)
        this.props.history.push('/events')
    }

    async onSubmitImage(values) {
        console.log(values)
        await this.props.postEventImage(values)
        this.props.history.push('/events')
    }

    async onDeleteClick() {
      const { id } = this.props.match.params
      await this.props.deleteEvent(id)
      this.props.history.push('/events')
    }

    // asyncの復習を行う
    async onSubmit(values) {
        await this.props.putEvent(values)
        this.props.history.push('/events')
    }

    render () {
        // pristine: ユーザの入力状態をtrue / falseで管理
        // submitting: submitしたらtrueになる変数
        // TODO: ドキュメント読む
        const { handleSubmit, pristine, submitting, invalid } = this.props

        return (
            <React.Fragment>
                <NavigationBar />
                <form onSubmit={handleSubmit(this.onSubmit)} >
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
                        <Button color="secondary" to="/events" onClick={this.onDeleteClick}><Link to="/events">Delete</Link></Button>
                    </div>
                </form>
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

const mapStateToProps = (state, ownProps) => {
  const event = state.events[ownProps.match.params.id]
  return { initialValues: event, event }
}

const mapDispatchToProps = ({ deleteEvent, getEvent, putEvent })

export default connect(mapStateToProps, mapDispatchToProps)(
    reduxForm({ validate, form: 'eventShowForm', enableReinitialize: true })(EventsShow)
)