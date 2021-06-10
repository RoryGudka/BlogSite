import {makeStyles} from '@material-ui/core/styles';

const useButtonStyles = makeStyles({
    primaryRoot: {
        backgroundColor:"#0076be",
        color:"white",
        '&:hover': {
            backgroundColor:"#006099"
        }
    },
    secondaryRoot: {
        backgroundColor:"#48bf91",
        color:"white",
        '&:hover': {
            backgroundColor:"#37916e"
        }
    },
    secondaryIcon: {
        color:"#48bf91",
        '&:hover': {
            color:"#37916e"
        }
    },
    disabledRoot: {
    }
});

export {useButtonStyles};