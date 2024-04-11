function App() {
    const [data, setData] = React.useState(null);
    const [loaded,setLoaded] = React.useState(false);
    console.log('in app');
    React.useEffect(() => {
        async function getData() {
            const response = await fetch('./projects.json');
            const json = await response.json();
            setData(json);
            setLoaded(true);
        }
        getData();
    }, []);
    console.log('loaded:',loaded, 'data:',data);

    return(
        <div className="container">
            <h1 className="text-center font-italic p-1 m-1" >Projects</h1>
            { 
                loaded && data.projects.map((project, i) => 
                    <mit-project 
                        title={project.title}
                        imgSrc = {project.imgSrc}
                        desc = {project.desc}
                        gitLnk = {project.gitLnk}
                        key={i} />
                )
            };
        </div>
    );
}

