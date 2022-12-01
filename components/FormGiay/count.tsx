import React, { Component } from 'react'

interface CountStateInterface{ //Khac Count"s"StateInterface
  count:number,
  tags:string[]
}

class Count extends Component<{},CountStateInterface> {
  // private colors = {
  //   blue: 'blue',
  //   red: 'red',
  // }

  // private numberStyles = {
  //   backgroundColor: this.state.count === 0 ? this.colors.red : this.colors.blue,
  //   fontSize: 25,
  //   padding: 5,
  //   borderRadius: 10,
  //   fontWeight: "Bold"
  // }

  // private center = {
  //   // textAlign: 'center',
  //   margin: 'auto',
  //   width: 50,
  //   border: '3 solid green',
  //   padding: 10,
  // }

  constructor() {
    super({});
    this.state = {
      count: 0,
      tags: ['tag1', 'tag2', 'tag3']
    };
  }

  handleButton = () => {
    this.setState({ count: this.state.count + 1 })
  }


  render() {
    return (
      <div>
        <p>{this.state.count}</p>
        <button onClick={()=>{this.handleButton()}}>button</button>
      </div>
    )
  }


}

export default Count;