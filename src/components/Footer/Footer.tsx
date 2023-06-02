import React, { FC } from 'react';
import classes from './Footer.module.scss';

const Footer: FC = () => (
    <footer className={classes.footer}>
        <div>© 2023. ВСЕ ПРАВА ЗАЩИЩЕНЫ.</div>
        <img
            src="/assets/images/logoPurpleS.svg"
            alt="logo"
            className={classes.footerLogo}
        />
    </footer>
);

export default Footer;