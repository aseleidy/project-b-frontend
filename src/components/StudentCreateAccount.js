import React from 'react';
import { connect } from 'react-redux'
import {
  Button,
  Form,
  Grid,
  Header,
  Message,
  Segment,
  Select, 
  Field
} from 'semantic-ui-react';

const gender_options = [
  { key: 0, text: 'Male', value: 0, name: 'gender' },
  { key: 1, text: 'Female', value: 1, name: 'gender' },
  { key: 2, text: 'Other', value: 2, name: 'gender' },
]

const age_options = [
  { key: 18, text: 18, value: 18, name: 'age' },
  { key: 19, text: 19, value: 19, name: 'age' },
  { key: 20, text: 20, value: 20, name: 'age' },
  { key: 21, text: 21, value: 21, name: 'age' },
  { key: 22, text: 22, value: 22, name: 'age' },
  { key: 23, text: 23, value: 23, name: 'age' },
  { key: 24, text: 24, value: 24, name: 'age' },
  { key: 25, text: 25, value: 25, name: 'age' },
  { key: 26, text: 26, value: 26, name: 'age' },
  { key: 27, text: 27, value: 27, name: 'age' },
  { key: 28, text: 28, value: 28, name: 'age' },
  { key: 29, text: 29, value: 29, name: 'age' },
  { key: 30, text: 30, value: 30, name: 'age' },
  { key: 31, text: 31, value: 31, name: 'age' }
]

const country_options = [
  { key: 'Alegeria', text: 'Alegeria', value: 'Alegeria' },
  { key: 'Egypt', text: 'Egypt', value: 'Egypt' },
  { key: 'Iran', text: 'Iran', value: 'Iran' },
  { key: 'Iraq', text: 'Iraq', value: 'Iraq' },
  { key: 'Jordan', text: 'Jordan', value: 'Jordan' },
  { key: 'Lebanon', text: 'Lebanon', value: 'Lebanon' },
  { key: 'Libya', text: 'Libya', value: 'Libya' },
  { key: 'Morocco', text: 'Morocco', value: 'Morocco' },
  { key: 'Palestine', text: 'Palestine', value: 'Palestine' },
  { key: 'Syria', text: 'Syria', value: 'Syria' },
  { key: 'Tunisia', text: 'Tunisia', value: 'Tunisia' },
  { key: 'Turkey', text: 'Turkey', value: 'Turkey' },
  { key: 'Yemen', text: 'Yemen', value: 'Yemen' },
]

const country_code_options = [
  { key: '+1', text: '+1', value: '+1', name:'country_code'},
  { key: '+98', text: '+98', value: '+98', name:'country_code'},
]

const button_values = [
  0, 1, 2, 3, 4, 5
]

class StudentCreateAccount extends React.Component {
  constructor(){
    super();
    this.state = {
      all_topics: [],
      username: '',
      password: '',
      first_name: '',
      last_name: '',
      email: '',
      gender: '',
      age: '',
      country_origin: '',
      country_residence: '',
      country_code: '',
      telephone: '',
      english_reading: '',
      english_writing: '',
      english_speaking: '',
      english_listening: '',
      arabic_reading: '',
      arabic_writing: '',
      arabic_speaking: '',
      arabic_listening: '',
      turkish_reading: '',
      turkish_writing: '',
      turkish_speaking: '',
      turkish_listening: '',
      category: [],
    }
  } 

  componentDidMount() {
    fetch('http://localhost:3000/topics')
      .then(response => response.json())
      .then(data => {
        this.setState({
          ...this.state,
          all_topics: data
        }) 
        console.log(this.state)
      })
  }


  handleInputChange = (event) => {
    this.setState({
      ...this.state,
      [event.target.name]: event.target.value
    }, console.log(event.target))
  }

  handleChange = (e, {name, value} ) => {
    
    this.setState({ 
      ...this.state,
      [name]: value 
    }) 
    console.log(this.state)
  }

  handleCategorySelection = (e, {value, topic_id}) => {
    this.setState({
      ...this.state,
      category: [
        ...this.state.category, 
        {topic_id}
      ] 
    })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    
    if (Object.values(this.state).includes('')) {
      alert('All fields must be completed to create a new account.')

    } else {

      const formData = {
        ...this.state, 
        all_topics: undefined
      }
      console.log(formData)
    
      const reqObj = {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      }
    
      fetch('http://localhost:3000/students', reqObj)
        .then(response => response.json())
        .then(data => {
          if (!data.error) {
            this.setState({
              all_topics: [],
              username: '',
              password: '',
              first_name: '',
              last_name: '',
              email: '',
              gender: '',
              age: '',
              country_origin: '',
              country_residence: '',
              country_code: '',
              telephone: '',
              english_reading: '',
              english_writing: '',
              english_speaking: '',
              english_listening: '',
              arabic_reading: '',
              arabic_writing: '',
              arabic_speaking: '',
              arabic_listening: '',
              turkish_reading: '',
              turkish_writing: '',
              turkish_speaking: '',
              turkish_listening: '',
              category: [],
            })

            console.log(data)
          } else {
            alert(data.error)
          }
            
        })
  


    }
    
    
      
  }

  render(){
    return (
      <div >
        
      <Form onSubmit={this.handleSubmit} >
        <h3> Basic Information</h3>
        <Form.Group widths='equal'>
          <Form.Input fluid label='Username' 
            placeholder='Username' 
            name={'username'} 
            value={this.state.username} 
            onChange={this.handleInputChange} 
          />
          <Form.Input fluid label='Password' 
            placeholder='Password' 
            type='password'
            name={'password'} 
            value={this.state.password} 
            onChange={this.handleInputChange} 
          />
        </Form.Group>
        <Form.Group widths='equal'>
          <Form.Input fluid label='First name' 
            placeholder='First name' 
            name='first_name' 
            value={this.state.first_name} 
            onChange={this.handleInputChange} 
          />
          <Form.Input fluid label='Last name' 
            placeholder='Last name' 
            name='last_name' 
            value={this.state.last_name} 
            onChange={this.handleInputChange} 
          />
          <Form.Input fluid label='Email' 
            placeholder='Email' 
            name='email' 
            value={this.state.email} 
            onChange={this.handleInputChange} 
          />
          <Form.Select
            fluid
            label='Country code'
            options={country_code_options}
            placeholder='Country code'
            name='country_code'
            value={this.state.country_code}
            onChange={this.handleChange}
            />
          <Form.Input fluid label='Telephone' 
            placeholder='Telephone' 
            name='telephone' 
            value={this.state.telephone} 
            onChange={this.handleInputChange} 
          />          
        </Form.Group>
        <Form.Group widths='equal'>
          <Form.Select
            fluid
            label='Gender'
            options={gender_options}
            placeholder='Gender'
            name='gender'
            onChange={this.handleChange}
          />
          <Form.Select
            fluid
            label='Age'
            options={age_options}
            placeholder='Age'
            name='age'
            onChange={this.handleChange}
          />
          <Form.Select
            fluid
            label='Country of Origin'
            options={country_options}
            placeholder='Country of origin'
            name='country_origin'
            onChange={this.handleChange}
          />
          <Form.Select
            fluid
            label='Country of Residence'
            options={country_options}
            placeholder='Country of residence'
            name='country_residence'
            onChange={this.handleChange}
          />
        </Form.Group>
        
        <h3>Interests</h3>
          <p>Select all that apply.</p>
            <div>
              { 
              this.state.all_topics.map((topic) => (<Form.Checkbox label={topic.category} value={topic.category} topic_id={topic.id} onChange={this.handleCategorySelection} />)) 
              } 
            </div>

        <h3> Language Proficiency</h3>
          <Grid divided='vertically'>
            <Grid.Row columns={7} align='center'>
              <Grid.Column>
                <label>Proficiency Levels</label>
              </Grid.Column>
              <Grid.Column class='signup-proficiency-table'>
                <label>No proficiency (0)</label>
              </Grid.Column>
              <Grid.Column class='signup-proficiency-table'>
                <label>Elementary proficiency (1)</label>
              </Grid.Column>
              <Grid.Column class='signup-proficiency-table'>
                <label>Limited working proficiency (2)</label>
              </Grid.Column>
              <Grid.Column class='signup-proficiency-table'>
                <label>Professional working proficiency (3)</label>
              </Grid.Column>
              <Grid.Column class='signup-proficiency-table'>
                <label>Full professional proficiency (4)</label>
              </Grid.Column>
              <Grid.Column class='signup-proficiency-table'>
                <label>Native/bilingual proficiency (5)</label>
              </Grid.Column>
            </Grid.Row>
          
            <Grid.Row>
              <Grid.Column>
                <h4>Arabic</h4>
              </Grid.Column>
            </Grid.Row>
            </Grid>
            
            <Grid divided='vertically'>
              <Grid.Row columns={7} align='center'>
                <Grid.Column>
                  <label>Reading</label> 
                </Grid.Column>
                {
                  button_values.map((button_value) => {
                    return (
                      <Grid.Column class='signup-proficiency-table'>
                        <Form.Radio
                          label=''
                          value={button_value}
                          checked={this.state.arabic_reading === button_value}
                          name='arabic_reading'
                          onClick={this.handleChange}
                        />
                      </Grid.Column>      
                    )
                  })
                }
              </Grid.Row>
            </Grid>

            <Grid divided='vertically'>
              <Grid.Row columns={7} align='center'>
                <Grid.Column>
                  <label>Writing</label> 
                </Grid.Column>
                {
                  button_values.map((value) => {
                    return (
                      <Grid.Column class='signup-proficiency-table'>
                        <Form.Radio
                          label=''
                          value={value}
                          name='arabic_writing'
                          onClick={this.handleChange}
                        />
                      </Grid.Column>      
                    )
                  })
                }
              </Grid.Row>
            </Grid>

            <Grid divided='vertically'>
              <Grid.Row columns={7} align='center'>
                <Grid.Column>
                  <label>Listening</label> 
                </Grid.Column>
                {
                  button_values.map((value) => {
                    return (
                      <Grid.Column class='signup-proficiency-table'>
                        <Form.Radio
                          label=''
                          value={value}
                          name='arabic_listening'
                          onClick={this.handleChange}
                        />
                      </Grid.Column>      
                    )
                  })
                }
              </Grid.Row>
            </Grid>

            <Grid divided='vertically'>
              <Grid.Row columns={7} align='center'>
                <Grid.Column>
                  <label>Speaking</label> 
                </Grid.Column>
                {
                    button_values.map((value) => {
                      return (
                        <Grid.Column class='signup-proficiency-table'>
                          <Form.Radio
                            label=''
                            value={value}
                            name='arabic_speaking'
                            onClick={this.handleChange}
                          />
                        </Grid.Column>      
                      )
                    })
                  }
              </Grid.Row>
            </Grid>

            <Grid divided='vertically'>
              <Grid.Row columns={7}>
              </Grid.Row>
            
              <Grid.Row columns={7}>
                <Grid.Column>
                  <h4>English</h4>
                </Grid.Column>
              </Grid.Row>
            </Grid>

            <Grid divided='vertically'>
                <Grid.Row columns={7} align='center'>
                  <Grid.Column>
                    <label>Reading</label> 
                  </Grid.Column>
                  {
                    button_values.map((value) => {
                      return (
                        <Grid.Column class='signup-proficiency-table'>
                          <Form.Radio
                            label=''
                            value={value}
                            name='english_reading'
                            onClick={this.handleChange}
                          />
                        </Grid.Column>      
                      )
                    })
                  }
                </Grid.Row>
              </Grid>

              <Grid divided='vertically'>
                <Grid.Row columns={7} align='center'>
                  <Grid.Column>
                    <label>Writing</label> 
                  </Grid.Column>
                  {
                      button_values.map((value) => {
                        return (
                          <Grid.Column class='signup-proficiency-table'>
                            <Form.Radio
                              label=''
                              value={value}
                              name='english_writing'
                              onClick={this.handleChange}
                            />
                          </Grid.Column>      
                        )
                      })
                    }
                </Grid.Row>
              </Grid>

              <Grid divided='vertically'>
                <Grid.Row columns={7} align='center'>
                  <Grid.Column>
                    <label>Listening</label> 
                  </Grid.Column>
                  {
                      button_values.map((value) => {
                        return (
                          <Grid.Column class='signup-proficiency-table'>
                            <Form.Radio
                              label=''
                              value={value}
                              name='english_listening'
                              onClick={this.handleChange}
                            />
                          </Grid.Column>      
                        )
                      })
                    }
                </Grid.Row>
              </Grid>

              <Grid divided='vertically'>
                <Grid.Row columns={7} align='center'>
                  <Grid.Column>
                    <label>Speaking</label> 
                  </Grid.Column>
                  {
                      button_values.map((value) => {
                        return (
                          <Grid.Column class='signup-proficiency-table'>
                            <Form.Radio
                              label=''
                              value={value}
                              name='english_speaking'
                              onClick={this.handleChange}
                            />
                          </Grid.Column>      
                        )
                      })
                    }
                </Grid.Row>
              </Grid>

              <Grid divided='vertically'>
                <Grid.Row columns={7}>
                </Grid.Row>
              
                <Grid.Row columns={7}>
                  <Grid.Column>
                    <h4>Turkish</h4>
                  </Grid.Column>
                </Grid.Row>
              </Grid>

              <Grid divided='vertically'>
                  <Grid.Row columns={7} align='center'>
                    <Grid.Column>
                      <label>Reading</label> 
                    </Grid.Column>
                    {
                      button_values.map((value) => {
                        return (
                          <Grid.Column class='signup-proficiency-table'>
                            <Form.Radio
                              label=''
                              value={value}
                              name='turkish_reading'
                              onClick={this.handleChange}
                            />
                          </Grid.Column>      
                        )
                      })
                    }
                  </Grid.Row>
                </Grid>

                <Grid divided='vertically'>
                  <Grid.Row columns={7} align='center'>
                    <Grid.Column>
                      <label>Writing</label> 
                    </Grid.Column>
                    {
                        button_values.map((value) => {
                          return (
                            <Grid.Column class='signup-proficiency-table'>
                              <Form.Radio
                                label=''
                                value={value}
                                name='turkish_writing'
                                onClick={this.handleChange}
                              />
                            </Grid.Column>      
                          )
                        })
                      }
                  </Grid.Row>
                </Grid>

                <Grid divided='vertically'>
                  <Grid.Row columns={7} align='center'>
                    <Grid.Column>
                      <label>Listening</label> 
                    </Grid.Column>
                    {
                        button_values.map((value) => {
                          return (
                            <Grid.Column class='signup-proficiency-table'>
                              <Form.Radio
                                label=''
                                value={value}
                                name='turkish_listening'
                                onClick={this.handleChange}
                              />
                            </Grid.Column>      
                          )
                        })
                      }
                  </Grid.Row>
                </Grid>

                <Grid divided='vertically'>
                  <Grid.Row columns={7} align='center'>
                    <Grid.Column>
                      <label>Speaking</label> 
                    </Grid.Column>
                    {
                        button_values.map((value) => {
                          return (
                            <Grid.Column class='signup-proficiency-table'>
                              <Form.Radio
                                label=''
                                value={value}
                                name='turkish_speaking'
                                onClick={this.handleChange}
                              />
                            </Grid.Column>      
                          )
                        })
                      }
                  </Grid.Row>
                </Grid>

        <Form.TextArea label='About (250 words maximum)' placeholder='Tell us more about you...' />
        <Form.Checkbox label='I agree to the Terms and Conditions' />
        
        <Form.Button type='submit' onSubmit={this.handleSubmit}>Submit</Form.Button>
      </Form>

      
      </div>
    )
  }
};

const mapDispathToProps = {
  
}

export default connect(null, mapDispathToProps)(StudentCreateAccount);
