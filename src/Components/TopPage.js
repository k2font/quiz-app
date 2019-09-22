import React, { Component } from 'react'
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import NavigationBar from './NavigationBar'

class TopPage extends Component {
    state = {
        readygo: true,
    }

    render() {
        return (
            <React.Fragment>
                <NavigationBar />

                <Grid
                    container
                    direction="column"
                    justify="flex-start"
                    alignItems="flex-start"
                >
                    <Button variant="contained" color="primary" style={{margin: 10}} onClick={() => {
                        this.props.history.push('/game_master')
                    }}>
                        ゲームマスター用画面
                    </Button>

                    <Button variant="contained" color="primary" style={{margin: 10}} onClick={() => {
                        this.props.history.push('/events')
                    }}>
                        クイズ登録用画面
                    </Button>

                    <Button variant="contained" color="primary" style={{margin: 10}} disabled={true} onClick={() => {
                        //this.props.history.push('/')
                    }}>
                        回答状況確認画面
                    </Button>

                    <Button variant="contained" color="primary" style={{margin: 10}} onClick={() => {
                        this.props.history.push('/quiz')
                    }}>
                        問題表示画面
                    </Button>
                        
                    <Button variant="contained" color="primary" style={{margin: 10}} disabled={true} onClick={() => {
                        this.setState({ gonext: false })
                    }}>
                        ランキング画面
                    </Button>

                    <Button variant="contained" color="secondary" style={{margin: 10}} onClick={() => {
                        this.props.history.push('/')
                    }}>
                        キーパッド
                    </Button>
                </Grid>
            </React.Fragment>
        )
    }
}

export default TopPage