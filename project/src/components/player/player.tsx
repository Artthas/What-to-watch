import {useParams} from 'react-router-dom';
import {useHistory} from 'react-router-dom';
import {getFilms} from '../../store/films-data/selectors';
import {useSelector} from 'react-redux';
import {useRef, useCallback, useState, useEffect} from 'react';

type PlayerParams = {
  movieId: string;
}

function Player(): JSX.Element {
  const films = useSelector(getFilms);

  const { movieId } = useParams<PlayerParams>();
  const film = films.find((item) => item.id === parseInt(movieId, 10));
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const history = useHistory();

  const [component, setComponent] = useState(true);

  const [durationTime, setDuration] = useState<string | HTMLVideoElement | number | null>();

  if (videoRef.current !== null) {
    videoRef.current.onloadeddata = () => {
      if (videoRef.current !== null) {
        const durationInSeconds = new Date(0, 0, 0, 0, 0, videoRef.current.duration);
        const lastInTimeFormatAll = `${durationInSeconds.getHours().toString()}:${durationInSeconds.getMinutes().toString()}:${durationInSeconds.getSeconds().toString()}`;
        setDuration(lastInTimeFormatAll);
      }
    };
  }

  const getComponentByType = (type: boolean) => {
    switch (type) {
      case true:
        return <use href="#play-s"></use>;
      case false:
        return <use href="#pause"></use>;
    }
  };

  const handlePausedChange = useCallback((evt) => {
    evt.preventDefault();
    if (videoRef.current !== null && videoRef.current.paused) {
      videoRef.current.play();
      setComponent(videoRef.current.paused);
    } else if (videoRef.current !== null && !videoRef.current.paused) {
      videoRef.current.pause();
      setComponent(videoRef.current.paused);
    }
  },[]);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.ontimeupdate = () => {
        const lastInSeconds = new Date(0, 0, 0, 0, 0, video.duration - video.currentTime);

        const lastInTimeFormat = `${lastInSeconds.getHours().toString()}:${lastInSeconds.getMinutes().toString()}:${lastInSeconds.getSeconds().toString()}`;
        setDuration(lastInTimeFormat);
      };
    }
  }, [videoRef]);

  return (
    <div className="player">
      <video src={film?.video_link} className="player__video" poster={film?.preview_image} ref={videoRef}></video>

      <button
        type="button"
        className="player__exit"
        onClick={() => history.push(`/movie-page/${film?.id}`)}
      >
      Exit
      </button>

      <div className="player__controls">
        <div className="player__controls-row">
          <div className="player__time">
            <progress className="player__progress" value="30" max="100"></progress>
            <div className="player__toggler" style={{left: '30%'}}>Toggler</div>
          </div>
          <div className="player__time-value">{durationTime}</div>
        </div>

        <div className="player__controls-row">
          <button
            type="button"
            className="player__play"
            onClick={handlePausedChange}
          >
            <svg viewBox="0 0 19 19" width="19" height="19">
              {getComponentByType(component)}
            </svg>
            <span>Play</span>
          </button>
          <div className="player__name">Transpotting</div>

          <button type="button" className="player__full-screen">
            <svg viewBox="0 0 27 27" width="27" height="27">
              <use href="#full-screen"></use>
            </svg>
            <span>Full screen</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Player;
