
let players = {};

function createYouTubePlayer(containerId, videoId) {
    return new YT.Player(containerId, {
        height: '0',
        width: '0',
        videoId: videoId,
        playerVars: {
            autoplay: 0,
            loop: 1,
            controls: 0,
            disablekb: 1,
            modestbranding: 1,
            rel: 0,
            showinfo: 0,
            iv_load_policy: 3
        },
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
}

function onPlayerReady(event) {
    event.target.setPlaybackQuality("small");
    const videoId = event.target.getIframe().id.split('-')[1];
    const audioElement = document.getElementById(`audio-control-${videoId}`);
    if (audioElement) {
        syncAudioWithVideo(audioElement, event.target);
    } else {
        console.error(`Audio element for video ID ${videoId} not found`);
    }
}


function onPlayerStateChange(event) {
    const videoId = event.target.getIframe().id.split('-')[1];
    const audioElement = document.getElementById(`audio-control-${videoId}`);

    if (audioElement) {
        if (event.data === YT.PlayerState.PLAYING) {
            if (audioElement.paused) {
                audioElement.play();
            }
        } else if (event.data === YT.PlayerState.PAUSED) {
            if (!audioElement.paused) {
                audioElement.pause();
            }
        }
    }
}

function syncAudioWithVideo(audioElement, player) {
    audioElement.addEventListener('play', () => {
        if (player.getPlayerState() !== YT.PlayerState.PLAYING) {
            player.playVideo();
        }
    });

    audioElement.addEventListener('pause', () => {
        if (player.getPlayerState() === YT.PlayerState.PLAYING) {
            player.pauseVideo();
        }
    });

    audioElement.addEventListener('timeupdate', () => {
        if (Math.abs(audioElement.currentTime - player.getCurrentTime()) > 0.5) {
            player.seekTo(audioElement.currentTime, true);
        }
    });
}

function initializePlayer(playerContainer) {
    const videoId = playerContainer.dataset.videoId;
    const playerId = `player-${videoId}`;
    playerContainer.id = playerId;
    const player = createYouTubePlayer(playerId, videoId);
    players[videoId] = player;
}

function onYouTubeIframeAPIReady() {
    const playerContainers = document.querySelectorAll('.youtube-player');
    playerContainers.forEach(initializePlayer);
}
