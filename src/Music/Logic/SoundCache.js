import { Track } from './Track.js';

//Music
import Gaia from '../Qure - Gaia (Original Mix).wav';
import Python from '../Qure - Python (Original Mix).wav';
import Uranus from '../Qure - Uranus (Original Mix).wav';


const track1 = new Track('Qure - Gaia (OriginalMix)', Gaia);
const track2 = new Track('Qure - Python (Original Mix)', Python);
const track3 = new Track('Qure - Uranus (Original Mix)', Uranus);


const SoundCache = [track1, track2, track3];

export { SoundCache }