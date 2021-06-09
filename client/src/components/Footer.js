

const Footer = props => {

    return (
        <div style={{backgroundColor:"var(--Primary)", textAlign:'center'}}>
            <p style={{color:'white', fontSize:"18px", paddingTop:"5px", marginBottom:"9px"}}>Camille Cooper</p>
            <div>
                <a className="footLinks fa fa-youtube" href="#"></a>
                <a className="footLinks fab fa-tumblr" href="#"></a>
                <a className="footLinks fab fa-pinterest" href="#"></a>
                <a className="footLinks fab fa-tiktok" href="#"></a>
                <a className="footLinks fa fa-instagram" href="#"></a>
            </div>
        </div>
    )
}

export default Footer;