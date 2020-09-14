import React, { Component } from 'react'
import moment from 'moment'
import ApiHelper from '../../ApiHelper/ApiHelper'
import './PublishedStory.css'

class PublishedStory extends Component {
  constructor(props) {
    super(props)
    this.state = {
      authors: []
    }
  }
  
  componentDidMount() {
    const foundAuthors = [];
    ApiHelper.getData().then(authors => {
      this.setState({
        authors: [
          "Greyson Elkins", 
          "Carly Clift", 
          "Nick Hart", 
          "Aaron B.D."]
        });
        // this will be fleshed out when getData and 
        // authors in the database are fleshed out
      })
    }
    
  buildStory = (story = []) => {
    return story.map((section, i) => {
      return (
        <p key={`paragraph${i}`}>{section}</p>
      )
    })
  }

  presentAuthors(authors) {
    //this function will eventually need to account 
    //for multiples because REPEATS MUST BE maintained 
    //in state in order to coodernate between entries
    //and their respective users
    
    const authorCount = authors.length
    return authors.reduce((list, author, i) => {
      if (i + 1 === authorCount && authorCount !== 1) {
        list += ` and ${author}`
      } else if (i === 0) {
        list += author
      } else {
        list += `, ${author}`
      }
      return list
    }, 'By ')
  }

  render() {
    return (
      <article>
        <header>
          <h2>{this.props.currentStory.title}</h2>
          <h4>
            {moment(this.props.currentStory.updated_at).format('MMMM DD, YYYY')} 
            <br /> 
            Prompt: {this.props.currentStory.prompt}
          </h4>
          <h3>{this.presentAuthors(this.state.authors)}</h3>
        </header>
        <section>
          {this.buildStory(this.props.currentStory.contributions)}
        </section>
      </article>

    )
  }
}

export default PublishedStory