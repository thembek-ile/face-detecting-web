/** This is going to be our video tag*/
const video = document.getElementById('video')

/** We are goining to load in all the models, we pass an array to call them */
Promise.all([
    /**It is smaller and quicker and runs on realtime */
    faceapi.nets.tinyFaceDectector.loadFromUri('/models'),
    /**Detacts different parts of your face such as lips, eyes, mouth, nose */
    faceapi.nets.facelandmark68Net.loadFromUri('/models'),
    /**Detects where ones face */
    faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
    /** This identifies the type of facial expressions */
    faceapi.nets.faceExpressionNet.loadFromUri('/models'),
    /** This identifies the type of facial expressions */
    faceapi.nets.faceAgeNet.loadFromUri('/models')
]).then(startVideo)

/** This we are going to use this to hook up our webcam to our video element */
function startVideo(){
    /** Gets our webcam */
    navigator.getUserMedia(
        {video: {} },
        /**The stream method is what is coming from our webcam*/
        stream => video.srcObject = Stream,
        /**This calls the error function */
        err => console.error(err)
    )
}

/**This mamy be used to illustrate if coding works or not, the set interval detects all the face inside the webcam every 100 mili-seconds */
video.addEventListener('play', () => {
    const canvas = faceapi.createCanvasFromMedia(video)
    document.body.append(canvas)
    const displaySize = { width: video.width, height: video.height}
    faceapi.matchDimensions(canvas, displaySize)
    /** This runs the code a multiple times */
    setInterval(async () => {
        /**Gets all face inside of the web-image  */
        const detection = await faceapi.detectALlFaces(video,
        new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions()
        /**Ensures that the box that appears on the face is well shaped */
        const reSizeDetections = faceapi.resizeResults(detections, displaySize)
        /**CLears canvas before running */
        canvas.getContext('2d').clearReact(0, 0, canvas.width, canvas.height)
        faceapi.draw.drawDetections(canvas, resizeDetections)
        faceapi.draw.drawFaceLandmarks(canvas, resizeDetections)
        faceapi.draw.drawFaceExpressions(canvas, resizeDetections)
        faceapi.draw.drawFaceAge(canvas, resizeDetections)
    }, 100)
}) 