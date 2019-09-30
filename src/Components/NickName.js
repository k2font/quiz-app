import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import Fab from '@material-ui/core/Fab';
import { Link } from 'react-router-dom'

import { withStyles } from '@material-ui/styles';
import { compose } from 'redux'

import {
    LogIn,
    LogOut,
    authStateChanged,
    getRedirectResult,
    readWaitState,
    sendAnswer,
    postPlayerName,
} from '../Actions'

class NickName extends Component {
    constructor(props) {
        super(props)
        this.onAttendClick = this.onAttendClick.bind(this)
        this.onSubmitName = this.onSubmitName.bind(this)
        this.renderTextField = this.renderTextField.bind(this)
    }

    async componentDidMount() {
        console.log("authStateChanged!")
        await this.props.authStateChanged()
        await this.props.readWaitState()

        console.log(this.state.answer)
    }

    state = {
        user: null,
        answer: null
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

    async onAttendClick(e, _answer) {
        if(this.state.answer === null) {
            var _uid = this.props.events.uid
            var _qid = this.props.events.quiz.quiz_id
            console.log(this.props.events)
            await this.props.sendAnswer(_uid, _qid, _answer)

            this.setState({ answer: _answer })
        }
    }

    async onSubmitName(values) {
        var _uid = this.props.events.uid
        await this.props.postPlayerName(values, _uid)
        this.props.history.push('/')
    }

    render() {
        const { handleSubmit, pristine, submitting, invalid } = this.props
        console.log(this.props.events)
        return (
            <React.Fragment>
                <CssBaseline />
                    <AppBar style={{background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',}}>
                        <Toolbar>
                            <Typography variant="h5">森岡家結婚感謝祭 キーパッド</Typography>
                        </Toolbar>
                    </AppBar>
                <Toolbar />

                <Typography
                    style={{
                        margin: 10,
                        fontSize: 30,
                        fontWeight: 700,
                    }}
                >
                    参加登録
                </Typography>

                <Typography
                    style={{
                        margin: 0,
                        marginLeft: 10,
                        fontSize: 15,
                        fontWeight: 300,
                    }}
                >
                    名前を登録すると、以降変更することができません
                </Typography>

                <form onSubmit={handleSubmit(this.onSubmitName)} >
                    <div>
                        <Field label="あなたのフルネーム(例: 森一平)" name="nickname" component={this.renderTextField} />
                    </div>

                    <div>
                        <Button type="submit" value="Submit" disabled={pristine || submitting || invalid} variant="contained" color="primary" style={{margin: 10}} onClick={() => {}}>
                            登録
                        </Button>

                        <Button color="primary" to="/events"><Link to="/">Cancel</Link></Button>
                    </div>
                </form>
            </React.Fragment>
        )
    }
}

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

const mapStateToProps = (state) => ({ events: state.events })
const mapDispatchToProps = ({ LogIn, LogOut, getRedirectResult, authStateChanged, readWaitState, sendAnswer, postPlayerName })

export default connect(mapStateToProps, mapDispatchToProps)(
    reduxForm({ validate, form: 'nameForm' })(NickName)
)