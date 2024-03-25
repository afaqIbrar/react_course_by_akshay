import React from "react";
import ReactDOM from "react-dom/client";
import testImage from "./testImage.jpeg";
import { FaRegUser } from "react-icons/fa";



const root = ReactDOM.createRoot(document.getElementById('root'));
// Using React.createElement
const elem = React.createElement("div", { class: "title" },
    [
        React.createElement('h1', {}, "H1 Tag"),
        React.createElement('h2', {}, "H2 Tag"),
        React.createElement('h3', {}, "H3 Tag"),
    ]
)
root.render(elem);





const elemJsx = (
    <div className="title">
        <h1>
            H1 by jsx
        </h1>
        <h2>
            H2 by jsx
        </h2>
        <h3>
            H3 by jsx
        </h3>
    </div>
);
root.render(elemJsx);
//By making a component

const FuncTitle = () => {
    return (
        <div className="title">
            <h1>
                H1 by function
            </h1>
            <h2>
                H2 by function
            </h2>
            <h3>
                H3 by function
            </h3>
        </div>
    )
}
root.render(<FuncTitle />)



// Component Composition
const HeadingComponent2 = () => {
    return (
        <div id="container">
            <Title />
            <Title></Title>
            {Title()}
            <h3 className="heading">React Functional component</h3>
        </div>)
}

// root.render(<HeadingComponent2 />);


//Assignment 


const Header = () => {
    return (
        <div className="container">
            <div className="logo">
                <img className="image" src={testImage} alt="logo" />
            </div>
            <div>
                <input type="text" className="search" />
            </div>
            <div className="user-icon">
                <FaRegUser />
            </div>
        </div>
    )
}
root.render(<Header />)