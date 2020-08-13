import {configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {createSerializer} from 'enzyme-to-json';
import fetchMock from 'jest-fetch-mock';
import {setupTestFetchInterceptor} from '@user-center/utils';

global.fetch = fetchMock;
global.fetchMock = fetchMock;
global.API_PREFIX = '';
global.MOCK_API_PREFIX = '';

setupTestFetchInterceptor();

// global.fetch = fetch
configure({adapter: new Adapter()});
expect.addSnapshotSerializer(createSerializer({mode: 'deep'}));
