import react from 'react';
import styles from './Header.module.css';
import Navbar from './Navbar';

const Header = () => {
    return (
        <header>
            <div className={styles.header}>
                <h1>Assignment 1 RSS Feed Frontend</h1>
            </div>
            <Navbar />
        </header>
    );
}
export default Header;