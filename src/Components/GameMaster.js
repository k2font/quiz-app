import React, { Component } from 'react'
import { connect } from 'react-redux'
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import NavigationBar from './NavigationBar'

import _ from 'lodash'

import { db, firebase } from '../Firebase';

// Actionsを読み込む
import {
    quizEvents,
    quizEndEvents,
    quizCheckEvents,
    quizCollectEvents,
    rankingEvents,
    waitQuiz,
    readEvents,
    quizSet,
    quizCollectEventsA,
    quizCollectEventsB,
    quizCollectEventsC,
    quizCollectEventsD,
} from '../Actions'

class GameMaster extends Component {
    constructor(props) {
        super(props)
        this.addNickName = this.addNickName.bind(this)
        this.onQuizStartClick = this.onQuizStartClick.bind(this)
        this.onQuizEndClick = this.onQuizEndClick.bind(this)
        this.onQuizCheckClick = this.onQuizCheckClick.bind(this)
        this.onQuizCollectClick = this.onQuizCollectClick.bind(this)
        this.onQuizCollectClickA = this.onQuizCollectClickA.bind(this)
        this.onQuizCollectClickB = this.onQuizCollectClickB.bind(this)
        this.onQuizCollectClickC = this.onQuizCollectClickC.bind(this)
        this.onQuizCollectClickD = this.onQuizCollectClickD.bind(this)
        this.onRankingClick = this.onRankingClick.bind(this)
        this.onGoNextClick = this.onGoNextClick.bind(this)
    }

    /* TODO: 回答をFirestoreに登録するボタンの挙動を用意する */

    state = {
        readygo: false,
        answer_check: false,
        collect_check: false,
        ranking: false,
        gonext: false,
        quiz_id: "",
        nickname: "",
    }

    // [優先度低]値をReducerから取ってきて状態管理を実施する(画面を間違って更新してしまった場合の対策)

    componentDidMount() {
        this.props.quizSet()
    }

    addNickName = () => {
        this.setState({
            message: "The button has been clicked!"
        })
    }

    async onQuizStartClick(e, qid) {
        console.log(qid)
        await this.props.quizEvents(qid)
        this.setState({ readygo: true })
        this.setState({ quiz_id: qid.id })
    }

    async onQuizEndClick() {
        await this.props.quizEndEvents()
        this.setState({ readygo: false })
        this.setState({ answer_check: true })
    }

    async onQuizCheckClick() {
        await this.props.quizCheckEvents()
        this.setState({ answer_check: false })
        this.setState({ collect_check: true })
    }

    async onQuizCollectClick() {
        await this.props.quizCollectEvents()
        this.setState({ collect_check: false })
        this.setState({ ranking: true })
    }

    async onQuizCollectClickA() {
        await this.props.quizCollectEventsA()
        this.setState({ collect_check: false })
        this.setState({ ranking: true })

        // 最初に正解した人を画面に表示する処理
        var docRef = db.collection(this.state.quiz_id).doc("A");
        var response_answer_user = []
        var nick = []
    
        await docRef.get().then(function(doc) {
            var response = doc.data()
            console.log(response.answer_user[0])
            response_answer_user.push(response.answer_user[0])
        }).catch(function(error) {
            console.log("Error getting cached document:", error);
        });

        await db.collection("users").doc(response_answer_user[0]).get().then(function(doc) {
            var response = doc.data()
            console.log(response.nickname)
            var nickname = response.nickname
            // なぜかsetStateできない...
            nick.push(nickname)
        }).catch(function(error) {
            console.log("Error getting cached document:", error);
        });

        this.setState({nickname: nick})
    }

    async onQuizCollectClickB() {
        await this.props.quizCollectEventsB()
        this.setState({ collect_check: false })
        this.setState({ ranking: true })

        // 最初に正解した人を画面に表示する処理
        var docRef = db.collection(this.state.quiz_id).doc("B");
        var response_answer_user = []
        var nick = []
    
        await docRef.get().then(function(doc) {
            var response = doc.data()
            console.log(response.answer_user[0])
            response_answer_user.push(response.answer_user[0])
        }).catch(function(error) {
            console.log("Error getting cached document:", error);
        });

        await db.collection("users").doc(response_answer_user[0]).get().then(function(doc) {
            var response = doc.data()
            console.log(response.nickname)
            var nickname = response.nickname
            // なぜかsetStateできない...
            nick.push(nickname)
        }).catch(function(error) {
            console.log("Error getting cached document:", error);
        });

        this.setState({nickname: nick})
    }

    async onQuizCollectClickC() {
        await this.props.quizCollectEventsC()
        this.setState({ collect_check: false })
        this.setState({ ranking: true })

        // 最初に正解した人を画面に表示する処理
        var docRef = db.collection(this.state.quiz_id).doc("C");
        var response_answer_user = []
        var nick = []
    
        await docRef.get().then(function(doc) {
            var response = doc.data()
            console.log(response.answer_user[0])
            response_answer_user.push(response.answer_user[0])
        }).catch(function(error) {
            console.log("Error getting cached document:", error);
        });

        await db.collection("users").doc(response_answer_user[0]).get().then(function(doc) {
            var response = doc.data()
            console.log(response.nickname)
            var nickname = response.nickname
            // なぜかsetStateできない...
            nick.push(nickname)
        }).catch(function(error) {
            console.log("Error getting cached document:", error);
        });

        this.setState({nickname: nick})
    }

    async onQuizCollectClickD() {
        await this.props.quizCollectEventsD()
        this.setState({ collect_check: false })
        this.setState({ ranking: true })

        // 最初に正解した人を画面に表示する処理
        var docRef = db.collection(this.state.quiz_id).doc("D");
        var response_answer_user = []
        var nick = []
    
        await docRef.get().then(function(doc) {
            var response = doc.data()
            console.log(response.answer_user[0])
            response_answer_user.push(response.answer_user[0])
        }).catch(function(error) {
            console.log("Error getting cached document:", error);
        });

        await db.collection("users").doc(response_answer_user[0]).get().then(function(doc) {
            var response = doc.data()
            console.log(response.nickname)
            var nickname = response.nickname
            // なぜかsetStateできない...
            nick.push(nickname)
        }).catch(function(error) {
            console.log("Error getting cached document:", error);
        });

        this.setState({nickname: nick})
    }

    async onRankingClick() {
        await this.props.rankingEvents()
        this.setState({ gonext: true })
    }

    async onGoNextClick() {
        await this.props.waitQuiz()
        this.setState({
            readygo: false,
            answer_check: false,
            collect_check: false,
            ranking: false,
            gonext: false,
            quiz_id: "",
            nickname: "",
        })
    }

    async onGoNextPeriod() {
        
    }

    // 問題文がかかれたButtonを描画する関数
    renderEvents() {
        if(this.props.events !== undefined) {
            console.log(this.props.events)
            return _.map(this.props.events, (event, index) => (
                <Button
                    key={ index }
                    variant="contained"
                    color="primary"
                    style={{ margin: 10 }}
                    disabled={ this.state.readygo || this.state.answer_check || this.state.collect_check || this.state.ranking }
                    onClick={ e => this.onQuizStartClick(e, event) }
                >
                    {event.question}
                </Button>
            ))
        } else {
            return <div></div>
        }
    }

    render() {
        console.log(this.state.nickname)
        return (
            <React.Fragment>
                
                {/* ナビゲーションバー */}
                <NavigationBar />

                {/* クイズ一覧 */}
                <div style={{paddingLeft: 20}}>
                    <h3>クイズ一覧</h3>
                    <div>
                        {this.renderEvents()}
                    </div>

                    <h3>出題オペレーション</h3>
                    <Button variant="contained" color="primary" style={{margin: 10}} disabled={!this.state.readygo} onClick={this.onQuizEndClick}>
                        回答終了
                    </Button>

                    <Button variant="contained" color="primary" style={{margin: 10}} disabled={!this.state.answer_check} onClick={this.onQuizCheckClick}>
                        集計結果表示
                    </Button>

                    <h3>回答発表</h3>

                    <Button variant="contained" color="primary" style={{margin: 10}} disabled={!this.state.collect_check} onClick={this.onQuizCollectClickA}>
                        正解: A
                    </Button>

                    <Button variant="contained" color="primary" style={{margin: 10}} disabled={!this.state.collect_check} onClick={this.onQuizCollectClickB}>
                        正解: B
                    </Button>

                    <Button variant="contained" color="primary" style={{margin: 10}} disabled={!this.state.collect_check} onClick={this.onQuizCollectClickC}>
                        正解: C
                    </Button>

                    <Button variant="contained" color="primary" style={{margin: 10}} disabled={!this.state.collect_check} onClick={this.onQuizCollectClickD}>
                        正解: D
                    </Button>

                    <Typography variant="body1" align="left">この問題の最速正解者: {this.state.nickname}</Typography>

                    <h3>後処理</h3>

                    <Button variant="contained" color="secondary" style={{margin: 10}} disabled={!this.state.ranking} onClick={this.onRankingClick}>
                        正解者決定
                    </Button>

                    <h3>クイズ終了</h3>

                    <Button variant="contained" color="secondary" style={{margin: 10}} onClick={this.onGoNextClick}>
                        次の問題へ(問題待機)
                    </Button>

                    <h3 style={{marginTop: 100}}>ピリオドリセット/全員復活</h3>

                    <Button variant="contained" color="secondary" style={{margin: 10}} onClick={this.onGoNextPeriod}>
                        全参加者復活
                    </Button>
                </div>
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => ({ events: state.events })
const mapDispatchToProps = (
    {
        quizEvents,
        quizEndEvents,
        quizCheckEvents,
        quizCollectEvents,
        rankingEvents,
        waitQuiz,
        readEvents,
        quizSet,
        quizCollectEventsA,
        quizCollectEventsB,
        quizCollectEventsC,
        quizCollectEventsD,
    }
)

export default connect(mapStateToProps, mapDispatchToProps)(GameMaster)