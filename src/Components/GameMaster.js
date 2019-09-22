import React, { Component } from 'react'
import { connect } from 'react-redux'
import Button from '@material-ui/core/Button';
import _ from 'lodash'

import NavigationBar from './NavigationBar'

// Actionsを読み込む
import {
    quizEvents,
    quizEndEvents,
    quizCheckEvents,
    quizCollectEvents,
    rankingEvents,
    waitQuiz,
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

    async onQuizStartClick() {
        await this.props.quizEvents()
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

    render() {
        return (
            <React.Fragment>
                <NavigationBar />
                <Button variant="contained" color="primary" style={{margin: 10}} disabled={this.state.readygo || this.state.answer_check} onClick={this.onQuizStartClick}>
                    回答開始
                </Button>

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

                <Button variant="contained" color="secondary" style={{margin: 10}} disabled={!this.state.gonext} onClick={this.onGoNextClick}>
                    次の問題へ(問題待機)
                </Button>
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => ({ events: state.events })
const mapDispatchToProps = ({ quizEvents, quizEndEvents, quizCheckEvents, quizCollectEvents, rankingEvents, waitQuiz })

export default connect(mapStateToProps, mapDispatchToProps)(GameMaster)