import React, { Component } from "react"
import Count from "./count";


interface CountsStateInterface{
  counts: {id:number,value:number}[]
}

class Counts extends Component<{},CountsStateInterface> {
  constructor() {
    super({});

    this.state = {
      counts: [
        { id: 1, value: 0 },
        { id: 2, value: 0 },
        { id: 3, value: 0 },
        { id: 4, value: 0 },
      ]
    }
  }

  render() {
    return (
      <div>
        {this.state.counts.map((item) => {
          return(<Count />)
        })}
      </div>
    )
  }
}

export default Counts;