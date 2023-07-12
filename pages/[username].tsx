


import Image from 'next/image';
import { useState, useEffect, ChangeEvent } from 'react';
import axios from 'axios';
import styles from '../styles/username.module.css';
import Link from 'next/link';
import { GetServerSidePropsContext } from 'next';

interface UserData {
  avatar_url: string;
  name: string;
  html_url: string;
  public_repos: number;
}

interface Repo {
  id: string;
  name: string;
  html_url: string;
  forks_count: number;
  stargazers_count: number;
  updated_at: string;
}

interface Props {
  userData: UserData;
  repos: Repo[];
}

const Username = ({ userData, repos }: Props) => {
  const [filteredRepos, setFilteredRepos] = useState<Repo[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('forks');
  const [visibleRepos, setVisibleRepos] = useState(10);

  useEffect(() => {
    const filterRepos = () => {
      if (repos && repos.length > 0) {
        const sorted = repos.sort((repo1, repo2) => {
          if (sortBy === 'forks') {
            if (repo1.forks_count > repo2.forks_count) {
              return -1;
            } else if (repo1.forks_count < repo2.forks_count) {
              return 1;
            } else {
              return 0;
            }
          } else if (sortBy === 'stars') {
            if (repo1.stargazers_count > repo2.stargazers_count) {
              return -1;
            } else if (repo1.stargazers_count < repo2.stargazers_count) {
              return 1;
            } else {
              return 0;
            }
          } else if (sortBy === 'updated') {
            return (
              new Date(repo2.updated_at).getTime() - new Date(repo1.updated_at).getTime()
            );
          } else {
            if (repo1.forks_count > repo2.forks_count) {
              return -1;
            } else if (repo1.forks_count < repo2.forks_count) {
              return 1;
            } else {
              return 0;
            }
          }
        });

        const filtered = sorted.filter((repo) =>
          repo.name.toLowerCase().startsWith(searchTerm.toLowerCase())
        );
        setFilteredRepos(filtered);
      } else {
        setFilteredRepos([]);
      }
    };
    
    filterRepos();
  }, [repos, searchTerm, sortBy]);

  const handleSortChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSortBy(event.target.value);
  };

  const handleLoadMore = () => {
    setVisibleRepos((prevVisibleRepos) => prevVisibleRepos + 10);
  };

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <div style={{
       marginRight: '-40px',
      }}>
        <div className={styles.descriptionContainer}>
          <div className={styles.avatarContainer}>
            <Image width={50} height={50} className={styles.avatar} src={userData.avatar_url} alt="Profile" />
            <h2>{userData.name}</h2>
          </div>
          <div className={styles.repoDescription}>
            <p>{userData.html_url}</p>
            <p>Public Repos: {userData.public_repos}</p>
          </div>
        </div>

        <div className={styles.searchBoxContainer}>
          <input
            type="text"
            placeholder="Search repos"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.searchInput}
          />
          <div className={styles.selectContainer}>
            <span>Sort By:</span>
            <select value={sortBy} onChange={handleSortChange}>
              <option value="forks">Forks</option>
              <option value="stars">Stars</option>
              <option value="updated">Updated</option>
            </select>
          </div>
        </div>

        <ul className={styles.repoList}>
          {filteredRepos.slice(0, visibleRepos).map((repo) => (
            <li key={repo.id}>
              <a href={repo.html_url}>{repo.name.slice(0, 20)}</a>
            </li>
          ))}
        </ul>

        {filteredRepos.length > visibleRepos && (
          <button className={styles.loadMoreButton} onClick={handleLoadMore}>
            Load More
          </button>
        )}
      </div>
      <Link href="/" passHref>
        <button className={styles.backButton}>Back to Home</button>
      </Link>
    </div>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { username } = context.query;

  try {
    const userResponse = await axios.get(`https://api.github.com/users/${username}`);
    const reposResponse = await axios.get(`https://api.github.com/users/${username}/repos?sort=updated`);

    const userData = userResponse.data;
    const repos = reposResponse.data;

    return {
      props: {
        userData,
        repos,
      },
    };
  } catch (error) {
    console.error(error);

    return {
      props: {},
    };
  }
}

export default Username;
