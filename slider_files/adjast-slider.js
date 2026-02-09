(function() {
	var iframe = document.getElementById('slider-iframe');
	var sliderWidth = 864;
	var sliderHeight = 450;
	var ratio = sliderWidth/sliderHeight;

	function unStyleSlider() {
		iframe.style.height = '';
	}
	function adjastSlider() {
		var curWidth = iframe.clientWidth;
		var curRatio = Math.round(curWidth/iframe.clientHeight*100)/100;
    
		iframe.style.height = ratio >= curRatio
								?curWidth/ratio+'px'
								:'';
	if(curWidth < 764) {
		iframe.style.height = 0;
	}
}
	adjastSlider();

	window.addEventListener('resize', adjastSlider, false);
	document.getElementById('device-fullwidth').addEventListener('change', unStyleSlider, false);
	document.getElementById('device-laptop').addEventListener('change', unStyleSlider, false);
	document.getElementById('device-mobile').addEventListener('change', unStyleSlider, false);
}());
