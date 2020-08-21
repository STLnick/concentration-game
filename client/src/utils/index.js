import Radium from 'radium';
import { bounceInUp, fadeIn, lightSpeedIn } from 'react-animations';

export const secondsToMinutesAndSeconds = (time) => {
  return new Date(time * 1000).toISOString().substring(14, 19)
}

export const animations = {
  fadeIn: {
    animation: 'x 3s',
    animationName: Radium.keyframes(fadeIn, 'fadeIn')
  },
  lightSpeedIn: {
    animation: 'x 2s',
    animationDelay: 'x 2s',
    animationName: Radium.keyframes(lightSpeedIn, 'lightSpeedIn')
  }
}

