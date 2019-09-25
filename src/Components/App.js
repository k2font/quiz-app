import React, { Component } from 'react';
import Fab from '@material-ui/core/Fab';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';

const styles = theme => ({
  root: {
    textAlign: 'center',
    marginTop: 70,
  },

  appBar: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
  },

  buttonAlign: {
    textAlign: 'center',
  },

  answerA: {
    background: '#1e90ff',
    fontSize: 70,
    border: 0,
    boxShadow: '0 3px 5px 2px rgba(0, 0, 0, .3)',
    color: 'white',
    width: 150,
    height: 150,
    margin: '10px',
  },

  answerB: {
    background: '#dc143c',
    fontSize: 70,
    border: 0,
    boxShadow: '0 3px 5px 2px rgba(0, 0, 0, .3)',
    color: 'white',
    width: 150,
    height: 150,
    margin: '10px',
  },

  answerC: {
    background: '#008000',
    fontSize: 70,
    border: 0,
    boxShadow: '0 3px 5px 2px rgba(0, 0, 0, .3)',
    color: 'white',
    width: 150,
    height: 150,
    margin: '10px',
  },

  answerD: {
    background: '#ffd700',
    fontSize: 70,
    border: 0,
    boxShadow: '0 3px 5px 2px rgba(0, 0, 0, .3)',
    color: 'white',
    width: 150,
    height: 150,
    margin: '10px',
  },
});

// TODO: firestoreのstateコレクションの値を見て表示を変更せよ
// wait-stateのみ見ればいい。trueなら「次の問題までお待ち下さい」、falseならキーパッド表示。

class App extends Component {
  constructor(props) {
    super(props);

    this.state = { answer: "" }
  }

  // できたこと: Firebaseのリアルタイムデータベースを活用して、データベースの変更を読んでなにかする、みたいなことはできそう。
  // TODO: ActionとReducerを使って書き直す
  onChangeAnswer = (doc) => {
    this.setState({ answer: doc })
    console.log(this.state)
  }

  componentDidMount() {
    // TODO: Context APIでこのprops drilling probremを解消する。
    // props drilling probrem: propsをバケツリレーのように子コンポーネントに渡していくこと
    // 現在起きている問題を解消してくれる。
    /*
    this.props.childProps.collection("users").doc("sO0VasIp4RvMN6JwQDNi")
    .onSnapshot(function(doc) {
        console.log("Current data: ", doc.data().answer);
        this.onChangeAnswer(doc.data().answer)
    }); */
  }

  render () {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        {/* <h1>Your Answer: { this.state.answer }</h1> */}

        <div className={classes.buttonAlign}>
          <Fab size="large" color="primary" className={classes.answerA} disabled={this.flagA} aria-label="add" onClick={() => {
            this.setState({ answer: "A" })
            this.flagB = true
            this.flagC = true
            this.flagD = true
          }}>
            <p>A</p>
          </Fab>

          <Fab size="large" color="secondary" className={classes.answerB} disabled={this.flagB} aria-label="add" onClick={() => {
            this.setState({ answer: "B" })
            this.flagA = true
            this.flagC = true
            this.flagD = true
          }}>
            <p>B</p>
          </Fab>
        </div>

        <div className={classes.buttonAlign}>
          <Fab size="large" color="secondary" className={classes.answerC} disabled={this.flagC} aria-label="add" onClick={() => {
            this.setState({ answer: "C" })
            this.flagA = true
            this.flagB = true
            this.flagD = true
          }}>
            <p>C</p>
          </Fab>

          <Fab size="large" color="secondary" className={classes.answerD} disabled={this.flagD} aria-label="add" onClick={() => {
            this.setState({ answer: "D" })
            this.flagA = true
            this.flagB = true
            this.flagC = true
          }}>
            <p>D</p>
          </Fab>
        </div>
      </div>
    )
  };
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);