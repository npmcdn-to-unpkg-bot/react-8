#React 8 *(infinity)*

Simple, lightweight, universal component for infinite scrolling.

##Installation

`npm install react-8`

##Example

```javascript
import React from 'react';
import InfiniteScroll from 'react-8';

class MyAwesomeComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 2 };
  }
  render() {
    const {count} = this.state;
    return (
      <InfiniteScroll
        onNewData={this.handleNewData.bind(this)}
        style={{ height: 100, overflowY: 'auto' }}>
        { this.generateContent(count) }
      </InfiniteScroll>
    );
  }
  handleNewData() { // can also be used async, see `Usage`
    if (this.state.count === 10) return false; // return false to disable loading new data

    this.setState({ count: this.state.count + 1 });
  }
  generateContent(count) {
    return Array(count).fill().map((_, i) => <p key={i}>Lorem ipsum ...</p>);
  }
}
```

##Usage

The API of the component is incredibly simple. There are just 3 properties to pass (including children).

The component will just wrap the passed children in a `<div>`, without any styles or properties, just the necessary event listeners. You need to define styles for scrolling by yourself. All component properties are passed to that `<div>`.

---

Here are the properties the component uses:

####onNewData: function *(required)*

This function will be called when new data is needed. The function simply needs to get data and append to the children. Though there are two special behaviors:

1. Function returning `false` indicates that there is no more data and the component will not try to get any more.
2. If function is defined with one parameter (eg. `onNewData = (done) => ...`), the component implies that it's a async call and will wait for it to finish before trying to get more data. The passed parameter is a function which needs to be called for the component to know that the process is over.
* If the callback is called with `false` as argument (`done(false)`), component's behavior will be disabled.

####offsetRatio: number *(default=0.5)*

The offset when the function will be called to get new data to display. The provided number is multiplied by actual component height. For example, if the component height is 300 and *offsetRatio* is `0.5` the callback will be called as soon as the scrollbar enters the last 150 pixels of the whole scroll length.
