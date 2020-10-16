import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

class AuthenticatedRoute extends Component {
  state = {
    loading: true,
    isAuthenticated: null,
  };

  componentDidMount(){
    const { isLoggedIn } = this.props;

    // if user is already logged in then don't need to 
    if(isLoggedIn){
      this.setState({
        loading: false,
        isAuthenticated: isLoggedIn,
      });
    }
  }

  componentDidUpdate(prevProps) {
    const { isLoggedIn, isLoggedInLoader } = this.props;

    if (prevProps["isLoggedIn"] !== isLoggedIn) {
      this.setState({
        loading: isLoggedInLoader,
        isAuthenticated: isLoggedIn,
      });
    }
  }

  render() {
    const { component: C, props: cProps, ...rest } = this.props;
    const { loading, isAuthenticated } = this.state;

    if (loading) return <h2>Loading...</h2>;
    return (
      <Route
        {...rest}
        render={(props) =>
          isAuthenticated ? (
            <C {...props} {...cProps} />
          ) : (
              <Redirect to={`/signin`} />
            )
        }
      />
    );
  }
}

const mapStateToProps = (state) => {
  const {
    authReducer: { isLoggedIn, isLoggedInLoader },
  } = state;
  return { isLoggedIn, isLoggedInLoader };
};


export default connect(mapStateToProps)(AuthenticatedRoute);

