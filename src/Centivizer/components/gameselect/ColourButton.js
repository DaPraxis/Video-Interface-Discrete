import {withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';


const ColourButton = withStyles((theme) => ({
    root: {
        backgroundColor: '#f7f7f7',
        position: 'relative',
        border: '10px solid #4FB8B8',
        color: '#4FB8B8',
        fontWeight: 'bold',
        fontSize: '28px',
        fontFamily: 'Open Sans 700',
        borderRadius: '50%',
        width: '180px',
        height: '180px',
        '&:hover': {
            backgroundColor: '#4FB8B8',
            color: '#f7f7f7'
        },
    },
    containedPrimary: {
        // "&$disabled": {
            backgroundColor: '#f7f7f7',
            position: 'relative',
            border: '10px solid #9E9E9E',
            color: '#9E9E9E',
            fontWeight: 'bold',
            fontSize: '28px',
            fontFamily: 'Open Sans 700',
            borderRadius: '50%',
            width: '180px',
            height: '180px',
        // }
      },
    containedSecondary: {
        // "&$disabled": {
            backgroundColor: '#f7f7f7',
            position: 'relative',
            border: '10px solid red',
            color: 'red',
            fontWeight: 'bold',
            fontSize: '28px',
            fontFamily: 'Open Sans 700',
            borderRadius: '50%',
            width: '180px',
            height: '180px',
        // }
    },
    disabled: {}
}))(Button);


export default ColourButton;