// @flow strict
import React from 'react';
import { withPrefix } from 'gatsby';
import styles from './Author.module.scss';
import { useTranslation, Link } from 'gatsby-plugin-react-i18next';

type Props = {
  author: {
    name: string,
    bio: string,
    photo: string
  },
  isIndex: ?boolean
};

const Author = ({ author, isIndex }: Props) => {

    const { t } = useTranslation();

    return (

        <div className={styles['author']}>
            
            <Link to="/">
                <img
                src={withPrefix(author.photo)}
                className={styles['author__photo']}
                width="75"
                height="75"
                alt={author.name}
                />
            </Link>

            { isIndex === true ? (
                <h1 className={styles['author__title']}>
                <Link className={styles['author__title-link']} to="/">{author.name}</Link>
                </h1>
            ) : (
                <h2 className={styles['author__title']}>
                <Link className={styles['author__title-link']} to="/">{author.name}</Link>
                </h2>
            )}

            <p className={styles['author__subtitle']}>{t('author.bio')}</p>
            
        </div>

    );
};

export default Author;
