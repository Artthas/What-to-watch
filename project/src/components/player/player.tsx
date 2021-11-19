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

  const [isPlaying, setIsPlaying] = useState(true);

  const [durationTime, setDuration] = useState<string>();

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

  const handlePausedChange = useCallback((evt) => {
    evt.preventDefault();
    if (videoRef.current !== null && videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(videoRef.current.paused);
    } else if (videoRef.current !== null && !videoRef.current.paused) {
      videoRef.current.pause();
      setIsPlaying(videoRef.current.paused);
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
      setIsPlaying(videoRef.current?.paused);
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
            <progress className="player__progress" value={progressBar} max="100"></progress>
            <div className="player__toggler" style={{left: `${progressBar}%`}}>Toggler</div>
          </div>
          <div className="player__time-value">{`-${durationTime}`}</div>
        </div>

        <div className="player__controls-row">
          <button
            type="button"
            className="player__play"
            onClick={handlePausedChange}
          >
            <svg viewBox="0 0 19 19" width="19" height="19">
              <use href={`#${isPlaying ? 'play-s' : 'pause'}`}></use>;
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
