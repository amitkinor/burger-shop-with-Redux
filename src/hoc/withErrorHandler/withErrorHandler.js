import React, { Component } from 'react';
import Modal from '../../components/UI/Modal/Modal';

const withErrorHandler = (WrappedComponent, axiosInstance) => {
  return class extends Component {
    constructor(props) {
      super(props);
      this.reqInterceptor = axiosInstance.interceptors.request.use(req => {
        this.setState({ error: null });
        return req;
      });
      this.resInterceptor = axiosInstance.interceptors.response.use(
        (res) => res,
        (error) => {
          this.setState({ error });
        },
      );
    }

    state = {
      error: null,
    }

    componentWillUnmount() {
      axiosInstance.interceptors.request.eject(this.reqInterceptor);
      axiosInstance.interceptors.response.eject(this.resInterceptor);
    }

    errorConfirmHandler = () => {
      this.setState({ error: null });
    }

    render(){
      const { error } = this.state;
      return (
        <>
          <Modal show={error} modalClosed={this.errorConfirmHandler}>
            {error ? error.message : null}
          </Modal>
          <WrappedComponent {...this.props} />
        </>
      );
    }
  };
};

export default withErrorHandler;