# react_hello_world_events

Introduction to react

[React](https://reactjs.org/), [React Dev Tools Extension for Chrome](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en), [react_hello_world_events](https://github.com/philwilliammee/react_hello_world_events)

Requirements - a local server (no DB or PHP needed)

## How to use this guide

The guide is broken into 5 sections:

1. React Hello World
2. Set up folders and files.
    * Create events component
3. Initializing component with data
    * Introduction to state
    * React browser extension
4. Simple form
    * JS binding functions to this
    * Event handlers and set state
    * Axios Fetching events
    * Adding style
5. Render events view
    * Events (wrapper)
    * Event list

You can work along with the document. If you get stuck each section has an git commit id# and an associated tag. You can reset by checking out the commit or by checking out the tags.

Tags: `git checkout tags/[tag]`

* v0.01 init commit
* v0.1 - React Hello World
* V0.2 - Set up folders and files.
* V0.3 - Initializing component with data
* V0.4 - Simple form and axios
* V0.5 - render events view
* V1.0 - final

Commits `git checkout [commit#]`

* commit a72b7914c2c926c44fb168ec57f64d534f34c4e1 (HEAD -> master, tag: v0.1, origin/master, origin/HEAD) 1. React Hello World
* commit b5ca29e8410c4e942a7cf076816f7dd92ab1d7ce (HEAD -> master, tag: v0.2, origin/master, origin/HEAD) 2. Set up folders and files
* commit 9b8e837f88dccbab16ab950933c7df649af81861 (HEAD -> master, tag: V0.3, origin/master, origin/HEAD) 3. Initializing component with data
* commit a3add8050585d5da60c68ef08cd88edccd7c57d9 (HEAD -> master, tag: V0.4, origin/master, origin/HEAD) 4. Simple form and axios
* commit db762f9d485c4d9271cf54a1b2178d3df175fbd3 (HEAD -> master, tag: V1.0, tag: V0.5, origin/master, origin/HEAD) render events view

Lets get started:

## 1. React Hello World (v0.1)

~~~bash
$mkdir react_projects && cd react_projects
$git clone https://github.com/philwilliammee/react_hello_world_events.git
$cd react_hello_world_events
#checkout the first init
$git checkout tags/v0.01
~~~

Start your local server and point to webroot in this directory.

Get the react starter file from React. Note the react react-dom and babel requirements in index.html

~~~bash
$curl -o index.html https://raw.githubusercontent.com/reactjs/reactjs.org/master/static/html/single-file-example.html
~~~

Open up localhost in browser you should see

![hello world](https://raw.githubusercontent.com/philwilliammee/react_hello_world_events/master/resources/images/img1.png)

## 2. Set up folders and files (v0.2)

~~~bash
$mkdir js && cd js
$touch app.jsx events.jsx
$echo '[{"api_key":"KLhy2GtuSAGirYGY"}]' >> settings.json
~~~

Folder tree structure should look like

```bash
$tree /f /a
react_projects:.
|
\---react_hello_world_events
    |   index.html
    |   README.md
    |
    \---js
            app.jsx
            events.jsx
            Settings.json
```

Open `index.html` and move react dom render to `app.js` modify it to load the Event component. `app.js` should look like below.

~~~jsx
ReactDOM.render(
   <Event />,
   document.getElementById('root')
 );
~~~

Open `events.jsx` and create a Event react component `rcc` with constructor `rconst`

~~~jsx
class Event extends React.Component {
 constructor(props) {
   super(props)
   this.state = {

   }
 }

 render() {
   return (
     <div>
       <h1>Hello World</h1>
     </div>
   )
 }
}
~~~

Change `index.html` to load `events.jsx` and `app.jsx` in that order :

```html
<script type="text/babel" src='./js/events.jsx'></script>
<script type="text/babel" src='./js/app.jsx'></script>
```

Goto localhost and refresh the page, you should see:

![hello world](https://raw.githubusercontent.com/philwilliammee/react_hello_world_events/master/resources/images/img1.png)

## 3. Initializing component with data (v0.3)

An example of one way to pass data to react componets.

Modify `index.html` `div#root` to include data attributes

```html
<div id="root"
   data-title='Search Localist Events'
   data-api-version='2.2'
></div>
```

Modify `app.jsx` to pass the data to the component

```jsx
const react_target = document.getElementById('root');
ReactDOM.render(
   <Event
       title={react_target.dataset.title}
       api_version={react_target.dataset.apiVersion}
   />,
   react_target
);
```

Modify `events.jsx` `constuctor` and `render` functions to include the passed in props and render them.

```js
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
```

Goto localhost in browser refresh the page.

![Search Localist Events](https://raw.githubusercontent.com/philwilliammee/react_hello_world_events/master/resources/images/data.png)

If you have react dev tools installed. Open react dev tools, change state and see how page changes. This is important React is data driven not dom driven.

![dev tools](https://raw.githubusercontent.com/philwilliammee/react_hello_world_events/master/resources/images/dev_tools.png)

## 4. Simple Search form (v0.4)

From here out all changes will be in `events.jsx` unless otherwise noted.

Add localist parameters to `constructor` function in `this.state` (localist can accept many more for now we use these, check out localist api for more info)

```jsx
    this.state = {
      title: props.title,
      //the params to pass to localist api
      localistParams: {
        api_key: 'secret',
        keyword: '',
        type: '',
        days: 365,
        pp: 6, //only return max 6 events
      },
    }
```

In the constructor bind the event handlers we will use`constructor`

~~~jsx
//bind this to functions
this.handleSubmit = this.handleSubmit.bind(this);
this.handleChange = this.handleChange.bind(this);
~~~

In the `component` Create the event handler functions, `handleChange` and `handleSubmit`

~~~jsx
// the input onChange event handler
handleChange(e) {
   //const val = e.target.name=='type'?e.target.value.replace(/\D/g,''):e.target.value;
   this.state.localistParams[e.target.name] = e.target.value;
   this.setState({ localistParams: this.state.localistParams });
}
// the form submit handler
handleSubmit(e) {
   e.preventDefault();
}
~~~

Create the `renderform` function (view) * note the onchange and on submit functions

```html
 renderform() {
   return (
     <form onSubmit={this.handleSubmit} >
       <fieldset className='form-group'>
         <legend><span       className='search-legend'>{this.state.title}</span></legend>
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
```

Modify `render` to include the form

```jsx
 render() {
   return (
     <div className='bootstrap container'>
       {this.renderform()}
     </div>
   )
 }
```

goto localhost in browser and refresh *Notice updating inputs in form updates state data in react dev tools.

![Search Form](https://raw.githubusercontent.com/philwilliammee/react_hello_world_events/master/resources/images/simple_form.png)

## Axios and styling 

Modify `index.html` to import axios some styling and helper js functions

~~~html
<link rel="stylesheet" href='https://codepen.io/philwilliammee/pen/OdKmEW.css'/>
<!-- include axois for request -->
<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
<script src='https://codepen.io/philwilliammee/pen/OdKmEW.js'></script>
~~~

Back in `event.jsx` add events to `this.state` to hold response from localist

```jsx
// the events returned from localist
events: [],
```

In constructor create a fetch events function

```jsx
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
```

Hook into the React component did mount class. React has many function hooks that you can call check out the documentation for more info.

```jsx
   componentDidMount(){
       axios.get('./js/settings.json')
           .then((response) => {
               this.state.localistParams.api_key = response.data[0].api_key
               this.fetchEvents();
           })
           .catch((error) => {
               console.error('fatal error can not read settings.json');
               this.setState({ message: 'App did not initialize correctly' });
           });
   }
```

Open browser refresh localhost should look like below, notice events are showing in state.

![Search Form](https://raw.githubusercontent.com/philwilliammee/react_hello_world_events/master/resources/images/styled_form.png)

## 5. Render events view (v0.5)

In `handleSubmit` function call the `fetchEvents` function to get new data from localist when the form is submitted.

```jsx
this.fetchEvents();
```

Create `renderEvents` function ( wrapper view)

```jsx
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
```

Create `renderEventItem` function (list view)

```jsx
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
```

modify the `render` function to call renderEvents function, render should now look like below.

```jsx
  render() {
    return (
      <div className='bootstrap container'>
        {this.renderform()}
        {this.renderEvents()}
      </div>
    )
  }
```

Refresh browser localhost should look like:

![search form](https://raw.githubusercontent.com/philwilliammee/react_hello_world_events/master/resources/images/result.png)

## Done
