import VideoHlsMultiple from './video-hls-multiple'
const videoHlsMultiple={
    install: function (Vue) {
        Vue.component('vVideoHlsMultiple', VideoHlsMultiple)
    }
};
// 这里的判断很重要
if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(pagination)
}
export default videoHlsMultiple
