class Event extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: props.title,
      //the params to pass to localist api
      localistParams: {
        api_key: 'secret',
        keyword: '',
        type: '',
        pp: 6, //only view 6
      },
      events: [],
    }
    this.api_version = props.api_version;
    //bind this to functions
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    axios.get('./js/settings.json')
      .then((response) => {
        console.log(response)
        this.state.localistParams.api_key = response.data[0].api_key
        this.fetchEvents();
      })
      .catch((error) => {
        console.error('fatal error can not read settings.json');
        this.setState({ message: 'App did not initialize correctly' });
      });
  }

  fetchEvents() {
    let params = encodeParams(this.state.localistParams);
    const url = `//events.cornell.edu/api/${this.api_version}/events${params}`;
    axios.get(url)
      .then((response) => {
        this.setState({ events: response.data.events, message: 'no events found' });
      })
      .catch((error) => {
        console.log(error.message);
        //if error just set event to empty array
        this.setState({ events: [], message: 'error in request' });
      });
  }

  handleChange(e) {
    this.state.localistParams[e.target.name] = e.target.value;
    this.setState({ localistParams: this.state.localistParams });
  }

  handleSubmit(e) {
    e.preventDefault();
  }

  render() {
    return (
      <div className='bootstrap container'>
        {this.renderform()}
      </div>
    )
  }

  renderform() {
    return (
      <form onSubmit={this.handleSubmit} >
        <fieldset className='form-group'>
          <legend><span className='search-legend'>{this.state.title}</span></legend>
          <div className='form-row'>
            <div className='form-group col-sm-3 col-md-3'>
              <label className="sr-only" htmlFor="keyword">Keywords: </label>
              <input className='form-control'
                onChange={this.handleChange}
                type="search" value={this.state.localistParams.keyword}
                name="keyword"
                pattern="[A-Za-z]*"
                title="Text only, hint (sustainability)"
                placeholder='keyword'
              />
            </div>
            <div className='form-group col-sm-3 col-md-3'>
              <label className="sr-only" htmlFor="type">Department id: </label>
              <input className='form-control'
                onChange={this.handleChange}
                type="search"
                value={this.state.localistParams.type}
                name="type"
                pattern="\d{4}"
                title="4 numbers department id, hint (JMA: 4819, Sustainability:9901)"
                placeholder='department id'
              />
            </div>
            <div>
              <button className='btn btn-outline-info' type='submit'><i className="fas fa-search"></i> Search</button>
            </div>
          </div>
        </fieldset>
      </form>
    )
  }
}
