
import React from 'react';
import '../style/footer.css';
import { Heading, Paragraph } from '@innovaccer/design-system';
import "@innovaccer/design-system/css";

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div>
                    <Heading color="white" className="about-heading">About</Heading>
                    <Paragraph color="grey" className="text">
                        A cryptocurrency dashboard built to display currencies. Designed and built by Divyanshu, data provided by CoinGecko
                    </Paragraph>
                </div>
            </div>
            <hr className="horLine" />
        </footer>
    );
}

export default Footer;

