const reactTarget = document.getElementById('root');
ReactDOM.render(
    <Event
        title={reactTarget.dataset.title}
        api_version={reactTarget.dataset.apiVersion}
    />,
    reactTarget
);
