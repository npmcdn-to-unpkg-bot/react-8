#React 8 *(infinity)*

Simple, lightweight, universal component for infinite scrolling.

##Installation

`npm install react-8`

##Example

```javascript
import React from 'react';
import Infinity from 'react-8';

class MyAwesomeComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 2 };
  }
  render() {
    const {count} = this.state;
    return (
      <Infinity
        onNewData={this.handleNewData.bind(this)}
        style={{ height: 100, overflowY: 'auto' }}>
        { this.generateContent(count) }
      </Inf>
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

**soon**
