import React, { Component } from 'react'

class Count extends Component {
    state = {
        count: 0,
        tags: ['tag1', 'tag2','tag3']
    };

    
    chanceColorBg(){
        return this.state.count === 0 ? this.colors.red : this.colors.blue
    }
    
    colors ={
        blue: 'blue',
        red: 'red',
    }

    numberStyles = {
        backgroundColor: this.chanceColorBg(),
        fontSize: 25,
        padding: 5,
        borderRadius: 10,
        fontWeight: "Bold"
    }

    center = {
        // textAlign: 'center',
        margin: 'auto',
        width: 50,
        border: '3 solid green',
        padding: 10,
    }

    renderTags(){
        if(this.state.tags.length === 0) return <p>No tags!</p>

        return <ul>{this.state.tags.map(tag => <li key={tag}>{tag}</li>)}</ul> 
    }

    handleButton = (product) => {
        console.log(product)
        this.setState({count: this.state.count + 1 })
    }

    doHandleButton = () => {
        this.handleButton({id: 1})
    }
    
    render() {
        return (
        <div>
            <p>{this.state.count}</p>
            <button onClick={this.handleButton}>button</button>
            {/* {this.renderTags()} */}
        </div>
        )
    }


}

export default Count;