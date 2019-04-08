import React, { Component } from 'react';
import './App.css';
import Airtable from 'airtable';
const base = new Airtable({apiKey: process.env.REACT_APP_AIRTABLE_API_KEY}).base(process.env.REACT_APP_AIRTABLE_BASE);

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      twitter: "",
      linkedin: "",
      topics: [],
      times: [],
      city: "",
      submitted: 'not submitted',
      error: false
    }
  }

  createSignUp = (first_name, last_name, twitter, linkedin, city, topics, times) => {
    this.setState({error: "", submitted: "submitted"})

    base('Sign Ups').create({first_name, last_name, twitter, linkedin, city, topics, times}, function(err, record) {
      if (err) { console.error(err); return; }
      console.log(record.getId());
    }); 
  }

  valueChange(state, value) {
    this.setState({[state]: value })
  }

  addPurple(e, state, value) {
    e.target.classList.add("purple")
    const x = this.state[state]
    x.push(value)
    this.setState({[state]: x})
    if (x) {document.getElementById("times_span").classList.remove('redletters')}
  }
  removePurple(e, state, value) {
    e.target.classList.remove("purple")
    var x = this.state[state], search_term = value;
    for (var i=x.length-1; i>=0; i--) {
    if (x[i] === search_term) { x.splice(i, 1); break; }}
    this.setState({[state]: x})
  }

  onChangeField(e, x) {
    this.setState({[x]: e.target.value})
    if (e.target.value) {document.getElementById(x).classList.remove('redletters')}
  }

  addTopic(e, value) {
    e.target.classList.add("purple")
    const x = this.state.topics
    x.push(value)
    this.setState({topics: x})
    if (x) {document.getElementById("topics_span").classList.remove('redletters')}
  }

  removeTopic(e, value) {
    e.target.classList.remove("purple")
    var x = this.state.topics, search_term = value;
    for (var i=x.length-1; i>=0; i--) {
    if (x[i] === search_term) { x.splice(i, 1); break; }}
    this.setState({topics: x})
  }

  toggleCity(e, id, value) {
    document.getElementById('nyc').classList.remove('purple')
    document.getElementById('sf').classList.remove('purple')
    document.getElementById(id).classList.add('purple')
    this.setState({city: value})
    if (value) {document.getElementById("city_span").classList.remove('redletters')}
  }

  question(tag, state, placeholder) {
    return(
      <div key={tag} className="question inner user-select-none">
        <span className="anim" id={state}>
          {tag}
        </span>
        <div style={{height: 10}} />
        <input
          onInput={(e, x) => this.onChangeField(e, state)}
          className="anim border5"
          placeholder={placeholder}
        />
      </div>
    )
  }
  attemptSubmit() {
    this.state.firstName
      ? document.getElementById('firstName').classList.remove('redletters')
      : document.getElementById('firstName').classList.add('redletters')
    this.state.lastName
      ? document.getElementById('lastName').classList.remove('redletters')
      : document.getElementById('lastName').classList.add('redletters')
    this.state.email
      ? document.getElementById('email').classList.remove('redletters')
      : document.getElementById('email').classList.add('redletters')
    this.state.twitter
      ? document.getElementById('twitter').classList.remove('redletters')
      : document.getElementById('twitter').classList.add('redletters')
    this.state.linkedin
      ? document.getElementById('linkedin').classList.remove('redletters')
      : document.getElementById('linkedin').classList.add('redletters')
    this.state.topics.length === 0
      ? document.getElementById('topics_span').classList.add('redletters')
      : document.getElementById('topics_span').classList.remove('redletters')
    this.state.times.length === 0
      ? document.getElementById('times_span').classList.add('redletters')
      : document.getElementById('times_span').classList.remove('redletters')
    this.state.city
      ? document.getElementById('city_span').classList.remove('redletters')
      : document.getElementById('city_span').classList.add('redletters')

    !this.state.firstName || !this.state.lastName || !this.state.email || !this.state.twitter || !this.state.linkedin || this.state.topics.length === 0 || this.state.times.length === 0 || !this.state.city
      ? this.setState({error: "Please answer every question"})
      : this.createSignUp(
        this.state.firstName,
        this.state.lastName,
        this.state.twitter,
        this.state.linkedin,
        this.state.city,
        this.state.topics,
        this.state.times
      )

  }
  render() {
    return (
      <div className="App">
        <div className="title inner user-select-none">
          <div className="one">
            BreakfastClub
          </div>
          <div className="two border5">
            LIVE
          </div>
        </div>
        <div className="explainer inner">
          <span className="one">
            Group discussions with interesting people
          </span>
          <div style={{height: 10}} />
          <span className="two">
            Welcome to Breakfast Club. What is it, you ask? Sign up via the form below and we’ll match you with a group of 4-5 peers
            for some great conversation. We’ll give you a prompt for the discussion based on everyone's interests and a meeting time that works for everyone.
            Then, we'll connect the group over email so you can find a place to meet.
          </span>
        </div>
        <div style={{height: 25}} />
        {
          [
            {"tag": "First Name", "state": "firstName", "placeholder": "Wayne"},
            {"tag": "Last Name", "state": "lastName", "placeholder": "Tables"},
            {"tag": "Email", "state": "email", "placeholder": "wtables@gmail.com"},
            {"tag": "Twitter", "state": "twitter", "placeholder": "https://twitter.com/user"},
            {"tag": "LinkedIn", "state": "linkedin", "placeholder": "https://linkedin.com/in/user"},
          ].map((question, index) =>
            this.question(question.tag, question.state, question.placeholder)
          )
        }

        <div className="multiplechoice inner user-select-none">
          <span className="anim" id="topics_span">
            Topics you’re interested in discussing (select as many as you want)
          </span>
          <div style={{height: 10}} />
          <div className="multiplechoice-choices">
            {
              ["Future of work", "Education", "Space Travel + Mars Colonization", "Transportation",
              "Board Games", "Transportation", "Urban Design + Cities", "Human Rights", "Design",
              "Energy", "Electronic Music", "Constructing new languages", "Ancient Civilizations",
              "Socialism vs. Capitalism", "Artificial intelligence", "Architecting a city from scratch",
              "Hardware & Manufacturing", "Suggest another topic"].map((choice, index) =>
                <div key={index} className="multiplechoice-choices-choice border5 anim" onClick={(e) =>
                  e.target.classList.contains("purple")
                    ? this.removeTopic(e, choice)
                    : this.addTopic(e, choice)
                }>{choice}</div>
              )
            }
          </div>
        </div>

        <div className="multiplechoice inner user-select-none">
          <span className="anim" id="times_span">
            Select the times that you’re available in the next week
          </span>
          <div style={{height: 10}} />
          {
            [
              { "tag": "Thursday, April 11", "times": ["Thursday, April 11, 5pm"]},
              { "tag": "Saturday, April 13", "times": ["Saturday, April 13, 3pm", "Saturday, April 13, 4pm", "Saturday, April 13, 5pm"]},
              { "tag": "Sunday, April 14", "times": ["Sunday, April 14, 3pm", "Sunday, April 14, 4pm"]},
            ].map((day, index) =>
              <div key={index} className="multiplechoice-choices">
                <span className="multiplechoice-choices-tag">{day.tag}</span>
                {
                  day.times.map((choice, index) =>
                    <div key={index} className="multiplechoice-choices-choice border5 anim" onClick={(e) =>
                      e.target.classList.contains("purple")
                        ? this.removePurple(e, "times", choice)
                        : this.addPurple(e, "times", choice)
                    }>{choice}</div>
                  )
                }
              </div>
            )
          }
        </div>
        <div className="multiplechoice inner user-select-none">
          <span className="anim" id="city_span">
            What city are you in?
          </span>
          <div style={{height: 10}} />
          <div className="multiplechoice-choices">
            {
              [["sf", "San Francisco"], ["nyc", "New York"]].map((choice, index) =>
                <div id={choice[0]} key={index} className="multiplechoice-choices-choice border5 anim" onClick={(e) =>
                  e.target.classList.contains("purple")
                    ? this.toggleCity(e, choice[0], choice[1])
                    : this.toggleCity(e, choice[0], choice[1])
                }>{choice[1]}</div>
              )
            }
          </div>
        </div>
        <div className="error inner redletters">{this.state.error}</div>
        <button className="anim inner border5" onClick={this.attemptSubmit.bind(this)}>Submit</button>
      </div>
    );
  }
}

export default App;
