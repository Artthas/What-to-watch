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

  const [progressBar, setProgressBar] = useState('0');

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.ontimeupdate = () => {
        if (video.duration / 3600 < 1) {
          const durationInSeconds = new Date(0, 0, 0, 0, 0, video.duration);
          if (durationInSeconds.getSeconds() < 10) {
            const lastInTimeFormatAll = `${durationInSeconds.getMinutes()}:0${durationInSeconds.getSeconds()}`;
            setDuration(lastInTimeFormatAll);
          } else {
            const lastInTimeFormatAll = `${durationInSeconds.getMinutes()}:${durationInSeconds.getSeconds()}`;
            setDuration(lastInTimeFormatAll);
          }
        } else {
          const durationInSeconds = new Date(0, 0, 0, 0, 0, video.duration);
          if (durationInSeconds.getSeconds() < 10) {
            const lastInTimeFormatAll = `${durationInSeconds.getMinutes()}:0${durationInSeconds.getSeconds()}`;
            setDuration(lastInTimeFormatAll);
          } else {
            const lastInTimeFormatAll = `${durationInSeconds.getMinutes()}:${durationInSeconds.getSeconds()}`;
            setDuration(lastInTimeFormatAll);
          }
        }
      };
    }
  }, [videoRef]);

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
        if (video.duration / 3600 < 1) {
          const durationInSeconds = new Date(0, 0, 0, 0, 0, video.duration - video.currentTime);
          if (durationInSeconds.getSeconds() < 10) {
            const lastInTimeFormatAll = `${durationInSeconds.getMinutes()}:0${durationInSeconds.getSeconds()}`;
            setDuration(lastInTimeFormatAll);
          } else {
            const lastInTimeFormatAll = `${durationInSeconds.getMinutes()}:${durationInSeconds.getSeconds()}`;
            setDuration(lastInTimeFormatAll);
          }
        } else {
          const durationInSeconds = new Date(0, 0, 0, 0, 0, video.duration);
          if (durationInSeconds.getSeconds() < 10) {
            const lastInTimeFormatAll = `${durationInSeconds.getMinutes()}:0${durationInSeconds.getSeconds()}`;
            setDuration(lastInTimeFormatAll);
          } else {
            const lastInTimeFormatAll = `${durationInSeconds.getMinutes()}:${durationInSeconds.getSeconds()}`;
            setDuration(lastInTimeFormatAll);
          }
        }
        if (video.currentTime !== 0) {
          const progressValue = video.currentTime / video.duration * 100;
          setProgressBar(String(progressValue));
        }
      };
    }
    return () => {
      if (video) {
        video.ontimeupdate = null;
      }
    };
  }, [videoRef]);

  const onExitFullScreenClick = () => {
    if (videoRef.current !== null) {
      setComponent(videoRef.current?.paused);
      if (!document.fullscreen) {
        document.removeEventListener('fullscreenchange', onExitFullScreenClick);
      }
    }
  };

  const handleFullScreenClick = () => {
    videoRef.current?.requestFullscreen();
    document.addEventListener('fullscreenchange', onExitFullScreenClick);
  };

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
            <progress className="player__progress" value={`${progressBar}`} max="100"></progress>
            <div className="player__toggler" style={{left: `${progressBar}%`}}>Toggler</div>
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

          <button
            type="button"
            className="player__full-screen"
            onClick={handleFullScreenClick}
          >
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
