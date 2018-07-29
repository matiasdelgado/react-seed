import React from 'react';
import PropTypes from 'prop-types';
import Button from '../button';
import Counter from '../counter';
import classes from 'utils/classes';
import { inject, observer } from "mobx-react";
import links from '../../routes/links';
import Clickable from '../clickable';
import styles from './app.scss';

@inject('app')
@observer
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

	renderApiTest(sample, error) {
		const response = JSON.stringify(sample.length ? sample : error);

		return (
			<Clickable
				content={
					<div className={styles.apiResponse}>
						<span>~{links.api.sample} response:</span>
						<div>{response}</div>
					</div>
				}
			/>
		);
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
