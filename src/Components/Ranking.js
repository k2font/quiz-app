import React, { Component } from 'react'
import { connect } from 'react-redux'
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import Fab from '@material-ui/core/Fab';

import { Trail, animated } from 'react-spring/renderprops'

import { withStyles } from '@material-ui/styles';
import { compose } from 'redux'

// Rankingに必要なデータは以下
// state/quiz-state => answer, quiz_id
// ${quiz_id}/${answer} => answer_user
// users/${answer_user[配列]}
// 以上、3種類。

// これはFunctionsで実装するのが近道か？
// 回答が確定した瞬間に、ランキング用collectionにデータを整形して格納する。

// ここでは、state/ranking-stateをonSnapshotしてイベントリスナー貼る。
// あとはGameMasterウインドウのボタンをトリガーに、取ってきた名前データをランキング表示。

import {
    rankingRead,
    readWaitState,
} from '../Actions'

import foo from '../img/bgimg.jpg'

const styles = (theme) => ({
    root: {
        width: '100vw',
        height: '100vh',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        background: `url(${foo})`,
    },
});

class Ranking extends Component {
    componentDidMount() {
        this.props.rankingRead()
        this.props.readWaitState()
    }

    state = { toggle: true, items: ['item1', 'item2', 'item3', 'item4', 'item5'] }
    toggle = () => this.setState(state => ({ toggle: !state.toggle }))
    
    render() {
        const { classes } = this.props;

        if(this.props.events.quiz) {
            this.state.items = this.props.events.ranking.ranking
            console.log(this.props.events.ranking.ranking)
        }

        return (
            <div className={classes.root}>

            </div>
        )
    }
}

const mapStateToProps = (state) => ({ events: state.events })
const mapDispatchToProps = ({ rankingRead, readWaitState, })

export default compose(
    withStyles(styles),
    connect(
      mapStateToProps,
      mapDispatchToProps
  ))(Ranking)