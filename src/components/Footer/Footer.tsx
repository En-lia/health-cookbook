import React, { FC } from 'react';
import classes from './Footer.module.scss';
import logo from '../../../src/assets/images/logoPurpleS.svg'

const Footer: FC = () => (
    <footer className={classes.footer}>
        <div>© 2023. ВСЕ ПРАВА ЗАЩИЩЕНЫ.</div>
        <img
            src={logo}
            alt="logo"
            className={classes.footerLogo}
        />
    </footer>
);

export default Footer;