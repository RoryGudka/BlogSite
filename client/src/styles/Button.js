import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles({
    root: {
        backgroundColor:"#48bf91",
        color:"white",
        '&:hover': {
            backgroundColor:"#37916e"
        }
    }
});

export {useStyles};