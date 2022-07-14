import React, { useEffect, useState } from 'react';
import {Text, View, Image, Dimensions, Alert} from 'react-native';
import styles from './styles/SoundDetailStyles';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import Modal from "react-native-modal";
import {faChevronLeft, faArrowCircleDown, faArrowUp, faArrowsAlt, faLongArrowAltUp} from '@fortawesome/free-solid-svg-icons';
import {Breathe, AlarmClock} from '../../assets/breathe';
import Touch from '../../components/Touch';
import PauseImg from '../../assets/images/icon/pause.svg';
import PlayImg from '../../assets/images/icon/play.svg';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import Video from 'react-native-video';
import Sound from 'react-native-sound';
import Model from '../../hooks/Model';
import {httpsVerify} from '../../utils';
import Slider from '@react-native-community/slider';
import CircularProgress from '../../components/CircularProgress';
import { AboutThisSoundModal } from './AboutThisSoundModal';
import {  AboutThisSoundIconDown, AboutThisSoundIconUp } from '../../components/svgs/AboutThisModalIcon';

Sound.setCategory('Playback');

const {width} = Dimensions.get('screen');
const times = [60, 120, 180];

const SoundDetail = ({navigation, route}) => {
  const currentsound = route?.params?.soundSelected;
  const timeSeconds = route?.params?.timeSeconds;

  const intervalTime = 1000;
  const [playing, setPlaying] = React.useState(false);
  const [currentTime, setCurrentTime] = React.useState(timeSeconds);
  const [timer, setTimer] = React.useState(null);
  const [showVideo, setShowVideo] = React.useState(true);
  const [soundData, setSoundData] = React.useState(null);
  const [hideContent, setHideContent] = React.useState(false);
  const [finishLoad, setFinishLoad] = React.useState([false, false]);
  const [showModal, setShowModal] = React.useState(false);
  const [timeBreathe, setTimeBreathe] = React.useState(0);
  const [showBreathe, setShowBreathe] = React.useState(false);
  const [volumen, setVolumen] = React.useState(50);
  const [isInhale, setIsInhale] = React.useState(true);
  const [inhalePlayed, setInhalePlayed] = React.useState(null);
  const [exhalePlayed, setExhalePlayed] = React.useState(null);
  const [progress, setProgress] = React.useState(0);
  const [SoundInfoToModal, setSoundInfoToModal] = useState({});
  const [isOpenInfoModal, setIsOpenInfoModal] = useState(false);

  const [timeBeforeExercise, setTimeBeforeExercise] = useState(0);




  const renderTime = () => {
    const minutes = Math.floor(currentTime / 60);
    const seconds = Math.floor(currentTime % 60);
    return `${minutes > 9 ? minutes : `0${minutes}`}:${
      seconds > 9 ? seconds : `0${seconds}`
    }`;
  };

  const onHideContent = () => {
    setHideContent(ov => !ov);
  };

  const setVolumenAll = value => {
    setVolumen(value);
    if (soundData?.setVolume) {
      soundData.setVolume((100 - value) / 100);
    }
    // if (soundVoice?.setVolume) {
    //   soundVoice.setVolume((100 - value) / 100);
    // }
  };

  const resetTime = time => {
    setTimeBreathe(time);
    setIsInhale(true);
    setProgress(0);
    setCurrentTime(time);
  };

  const renderTimes = () => {
    return times.map(time => (
      <Touch
        key={'time-item' + time}
        style={[styles.optionModal, timeBreathe === time ? styles.bgWhite : {}]}
        onPress={() => setTimeBreathe(time)}>
        <Text style={styles.labelOptionModal}>{Math.floor(time / 60)} min</Text>
      </Touch>
    ));
  };

  const renderTimesBreathe = () => {
    return times.map(time => (
      <Touch key={'time-item' + time} onPress={() => resetTime(time)}>
        <View
          style={[
            styles.itemTime,
            timeBreathe !== time ? styles.disabledTime : {},
          ]}>
          <AlarmClock width={18} height={18} />
          <Text style={styles.labelTime}>{Math.floor(time / 60)} min</Text>
        </View>
      </Touch>
    ));
  };

  const failLoad = source => {
    Alert.alert(
      'Error',
      `The ${source} fails`,
      [{text: 'Ok', onPress: () => navigation.goBack()}],
      {onDismiss: () => navigation.goBack()},
    );
  };

  /*
    ! aqui se inicia el ejercicio
    todo: aqui deberia setear el tiempo en el que se quedó el sound, antes de iniicar el ejercicio del ejercicio
  */
  const startExercise = () => {
    setShowBreathe(true);
    setPlaying(true);
    setShowModal(false);
    setCurrentTime(timeBreathe);
   
  };

  const handleOpenCloseInfoModal = () => {
    setIsOpenInfoModal(!isOpenInfoModal)
  }

  //setting data sound to render in about this song modal
  useEffect(() => {
    setSoundInfoToModal({...SoundInfoToModal, ...currentsound, progress})
    //console.log('sound info', SoundInfoToModal)
    
  }, []);

  React.useEffect(() => {
    if (showBreathe) {
      if (progress === 0) {
        setIsInhale(true);
        setProgress(10);
      } else {
        setIsInhale(progress > 50 ? false : true);
        if (progress === 10 && inhalePlayed?.pause && playing) {
          inhalePlayed.stop();
          inhalePlayed.play();
          inhalePlayed.setVolume(1);
        }
        if (progress === 60 && exhalePlayed?.pause && playing) {
          exhalePlayed.stop();
          exhalePlayed.play();
          inhalePlayed.setVolume(1);
        }
      }
    }
  }, [progress]);


  useEffect(() => {
   if (showBreathe) {
    currentTime < 1 && setShowBreathe(false)
   }
  }, [progress]);

  React.useEffect(() => {
    if (finishLoad[0] && finishLoad[1]) {
      Model.setStore('loading', false);
    }
  }, [finishLoad]);


  useEffect(() => {
    if (!showBreathe && playing) {
      setTimeBeforeExercise(currentTime)
    } else if (showBreathe && playing && currentTime == 1) {
      setTimeout(() => {
        setShowBreathe(false);
        setCurrentTime(timeBeforeExercise);
        setPlaying(false)
        setPlaying(true)


      }, 1000);
    }
  }, [progress]);
  //-----
  React.useEffect(() => {
    if (playing && currentTime > 0) {
      setTimer(setTimeout(() => {setCurrentTime(ov => ov - intervalTime / 1000 < 0 ? 0 : ov - intervalTime / 1000,);
          if (showBreathe) {
            setProgress(ov =>
              ov + intervalTime / 100 > 100 ? 0 : ov + intervalTime / 100,
            );

          }
        }, intervalTime),
      );

    } else {

      if (currentTime < 1 && !showBreathe) {
        setTimeout(() => {
          setCurrentTime(timeSeconds);
          setPlaying(true)
        }, 1000);
      }

      clearTimeout(timer);
      setPlaying(false);
    }
    
    return () => clearTimeout(timer);
  }, [currentTime, playing]);

  React.useEffect(() => {
    if (soundData && playing) {
      soundData.setNumberOfLoops(-1);
      soundData.play(success => {
        if (success) {
          // console.log('successfully finished playing');
        } else {
          // console.log('playback failed due to audio decoding errors');
        }
      });
    } else if (soundData) {
      soundData.pause();
    }
    return () => {
      if (soundData?.pause) {
        soundData.pause();
      }
    };
  }, [soundData, playing]);


  React.useEffect(() => {
    if (!currentsound || !currentsound?.sound) {
      failLoad('source');
    } else {
      Model.setStore('loading', true);
      if (!currentsound?.mobileVideo) {
        setFinishLoad(ov => [ov[0], true]);
      }
      setSoundData(
        new Sound(
          // 'https://orangefreesounds.com/wp-content/uploads/2017/04/Relaxing-forest-sounds.mp3',
          httpsVerify(currentsound?.sound),
          null,
          error => {
            if (error) {
              console.log('failed to load the sound', error);
              failLoad('sound');
              return;
            }
            setFinishLoad(ov => [true, ov[1]]);
            // loaded successfully
            // console.log('duration in seconds: ' + whoosh.getDuration() + 'number of channels: ' + whoosh.getNumberOfChannels());
          },
        ),
      );
    }
    setInhalePlayed(new Sound('inhale.mp3', Sound.MAIN_BUNDLE));
    setExhalePlayed(new Sound('exhale.mp3', Sound.MAIN_BUNDLE));
  }, []);

  return (
    <View style={styles.container}  >
     
      {showVideo && currentsound?.mobileVideo ? (
        <Video
          source={{uri: httpsVerify(currentsound?.mobileVideo)}}
          onBuffer={() => {}}
          onError={() => {
            setShowVideo(false);
            setFinishLoad(ov => [ov[0], true]);
            // failLoad('video');
          }}
          onLoad={() => {
            setShowVideo(true);
            setFinishLoad(ov => [ov[0], true]);
          }}
          style={[
            styles.backgroundVideo,
            hideContent ? styles.overlayVideo : {},
          ]}
          repeat
          muted
          resizeMode="cover"
          paused={!playing}
          poster={httpsVerify(currentsound?.background)}
          posterResizeMode="cover"
        />
      ) : (
        <Image
          style={[styles.imageBgDrop, hideContent ? styles.overlayVideo : {}]}
          source={{uri: httpsVerify(currentsound?.background)}}
        />
      )}


      <Touch
        style={[styles.btnBgdropFilter, hideContent ? styles.overlayVideo : {}]}
        onPress={onHideContent}>
        {hideContent ? null : <View style={styles.bgdropFilter} />}
      </Touch>

      <View style={styles.header}>
        <Touch style={styles.backButton} onPress={() => navigation.goBack()}>
          <FontAwesomeIcon icon={faChevronLeft} style={styles.iconBackButton} />
        </Touch>
      
        {
          currentsound?.exercise && <Touch
            style={styles.forwardBtn}
            onPress={() => {
              setShowModal(true);
              setTimeBreathe(null);
              setPlaying(false);
              setShowBreathe(false);
              setCurrentTime(timeSeconds);
              setProgress(0);
              setVolumenAll(50);
            }}>
            <Breathe width={30} height={30} />
          </Touch>
        }
      </View>

      <Text style={styles.title}>{currentsound?.name}</Text>
    
      
      {showBreathe ? (
        <View style={styles.contBreathe}>
          <CircularProgress
            isInhale={isInhale}
            start={playing}
            progress={progress}
            textComponent={() => (
              <Text style={styles.actionLabel}>
                {isInhale ? 'Inhale' : 'Exhale'}
              </Text>
            )}
            onlyWhite
          />
        </View>
      ) : (
        <View style={styles.circleWhite}>

          <View style={styles.circleContTime1}>
            <View style={styles.circleContTime2}>
              <View style={styles.circleContTime3}>
                <Text style={styles.time}>{renderTime()}</Text>
              </View>
            </View>
          </View>
          <AnimatedCircularProgress
            style={styles.containerProgress}
            size={width * 0.6 > 540 ? 540 : width * 0.6}
            width={3}
            fill={((timeSeconds - currentTime) / timeSeconds) * 100}
            tintColor="rgba(15, 16, 32, 0.4)"
            backgroundColor="white"
            rotation={0}
            duration={1000}
            skipAnimOnComplete={true}
          />
        </View>
      )}

      <Touch
        onPress={() => {
          setPlaying(ov => !ov);
          if (!showBreathe) {
            setVolumenAll(0);
          }
        }}
        style={styles.playButton}>
        {playing ? <PauseImg width={60} height={60} /> : <PlayImg width={60} />}
        
      </Touch>
    
      

      {
        isOpenInfoModal && <AboutThisSoundModal 
                            SoundInfoToModal={SoundInfoToModal} 
                            isOpenInfoModal={isOpenInfoModal} 
                            setIsOpenInfoModal={setIsOpenInfoModal}  

                            playing={playing}
                            setPlaying={setPlaying}

                            showBreathe={showBreathe}
                            setVolumenAll={setVolumenAll}
                            renderTime={renderTime}
                            />
      }

      {showBreathe ? (
        <Text style={styles.timeBreathe}>{renderTime()}</Text>
      ) : null}

      {showBreathe ? (
        <View style={styles.rowTimes}>{renderTimesBreathe()}</View>
      ) : null}

      {
        currentsound?.exercise && <Touch
          onPress={handleOpenCloseInfoModal}
          style={styles.openAboutThisSoundModal}>
          <Text style={styles.openAboutThisSoundModalText}>About this sound <AboutThisSoundIconUp /></Text>
        </Touch>
      }

      {showBreathe ? (
        <View style={styles.rowSlider}>
          <Text style={styles.labelSlider}>Sound</Text>
          <Slider
            style={styles.sliderInput}
            thumbImage={require('../../assets/images/icon/sliderThumb.png')}
            trackImage={require('../../assets/images/icon/trackSider.png')}
            value={volumen}
            onValueChange={setVolumenAll}
            minimumValue={0}
            maximumValue={100}
            minimumTrackTintColor="rgba(250, 255, 255, 0.24)"
            maximumTrackTintColor="rgba(123, 102, 255, 1)"
          />
          <Text style={styles.labelSlider}>Breathe{'\n'}Alert</Text>
        </View>
      ) : null}
      

      {showModal ? (
        <View style={styles.containerModal}>
          <Touch
            style={styles.buttonDropModal}
            onPress={() => setShowModal(false)}
          />
          <View style={styles.contentModal}>
            <Text style={styles.titleModal}>
              You're about to start a{'\n'}breathing exercise.
            </Text>
            <Text style={styles.labelModal}>Set time</Text>
            <View style={styles.rowOptionsModal}>{renderTimes()}</View>
            <Touch style={styles.submitButtonModal} onPress={startExercise}>
              <Text style={styles.labelSubmitModal}>Start the exercise</Text>
            </Touch>
          </View>
        </View>
      ) : null}
    </View>
  );
};

export default SoundDetail;
