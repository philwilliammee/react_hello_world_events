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
    this.fetchEvents();
  }

  render() {
    return (
      <div className='bootstrap container'>
        {this.renderform()}
        {this.renderEvents()}
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


  renderEvents() {
    return (
      <div className='container'>
        <h2>Upcomming Events</h2>
        <div className="events-listing events-listing-inline inline">
          {this.state.events.length ?
            this.state.events.map((obj, id) => {
              return this.renderEventItem(obj, id)
            }) : this.state.message
          }
        </div>
      </div>
    )
  }

  renderEventItem(obj, id) {
    //console.log(obj);
    let event = obj.event;
    const [event_month, event_day, event_time] = buildEventDetails(event);

    if (!(event_month || event_day || event_time)) {
      return "error in event data";
    }
    return (
      <div key={'event-list-' + id} className="views-row">
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-2 event-img">
              <img src={event.photo_url} alt="" height='50' width='50' />
            </div>
            <div className="col-sm-2 event-month-and-day">

              <div>
                <span className="event-month">{event_month}</span>
                <span className="event-day">{event_day}</span>
              </div>
            </div>
            <div className="col-sm-8 event-title-and-location">
              <div className="event-title">
                <a href={event.localist_url} >{event.title}</a>
              </div>
              <div className="event-times">
                <i className="far fa-clock"></i>{event_time}
              </div>
              <div className="event-location">
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

}
