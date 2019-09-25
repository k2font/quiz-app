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
} from '../Actions'

class GameMaster extends Component {
    constructor(props) {
        super(props)
        this.onQuizStartClick = this.onQuizStartClick.bind(this)
        this.onQuizEndClick = this.onQuizEndClick.bind(this)
        this.onQuizCheckClick = this.onQuizCheckClick.bind(this)
        this.onQuizCollectClick = this.onQuizCollectClick.bind(this)
        this.onRankingClick = this.onRankingClick.bind(this)
        this.onGoNextClick = this.onGoNextClick.bind(this)
    }

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

    // 問題番号がかかれたButtonを描画する関数
    // TODO: 問題idを指定して送出できるようにする
    renderEvents() {
        console.log(this.props.events)
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
    }

    render() {
        return (
            <React.Fragment>
                <NavigationBar />

                <h3>クイズ一覧</h3>
                <div>
                    {this.renderEvents()}
                </div>

                <h3>オペレーション</h3>
                <Button variant="contained" color="primary" style={{margin: 10}} disabled={!this.state.readygo} onClick={this.onQuizEndClick}>
                    回答終了
                </Button>

                <Button variant="contained" color="primary" style={{margin: 10}} disabled={!this.state.answer_check} onClick={this.onQuizCheckClick}>
                    集計結果表示
                </Button>

                <Button variant="contained" color="primary" style={{margin: 10}} disabled={!this.state.collect_check} onClick={this.onQuizCollectClick}>
                    回答発表
                </Button>

                <Button variant="contained" color="secondary" style={{margin: 10}} disabled={!this.state.ranking} onClick={this.onRankingClick}>
                    ランキング表示開始
                </Button>

                <Button variant="contained" color="secondary" style={{margin: 10}} onClick={this.onGoNextClick}>
                    次の問題へ(問題待機)
                </Button>
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => ({ events: state.events })
const mapDispatchToProps = ({ quizEvents, quizEndEvents, quizCheckEvents, quizCollectEvents, rankingEvents, waitQuiz, readEvents, quizSet })

export default connect(mapStateToProps, mapDispatchToProps)(GameMaster)