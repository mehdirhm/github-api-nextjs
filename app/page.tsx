"use client"
import { useState } from 'react';
import Link from 'next/link';
import styles from '../styles/page.module.css';

const HomePage = () => {
  const [username, setUsername] = useState('');

  const handleInputChange = (event) => {
    setUsername(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      window.location.href = `/${username}`;
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Welcome to the Homepage!</h1>
      <input
        className={styles.input}
        type="text"
        value={username}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder="Enter a username"
      />
      <Link href={`/${username}`} passHref>
        <button className={styles.button}>Go to User Profile</button>
      </Link>
      <Link href="/popular-most" passHref>
        <button className={styles.button}>Go to Popular Repositories</button>
      </Link>
    </div>
  );
};

export default HomePage;

