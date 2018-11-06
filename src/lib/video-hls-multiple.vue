<template>
    <!--
        @param viewPoster 非必填 视频暂停时显示的图片地址
        @param videoType 必填 视频播放格式 hls/mp4
    -->
    <div class="video-play-view">
        <!--多窗口展示部分-->
        <div class="video-play-item-box" v-if="videoPlayArr.length > 0">
            <!-- 1*1 1*2 1*4 -->
            <div class="video-play-1-2-4" v-if="selVideoNum === 1 || selVideoNum === 2 || selVideoNum === 3">
                <div class="video-play-1-2-4-item" :class="selVideoIndex === 0 ? 'active' : ''"
                     @click="selVideoIndex = 0">
                    <video-player
                            class="vjs-custom-skin"
                            v-if="videoPlayArr[0].sources[0].src !== ''"
                            ref="videoPlayer"
                            :options="videoPlayArr[0]">
                    </video-player>
                </div>
                <div class="video-play-1-2-4-item" :class="selVideoIndex === 1 ? 'active' : ''"
                     @click="selVideoIndex = 1" v-if="selVideoNum >= 2">
                    <video-player
                            class="vjs-custom-skin"
                            ref="videoPlayer"
                            v-if="videoPlayArr[1].sources[0].src !== ''"
                            :options="videoPlayArr[1]">
                    </video-player>
                </div>
                <div class="video-play-1-2-4-item" :class="selVideoIndex === 2 ? 'active' : ''"
                     @click="selVideoIndex = 2" v-if="selVideoNum === 3">
                    <video-player
                            class="vjs-custom-skin"
                            ref="videoPlayer"
                            v-if="videoPlayArr[2].sources[0].src !== ''"
                            :options="videoPlayArr[2]">
                    </video-player>
                </div>
            </div>
            <!-- 2*2 -->
            <div class="video-play-4" v-if="selVideoNum === 4">
                <div :class="selVideoIndex === 0 ? 'active' : ''" @click="selVideoIndex = 0"
                     class="video-play-4-item ">
                    <video-player
                            class="vjs-custom-skin"
                            ref="videoPlayer"
                            v-if="videoPlayArr[0].sources[0].src !== ''"
                            :options="videoPlayArr[0]">
                    </video-player>
                </div>
                <div :class="selVideoIndex === 1 ? 'active' : ''" @click="selVideoIndex = 1"
                     class="video-play-4-item ">
                    <video-player
                            class="vjs-custom-skin"
                            ref="videoPlayer"
                            v-if="videoPlayArr[1].sources[0].src !== ''"
                            :options="videoPlayArr[1]">
                    </video-player>
                </div>
                <div :class="selVideoIndex === 2 ? 'active' : ''" @click="selVideoIndex = 2"
                     class="video-play-4-item ">
                    <video-player
                            class="vjs-custom-skin"
                            ref="videoPlayer"
                            v-if="videoPlayArr[2].sources[0].src !== ''"
                            :options="videoPlayArr[2]">
                    </video-player>
                </div>
                <div :class="selVideoIndex === 3 ? 'active' : ''" @click="selVideoIndex = 3"
                     class="video-play-4-item ">
                    <video-player
                            class="vjs-custom-skin"
                            ref="videoPlayer"
                            v-if="videoPlayArr[3].sources[0].src !== ''"
                            :options="videoPlayArr[3]">
                    </video-player>
                </div>
            </div>
        </div>
        <!--控制-->
        <div class="video-control-box">
            <Select v-model="selVideoNum" @on-change="selVideoNumChange" class="fl-r mt-10 mr-20" style="width:100px; float: right; margin-top: 10px; margin-right: 20px;">
                <Option :value="1">1*1</Option>
                <Option :value="2">2*2</Option>
                <Option :value="3">3*3</Option>
                <Option :value="4">4*4</Option>
            </Select>
        </div>
    </div>

</template>

<script>
    import cloneDeep from 'lodash/cloneDeep'
    let videoPlayObj = {
        overNative: true,
        autoplay: false,
        controls: true,
        techOrder: ['html5'],
        // aspectRatio: '4:3',
        sourceOrder: true,
        html5: {
            hls: {withCredentials: false}
        },
        sources: [
            {
                withCredentials: false,
                type: 'application/x-mpegURL',
                id: '',
                src: ''
            }
        ],
        poster: '', // 暂停图片
        controlBar: {
            timeDivider: false, // 时间分割线
            durationDisplay: false, // 总时间
            progressControl: true, // 进度条
            customControlSpacer: true, // 未知
            fullscreenToggle: true // 全屏
        }
    }
    export default {
        name: 'videoPlayView',
        data() {
            return {
                selVideoNum: 1, // 选择窗口数量
                selVideoIndex: 0, // 选择当前框
                videoPlayArr: []
            }
        },
        methods: {
            // 视频播放窗口个数变化
            selVideoNumChange () {

            },
            // 外部调用 改变播放地址
            setViedoSrc (url) {
                // console.log(url)
                this.videoPlayArr[this.selVideoIndex].sources[0].src = url
                this.videoPlayArr[this.selVideoIndex].autoplay = true
                if ((this.selVideoNum - 1) > this.selVideoIndex) {
                    this.selVideoIndex += 1
                }
            }
        },
        created () {
            videoPlayObj.poster = this.viewPoster
            if (this.videoType === 'hls') {
                videoPlayObj.sources[0].type = 'application/x-mpegURL'
            } else if (this.videoType === 'mp4') {
                videoPlayObj.sources[0].type = 'video/mp4'
            } else {}
            for (let i = 0; i < 4; i++) {
                this.videoPlayArr.push(cloneDeep(videoPlayObj))
            }
        },
        props: {
            // 暂停时的图片显示
            viewPoster: {
                required: false,
                default: function () {
                    return ''
                }
            },
            // videoType 播放类型，hls. mp4
            videoType: {
                required: true,
                type: String
            }
        }
    }
</script>

<style scoped lang="less">
    .box {
        min-height: 500px;
        min-width: 1000px;
    }
    .video-play-view {
        width: 100%;
        min-width: 1000px;
        height: 100%;
        display: flex;
        flex-direction: column;
        border: 1px solid #999999;
        .video-play-item-box {
            flex: 1 1 100%;
            width: 100%;
            background-color: #333333;
        }
        .video-control-box {
            flex: 0 0 50px;
            width: 100%;
            background: linear-gradient(to bottom, white, #cccccc);
            line-height: 50px;
        }
        /* 1*1 1*2 2*2 */
        .video-play-1-2-4 {
            display: flex;
            height: 100%;
            .video-play-1-2-4-item {
                flex: 1 1 100%;
                border: 1px solid #cccccc;
                &.active {
                    border: 2px solid #fff556;
                }
            }
        }
        .video-play-4 {
            width: 100%;
            height: 100%;
            .video-play-4-item {
                height: 50%;
                width: 50%;
                border: 1px solid #cccccc;
                float: left;
                &.active {
                    border: 2px solid #fff556;
                }
            }
        }
    }
</style>
<style lang="less">
    .video-play-view {
        .video-play-4-item {
            height: 100%;
            .video-player {
                height: 100%;
            }
        }
        .video-play-1-2-4 {
            height: 100%;
            .video-player {
                height: 100%;
            }
        }
        .vjs-custom-skin > .video-js {
            height: 100%;
        }
    }
</style>
