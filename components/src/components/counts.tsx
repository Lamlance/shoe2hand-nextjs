import React, {Component} from "react"
import Count from "./count";

class Counts extends Component {
    state = {
        counts: [
            {id: 1,value: 0},
            {id: 2,value: 0},
            {id: 3,value: 0},
            {id: 4,value: 0},
        ]
    }
    render() {
        return(
            <div>
                {this.state.counts.map(counts => <Counts key={counts.id} />)}
            </div>
        )
    }
}

export default Counts;