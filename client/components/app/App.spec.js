import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import { shallow } from 'enzyme';
import { observable } from 'mobx';
import App from './App';

const samples = observable([
	{ id: 1, description: 'sample #1' },
	{ id: 2, description: 'sample #2' },
	{ id: 3, description: 'sample #3' }
]);

const appState = {
	error: '',
	fetchSamples: jest.fn(),
	loading: false,
	samples
};

const PROPS = { app: appState };

describe('<App/>', () => {
	const renderer = new ShallowRenderer();

	it('render no samples, no loading and no error', () => {
		const tree = renderer.render(<App {...PROPS} />);

		expect(tree).toMatchSnapshot();
	});

	it('render samples', () => {
		const tree = renderer.render(<App {...PROPS} samples={samples} />);

		expect(tree).toMatchSnapshot();
	});

	it('render loading...', () => {
		const tree = renderer.render(<App {...PROPS} loading />);

		expect(tree).toMatchSnapshot();
	});

	it('render error', () => {
		const tree = renderer.render(<App {...PROPS} error="something went wrong!" />);

		expect(tree).toMatchSnapshot();
	});

	it('render loading before samples', () => {
		const tree = renderer.render(<App {...PROPS} samples={samples} loading />);

		expect(tree).toMatchSnapshot();
	});

	it('render error before samples', () => {
		const tree = renderer.render(<App {...PROPS} samples={samples} error="error!" />);

		expect(tree).toMatchSnapshot();
	});
});

test('click on button should call props.fetchSamples func', () => {
	const app = shallow(<App {...PROPS} />);

	app.find('button').simulate('click');

	expect(PROPS.app.fetchSamples).toBeCalled();
});
