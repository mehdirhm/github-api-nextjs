import { useState } from 'react';
import axios from 'axios';
import styles from '../styles/popularmost.module.css';
import Link from 'next/link';

const PopularMost = ({ popularRepos }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredRepos = popularRepos.filter((repo) =>
    repo.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Popular Repositories</h1>
      <input
        type="text"
        placeholder="Search repositories"
        value={searchTerm}
        onChange={handleSearch}
        className={styles.searchInput}
      />
      <ul className={styles.repoList}>
        {filteredRepos.map((repo) => (
          <li key={repo.id}>
            <a href={repo.html_url} className={styles.repoLink}>
              {repo.name}
            </a>
          </li>
        ))}
      </ul>
      <Link href="/" passHref>
        <button className={styles.backButton}>Back to Home</button>
      </Link>
    </div>
  );
};

export async function getServerSideProps() {
  try {
    const response = await axios.get('https://api.github.com/search/repositories?q=stars:%3E1&sort=stars&order=desc');
    const popularRepos = response.data.items.slice(0, 10);
    return {
      props: {
        popularRepos,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      props: {
        popularRepos: [],
      },
    };
  }
}

export default PopularMost;
