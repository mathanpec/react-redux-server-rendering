import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {fetchTodoAction} from 'actions/actionCreators';

class TodoContainer extends Component {
  componentDidMount () {
    if (this.props.todo.fetch_state !== 'SUCCESS') {
      this.props.getTodoItems();
    }
  }

  getLoadingStatus () {
    return (
      <h2>Loading...</h2>
    );
  }

  getSuccessStatus () {
    let {todo} = this.props;
    return (
      <div>
        {
          todo.list.map((todo, index) => {
            return (
              <div key={index}>{todo.title}</div>
            );
          })
        }
      </div>
    );
  }

  getFailureStatus () {
    return (
      <div>
        <h2> Error occured</h2>
      </div>
    );
  }

  render () {
    let {todo} = this.props;
    let content;
    switch (todo.fetch_state) {
      case 'FIRED':
        content = this.getLoadingStatus();
        break;
      case 'SUCCESS':
        content = this.getSuccessStatus();
        break;
      case 'FAILURE':
        content = this.getFailureStatus();
    }
    return (
      <div>
        {content}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    todo: state.todo
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getTodoItems: () => dispatch(fetchTodoAction())
  };
};

TodoContainer.propTypes = {
  todo: PropTypes.object.isRequired,
  getTodoItems: PropTypes.func.isRequired
};
export default connect(mapStateToProps, mapDispatchToProps)(TodoContainer);
