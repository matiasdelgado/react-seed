import store from './app.store';

jest.mock('utils/fetch', () => {
	const getJson= jest.fn()
		.mockReturnValueOnce(Promise.resolve(['sample 1', 'sample 2']))
		.mockReturnValueOnce(Promise.reject('error!'));

	return { getJson };
});

describe('AppStore', () => {
	test('fetchSamples should update samples list', async () => {
		expect(store.loading).toBeFalsy();

		await store.fetchSamples();

		expect(store.samples.length).toBe(2);
		expect(store.loading).toBeFalsy();
		expect(store.error).toBeFalsy();
	});

	test('should set the error if request fails', async () => {
		await store.fetchSamples();
		expect(store.error).toBeTruthy();
	});
});
