import React, { Component } from 'react'
import { connect } from 'react-redux'
import Button from '@material-ui/core/Button';
import _ from 'lodash'

import App from './App'
import NavigationBar from './NavigationBar'

import {
    LogIn,
    LogOut,
    authStateChanged,
    getRedirectResult,
} from '../Actions'

class Login extends Component {
    constructor(props) {
        super(props)
        this.onLogInClick = this.onLogInClick.bind(this)
        this.onAttendClick = this.onAttendClick.bind(this)
    }

    state = {
        user: null
    }

    // 自動ログイン処理(リロードしてもログインしているのが誰かわかるように)
    async componentWillMount() {
        console.log("authStateChanged!")
        await this.props.authStateChanged()
    }

    async componentDidMount() {
        console.log("getRedirectResult!")
        await this.props.getRedirectResult()
    }

    async onLogInClick() {
        await this.props.LogIn()
    }

    async onAttendClick() {
      // TODO: ユーザのニックネームを登録するActionを作成する
      console.log("ニックネームを作成してください")
    }

    render() {
        return (
            <React.Fragment>
                <NavigationBar />
                <div className="App">

                {/* TODO: 初回に限りニックネームを入力してもらう */}
                {/* TODO: キーパッドコンポーネントを入れる */}
                {this.props.events.uid ? (
                    <div>
                        <p className="App-intro"> UID: {this.props.events.uid}</p>
                        <App />
                        <Button variant="contained" color="secondary" style={{margin: 10, marginTop: 30}} onClick={this.onAttendClick}>クイズに参加する</Button>
                    </div>
                ) : (
                    <Button onClick={this.onLogInClick}>Google Login</Button>
                )}
                </div>
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => ({ events: state.events })
const mapDispatchToProps = ({ LogIn, LogOut, getRedirectResult, authStateChanged })

export default connect(mapStateToProps, mapDispatchToProps)(Login)