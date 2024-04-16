import React from 'react';
import User from './User';
import UserClass from './UserClass';

class About extends React.Component {
  constructor(props) {
    super(props);
    // console.log('parent constructor');
  }
  componentDidMount() {
    // console.log('Parent Component Did Mount');
  }

  render() {
    // console.log('parent render');
    return (
      <div>
        <h1>About</h1>
        <User name={'Afaq Ibrar (Func Comp)'} />
        {/* <UserClass name={'First'} location={'Lahore'} /> */}
        {/* <UserClass name={'Second'} location={'US'} />
        <UserClass name={'Third'} location={'US'} /> */}
      </div>
    );
  }
}

/*
  Output With single child
  - Parent constructor
  - parent render
  - child construtor
  - child render
  - child component did mount
  - parent component did mount
 */

/*
  Output with two same child components but this is the output we figured out based on one child output but this is wrong.
  - parent cinstructor
  - parent render
    - Afaq constructor
    - Afaq render
    - Afaq component did mount
    - Ahmad constructor
    - Ahmad render
    - Ahmad component did mount
  - parent component did mount
 */
// Actual right output and reason
/*
  - parent cinstructor
  - parent render
    - Afaq constructor
    - Afaq render
    - Ahmad constructor
    - Ahmad render

    it batches the render phase of the childs and also the commit phase


    - Afaq component did mount
    - Ahmad component did mount
  - parent component did mount
*/

// const About = () => {
//   return (
//     <div>
//       <h1>About</h1>
//       {/* <User name={'Afaq Ibrar (Func Comp)'} /> */}
//       <UserClass name={'Afaq Ibrar (Class Comp)'} location={'Lahore'} />
//     </div>
//   );
// };
export default About;
