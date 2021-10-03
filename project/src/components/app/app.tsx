import Main from '../main/main';

function App(props: {
  title: string,
  genre: string,
  date: string,
}): JSX.Element {
  return <Main title={props.title} genre={props.genre} date={props.date}/>;
}

export default App;
