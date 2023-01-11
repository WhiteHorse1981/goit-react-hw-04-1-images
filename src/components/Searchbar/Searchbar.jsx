import propTypes from 'prop-types';
import css from './Searchbar.module.css';
import { useState } from 'react';

export const Searchbar = ({ onSubmit }) => {
  const [inputQuery, setInputQuery] = useState('');

  const onChange = e => {
    const inputValue = e.target.value;
    setInputQuery(inputValue);
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (inputQuery === '') {
      return;
    }
    onSubmit(inputQuery);
    setInputQuery(inputQuery);
  };
  return (
    <header className={css.Searchbar}>
      <form className={css.SearchForm} onSubmit={handleSubmit}>
        <button type="submit" className={css.SearchForm_button}>
          <span className={css.SearchForm_button_label}>Search</span>
        </button>

        <input
          className={css.SearchForm_input}
          type="text"
          autoComplete="off"
          autoFocus
          value={inputQuery}
          placeholder="Search images and photos"
          onChange={onChange}
        />
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  onSubmit: propTypes.func.isRequired,
};
