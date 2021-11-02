import {Film} from '../../types/film';

type PreviewPlayerProps = {
  film: Film,
}

function PreviewPlayer({film}: PreviewPlayerProps): JSX.Element {
  return (
    <video width="280" height="175" autoPlay muted>
      <source src={film.preview_video_link} type='video/webm; codecs="vp8, vorbis"'></source>
    </video>
  );
}

export default PreviewPlayer;
