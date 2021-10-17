import React, { Component } from "react";

class TaskForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      name: "",
      status: false,
    };
  }
  onCloseFrom = () => {
    this.props.onCloseForm();
  };
  onChange = (event) => {
    var target = event.target;
    var name = target.name;
    var value = target.value;
    if (name === "status" ) {
      value = target.value === 'true' ? true : false; 
    }
    if (value.length > 0 || name === "status") {
      this.setState({
        [name]: value,
      });
    }
  };
  onSubmit = (event) => {
    event.preventDefault();
    this.props.onSubmit(this.state);
    //Cancel & close form
    this.onClear();
    if(this.state.name) {
      this.onCloseFrom();
    }
  };
  onClear = () => {
    this.setState({
      name: "",
      status: false,
    });
  };
  componentWillMount () {
    if(this.props.task !== null){
      this.setState({
        id: this.props.task.id,
        name: this.props.task.name,
        status: this.props.task.status
      })
    }
  };
  componentWillReceiveProps (prevProps) {
    if(prevProps && prevProps.task){
      this.setState({
        id: prevProps.task.id,
        name: prevProps.task.name,
        status: prevProps.task.status
      })
    } 
    //sửa thành thêm
    else if (prevProps && prevProps.task === null) {
      this.setState({
        id: '',
        name: '',
        status: false
      })
    }
  }
  render() {
    var {id} = this.state;
    return (
      <div className="panel panel-warning">
        <div className="panel-heading">
          <h3 className="panel-title">
            {id !== '' ? 'Cập nhật công việc' : 'Thêm công việc' }
            <span
              className="fa fa-times-circle text-right"
              onClick={this.onCloseFrom}
            ></span>
          </h3>
        </div>
        <div className="panel-body">
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <label>Tên :</label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={this.state.name}
                onChange={this.onChange}
                // required
              />
            </div>
            <div className="form-group">
              <label>Trạng thái :</label>
              <select
                name="status"
                className="form-control"
                value={this.state.status}
                onChange={this.onChange}
              >
                <option value={true}>Kích hoạt</option>
                <option value={false}>Ẩn</option>
              </select>
            </div>

            <div className="text-center">
              <button type="submit" className="btn btn-warning">
                <span className="fa fa-plus mr-5"></span>Lưu lại
              </button>
              &nbsp;
              <button
                type="button"
                className="btn btn-danger"
                onClick={this.onClear}
              >
                <span className="fa fa-close mr-5"></span>Hủy bỏ
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default TaskForm;
