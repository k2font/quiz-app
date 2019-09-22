import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import _ from 'lodash'

import NavigationBar from './NavigationBar'

// Actionsを読み込む
import { readEvents } from '../Actions'

class EventsIndex extends Component {
  // 初期マウント時に実行する
  componentDidMount() {
    // 初期マウント時に外部のサーバAPIにリクエストし、データを参照する
    this.props.readEvents()
    console.log(this.props)
  }

  handleToAboutPage = () => {
    this.props.history.push('/events/new')
  }

  renderEvents() {
    return _.map(this.props.events, event => (
      <TableRow key={event.id}>
        <TableCell>{event.id}</TableCell>
        <TableCell>
          <Link to={`/events/${event.id}`}>
            {event.question}
          </Link>
        </TableCell>
        <TableCell>{event.answer}</TableCell>
        <TableCell>{event.choice1}</TableCell>
        <TableCell>{event.choice2}</TableCell>
        <TableCell>{event.choice3}</TableCell>
        <TableCell>{event.choice4}</TableCell>
      </TableRow>
    ))
  }

  render () {
    return (
      <React.Fragment>
        <NavigationBar />
        <Paper>
          <Table>
            <TableHead>
              <TableRow>
                <th>問題ID</th>
                <th>問題</th>
                <th>回答</th>
                <th>選択肢A</th>
                <th>選択肢B</th>
                <th>選択肢C</th>
                <th>選択肢D</th>
              </TableRow>
            </TableHead>

            <TableBody>
              {this.renderEvents()}
            </TableBody>
          </Table>
        </Paper>
        <Button variant="contained" color="primary" onClick={this.handleToAboutPage}>
          問題を追加する
        </Button>
      </React.Fragment>
    )
  }
}

// statetopropsはstateの情報からこのコンポーネントに必要な情報を抽出して、
// コンポーネント内のpropsとしてマッピングする機能。
// valueをキーにする。stateを引数にする。
const mapStateToProps = (state) => ({ events: state.events })

//　dispatchtopropsはあるアクションが発生したときに、reducerにタイプに応じた状態遷移を実行させる関数。
// increment, decrement両方のボタンをdispatchに渡してあげる

// dispatchを引数として渡すとreadEventsが動作しなくなる。なんで？
// const mapDispatchToProps = dispatch => ({ readEvents })
// 上記はreadEventsが動かない原因となる。おそらく、readEventsが引数を受け取れない実装となっているから？
const mapDispatchToProps = ({ readEvents })

export default connect(mapStateToProps, mapDispatchToProps)(EventsIndex)

// 以下はconnect関数側に引数として渡したので不要
// export default App;
