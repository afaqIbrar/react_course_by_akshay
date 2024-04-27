# React by akshay saini

# parcel

- Dev build
- Local Server
- HMR = Hot module replacement

# Food App

- Header
- - Logo
- - Nav Items
- Body
- -Search
- -RestaurantCard
-      -Img
-       - Name of Res, Star Rating,Cusines, deliveryTime
- Footer
- -CopyRight
- -Links
- -Address
- -Contact

Two types of Export/Import

-Default Export/Import
export default <ComponentName/variableName>;
import <ComponentName/variableName> from '\*path';

- Named Export/Import
  export const <ComponentName/variableName>;
  import {ComponentName/variableName} from '\*path';

# React Hooks

- Normal JS utility function written by Facebook developers
- Written inside react and we have to import it.
  - useState() - superPowerful State variables in react
  - useEffect()

# Redux ToolKit

- Install Libraries (@redux/toolkit and react-redux)
- Build our store
- Connect our store to our app
- Create a cart Slice
- Dispatch Action
- Selector

# Types of Testing

- Unit Testing
- Integration Testing
- End to End Testing - E2E Testing

# Setting up Teting in our app

- Intall React Testing Library
- Install Jest
- Install Babel dependencies
- Configure babel
- Configure Parcel Config file to disable default babel traspilation
- Jest Configuration - npx jest --init
- install jsdom library
- install @babel/preset-react - to make jsx work in test cases
- include @babel/preset-react inside my babel config file
- Install @testing-library/jest-dom
