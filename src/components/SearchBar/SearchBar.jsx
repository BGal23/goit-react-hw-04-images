import PropTypes from 'prop-types';
import css from './search-bar.module.css';

const SearchBar = ({ searchItems }) => {
  return (
    <header className={css.searchbar}>
      <form className={css.form} onSubmit={searchItems}>
        <button type="submit" className={css.button}>
          <span className={css.buttonLabel}>Search</span>
        </button>

        <input
          className={css.input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};

export default SearchBar;

SearchBar.propTypes = {
  searchItems: PropTypes.func,
};
