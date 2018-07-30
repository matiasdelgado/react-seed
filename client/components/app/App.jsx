import React from 'react';
import PropTypes from 'prop-types';
import Button from '../button';
import Counter from '../counter';
import classes from 'utils/classes';
import styles from './styles.scss';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.handleClick = this.handleClick.bind(this);
	}

	render() {
		const { loading, samples, error } = this.props.app;
		const text = (loading && 'loading...') || error;
		const samplesArray = samples.slice();

		return (
			<div className={classes(styles.container, styles.shadow)}>
				<Counter />
				<button className={classes(styles.button, styles.shadow)} onClick={this.handleClick}>
					Test
				</button>
				<div>
					{!!text && <Button text={text} />}
					{!text &&
						samplesArray.map(s =>
							<div key={s.id}>
								<Button text={s.description} />
							</div>
						)}
				</div>
			</div>
		);
	}

	handleClick() {
		this.props.app.fetchSamples();
	}
}

App.propTypes = {
	app: PropTypes.shape({
		error: PropTypes.string,
		fetchSamples: PropTypes.func,
		loading: PropTypes.bool,
		samples: PropTypes.object
	})
};

export default App;
