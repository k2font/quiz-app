import React, { Component } from 'react'
import { connect } from 'react-redux'
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import Fab from '@material-ui/core/Fab';

import { withStyles } from '@material-ui/styles';
import { compose } from 'redux'

import {
    LogIn,
    LogOut,
    authStateChanged,
    getRedirectResult,
    readWaitState,
    sendAnswer,
} from '../Actions'

const styles = (theme) => ({
    root: {
        textAlign: 'center',
        marginTop: 70,
    },

    appBar: {
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    },

    nickNameButton: {
        margin: 10,
        marginTop: 30,
    },

    buttonAlign: {
        textAlign: 'center',
    },

    answerA: {
        background: '#1e90ff',
        fontSize: 70,
        border: 0,
        boxShadow: '0 3px 5px 2px rgba(0, 0, 0, .3)',
        color: 'white',
        width: 150,
        height: 150,
        margin: '10px',
    },

    answerB: {
        background: '#dc143c',
        fontSize: 70,
        border: 0,
        boxShadow: '0 3px 5px 2px rgba(0, 0, 0, .3)',
        color: 'white',
        width: 150,
        height: 150,
        margin: '10px',
    },

    answerC: {
        background: '#008000',
        fontSize: 70,
        border: 0,
        boxShadow: '0 3px 5px 2px rgba(0, 0, 0, .3)',
        color: 'white',
        width: 150,
        height: 150,
        margin: '10px',
    },

    answerD: {
        background: '#ffd700',
        fontSize: 70,
        border: 0,
        boxShadow: '0 3px 5px 2px rgba(0, 0, 0, .3)',
        color: 'white',
        width: 150,
        height: 150,
        margin: '10px',
    },
});

class Login extends Component {
    constructor(props) {
        super(props)
        this.onLogInClick = this.onLogInClick.bind(this)
        this.onAttendClick = this.onAttendClick.bind(this)
        this.onAnswerClick = this.onAnswerClick.bind(this)
    }

    state = {
        user: null,
        answer: null
    }

    // TODO: wait-stateを読んでwaitの状態を確認する
    async componentDidMount() {
        console.log("authStateChanged!")
        await this.props.authStateChanged()
        await this.props.readWaitState()

        console.log(this.state.answer)
    }

    async onLogInClick() {
        await this.props.LogIn()
    }

    async onAttendClick() {
        // TODO: ユーザのニックネームを登録するActionを作成する
        console.log("ニックネームを作成してください")
    }

    async onAnswerClick(e, _answer) {
        if(this.state.answer === null) {
            var _uid = this.props.events.uid
            var _qid = this.props.events.quiz
            console.log(this.props.events)
            await this.props.sendAnswer(_uid, _qid, _answer)

            this.setState({ answer: _answer })
        }
    }

    render() {
        const { classes } = this.props;
        return (
            <React.Fragment>
                <CssBaseline />
                    <AppBar className={classes.appBar}>
                        <Toolbar>
                            <Typography variant="h5">森岡家結婚感謝祭 キーパッド</Typography>
                        </Toolbar>
                    </AppBar>
                <Toolbar />
                <div className="App">

                {/* TODO: ニックネームを入力してもらう */}
                {/* TODO: ニックネームを表示する */}
                {/* TODO: 問題が終わったらすべてのstateを初期化する */}
                {/* TODO: 回答時間の計算ができるようにする */}

                {(() => {
                    if(this.props.events.uid) {
                        if(this.props.events.wait === true) {
                            return(
                            <div>
                                <p>次の問題までお待ち下さい</p>
                                <Button variant="contained" color="secondary" className={classes.nickNameButton} onClick={this.onAttendClick}>ニックネーム登録</Button>
                            </div>
                            )
                        } else if(this.props.events.wait === false) {
                            return(
                            <div>
                                <p className="App-intro"> UID: {this.props.events.uid}</p>
                                <p className="App-intro"> ニックネーム: {this.props.events.wait}</p>
                                <p className="App-intro"> 現在の問題: {this.props.events.quiz.quiz_id}</p>

                                <div className={classes.root}>
                                    {/* <h1>Your Answer: { this.state.answer }</h1> */}

                                    <div className={classes.buttonAlign}>
                                    <Fab size="large" color="primary" className={classes.answerA} disabled={this.state.answer === "A"} aria-label="add" onClick={
                                        e => this.onAnswerClick(e, "A")
                                    }>
                                        <p>A</p>
                                    </Fab>

                                    <Fab size="large" color="secondary" className={classes.answerB} disabled={this.state.answer === "B"} aria-label="add" onClick={
                                        e => this.onAnswerClick(e, "B")
                                    }>
                                        <p>B</p>
                                    </Fab>
                                    </div>

                                    <div className={classes.buttonAlign}>
                                    <Fab size="large" color="secondary" className={classes.answerC} disabled={this.state.answer === "C"} aria-label="add" onClick={
                                        e => this.onAnswerClick(e, "C")
                                    }>
                                        <p>C</p>
                                    </Fab>

                                    <Fab size="large" color="secondary" className={classes.answerD} disabled={this.state.answer === "D"} aria-label="add" onClick={
                                        e => this.onAnswerClick(e, "D")
                                    }>
                                        <p>D</p>
                                    </Fab>
                                    </div>
                                </div>
                            </div>
                            )
                        }
                    } else {
                        return <Button variant="contained" color="primary" className={classes.nickNameButton} onClick={this.onLogInClick}>Google Login</Button>
                    }
                })()}

                {/*}
                {this.props.events.uid ? (
                    <div>
                        <p className="App-intro"> UID: {this.props.events.uid}</p>
                        <p className="App-intro"> ニックネーム: {this.props.events.wait}</p>
                        <App />
                        <Button variant="contained" color="secondary" style={{margin: 10, marginTop: 30}} onClick={this.onAttendClick}>ニックネーム登録</Button>
                    </div>
                ) : (
                    <Button onClick={this.onLogInClick}>Google Login</Button>
                )} */}
                </div>
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => ({ events: state.events })
const mapDispatchToProps = ({ LogIn, LogOut, getRedirectResult, authStateChanged, readWaitState, sendAnswer })

export default compose(
    withStyles(styles),
    connect(
      mapStateToProps,
      mapDispatchToProps
  ))(Login)