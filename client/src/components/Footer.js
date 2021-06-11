import {Grid, TextField, Button, makeStyles} from '@material-ui/core';
import {Link} from 'react-router-dom';
import {useButtonStyles} from './../styles/Buttons';

const useStyles = makeStyles({
    textField: {
        border: "1px solid white",
        marginRight: "15px",
    },
    textFieldText: {
        color: "white",
    }
});

const Footer = props => {
    const classes = useStyles();
    const buttonClasses = useButtonStyles();
    return (
        <div style={{backgroundColor:"var(--Primary)", textAlign:'center'}}>
            <Grid container justify="center" direction="column">
                <Grid item>
                    <Grid container justify="space-around">
                        <p style={{color:'white', fontSize:"30px", 
                            paddingRight: "10px", paddingLeft: "10px", paddingTop:"5px", paddingBottom: "5px", 
                            marginBottom:"1px", marginTop: "40px",
                            borderStyle: "solid", borderColor: "white", borderWidth: 2}}>Camille's Corner</p>
                    </Grid>
                </Grid>
                <Grid item style={{marginTop: "10px"}}>
                    <Link to="/about" style={{color:'white', fontSize:"18px", paddingTop:"5px", 
                        marginBottom:"1px", paddingRight: "20px"}}>ABOUT ME</Link>
                    <Link to="/" style={{color:'white', fontSize:"18px", paddingTop:"5px", 
                        marginBottom:"1px", paddingRight: "20px"}}>HOME</Link>
                    <Link to="/blog" style={{color:'white', fontSize:"18px", paddingTop:"5px", 
                        marginBottom:"1px", paddingRight: "20px"}}>BLOG</Link>
                    <Link to="/forum" style={{color:'white', fontSize:"18px", paddingTop:"5px", 
                        marginBottom:"1px", paddingRight: "20px"}}>FORUM</Link>
                    <Link to="/shop" style={{color:'white', fontSize:"18px", paddingTop:"5px", 
                        marginBottom:"1px", paddingRight: "20px"}}>SHOP</Link>
                    <Link to="/user" style={{color:'white', fontSize:"18px", paddingTop:"5px", 
                        marginBottom:"1px"}}>USER PAGE</Link>
                </Grid>
                <Grid item style={{marginTop: "15px", marginBottom: "5px"}}>
                    <TextField label="Email" variant="outlined" className={classes.textField} size="small"
                        InputLabelProps={{className: classes.textFieldText}} InputProps={{className: classes.textFieldText}}/>
                    <Button variant="contained" className={buttonClasses.secondaryRoot}>Subscribe</Button>
                </Grid>
                <Grid item style={{marginTop: "15px", marginBottom: "15px"}}>
                    <Grid container justify="center" direction="row">
                        <Grid item style={{marginRight: 20}}>
                            <p style={{color:'white', fontSize:"18px", paddingTop:"5px", marginBottom:"1px"}}>Camille Cooper</p>
                            <p style={{color:'white', fontSize:"14px", paddingTop:"5px", marginBottom:"1px"}}> camille.cooper@gmail.com</p>
                        </Grid>
                        <Grid item>
                            <Grid container direction="column" justify="center">
                                <Grid item style={{color:'white', fontSize:"18px", paddingTop:"5px", marginBottom:"1px"}}>
                                    <a className="footLinks fa fa-youtube" href="#"></a>
                                    <a className="footLinks fa fa-instagram" href="#"></a>
                                </Grid>
                                <Grid item>
                                    <a className="footLinks fab fa-tumblr" href="#"></a>
                                    <a className="footLinks fab fa-pinterest" href="#"></a>
                                    <a className="footLinks fab fa-tiktok" href="#"></a>                            
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    )
}

export default Footer;