// src/tests/components/App/index.tst.tsx
import * as React from 'react';
import * as enzyme from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import App from '../../../components/App';

describe('App', () => {
  describe('snapshot', () => {
    it('renders correctly', () => {
      const tree = enzyme.shallow(<App />);
      expect(shallowToJson(tree)).toMatchSnapshot();
    });
  });
});
