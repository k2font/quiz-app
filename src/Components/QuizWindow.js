import React, { Component } from 'react'
import { connect } from 'react-redux'
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';

import { withStyles } from '@material-ui/styles';
import { compose } from 'redux'

import {
    readWaitState,
    readQuizContent,
    quizCheckEvents,
    quizCollectEvents,
    quizSet,
    countAnswer,
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

    subAlign: {
        position: 'absolute',
        top: 200,
        right: 0,
        bottom: 0,
        left: 0,
        margin: 'auto',
        width: '90%',
        height: '90%',
    },

    ans_subAlign: {
        position: 'absolute',
        top: 760,
        right: 0,
        bottom: 0,
        left: 0,
        margin: 'auto',
        width: '90%',
        height: '90%',
    },

    question_bg: {
        position: 'absolute',
        marginTop: 40,
        marginLeft: 20,
        width: '98%',
        height: '90px',
        background: 'white',
    },

    wait_bg: {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 300,
        left: 0,
        margin: 'auto',
        textAlign: 'center',
        fontSize: 100,
        fontWeight: 800,
        color: 'white',
        width: '90%',
        height: '0px',
    },

    question: {
        position: 'absolute',
        margin: 10,
        textSize: 2000,
        fontWeight: 900,
    },

    choiceA: {
        margin: 0,
        width: '100%',
        height: '470px',
        background: 'white',
        textAlign:'center',
    },

    choiceB: {
        margin: 0,
        width: '100%',
        height: '470px',
        background: 'white',
        textAlign:'center',
    },

    choiceC: {
        margin: 0,
        width: '100%',
        height: '470px',
        background: 'white',
        textAlign:'center',
    },

    choiceD: {
        margin: 0,
        width: '100%',
        height: '470px',
        background: 'white',
        textAlign:'center',
    },

    iconA: {
        position: 'relative',
        margin: 10,
        borderRadius: 45,
        width: '90px',
        height: '90px',
        top: 20,
        left: 20,
        fontSize: 70,
        fontWeight: 900,
        background: 'red',
        textAlign: 'center',
        color: '#FFFFFF',
        boxShadow: '0 3px 5px 2px rgba(0, 0, 0, .3)',
    },

    iconB: {
        position: 'relative',
        margin: 10,
        borderRadius: 45,
        width: '90px',
        height: '90px',
        top: 20,
        left: 20,
        fontSize: 70,
        fontWeight: 900,
        background: 'blue',
        textAlign: 'center',
        color: '#FFFFFF',
        boxShadow: '0 3px 5px 2px rgba(0, 0, 0, .3)',
    },

    iconC: {
        position: 'relative',
        margin: 10,
        borderRadius: 45,
        width: '90px',
        height: '90px',
        top: 20,
        left: 20,
        fontSize: 70,
        fontWeight: 900,
        background: 'green',
        textAlign: 'center',
        color: '#FFFFFF',
        boxShadow: '0 3px 5px 2px rgba(0, 0, 0, .3)',
    },

    iconD: {
        position: 'relative',
        margin: 10,
        borderRadius: 45,
        width: '90px',
        height: '90px',
        top: 20,
        left: 20,
        fontSize: 70,
        fontWeight: 900,
        background: 'orange',
        textAlign: 'center',
        color: '#FFFFFF',
        boxShadow: '0 3px 5px 2px rgba(0, 0, 0, .3)',
    },

    textA: {
        position: 'relative',
        top: 30,
        fontSize: 150,
        fontWeight: 900,
    },

    textB: {
        position: 'relative',
        top: 30,
        fontSize: 150,
        fontWeight: 900,
    },

    textC: {
        position: 'relative',
        top: 30,
        fontSize: 150,
        fontWeight: 900,
    },

    textD: {
        position: 'relative',
        top: 30,
        fontSize: 150,
        fontWeight: 900,
    },

    answerA: {
        boxShadow: '0 3px 5px 2px rgba(0, 0, 0, .3)',
    },

    answerB: {
        boxShadow: '0 3px 5px 2px rgba(0, 0, 0, .3)',
    },

    answerC: {
        boxShadow: '0 3px 5px 2px rgba(0, 0, 0, .3)',
    },

    answerD: {
        boxShadow: '0 3px 5px 2px rgba(0, 0, 0, .3)',
    },

    blank_answer: {
        margin: 0,
        width: '100%',
        height: '470px',
    },

    collectA: {
        filter: 'alpha(opacity=50)',
        opacity: '0.5',
        marginTop: 10,
        width: '100%',
        height: '470px',
        background: 'red',
        textAlign:'center',
    },

    collectB: {
        filter: 'alpha(opacity=50)',
        opacity: '0.5',
        marginTop: 10,
        width: '100%',
        height: '470px',
        background: 'red',
        textAlign:'center',
    },

    collectC: {
        filter: 'alpha(opacity=50)',
        opacity: '0.5',
        marginTop: 10,
        width: '100%',
        height: '470px',
        background: 'red',
        textAlign:'center',
    },

    collectD: {
        filter: 'alpha(opacity=50)',
        opacity: '0.5',
        marginTop: 10,
        width: '100%',
        height: '470px',
        background: 'red',
        textAlign:'center',
    },

    ans_textA: {
        position: 'relative',
        fontSize: 150,
        fontWeight: 900,
    },

    ans_textB: {
        position: 'relative',
        fontSize: 150,
        fontWeight: 900,
    },

    ans_textC: {
        position: 'relative',
        fontSize: 150,
        fontWeight: 900,
    },

    ans_textD: {
        position: 'relative',
        fontSize: 150,
        fontWeight: 900,
    },
});

class QuizWindow extends Component {
    async componentDidMount() {
        await this.props.readWaitState()
        await this.props.quizSet()
    }

    render() {
        /* TODO: ユーザの回答状況を集計して画面に表示する */
        const { classes } = this.props;
        var i = ""
        var quiz_answer = ""
        console.log(this.props.events)

        if(this.props.events.quiz !== undefined) {
            console.log(this.props.events.quiz.quiz_id)
            console.log(this.props.events.quiz.answer)
            i = this.props.events[this.props.events.quiz.quiz_id] // 現在入っているクイズの問題を見ている
            quiz_answer = this.props.events.quiz.answer
        }

        return (
            <React.Fragment>
                <div className={classes.root}>
                    {this.props.events.wait === false && this.props.events[this.props.events.quiz.quiz_id] !== undefined ? (
                        <div>
                            {/* 問題文を表示する欄 */}
                            <div>
                                <Paper className={classes.question_bg}>
                                    <Typography variant="h2" align="center" className={classes.question}>{i.question}</Typography>
                                </Paper>
                            </div>

                            {/* 選択肢を表示する欄 */}
                            <div className={classes.subAlign}>
                                <Grid container spacing={6}>
                                    <Grid item xs={6}>
                                        {/* this.props.events.quiz.answerにゲームマスターが登録した回答が入ってるよ。 */}
                                        {i.qtype !== "image" ? (
                                            <Paper className={classes.choiceA}>
                                                <Typography variant="h4" align="center" className={classes.iconA}>A</Typography>
                                                <Typography variant="h4" align="center" className={classes.textA}>{i.choice1}</Typography>
                                            </Paper>
                                        ) : (
                                            <Paper className={classes.choiceA}>
                                                <Typography variant="h4" align="center" className={classes.iconA}>A</Typography>
                                                <img src={i.choice1} alt="choice"
                                                style={{
                                                    width: "600px",
                                                    position: 'absolute',
                                                    top: 20,
                                                    right: 500,
                                                    bottom: 100,
                                                    left: 150,
                                                }}></img>
                                            </Paper>
                                        )}
                                    </Grid>
                                    
                                    <Grid item xs={6}>
                                        {i.qtype !== "image" ? (
                                            <Paper className={classes.choiceB}>
                                                <Typography variant="h4" align="center" className={classes.iconB}>B</Typography>
                                                <Typography variant="h4" align="center" className={classes.textB}>{i.choice2}</Typography>
                                            </Paper>
                                        ) : (
                                            <Paper className={classes.choiceB}>
                                                <Typography variant="h4" align="center" className={classes.iconB}>B</Typography>
                                                <img src={i.choice2} alt="choice"
                                                style={{
                                                    width: "600px",
                                                    position: 'absolute',
                                                    top: 20,
                                                    right: 500,
                                                    bottom: 100,
                                                    left: 1030,
                                                }}></img>
                                            </Paper>
                                        )}
                                    </Grid>
                                </Grid>

                                <Grid container spacing={6}>
                                    <Grid item xs={6}>
                                        {i.qtype !== "image" ? (
                                            <Paper className={classes.choiceC}>
                                                <Typography variant="h4" align="center" className={classes.iconC}>C</Typography>
                                                <Typography variant="h4" align="center" className={classes.textC}>{i.choice3}</Typography>
                                            </Paper>
                                        ) : (
                                            <Paper className={classes.choiceC}>
                                                <Typography variant="h4" align="center" className={classes.iconC}>C</Typography>
                                                <img src={i.choice3} alt="choice"
                                                style={{
                                                    width: "600px",
                                                    position: 'absolute',
                                                    top: 520,
                                                    right: 500,
                                                    bottom: 100,
                                                    left: 150,
                                                }}></img>
                                            </Paper>
                                        )}
                                    </Grid>

                                    <Grid item xs={6}>
                                        {i.qtype !== "image" ? (
                                            <Paper className={classes.choiceD}>
                                                <Typography variant="h4" align="center" className={classes.iconD}>D</Typography>
                                                <Typography variant="h4" align="center" className={classes.textD}>{i.choice4}</Typography>
                                            </Paper>
                                        ) : (
                                            <Paper className={classes.choiceD}>
                                                <Typography variant="h4" align="center" className={classes.iconD}>D</Typography>
                                                <img src={i.choice4} alt="choice"
                                                style={{
                                                    width: "600px",
                                                    position: 'absolute',
                                                    top: 520,
                                                    right: 500,
                                                    bottom: 100,
                                                    left: 1030,
                                                }}></img>
                                            </Paper>
                                        )}
                                    </Grid>
                                </Grid>
                            </div>

                            {/* 回答が発表されたときに表示する欄 */}
                            <div className={classes.subAlign}>
                                { this.props.events.quiz.collect === true && quiz_answer === "A" ? (
                                    <div>
                                    <Grid container spacing={6}>
                                        <Grid item xs={6}>
                                                <div className={classes.collectA}></div>
                                        </Grid>

                                        <Grid item xs={6}>
                                                <div style={{
                                                    filter: 'alpha(opacity=50)',
                                                    opacity: '0.5',
                                                    marginTop: 10,
                                                    width: '100%',
                                                    height: '470px',
                                                    background: 'gray',
                                                    textAlign:'center',
                                                }}></div>
                                        </Grid>
                                    </Grid>

                                    <Grid container spacing={6}>
                                        <Grid item xs={6}>
                                                <div style={{
                                                    filter: 'alpha(opacity=50)',
                                                    opacity: '0.5',
                                                    marginTop: 10,
                                                    width: '100%',
                                                    height: '470px',
                                                    background: 'gray',
                                                    textAlign:'center',
                                                }}></div>
                                        </Grid>

                                        <Grid item xs={6}>
                                                <div style={{
                                                    filter: 'alpha(opacity=50)',
                                                    opacity: '0.5',
                                                    marginTop: 10,
                                                    width: '100%',
                                                    height: '470px',
                                                    background: 'gray',
                                                    textAlign:'center',
                                                }}></div>
                                        </Grid>
                                    </Grid>
                                    </div>
                                ) : (
                                    <div></div>
                                )}

                                { this.props.events.quiz.collect === true && quiz_answer === "B" ? (
                                    <div>
                                    <Grid container spacing={6}>
                                        <Grid item xs={6}>
                                                <div style={{
                                                    filter: 'alpha(opacity=50)',
                                                    opacity: '0.5',
                                                    marginTop: 10,
                                                    width: '100%',
                                                    height: '470px',
                                                    background: 'gray',
                                                    textAlign:'center',
                                                }}></div>
                                        </Grid>

                                        <Grid item xs={6}>
                                                <div className={classes.collectA}></div>
                                        </Grid>
                                    </Grid>

                                    <Grid container spacing={6}>
                                        <Grid item xs={6}>
                                                <div style={{
                                                    filter: 'alpha(opacity=50)',
                                                    opacity: '0.5',
                                                    marginTop: 10,
                                                    width: '100%',
                                                    height: '470px',
                                                    background: 'gray',
                                                    textAlign:'center',
                                                }}></div>
                                        </Grid>

                                        <Grid item xs={6}>
                                                <div style={{
                                                    filter: 'alpha(opacity=50)',
                                                    opacity: '0.5',
                                                    marginTop: 10,
                                                    width: '100%',
                                                    height: '470px',
                                                    background: 'gray',
                                                    textAlign:'center',
                                                }}></div>
                                        </Grid>
                                    </Grid>
                                    </div>
                                ) : (
                                    <div></div>
                                )}

                                { this.props.events.quiz.collect === true && quiz_answer === "C" ? (
                                    <div>
                                        <Grid container spacing={6}>
                                            <Grid item xs={6}>
                                                    <div style={{
                                                        filter: 'alpha(opacity=50)',
                                                        opacity: '0.5',
                                                        marginTop: 10,
                                                        width: '100%',
                                                        height: '470px',
                                                        background: 'gray',
                                                        textAlign:'center',
                                                    }}></div>
                                            </Grid>

                                            <Grid item xs={6}>
                                                    <div style={{
                                                        filter: 'alpha(opacity=50)',
                                                        opacity: '0.5',
                                                        marginTop: 10,
                                                        width: '100%',
                                                        height: '470px',
                                                        background: 'gray',
                                                        textAlign:'center',
                                                    }}></div>
                                            </Grid>
                                        </Grid>

                                        <Grid container spacing={6}>
                                            <Grid item xs={6}>
                                                    <div className={classes.collectC}></div>
                                            </Grid>

                                            <Grid item xs={6}>
                                                    <div style={{
                                                        filter: 'alpha(opacity=50)',
                                                        opacity: '0.5',
                                                        marginTop: 10,
                                                        width: '100%',
                                                        height: '470px',
                                                        background: 'gray',
                                                        textAlign:'center',
                                                    }}></div>
                                            </Grid>
                                        </Grid>
                                    </div>
                                ) : (
                                    <div></div>
                                )}

                                { this.props.events.quiz.collect === true && quiz_answer === "D" ? (
                                    <div>
                                        <Grid container spacing={6}>
                                            <Grid item xs={6}>
                                                    <div style={{
                                                        filter: 'alpha(opacity=50)',
                                                        opacity: '0.5',
                                                        marginTop: 10,
                                                        width: '100%',
                                                        height: '470px',
                                                        background: 'gray',
                                                        textAlign:'center',
                                                    }}></div>
                                            </Grid>

                                            <Grid item xs={6}>
                                                    <div style={{
                                                        filter: 'alpha(opacity=50)',
                                                        opacity: '0.5',
                                                        marginTop: 10,
                                                        width: '100%',
                                                        height: '470px',
                                                        background: 'gray',
                                                        textAlign:'center',
                                                    }}></div>
                                            </Grid>
                                        </Grid>

                                        <Grid container spacing={6}>
                                            <Grid item xs={6}>
                                                    <div style={{
                                                        filter: 'alpha(opacity=50)',
                                                        opacity: '0.5',
                                                        marginTop: 10,
                                                        width: '100%',
                                                        height: '470px',
                                                        background: 'gray',
                                                        textAlign:'center',
                                                    }}></div>
                                            </Grid>

                                            <Grid item xs={6}>
                                                    <div className={classes.collectD}></div>
                                            </Grid>
                                        </Grid>
                                    </div>
                                ) : (
                                    <div></div>
                                )}
                            </div>

                            {this.props.events.quiz.check !== false ? (
                                <div className={classes.ans_subAlign}>
                                    <Grid container spacing={6}>
                                        <Grid item xs={3}>

                                        </Grid>

                                        <Grid item xs={3}>
                                            <Paper className={classes.answerA}>
                                                <Typography variant="h4" align="center" className={classes.ans_textA}>{this.props.events.answers.A}</Typography>
                                            </Paper>
                                        </Grid>

                                        <Grid item xs={3}>

                                        </Grid>

                                        <Grid item xs={3}>
                                            <Paper className={classes.answerB}>
                                                <Typography variant="h4" align="center" className={classes.ans_textB}>{this.props.events.answers.B}</Typography>
                                            </Paper>
                                        </Grid>
                                    </Grid>

                                    <Grid container spacing={6} style={{marginTop: 300}}>
                                        <Grid item xs={3}>

                                        </Grid>

                                        <Grid item xs={3}>
                                            <Paper className={classes.answerC}>
                                                <Typography variant="h4" align="center" className={classes.ans_textC}>{this.props.events.answers.C}</Typography>
                                            </Paper>
                                        </Grid>

                                        <Grid item xs={3}>
                                            
                                        </Grid>

                                        <Grid item xs={3}>
                                            <Paper className={classes.answerD}>
                                                <Typography variant="h4" align="center" className={classes.ans_textC}>{this.props.events.answers.D}</Typography>
                                            </Paper>
                                        </Grid>
                                    </Grid>
                                </div>
                            ):(
                                <div></div>
                            )}
                        </div>
                    ) : (
                        <div className={classes.wait_bg}>
                            <p>次の問題までお待ち下さい</p>
                        </div>
                    )}
                </div>
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => ({ events: state.events })
const mapDispatchToProps = ({ readWaitState, readQuizContent, quizCheckEvents, quizCollectEvents, quizSet, countAnswer })

export default compose(
    withStyles(styles),
    connect(
      mapStateToProps,
      mapDispatchToProps
  ))(QuizWindow)