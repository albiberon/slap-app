import { Link } from "react-router-dom"
import { createUseStyles } from "react-jss"

const useStyles = createUseStyles((theme) => ({
    NavList: {
        display: "inline-block",
        verticalAlign: "top",
        float: "right",
        "& ul": {
            listStyle: "none",
            fontSize: "1.2em",
        },
        "& li": {
            display: "inline-flex",
            justifyContent: "space-evenly",
            width: "100px"
        },
        "& li a": {
            textDecoration: "none",
            color: theme.palette.header
        }
    },
}))

const Navbar = (props) => {

    // css classes from JSS hook
    const classes = useStyles(props)

    return (
        <nav className={classes.NavList}>
            <ul >
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/readme">Read me</Link>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;