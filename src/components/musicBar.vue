<template lang="pug">
footer
  .toggleMsicBarIcon
    .downArrow(@click="toogleMusicBar")
      button.btn(v-if="displayMusicBar")
        Collapse
      button.btn(v-else)
        Expand
  .player-controls(v-if="displayMusicBar")
    .track-info.hidden.gap-3(class="sm:flex")
      .trackImg
        img.w-20(:src="track_playing.image")
      .wrapper.w-36.overflow-hidden
        .trackName(ref='animatedText') {{track_playing.name}}
        .trackArtist {{track_playing.artist}}
    .flex.flex-col.justify-center.items-center
      .player-controls-btns
        button.btn(@click="suffle_tracks")
          Random
        button.btn(@click="previousSong")
          BackArrow
        button.btn(@click="play_pause_audio")
          Pause(v-if="isPlaying")
          PlayArrow(v-else)
        button.btn(@click="nextSong")
          NextArrow
        button.btn(@click="repeat_track" ref="repeatBtn")
          RepeatOne(v-if="isRepeatOnce")
          Repeat(v-else)
      .player-controls-info
        span {{ trackProgress }}
        .progress-bar-background(@click="update_time" ref="track_bar_width")
          .progress-bar(ref="progressRec")
        span {{ trackDuration }}
    .player-controls.volume()
      button.volume-bar-icon(@click="toggle_volume")
        VolumeOff(v-if="muteVolume")
        Volume(v-else)
      .volume-bar-background(@click="change_volume")
        .volume-bar-progress
</template>

<script>
import { track_list } from "@/tracklist";
import BackArrow from "./icons/backArrow.vue";
import NextArrow from "./icons/nextArrow.vue";
import PlayArrow from "./icons/playArrow.vue";
import Pause from "./icons/pause.vue";
import Repeat from "./icons/repeat.vue";
import RepeatOne from "./icons/repeatOne.vue";
import Random from "./icons/random.vue";
import Volume from "./icons/volume.vue";
import VolumeOff from "./icons/volumeOff.vue";
import Expand from "./icons/expand.vue";
import Collapse from "./icons/collapse.vue";
const audio_elem = document.createElement("audio");
let playingTrackIndex = 0;
const audioCtx = new AudioContext();
// const track = audioCtx.createMediaElementSource(audio_elem);
export default {
  components: {
    BackArrow,
    NextArrow,
    PlayArrow,
    Pause,
    Repeat,
    Random,
    Volume,
    VolumeOff,
    Expand,
    Collapse,
    RepeatOne,
  },
  name: "MusicBar",
  data() {
    return {
      trackDuration: "03:00",
      trackProgress: "0:00",
      progressWidth: 0,
      isPlaying: false,
      isRepeatOnce: false,
      infiniteRepeat: false,
      displayMusicBar: true,
      muteVolume: false,
      isShufflTrack: false,
      track_playing: [],
    };
  },
  mounted() {
    // text animation
    // let Timer = 0;
    // const interval = setInterval(() => {
    //   if (Timer < 50) {
    //     this.$refs.animatedText.style.transform = `translate(${Timer}%)`;
    //     Timer--;
    //   } else clearInterval(interval);
    // }, 80);
    audio_elem.src = track_list[0].path;
    this.track_playing = track_list[0];
    if (audioCtx.state === "suspended") audioCtx.resume();
    //repeat audio track after it ends
    audio_elem.addEventListener("ended", () => {
      audio_elem.currentTime = 0;
      if (this.isShufflTrack) {
        const i = parseInt(Math.random() * track_list.length);
        this.track_playing = track_list[i];
        return;
      } else if (this.isRepeatOnce) {
        audio_elem.play();
        this.isRepeatOnce = false;
        this.infiniteRepeat = false;
        return;
      } else if (this.infiniteRepeat) {
        audio_elem.play();
        return;
      }
      audio_elem.pause();
      this.isPlaying = false;
    });
    //change track time
    audio_elem.addEventListener("timeupdate", () => {
      // track progress time script
      let trackProgressSec = Math.floor(audio_elem.currentTime % 60);
      const trackProgressMin = Math.floor(audio_elem.currentTime / 60);
      if (trackProgressSec < 10) trackProgressSec = `0${trackProgressSec}`;
      this.trackProgress = `${trackProgressMin}:${trackProgressSec}`;
      // track  main time script
      let trackDurationMin = Math.floor(audio_elem.duration / 60);
      const trackDurationSec = Math.floor(audio_elem.duration % 60);
      if (trackDurationMin < 10) trackDurationMin = `0${trackDurationMin}`;
      this.trackDuration = `${trackDurationMin}:${trackDurationSec}`;
      // track with progress styling script
      this.progressWidth = (audio_elem.currentTime / audio_elem.duration) * 100;
      this.$refs.progressRec.style.width = `${this.progressWidth}%`;
    });
  },
  methods: {
    async play_pause_audio() {
      if (audio_elem.paused) {
        await audio_elem.play();
        this.isPlaying = true;
      } else {
        audio_elem.pause();
        this.isPlaying = false;
      }
    },
    nextSong() {
      if (playingTrackIndex < track_list.length - 1) ++playingTrackIndex;
      else playingTrackIndex = 0;
      this.track_playing = track_list[playingTrackIndex];
      audio_elem.src = track_list[playingTrackIndex].path;
      audio_elem.currentTime = 0;
      this.play_pause_audio();
    },
    previousSong() {
      if (playingTrackIndex < track_list.length && playingTrackIndex >= 1)
        --playingTrackIndex;
      else playingTrackIndex = track_list.length - 1;
      this.track_playing = track_list[playingTrackIndex];
      audio_elem.src = track_list[playingTrackIndex].path;
      audio_elem.currentTime = 0;
      this.play_pause_audio();
    },
    update_time(e) {
      this.$refs.progressRec.style.width = `${e.offsetX}px`;
      audio_elem.currentTime =
        (e.offsetX / this.$refs.track_bar_width.clientWidth) *
        audio_elem.duration;
    },
    toogleMusicBar() {
      this.displayMusicBar = !this.displayMusicBar;
    },
    change_volume(e) {
      const setedVolume = e.offsetX / e.currentTarget.clientWidth;
      e.currentTarget.firstChild.style.width = `${e.offsetX}px`;
      audio_elem.volume = setedVolume;
      if (this.muteVolume) this.muteVolume = false;
    },
    repeat_track() {
      if (
        !(
          this.$refs.repeatBtn.classList.contains("repeatBtn") ||
          this.isRepeatOnce
        )
      ) {
        this.$refs.repeatBtn.classList.add("repeatBtn");
        this.infiniteRepeat = true;
        return;
      } else if (
        this.$refs.repeatBtn.classList.contains("repeatBtn") &&
        !this.isRepeatOnce
      ) {
        this.$refs.repeatBtn.classList.remove("repeatBtn");
        this.isRepeatOnce = true;
        this.isRepeatَAlways = false;
        return;
      }
      this.isRepeatOnce = false;
    },
    suffle_tracks(e) {
      e.currentTarget.classList.toggle("shuffleBtn");
      this.isSufflTrack = !this.isShufflTrack;
    },
    toggle_volume() {
      if (this.muteVolume) {
        //save the audio element volume
        this.muteVolume = !this.muteVolume;
        audio_elem.volume = sessionStorage.getItem("volume");
        return;
      }
      sessionStorage.setItem("volume", audio_elem.volume);
      this.muteVolume = !this.muteVolume;
      audio_elem.volume = 0;
    },
  },
};
</script>

<style scoped>
.toggleMsicBarIcon {
  @apply bg-gray-300 w-full;
}
.downArrow {
  @apply cursor-pointer;
}
.player-controls {
  @apply flex justify-between items-center mx-3;
}
.player-controls-btns {
  @apply px-4 w-56 flex justify-around;
}
.btn {
  @apply relative;
}
.btn:hover {
  @apply bg-slate-300;
}
.shuffleBtn::before {
  content: "";
  width: 5px;
  height: 5px;
  background: blue;
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translate(-50%);
  @apply rounded-full bg-green-500;
}
.repeatBtn::before {
  content: "";
  width: 5px;
  height: 5px;
  background: blue;
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translate(-50%);
  @apply rounded-full bg-green-500;
}
.player-controls-info {
  @apply flex space-x-3 items-center bottom-0;
}
.progress-bar-background {
  @apply w-56 h-2 bg-slate-300 rounded-sm cursor-pointer;
}
.progress-bar {
  @apply w-0 bg-slate-900 h-2 rounded-sm cursor-pointer;
}
.player-controls.volume {
  @apply w-32 flex items-center space-x-2;
}
.volume-bar-background {
  @apply w-20 h-2 bg-slate-300 cursor-pointer;
}
.volume-bar-progress {
  @apply w-full h-2 bg-slate-700 cursor-pointer;
}
.slide-enter,
.slide-leave-to,
.slide-enter-to {
  transform: scaleY(0);
  transition: transform ease-in-out 200ms;
}
</style>
