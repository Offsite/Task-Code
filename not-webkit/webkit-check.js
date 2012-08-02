var startup = function()
{
	console.log('webkit check');
	if(!Ext.browser.is.WebKit)
	{
		console.log('This is not an appropriate browser. Get Webkit!');
		window.location='./not-webkit/index.html';
	};
		if(Ext.browser.is.WebKit)
	{
		console.log('You are using a Webkit Browser. AWESOME!');
	};

	
};
startup();