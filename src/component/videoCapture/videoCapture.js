import React, { createRef } from 'react';

export default class VideoCapture extends React.Component {
    constructor(props) {
        super(props);
        this.videoRef = createRef();
        this.canvasRef = createRef();
        this.captureImage = this.captureImage.bind(this);
    }
    componentDidMount() {
        this.videoRef.current.addEventListener('loadeddata', this.captureImage);
    }
    captureImage() {
        let video = this.videoRef.current;
        let canvas = this.canvasRef.current;
        let scale = 0.3;
        canvas.width = video.videoWidth * scale;
        canvas.height = video.videoHeight * scale;
        canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
    }
    render() {
        let { url } = this.props;
        return (
            <a href={url} target="view_window">
                <video style={{opacity: 0, display: 'none'}} ref={this.videoRef} controls="controls">
                    <source src={url} />
                </video>
                <canvas ref={this.canvasRef}></canvas>
            </a>
        );
    }
}
