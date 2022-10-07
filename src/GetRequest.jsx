import React from 'react';

class GetRequest extends React.Component {
  constructor(props) {
    super(props);
    // The short story: access of 'this' in a subclass before super() call 
    // is not allowed, because in ES6 this is being born in the base class, 
    // therefore super() is needed to initialize it.
    this.state = {
      error: null,
      isLoaded: false,
      status: "Loading…"
    };
  }

  componentDidMount() {
    fetch("https://k8e-backend.herokuapp.com/health")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            status: result.status
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  render() {
    const { error, isLoaded, status } = this.state;
    console.log("Render status = " + status);
    if (error) {
      return <h1>Error: {error.message}</h1>
    } else if (!isLoaded) {
      return <h1>{status}</h1>
    } else {
      return <h1>Status: {status}</h1>
    }
  }
}

export default GetRequest;