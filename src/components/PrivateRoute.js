import React from "react";
import { Redirect, Route, withRouter } from "react-router-dom";
import { connect, useSelector } from "react-redux";
import { compose } from "redux";
import { isLoaded, isEmpty } from "react-redux-firebase";
import Loading from './Auth/Loading'
import get from "lodash/get";

const Private = ({ component: Component, ...rest }) => {
  const auth = useSelector(state => state.firebase.auth)
  const pathname = get(rest, "location.state.from.pathname");
  console.log('hi')
  return (
    <Route
      {...rest}
      render={(props) => 
        isLoaded(auth) ? (
          !isEmpty(auth) ? (
            <Component {...props} {...rest} oldPath={pathname} />
          ) : (
            <Redirect
              to={{
                pathname: pathname || "/",
                state: { from: props.location },
              }}
            />
          )
        ) : (
          <Loading />
        )
      }
    />
  );
};

// const Private = ({ component: Component, ...rest }) => {
//   const auth = useSelector(state => state.firebase.auth)
//   const pathname = get(rest, "location.state.from.pathname");
//   return (
//     <Route
//       {...rest}
//       render={(props) => {
//         console.log("isloaded", isLoaded(auth))
//         console.log("isEmpty", isEmpty(auth))
//         if (isLoaded(auth)) {
//           if (!isEmpty(auth)) {
//             return ( <Component {...props} {...rest} oldPath={pathname} /> )
//           }
//           else {
//             props.history.push(pathname || "/")
//           }
//         }
//         else {
//           return ( <Loading /> )
//         }
//       }}
//     />
//   );
// };

// class Private extends React.Component {
//   componentDidMount() {
//     if (isLoaded(this.props.auth) && isEmpty(this.props.auth)) {
//       this.props.history.push('/')
//     }
//   }

//   render() {
//     console.log("props", this.props)
//     const {component: Component, auth: auth, ...rest} = this.props;
//     const pathname = get(rest, "location.state.from.pathname");
//     return (
//       <Route
//         {...rest}
//         render={(props) => {
//           return (isLoaded(auth) ? (
//             !isEmpty(auth) ? (
//               <Component {...props} {...rest} oldPath={pathname} />
//             ) : (
//               <div>Oops, please try again </div>
//             )
//           )
//            : (
//             <Loading />
//           ))
//         }}
//       />
//     )
//   }
// }

const Public = ({ component: Component, ...rest }) => {
  const auth = useSelector(state => state.firebase.auth)
  const pathname = get(rest, "location.state.from.pathname");
  return (
    <Route
      {...rest}
      render={(props) =>
        isLoaded(auth) ? (
          isEmpty(auth) ? (
            <Component {...props} {...rest} />
          ) : (
            <Redirect
              to={{
                pathname: pathname || "/this-is-me",
                state: { from: props.location },
              }}
            />
          )
        ) : (
          null
        )
      }
    />
  );
};


// function mapStateToProps(state, props) {
//   return {
//     auth: state.firebase.auth
//   }
// }


// export const PrivateRoute = compose(withRouter, connect(mapStateToProps))(Private);
// export const PublicRoute = Public;
// export default compose(withRouter, connect(mapStateToProps))(Private);

export const PrivateRoute = Private;
export const PublicRoute = Public;
export default Private;
