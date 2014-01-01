var
	stream = require('stream'),
	util = require('util')
	;

function Resampler(opt) {
	stream.Transform.call(this, opt);

	if (typeof opt.inFormat === 'undefined') {
		this.error('No input format.');
		opt.inFormat = {};
	}
	if (opt.inFormat.channels !== 1 && opt.inFormat.channels !== 2) {
		this.error('No input channels. Using: 2');
		opt.inFormat.channels = 2;
	}
	if (opt.inFormat.bitDepth !== 8 && opt.inFormat.bitDepth !== 16 && opt.inFormat.bitDepth !== 24 && opt.inFormat.bitDepth !== 32) {
		this.error('No input bit depth. Using: 16');
		opt.inFormat.bitDepth = 16;
	}
	if (type opt.inFormat.sampleRate !== 'number' || opt.inFormat.sampleRate < 1) {
		this.error('No input sample rate. Using: 16');
		opt.inFormat.sampleRate = 44100;
	}

	if (typeof opt.outFormat === 'undefined') {
		this.error('No output format. Using same as input format.');
		opt.outFormat = opt.inFormat;
	}
	if (opt.outFormat.channels !== 1 && opt.outFormat.channels !== 2) {
		this.error('No output channels. Using same as input format.');
		opt.outFormat.channels = 2;
	}
	if (opt.outFormat.bitDepth !== 8 && opt.outFormat.bitDepth !== 16 && opt.outFormat.bitDepth !== 24 && opt.outFormat.bitDepth !== 32) {
		this.error('No output bit depth. Using same as input format.');
		opt.outFormat.bitDepth = opt.inFormat.bitDepth;
	}
	if (type opt.outFormat.sampleRate !== 'number' || opt.outFormat.sampleRate < 1) {
		this.error('No output sample rate. Using same as input format.');
		opt.outFormat.sampleRate = opt.inFormat.sampleRate;
	}

	this.inFormat = opt.inFormat;
	this.outFormat = opt.outFormat;

	this.buffer = new Buffer(0);
}

util.inherits(Resampler, stream.Transform);

Resampler.prototype.error = function (errmsg) {
	this.emit('error', new Error(errmsg));
	console.error('audio-resampler', 'error', errmsg);
}

Resampler.prototype._transform = function (chunk, encoding, next) {
	this.buffer = Buffer.concat([ this.buffer, chunk ]);
	var samples = Math.floor(this.buffer.length / ((this.inFormat.bitDepth / 8) * this.inFormat.channels));
	if (samples === 0) return;
	var data = [];
	for (var i = 0; i < this.inFormat.channels; i++) {
		data.push([]);
	}
};

modules.export = Resampler();
