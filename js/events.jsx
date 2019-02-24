class Event extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: props.title,
    }
    this.api_version = props.api_version;
  }

  render() {
    return (
      <div>
        <h1>{this.state.title}</h1>
        <p>
          api version: {this.api_version}
        </p>
      </div>
    )
  }
}
