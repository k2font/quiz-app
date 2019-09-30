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
    readPlayerName,
    sendAnswer,
} from '../Actions'
import { testNameToKey } from 'jest-snapshot/build/utils';

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
        fontSize: 30,
        border: 0,
        boxShadow: '0 3px 5px 2px rgba(0, 0, 0, .3)',
        color: 'white',
        width: 150,
        height: 150,
        margin: '10px',
    },

    answerB: {
        background: '#dc143c',
        fontSize: 30,
        border: 0,
        boxShadow: '0 3px 5px 2px rgba(0, 0, 0, .3)',
        color: 'white',
        width: 150,
        height: 150,
        margin: '10px',
    },

    answerC: {
        background: '#008000',
        fontSize: 30,
        border: 0,
        boxShadow: '0 3px 5px 2px rgba(0, 0, 0, .3)',
        color: 'white',
        width: 150,
        height: 150,
        margin: '10px',
    },

    answerD: {
        background: '#ffd700',
        fontSize: 30,
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
        uid: null,
        answer: null,
        dropout: false,
    }

    // 正解、不正解ラベルはユーザ端末側で管理すべき。
    // ボタンを押した時点でthis.state.answerに回答ラベルを格納。this.props.events.collectがtrueになった時点でthis.props.events.answerと値を照合。
    // 不正解ならthis.state.dropoutをtrueにする。以降、gamemasterがピリオドリセットを行うまではずっとtrue。
    // this.state.dropoutがtrueの場合はボタンを描画しない。

    componentDidMount() {
        this.props.authStateChanged()
        this.props.readWaitState()
        // ニックネームをreadPlayerNameを用いて取得してくる
        // QuizWindow同様動かない。これを正常動作させるにはどうすればいい？
        // これを解決することはめちゃくちゃ重要。Loginウインドウにおいては「参加登録」ボタンを非表示にしなくてはならないため。
        // usersコレクションを参照するためにuidをreadPlayerNameに渡さないといけない。
        // renderが終わったタイミングでstateに値を入れる。次回render時にその値を読むことで解決するのでは?
        /*
        if(this.props.events !== undefined) {
            this.props.readPlayerName(this.props.events.wait)
        } */

        console.log(this.state)
    }

    async onLogInClick() {
        await this.props.LogIn()
    }

    async onAttendClick() {
        // TODO: ユーザのニックネームを登録するActionを作成する
        this.props.history.push('/addname')
    }

    async onAnswerClick(e, _answer) {
        if(this.state.answer === null) {
            var _uid = this.props.events.uid
            var _qid = this.props.events.quiz.quiz_id
            console.log(this.props.events)
            await this.props.sendAnswer(_uid, _qid, _answer)

            this.setState({ answer: _answer })
        }
    }

    render() {
        const { classes } = this.props;
        console.log(this.props.events)

        if(this.props.events.quiz) {
            if(this.props.events.quiz.collect === true && this.state.answer !== this.props.events.quiz.answer) {
                this.state.dropout = true
            }
        }

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

                {(() => {
                    if(this.props.events.uid) {
                        if(this.props.events.wait === false && this.state.dropout === false) {
                            return(
                            <div>
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
                        } else if(this.props.events.wait === false && this.state.dropout === true) {
                            return(
                            <div>
                                <h2 style={{ textAlign: 'center', margin: 20, }}>脱落</h2>
                                <h4 style={{ textAlign: 'center', }}>次のピリオドまでお待ち下さい</h4>
                            </div>
                            )
                        } else {
                            return(
                            <div>
                                <h2 style={{ textAlign: 'center', margin: 20, }}> ようこそ! </h2>
                                <h4 style={{ textAlign: 'center', }}>次の問題までお待ち下さい</h4>
                                <Button variant="contained" color="secondary" className={classes.nickNameButton} onClick={this.onAttendClick}>参加登録</Button>
                            </div>
                            )
                        }
                    } else {
                        return <Button variant="contained" color="primary" className={classes.nickNameButton} onClick={this.onLogInClick}>Google Login</Button>
                    }
                })()}
                </div>
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => ({ events: state.events })
const mapDispatchToProps = ({ LogIn, LogOut, getRedirectResult, authStateChanged, readWaitState, sendAnswer, readPlayerName })

export default compose(
    withStyles(styles),
    connect(
      mapStateToProps,
      mapDispatchToProps
  ))(Login)