import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import foo from '../img/bgimg.jpg'

const useStyles = makeStyles(theme => ({
    root: {
        margin: 0,
        width: '100vw',
        height: '100vh',
        background: `url(${foo})`,
    },

    subAlign: {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        margin: 'auto',
        width: '40%',
        height: '40%',
    },

    choiceA: {
        margin: 20,
        width: '100%',
        height: '100%',
        background: 'white',
    },

    choiceB: {
        margin: 20,
        width: '100%',
        height: '100%',
        background: 'white'
    },

    choiceC: {
        margin: 20,
        width: '100%',
        height: '100%',
        background: 'white'
    },

    choiceD: {
        margin: 20,
        width: '100%',
        height: '100%',
        background: 'white'
    },

    iconA: {
        position: 'relative',
        margin: 10,
        borderRadius: 25,
        width: '50px',
        height: '50px',
        background: 'red',
        textAlign: 'center',
        color: '#FFFFFF',
    },

    iconB: {
        position: 'relative',
        margin: 10,
        borderRadius: 25,
        width: '50px',
        height: '50px',
        background: 'blue',
        textAlign: 'center',
        color: '#FFFFFF',
    },

    iconC: {
        position: 'relative',
        margin: 10,
        borderRadius: 25,
        width: '50px',
        height: '50px',
        background: 'green',
        textAlign: 'center',
        color: '#FFFFFF',
    },

    iconD: {
        position: 'relative',
        margin: 10,
        borderRadius: 25,
        width: '50px',
        height: '50px',
        background: 'yellow',
        textAlign: 'center',
        color: '#FFFFFF',
    },
}));

export default function NavigationBar() {
    const classes = useStyles();

    return (
        <React.Fragment>
            <div className={classes.root}>
                    <Paper>Q: 森一平は？</Paper>
                    <div className={classes.subAlign}>
                        <Paper className={classes.choiceA}>
                            <Paper>
                                <Typography variant="h4" align="center" className={classes.iconA}>A</Typography>
                                <Typography variant="h4" align="center">2回</Typography>
                            </Paper>
                        </Paper>

                        <Paper className={classes.choiceB}>
                            <Paper>
                                <Typography variant="h4" align="center" className={classes.iconB}>B</Typography>
                                <Typography variant="h4" align="center">3回</Typography>
                            </Paper>
                        </Paper>

                        <Paper className={classes.choiceC}>
                            <Paper>
                                <Typography variant="h4" align="center" className={classes.iconC}>C</Typography>
                                <Typography variant="h4" align="center">4回</Typography>
                            </Paper>
                        </Paper>

                        <Paper className={classes.choiceD}>
                            <Paper>
                                <Typography variant="h4" align="center" className={classes.iconD}>D</Typography>
                                <Typography variant="h4" align="center">5回</Typography>
                            </Paper>
                        </Paper>
                    </div>
            </div>
        </React.Fragment>
    )
}