import PropTypes from 'prop-types';
import css from './button.module.css';

const Button = ({ loadMore }) => {
  return (
    <div className={css.container}>
      <button onClick={loadMore} type="button" className={css.button}>
        Load more
      </button>
    </div>
  );
};

export default Button;

Button.propTypes = {
  random: PropTypes.string,
};
