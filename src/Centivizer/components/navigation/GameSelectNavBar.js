import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {
    AppBar,
    Badge,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    IconButton,
    Menu,
    MenuItem,
    Toolbar,
    Typography
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import history from '../../history'
import {useTranslation} from "react-i18next";
import VersionLanguageSwitcher from '../VersionLanguageSwitcher';
import {Link} from "react-router-dom";

const useStyles = makeStyles(theme => ({
    appBar: {
        background: 'rgba(79,184,184, 0.1)',
        boxShadow: 'None',
        paddingTop: '10px'
    },
    grow: {
        flexGrow: 1,
        // color: 'transparent'
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    inputRoot: {
        color: 'inherit',
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            position: 'absolute',
            display: 'flex',
            right: '10px'
        },
    },
    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
    button: {
        backgroundColor: '#55b7b6',
        borderRadius: '0.3rem',
        border: 'none',
        fontweight: 'bold',
        padding: '15px 20px',
        boxShadow: '0 5px 5px rgba(0, 0, 0, 0.29)',
        fontSize: '20px',
        fontWeight: 'bold',
        color: 'white',
        '&:hover': {
            backgroundColor: '#55b7b6',
            transform: 'scale(1.05)',
            transition: 'transform .25s ease-out,-webkit-transform .25s ease-out'
        }
    },
    button2: {
        fontSize: '20px',
        border: '1.5px solid #17a2b8',
        borderRadius: '15px',
        backgroundColor: 'whitesmoke',
        color: '#17a2b8',
        fontWeight: 'bold',
        width: '200px',
        margin: '0px 30px',
        '&:hover': {
            borderColor: '#17a2b8',
            backgroundColor: ' #17a2b8',
            color: 'whitesmoke'
        }
    }
}));

export default function NavBar(props) {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const [open, setOpen] = React.useState(false);
    const {t} = useTranslation();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleProfileMenuOpen = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    return (
        <div className={classes.grow}>
            <AppBar position="static" className={classes.appBar}>
                <Toolbar>
                    <IconButton edge="start"
                                className={classes.menuButton}
                                color="inherit"
                                aria-label="open drawer">
                        <MenuIcon/>
                    </IconButton>
                    <Typography className={classes.title}  variant="h6" noWrap>
                        BrainTagger
                    </Typography>
                    <div style={{width: '35%'}}/>
                    <VersionLanguageSwitcher version={props.version}/>
                    <div className={classes.sectionDesktop}>
                        <Button variant="contained"
                                color="default"
                                className={classes.button}
                                startIcon={<ExitToAppIcon/>}
                                onClick={handleClickOpen}>
                            {t('end-sess.end-box')}
                        </Button>
                        <Dialog open={open}
                                onClose={handleClose}
                                aria-labelledby="alert-dialog-title"
                                aria-describedby="alert-dialog-description"
                                PaperProps={{
                                    style: {
                                        padding: '1rem 1.5rem',
                                        border: '0 solid rgba(0, 0, 0, 0)',
                                        borderRadius: '30px',
                                        fontWeight: 'bold',
                                    },
                                }}>
                            <DialogTitle id="alert-dialog-title"
                                         style={{fontSize: '34px', marginBottom: '10px', textAlign: 'center'}}>
                                {t('end-sess.end-alert-title')}
                            </DialogTitle>
                            <DialogContent style={{fontSize: '18px', textAlign: 'center'}}>
                                <DialogContentText id="alert-dialog-description">
                                    {t('end-sess.end-alert')}
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions style={{justifyContent: 'center'}}>
                                <Link to={props.exitLink?props.exitLink:'/'} push style={{ textDecoration: 'none' }}>
                                    <Button className={classes.button2}>
                                        {t('end-sess.end-conf')}
                                    </Button>
                                </Link>
                                <Button onClick={handleClose} autoFocus className={classes.button2}>
                                    {t('end-sess.end-canc')}
                                </Button>
                            </DialogActions>
                        </Dialog>
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    );
}
