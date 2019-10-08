import React, { Component } from 'react'
import { connect } from 'react-redux'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import NavigationBar from './NavigationBar'

// Actionsを読み込む
import { readEvents } from '../Actions'

class Answers extends Component {
    // 初期マウント時に実行する
    componentDidMount() {
        // 初期マウント時に外部のサーバAPIにリクエストし、データを参照する
        this.props.readEvents()
        console.log(this.props)
    }

    state = {
        readygo: true,
    }

    renderEvents() {
        return _.map(this.props.events, event => (
            <TableRow key={event.id}>
            <TableCell>
                {event.id}
            </TableCell>

            <TableCell>
                <Link to={`/events/${event.id}`}>
                {event.question}
                </Link>
            </TableCell>

            <TableCell>
                {event.answer}
            </TableCell>

            {event.qtype === "text" ? (
                <TableCell>{event.choice1}</TableCell>
            ) : (
                <TableCell><img src={event.choice1} alt="choice1" width="50px"></img></TableCell>
            )}

            {event.qtype === "text" ? (
                <TableCell>{event.choice2}</TableCell>
            ) : (
                <TableCell><img src={event.choice2} alt="choice2" width="50px"></img></TableCell>
            )}

            {event.qtype === "text" ? (
                <TableCell>{event.choice3}</TableCell>
            ) : (
                <TableCell><img src={event.choice3} alt="choice3" width="50px"></img></TableCell>
            )}

            {event.qtype === "text" ? (
                <TableCell>{event.choice4}</TableCell>
            ) : (
                <TableCell><img src={event.choice4} alt="choice4" width="50px"></img></TableCell>
            )}
            </TableRow>
        ))
    }

    render() {
        return (
            <React.Fragment>
                <NavigationBar />
                
                <Paper>
                    <Table>
                        <TableHead>
                        <TableRow>
                            <th>回答者</th>
                            <th>ユーザID</th>
                            <th>回答キー</th>
                        </TableRow>
                        </TableHead>
            
                        <TableBody>
                            {this.renderEvents()}
                        </TableBody>
                    </Table>
                </Paper>
            </React.Fragment>
          )
        }
    }
}

const mapStateToProps = (state) => ({ events: state.events })
const mapDispatchToProps = ({ readEvents })

export default connect(mapStateToProps, mapDispatchToProps)(Answers)