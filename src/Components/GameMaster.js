import React, { Component } from 'react'
import { connect } from 'react-redux'
import Button from '@material-ui/core/Button';

import NavigationBar from './NavigationBar'

import _ from 'lodash'

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
    }

    // [優先度低]値をReducerから取ってきて状態管理を実施する(画面を間違って更新してしまった場合の対策)

    componentDidMount() {
        this.props.quizSet()
    }

    async onQuizStartClick(e, qid) {
        console.log(qid)
        await this.props.quizEvents(qid)
        this.setState({ readygo: true })
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
    }

    async onQuizCollectClickB() {
        await this.props.quizCollectEventsB()
        this.setState({ collect_check: false })
        this.setState({ ranking: true })
    }

    async onQuizCollectClickC() {
        await this.props.quizCollectEventsC()
        this.setState({ collect_check: false })
        this.setState({ ranking: true })
    }

    async onQuizCollectClickD() {
        await this.props.quizCollectEventsD()
        this.setState({ collect_check: false })
        this.setState({ ranking: true })
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
        })
    }

    // 問題文がかかれたButtonを描画する関数
    renderEvents() {
        console.log(this.props.events)
        if(this.props.events !== undefined) {
            return _.map(this.props.events, (event, index) => (
                <Button
                    key={index}
                    variant="contained"
                    color="primary"
                    style={{margin: 10}}
                    disabled={this.state.readygo || this.state.answer_check || this.state.collect_check || this.state.ranking}
                    onClick={e => this.onQuizStartClick(e, event)}
                >
                    {event.question}
                </Button>
            ))
        } else {
            return <div></div>
        }
    }

    render() {
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

                    <h3>ランキング</h3>

                    <Button variant="contained" color="secondary" style={{margin: 10}} disabled={!this.state.ranking} onClick={this.onRankingClick}>
                        ランキング表示開始
                    </Button>

                    <h3>クイズ終了</h3>

                    <Button variant="contained" color="secondary" style={{margin: 10}} onClick={this.onGoNextClick}>
                        次の問題へ(問題待機)
                    </Button>

                    <h3>ピリオドリセット</h3>

                    <Button variant="contained" color="secondary" style={{margin: 10}} onClick={this.onGoNextPeriod}>
                        次のピリオドへ
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