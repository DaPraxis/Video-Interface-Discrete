import {withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const InstructionsButton = withStyles((theme) => ({
    // root: {
    //     backgroundColor: '#4FB8B8',
    //     borderRadius: 'min(1.2vw, 15px)',
    //     padding: "min(0.5vw, 7px) min(2vw, 30px) min(0.5vw, 7px) min(2vw, 30px)",
    //     color: '#f7f7f7',
    //     fontWeight: 'bold',
    //     fontSize: 'min(1.2vw, 16px)',
    //     fontFamily: 'Open Sans',
    //     boxShadow: '0 min(0.4vw, 5px) min(0.4vw, 5px) rgba(0, 0, 0, 0.29)',
    //     margin: '20px auto',
    //     textAlign: 'center',
    //     verticalAlign: 'top',
    //     transitionDuration: '0.4s',
    //     '&:hover': {
    //         backgroundColor: '#4FB8B8',
    //         color: '#f7f7f7',
    //         boxShadow: '0 min(0.5vw, 7px) min(0.5vw, 7px) rgba(0, 0, 0, 0.29)',
    //     },
    // },
    root: {
        height: '60px',
        backgroundColor: '#4FB8B8',
        borderRadius: '15px',
        width: '260px',
        color: '#f7f7f7',
        fontWeight: 'bold',
        fontSize: '20px',
        fontFamily: 'Open Sans',
        boxShadow: '0 5px 5px rgba(0, 0, 0, 0.29)',
        margin: '20px auto',
        textAlign: 'center',
        verticalAlign: 'top',
        transitionDuration: '0.4s',
        '&:hover': {
            backgroundColor: '#4FB8B8',
            color: '#f7f7f7',
            boxShadow: '0 7px 7px rgba(0, 0, 0, 0.29)',
        },
    },
}))(Button);


export default InstructionsButton;