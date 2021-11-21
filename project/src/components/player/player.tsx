import {useParams} from 'react-router-dom';
import {useHistory} from 'react-router-dom';
import {getFilms} from '../../store/films-data/selectors';
import {useSelector} from 'react-redux';
import {useRef, useCallback, useState, useEffect} from 'react';
import LoadingScreen from '../loading-screen/loading-screen';

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

  const [durationTime, setDuration] = useState<string>('00:00');

  const [progressBar, setProgressBar] = useState('0');

  const [isComponentDownLoaded, setIsComponentDownLoaded] = useState(Boolean);

  const convertSecondsToTime = (seconds: number, currentSeconds: number) => {
    const date = new Date(0, 0, 0, 0, 0, seconds - currentSeconds);
    const convertedHours = date.getHours();
    const convertedMinutes = date.getMinutes();
    const convertedSeconds = date.getSeconds();

    const result = convertedHours > 0 ? [convertedHours, convertedMinutes, convertedSeconds] : [convertedMinutes, convertedSeconds];
    const resultWithZeroPad = result.map((timeMember) => timeMember < 10 ? `0${timeMember}` : `${timeMember}`);
    return resultWithZeroPad.join(':');
  };

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.onloadeddata = () => {
        const duration = convertSecondsToTime(video.duration, 0);
        setDuration(duration);
        setIsComponentDownLoaded(false);
      };
      video.ontimeupdate = () => {
        const duration = convertSecondsToTime(video.duration, video.currentTime);
        setDuration(duration);
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

  const handlePausedChange = useCallback((evt) => {
    evt.preventDefault();
    if (videoRef.current && videoRef.current.paused) {
      videoRef.current.play();
    } else if (videoRef.current && !videoRef.current.paused) {
      videoRef.current.pause();
    }
  },[]);

  const handleFullScreenClick = () => {
    videoRef.current?.requestFullscreen();
  };

  return !isComponentDownLoaded ? (
    <div className="player">
      <video
        src={film?.video_link}
        className="player__video"
        poster={film?.preview_image}
        ref={videoRef}
        onPlay={() => videoRef.current ? setIsPlaying(videoRef.current.paused) : ''}
        onPause={() => videoRef.current ? setIsPlaying(videoRef.current.paused) : ''}
      >
      </video>

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
  ) : <LoadingScreen />;
}

export default Player;
