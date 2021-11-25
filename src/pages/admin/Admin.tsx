import React, { Component } from 'react'
import { RoutePropsModel } from '~/common/sharedModel';

interface Props extends RoutePropsModel {
}
interface State {

}

class Admin extends Component<Props, State> {
  state = {}

  componentDidMount() {
    console.log(this.props.routes);
  }

  render() {
    return (
      <div>
        Admin
      </div>
    )
  }
}

export default Admin;
