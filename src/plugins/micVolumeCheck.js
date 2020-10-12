export class SoundMeter {
  constructor (context) {
    this._context = context
    this._instant = 0
    this._analyser = context.createAnalyser()
    this._analyser.fftSize = 2048
    const bufferLength = this._analyser.fftSize
    this._dataArray = new Uint8Array(bufferLength)

    this.minVolume = -36
    this.maxVolume = 0
  }

  get instant () { return this._instant }

  connectToSource (stream) {
    this._source = this._context.createMediaStreamSource(stream)
    this._source.connect(this._analyser)
  }

  update () {
    this._analyser.getByteTimeDomainData(this._dataArray)
    let sum = 0
    for (let i = 0; i < this._dataArray.length; i++) {
      const data = this._dataArray[i] / 128 - 1
      sum += data * data
    }
    const amp = Math.sqrt(sum / this._dataArray.length)
    let volume = 20 * Math.log10(amp)
    volume = (volume - this.minVolume) / (this.maxVolume - this.minVolume)
    volume = Math.min(Math.max(0, volume), 1)
    this._instant = 0.9 * this._instant + 0.1 * Math.floor(volume * 100)
  }
}
