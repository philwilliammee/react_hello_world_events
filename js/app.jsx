const react_target = document.getElementById('root');
ReactDOM.render(
    <Event
        title={react_target.dataset.title}
        api_version={react_target.dataset.apiVersion}
    />,
    react_target
);