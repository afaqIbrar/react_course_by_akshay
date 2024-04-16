import React from 'react';

class UserClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: {
        name: 'Dummy',
        location: 'default',
        avatar_url: ''
      }
    };
    console.log(' Child Constructor');
  }

  async componentDidMount() {
    // console.log(this.props.name + ' Child Component Did Mount');
    // Api calls
    const data = await fetch('https://api.github.com/users/afaqibrar');
    const json = await data.json();
    this.setState({
      userInfo: json
    });

    // You have to clear this interval in component will unmount
    // this.timer = setInterval(() => {
    //   console.log('React App');
    // }, 1000);

    console.log('json', json);
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.state.userInfo.name != prevState.userInfo.name) {
      // if you want to do something on name change in userinfo
    }
    console.log('child component did update');
  }

  componentWillUnmount() {
    // clearInterval(this.timer);
    console.log('component will unmount called');
  }
  render() {
    console.log(' Child Render');
    // destructure props
    const { name, location, avatar_url } = this.state.userInfo;
    return (
      <div className="user-card">
        <img src={avatar_url} alt="profile" />
        <h2>Name: {name}</h2>
        <h3>Location: {location}</h3>
      </div>
    );
  }
}

export default UserClass;

/**
 *
 * Constructor is called (dummy data)
 * render is called (Dummy date)
 * <HTML With dummy data />
 * componentDidMount
 *      <API Call>
 *      this.setState -> state variable updates
 *      this complete the mounting state
 *
 *      When the setState call update  cycle run
 *      render() called with new data
 *      <HTML loaded with new api data
 *      Then it calls the componentDidUpdate
 */
