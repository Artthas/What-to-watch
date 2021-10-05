import Main from '../main/main';

type AppProps = {
  title: string,
  genre: string,
  date: string,
}

function App(props: AppProps): JSX.Element {
  return <Main title={props.title} genre={props.genre} date={props.date}/>;
}

export default App;
