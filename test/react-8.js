import React from 'react';
import ReactDOM from 'react-dom';
import {Simulate, renderIntoDocument} from 'react-addons-test-utils';
import chai, {expect, spy} from 'chai';
import spies from 'chai-spies';

chai.use(spies);

import InfiniteScroll from '../build/react-8';

describe('react-8', () => {
  it('should render div with given props', () => {
    const Component = (
      <InfiniteScroll className="testClass" style={{color: 'red'}} onNewData={() => {}} />
    );
    const rendered = renderIntoDocument(Component);
    const node = ReactDOM.findDOMNode(rendered);

    expect(node.tagName).to.equal('DIV');
    expect(node.className).to.equal('testClass');
    expect(node.style.color).to.equal('red');
  });

  describe('with default props (offsetRatio = .5)', () => {
    it('should call callback on scroll into the default set zone', () => {
      const callback = spy();
      const Component = (
        <InfiniteScroll onNewData={callback} />
      );
      const rendered = renderIntoDocument(Component);
      const node = ReactDOM.findDOMNode(rendered);

      Simulate.scroll(node, {
        target: {
          scrollTop: 70,
          scrollHeight: 200,
          offsetHeight: 100
        }
      });

      Simulate.scroll(node, {
        target: {
          scrollTop: 10,
          scrollHeight: 200,
          offsetHeight: 100
        }
      });

      Simulate.scroll(node, {
        target: {
          scrollTop: 50,
          scrollHeight: 200,
          offsetHeight: 100
        }
      });
      expect(callback).to.have.been.called.twice();
    });
  });

  describe('with offsetRatio = 0', () => {
    it('should call callback on scroll into the set zone', () => {
      const callback = spy();
      const Component = (
        <InfiniteScroll offsetRatio={0} onNewData={callback} />
      );
      const rendered = renderIntoDocument(Component);
      const node = ReactDOM.findDOMNode(rendered);

      Simulate.scroll(node, {
        target: {
          scrollTop: 70,
          scrollHeight: 200,
          offsetHeight: 100
        }
      });
      Simulate.scroll(node, {
        target: {
          scrollTop: 99,
          scrollHeight: 200,
          offsetHeight: 100
        }
      });
      Simulate.scroll(node, {
        target: {
          scrollTop: 100,
          scrollHeight: 200,
          offsetHeight: 100
        }
      });
      expect(callback).to.have.been.called.once();
    });
  });

  describe('with offsetRatio = 1', () => {
    it('should call callback on scroll into the set zone', () => {
      const callback = spy();
      const Component = (
        <InfiniteScroll offsetRatio={1} onNewData={callback} />
      );
      const rendered = renderIntoDocument(Component);
      const node = ReactDOM.findDOMNode(rendered);

      Simulate.scroll(node, {
        target: {
          scrollTop: 0,
          scrollHeight: 200,
          offsetHeight: 100
        }
      });
      expect(callback).to.have.been.called();
    });
  });

  describe('sync callback', () => {
    it('should disable scroll if returns false', () => {
      const callback = spy(() => false);
      const Component = (
        <InfiniteScroll onNewData={callback} />
      );
      const rendered = renderIntoDocument(Component);
      const node = ReactDOM.findDOMNode(rendered);

      Simulate.scroll(node);
      Simulate.scroll(node);
      expect(callback).to.have.been.called.once();
    });
  });

  describe('async callback', () => {
    it('should wait for the first one to end before calling the next one', (done) => {
      const callback = spy((_done) => {
        setTimeout(() => {
          _done();
          Simulate.scroll(node);
          Simulate.scroll(node);
          expect(callback).to.have.been.called.twice();
          done();
        }, 200)
      });
      const Component = (
        <InfiniteScroll onNewData={callback} />
      );
      const rendered = renderIntoDocument(Component);
      const node = ReactDOM.findDOMNode(rendered);

      Simulate.scroll(node);
      Simulate.scroll(node);
      Simulate.scroll(node);
    });

    it('should disable if called with `false` as the callback parameter', (done) => {
      const callback = spy((_done) => {
        setTimeout(() => {
          _done(false);

          Simulate.scroll(node);
          Simulate.scroll(node);
          expect(callback).to.have.been.called.once();
          done();
        }, 100);
      });
      const Component = (
        <InfiniteScroll onNewData={callback} />
      );
      const rendered = renderIntoDocument(Component);
      const node = ReactDOM.findDOMNode(rendered);

      Simulate.scroll(node);
    });
  });

});
